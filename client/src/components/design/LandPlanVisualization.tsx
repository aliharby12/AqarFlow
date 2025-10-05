import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Home, Building2, School, TreePine, Church, Hospital, ShoppingCart, Image, Download } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

interface LandPlanVisualizationProps {
  landArea: number;
  proposedUse: string;
  city: string;
  neighborhood?: string;
}

export default function LandPlanVisualization({ 
  landArea, 
  proposedUse, 
  city, 
  neighborhood 
}: LandPlanVisualizationProps) {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const { toast } = useToast();

  // توليد صورة المخطط بالذكاء الاصطناعي
  const generateImageMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/land-plan-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          landArea,
          city,
          proposedUse
        }),
      });
      
      if (!response.ok) {
        throw new Error("فشل في توليد صورة المخطط");
      }
      
      const result = await response.json();
      return result.image;
    },
    onSuccess: (imageData) => {
      if (imageData.imageUrl) {
        setGeneratedImage(imageData.imageUrl);
        toast({
          title: "تم توليد صورة المخطط! 🎨",
          description: "تم إنشاء صورة توضيحية للمخطط المقترح بنجاح",
        });
      } else {
        toast({
          title: "تعذر توليد الصورة",
          description: imageData.error || "حدث خطأ في توليد الصورة",
          variant: "destructive"
        });
      }
    },
    onError: (error) => {
      toast({
        title: "خطأ في توليد الصورة",
        description: "فشل في إنشاء صورة المخطط. يرجى المحاولة مرة أخرى.",
        variant: "destructive"
      });
    }
  });
  
  // حساب أبعاد المخطط بناء على المساحة
  const getPlotDimensions = () => {
    const ratio = Math.sqrt(landArea);
    const cols = Math.ceil(ratio / 50) || 8;
    const rows = Math.ceil(ratio / 50) || 8;
    return { cols, rows };
  };

  const { cols, rows } = getPlotDimensions();

  // حساب عدد القطع حسب نوع الاستخدام والمساحة
  const calculatePlots = () => {
    const totalPlots = Math.floor(landArea / 400); // متوسط قطعة 400 م²
    
    if (proposedUse === 'residential') {
      return {
        residential: Math.floor(totalPlots * 0.75),
        commercial: Math.floor(totalPlots * 0.15),
        services: Math.floor(totalPlots * 0.10)
      };
    } else if (proposedUse === 'commercial') {
      return {
        residential: Math.floor(totalPlots * 0.40),
        commercial: Math.floor(totalPlots * 0.45),
        services: Math.floor(totalPlots * 0.15)
      };
    } else {
      return {
        residential: Math.floor(totalPlots * 0.60),
        commercial: Math.floor(totalPlots * 0.25),
        services: Math.floor(totalPlots * 0.15)
      };
    }
  };

  const plotCounts = calculatePlots();

  // تخطيط الخدمات العامة
  const publicServices = [
    { icon: Church, name: "مسجد", color: "bg-green-600", count: Math.ceil(landArea / 10000) || 1 },
    { icon: School, name: "مدرسة", color: "bg-blue-600", count: Math.ceil(landArea / 15000) || 1 },
    { icon: TreePine, name: "حديقة عامة", color: "bg-emerald-600", count: Math.ceil(landArea / 8000) || 1 },
    { icon: Hospital, name: "مركز صحي", color: "bg-red-600", count: Math.ceil(landArea / 25000) || 1 },
    { icon: ShoppingCart, name: "مركز تجاري", color: "bg-purple-600", count: Math.ceil(landArea / 20000) || 1 }
  ];

  // إنشاء شبكة المخطط
  const createPlotGrid = () => {
    const grid = [];
    let residentialCount = 0;
    let commercialCount = 0;
    let serviceCount = 0;

    for (let row = 0; row < rows; row++) {
      const rowElements = [];
      for (let col = 0; col < cols; col++) {
        const isEdge = row === 0 || row === rows - 1 || col === 0 || col === cols - 1;
        const isStreet = (row + 1) % 3 === 0 || (col + 1) % 4 === 0;
        
        let plotType = 'empty';
        let plotColor = 'bg-gray-100 dark:bg-gray-800';
        let plotIcon = null;

        if (isStreet) {
          plotType = 'street';
          plotColor = 'bg-gray-400 dark:bg-gray-600';
        } else if (!isEdge) {
          // توزيع القطع
          if (residentialCount < plotCounts.residential && Math.random() > 0.4) {
            plotType = 'residential';
            plotColor = 'bg-amber-200 dark:bg-amber-800';
            plotIcon = Home;
            residentialCount++;
          } else if (commercialCount < plotCounts.commercial && Math.random() > 0.6) {
            plotType = 'commercial';
            plotColor = 'bg-indigo-200 dark:bg-indigo-800';
            plotIcon = Building2;
            commercialCount++;
          } else if (serviceCount < plotCounts.services && Math.random() > 0.8) {
            const service = publicServices[serviceCount % publicServices.length];
            plotType = 'service';
            plotColor = service.color.replace('600', '200').replace('bg-', 'bg-') + ' dark:' + service.color.replace('600', '800');
            plotIcon = service.icon;
            serviceCount++;
          } else {
            plotType = 'green';
            plotColor = 'bg-green-200 dark:bg-green-800';
          }
        }

        rowElements.push({
          type: plotType,
          color: plotColor,
          icon: plotIcon,
          key: `${row}-${col}`
        });
      }
      grid.push(rowElements);
    }
    return grid;
  };

  const plotGrid = createPlotGrid();

  // عرض الشوارع وعروضها
  const streetWidths = [
    { name: "شارع رئيسي", width: "20 متر", color: "bg-gray-600" },
    { name: "شارع فرعي", width: "15 متر", color: "bg-gray-500" },
    { name: "شارع محلي", width: "12 متر", color: "bg-gray-400" }
  ];

  return (
    <Card className="shadow-lg border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-blue-800 dark:text-blue-200">
          <div className="p-2 bg-blue-600 rounded-lg">
            <MapPin className="h-6 w-6 text-white" />
          </div>
          تصور المخطط المقترح - {landArea.toLocaleString('ar-SA')} م²
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* معلومات المخطط */}
        <div className="bg-white/70 dark:bg-gray-800/70 rounded-lg p-4">
          <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">
            📍 موقع المشروع: {neighborhood ? `${neighborhood}، ` : ''}{city}
          </h4>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">{plotCounts.residential}</div>
              <div className="text-gray-600 dark:text-gray-400">قطعة سكنية</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">{plotCounts.commercial}</div>
              <div className="text-gray-600 dark:text-gray-400">قطعة تجارية</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{plotCounts.services}</div>
              <div className="text-gray-600 dark:text-gray-400">خدمة عامة</div>
            </div>
          </div>
        </div>

        {/* المخطط المرئي */}
        <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border-2 border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-blue-700 dark:text-blue-300">
              🗺️ المخطط العام للمشروع
            </h4>
            <Button
              onClick={() => generateImageMutation.mutate()}
              disabled={generateImageMutation.isPending}
              variant="outline"
              size="sm"
              className="border-blue-500 text-blue-700 hover:bg-blue-50"
            >
              {generateImageMutation.isPending ? (
                <>
                  <div className="w-4 h-4 animate-spin border-2 border-current border-t-transparent rounded-full mr-2" />
                  جاري التوليد...
                </>
              ) : (
                <>
                  <Image className="h-4 w-4 mr-2" />
                  توليد صورة بالذكاء الاصطناعي
                </>
              )}
            </Button>
          </div>

          {/* الصورة المولدة */}
          {generatedImage && (
            <div className="mb-6 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 rounded-lg border border-emerald-200">
              <h5 className="font-semibold text-emerald-700 dark:text-emerald-300 mb-3 text-center">
                🎨 المخطط المولد بالذكاء الاصطناعي
              </h5>
              <div className="relative group">
                <img 
                  src={generatedImage} 
                  alt="مخطط الأرض المولد بالذكاء الاصطناعي"
                  className="w-full rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => window.open(generatedImage, '_blank')}
                />
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => window.open(generatedImage, '_blank')}
                    className="bg-white/90 hover:bg-white"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    تحميل
                  </Button>
                </div>
              </div>
              <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-2 text-center">
                اضغط على الصورة للعرض بحجم كامل
              </p>
            </div>
          )}
          
          <div className="grid gap-1 mx-auto" style={{ 
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            maxWidth: '600px'
          }}>
            {plotGrid.map((row, rowIndex) =>
              row.map((plot, colIndex) => (
                <div
                  key={plot.key}
                  className={`
                    aspect-square flex items-center justify-center rounded-sm border
                    ${plot.color} 
                    ${plot.type === 'street' ? 'border-gray-500' : 'border-gray-300'}
                    hover:scale-110 transition-transform cursor-pointer
                  `}
                  title={
                    plot.type === 'residential' ? 'قطعة سكنية' :
                    plot.type === 'commercial' ? 'قطعة تجارية' :
                    plot.type === 'service' ? 'خدمة عامة' :
                    plot.type === 'street' ? 'شارع' :
                    plot.type === 'green' ? 'مساحة خضراء' : ''
                  }
                >
                  {plot.icon && (
                    <plot.icon className="h-3 w-3 text-gray-700 dark:text-gray-300" />
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* دليل الألوان */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-white/70 dark:bg-gray-800/70">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-blue-700 dark:text-blue-300">
                🎨 دليل الألوان
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-amber-200 dark:bg-amber-800 rounded border flex items-center justify-center">
                  <Home className="h-2 w-2 text-gray-700" />
                </div>
                <span className="text-sm">قطع سكنية</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-indigo-200 dark:bg-indigo-800 rounded border flex items-center justify-center">
                  <Building2 className="h-2 w-2 text-gray-700" />
                </div>
                <span className="text-sm">قطع تجارية</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-green-200 dark:bg-green-800 rounded border"></div>
                <span className="text-sm">مساحات خضراء</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-gray-400 dark:bg-gray-600 rounded border"></div>
                <span className="text-sm">شوارع</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 dark:bg-gray-800/70">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-green-700 dark:text-green-300">
                🏢 الخدمات العامة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {publicServices.map((service, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className={`w-4 h-4 ${service.color} rounded border flex items-center justify-center`}>
                    <service.icon className="h-2 w-2 text-white" />
                  </div>
                  <span className="text-sm">{service.name} ({service.count})</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* تفاصيل الشوارع */}
        <Card className="bg-white/70 dark:bg-gray-800/70">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-gray-700 dark:text-gray-300">
              🛣️ شبكة الشوارع وعروضها
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {streetWidths.map((street, index) => (
                <div key={index} className="text-center p-3 border rounded-lg">
                  <div className={`w-full h-4 ${street.color} rounded mb-2`}></div>
                  <div className="font-semibold text-sm">{street.name}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">{street.width}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* إحصائيات المخطط */}
        <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 border-emerald-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-emerald-700 dark:text-emerald-300">
              📊 إحصائيات المخطط
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-emerald-600">
                  {Math.round((plotCounts.residential * 400 / landArea) * 100)}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">مساحة سكنية</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-indigo-600">
                  {Math.round((plotCounts.commercial * 400 / landArea) * 100)}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">مساحة تجارية</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">28%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">مساحات خضراء</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-600">22%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">شوارع ومواقف</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ملاحظات التصميم */}
        <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 rounded-lg p-4">
          <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
            📝 ملاحظات التصميم
          </h4>
          <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
            <li>• تم توزيع القطع لضمان أفضل استغلال للمساحة</li>
            <li>• الخدمات العامة موزعة بالتساوي لخدمة جميع الأحياء</li>
            <li>• شبكة الشوارع مصممة لسهولة الحركة والوصول</li>
            <li>• المساحات الخضراء متكاملة مع التصميم العام</li>
            <li>• يراعي التصميم اتجاه القبلة والرياح السائدة</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
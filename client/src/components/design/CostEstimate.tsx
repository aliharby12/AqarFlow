import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calculator, Home, Building2, Zap, Wrench, Wind, TreePine, FileText, AlertTriangle } from "lucide-react";

interface CostEstimateProps {
  costResult: {
    structuralCost: number;
    finishingCost: number;
    electricalCost: number;
    plumbingCost: number;
    hvacCost: number;
    landscapingCost: number;
    permitsCost: number;
    contingencyCost: number;
    totalCost: number;
    costBreakdown: {
      foundation: number;
      structure: number;
      roofing: number;
      walls: number;
      flooring: number;
      electrical: number;
      plumbing: number;
      hvac: number;
      finishes: number;
      landscaping: number;
      permits: number;
      labor: number;
      contingency: number;
    };
    costPerSquareMeter: number;
    projectDetails: {
      buildingArea: number;
      roomCount: number;
      complexity: string;
      qualityLevel: string;
    };
  };
}

export function CostEstimate({ costResult }: CostEstimateProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getCostPercentage = (cost: number) => {
    return (cost / costResult.totalCost) * 100;
  };

  const mainCosts = [
    {
      label: "التكلفة الإنشائية",
      amount: costResult.structuralCost,
      icon: Building2,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/50",
      borderColor: "border-blue-200"
    },
    {
      label: "تكلفة التشطيبات",
      amount: costResult.finishingCost,
      icon: Home,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950/50",
      borderColor: "border-green-200"
    },
    {
      label: "تكلفة الكهرباء",
      amount: costResult.electricalCost,
      icon: Zap,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50 dark:bg-yellow-950/50",
      borderColor: "border-yellow-200"
    },
    {
      label: "تكلفة السباكة",
      amount: costResult.plumbingCost,
      icon: Wrench,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50 dark:bg-indigo-950/50",
      borderColor: "border-indigo-200"
    },
    {
      label: "تكلفة التكييف",
      amount: costResult.hvacCost,
      icon: Wind,
      color: "text-cyan-600",
      bgColor: "bg-cyan-50 dark:bg-cyan-950/50",
      borderColor: "border-cyan-200"
    },
    {
      label: "تكلفة التنسيق",
      amount: costResult.landscapingCost,
      icon: TreePine,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/50",
      borderColor: "border-emerald-200"
    },
    {
      label: "رسوم التراخيص",
      amount: costResult.permitsCost,
      icon: FileText,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950/50",
      borderColor: "border-purple-200"
    },
    {
      label: "الطوارئ والاحتياط",
      amount: costResult.contingencyCost,
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50 dark:bg-red-950/50",
      borderColor: "border-red-200"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-green-800 dark:text-green-200 flex items-center justify-center gap-2">
            <Calculator className="h-6 w-6" />
            احتساب تكلفة المشروع
          </CardTitle>
          <div className="text-4xl font-bold text-green-600 dark:text-green-400 mt-4">
            {formatCurrency(costResult.totalCost)}
          </div>
          <p className="text-green-700 dark:text-green-300 font-medium">
            التكلفة الإجمالية التقديرية
          </p>
        </CardHeader>
      </Card>

      {/* Project Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">تفاصيل المشروع</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">مساحة البناء:</span>
              <span className="font-semibold">{costResult.projectDetails.buildingArea} م²</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">التكلفة لكل متر مربع:</span>
              <span className="font-semibold">{formatCurrency(costResult.costPerSquareMeter)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">عدد المساحات:</span>
              <span className="font-semibold">{costResult.projectDetails.roomCount} مساحة</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">مستوى الجودة:</span>
              <Badge variant="secondary">{costResult.projectDetails.qualityLevel}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Cost Categories */}
      <div className="grid md:grid-cols-2 gap-4">
        {mainCosts.map((cost, index) => {
          const IconComponent = cost.icon;
          const percentage = getCostPercentage(cost.amount);
          
          return (
            <Card key={index} className={`${cost.bgColor} ${cost.borderColor} border`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <IconComponent className={`h-5 w-5 ${cost.color}`} />
                    <span className="font-medium text-sm">{cost.label}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {percentage.toFixed(1)}%
                  </span>
                </div>
                <div className="text-lg font-bold mb-2">
                  {formatCurrency(cost.amount)}
                </div>
                <Progress value={percentage} className="h-2" />
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Detailed Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>التفصيل الدقيق للتكاليف</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-semibold text-blue-600">الأعمال الإنشائية</h4>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>الأساسات:</span>
                  <span>{formatCurrency(typeof costResult.costBreakdown.foundation === 'object' ? 0 : costResult.costBreakdown.foundation)}</span>
                </div>
                <div className="flex justify-between">
                  <span>الهيكل:</span>
                  <span>{formatCurrency(typeof costResult.costBreakdown.structure === 'object' ? 0 : costResult.costBreakdown.structure)}</span>
                </div>
                <div className="flex justify-between">
                  <span>السقف:</span>
                  <span>{formatCurrency(typeof costResult.costBreakdown.roofing === 'object' ? 0 : costResult.costBreakdown.roofing)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-green-600">التشطيبات</h4>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>الجدران:</span>
                  <span>{formatCurrency(typeof costResult.costBreakdown.walls === 'object' ? 0 : costResult.costBreakdown.walls)}</span>
                </div>
                <div className="flex justify-between">
                  <span>الأرضيات:</span>
                  <span>{formatCurrency(typeof costResult.costBreakdown.flooring === 'object' ? 0 : costResult.costBreakdown.flooring)}</span>
                </div>
                <div className="flex justify-between">
                  <span>اللمسات الأخيرة:</span>
                  <span>{formatCurrency(typeof costResult.costBreakdown.finishes === 'object' ? 0 : costResult.costBreakdown.finishes)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-purple-600">الخدمات والأخرى</h4>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>العمالة:</span>
                  <span>{formatCurrency(typeof costResult.costBreakdown.labor === 'object' ? 0 : costResult.costBreakdown.labor)}</span>
                </div>
                <div className="flex justify-between">
                  <span>التنسيق:</span>
                  <span>{formatCurrency(typeof costResult.costBreakdown.landscaping === 'object' ? 0 : costResult.costBreakdown.landscaping)}</span>
                </div>
                <div className="flex justify-between">
                  <span>التراخيص:</span>
                  <span>{formatCurrency(typeof costResult.costBreakdown.permits === 'object' ? 0 : costResult.costBreakdown.permits)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>إجمالي التكلفة:</span>
              <span className="text-green-600">{formatCurrency(costResult.totalCost)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <div className="bg-yellow-50 dark:bg-yellow-950/50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-yellow-800 dark:text-yellow-200">
            <p className="font-semibold mb-2">ملاحظات مهمة:</p>
            <ul className="space-y-1 text-xs">
              <li>• التكاليف المذكورة تقديرية وقد تختلف حسب السوق ومواصفات المشروع</li>
              <li>• الأسعار مبنية على متوسط أسعار السوق السعودي للعام 2025</li>
              <li>• لا تشمل التكاليف أسعار الأرض أو التصاميم الهندسية</li>
              <li>• يُنصح بالحصول على عروض أسعار من عدة مقاولين</li>
              <li>• تشمل نسبة 10% احتياط للطوارئ والتغييرات</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
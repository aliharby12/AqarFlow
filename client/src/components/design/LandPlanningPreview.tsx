import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Download, FileText, CheckCircle, Calculator, Building, Zap, Droplets, Wifi } from "lucide-react";
import LandPlanVisualization from "./LandPlanVisualization";

interface LandPlanningPreviewProps {
  generatedPlan?: any;
}

export default function LandPlanningPreview({ generatedPlan }: LandPlanningPreviewProps) {
  if (!generatedPlan) {
    return (
      <Card className="shadow-lg border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
        <CardContent className="p-12 text-center">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <MapPin className="h-10 w-10 text-green-600 dark:text-green-300" />
          </div>
          <h3 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-3">
            في انتظار معلومات الأرض
          </h3>
          <p className="text-green-600 dark:text-green-400">
            املأ النموذج لإنشاء مخطط شامل للأرض مع جميع الاشتراطات والخدمات
          </p>
        </CardContent>
      </Card>
    );
  }

  const {
    landInfo,
    planningDetails,
    governmentRequirements,
    costEstimate,
    timeline,
    recommendations
  } = generatedPlan;

  return (
    <div className="space-y-6">
      {/* التصور المرئي للمخطط */}
      <LandPlanVisualization
        landArea={parseInt(landInfo?.area?.replace(/[^0-9]/g, '') || '5000')}
        proposedUse={landInfo?.proposedUse || 'residential'}
        city="الرياض"
        neighborhood="الياسمين"
      />

      {/* Land Information */}
      <Card className="shadow-lg border-2 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-green-800 dark:text-green-200">
            <div className="p-2 bg-green-600 rounded-lg">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            معلومات الأرض والمشروع
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <span className="font-medium text-green-700 dark:text-green-300">المساحة:</span>
              <span className="mr-2">{landInfo?.area} متر مربع</span>
            </div>
            <div>
              <span className="font-medium text-green-700 dark:text-green-300">نوع الصك:</span>
              <Badge variant="outline" className="mr-2 border-green-500 text-green-700">
                {landInfo?.deedType}
              </Badge>
            </div>
            <div>
              <span className="font-medium text-green-700 dark:text-green-300">الاستخدام المقترح:</span>
              <span className="mr-2">{landInfo?.proposedUse}</span>
            </div>
            <div>
              <span className="font-medium text-green-700 dark:text-green-300">الموقع:</span>
              <span className="mr-2">{landInfo?.location}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Planning Details */}
      <Card className="shadow-lg border-2 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-blue-800 dark:text-blue-200">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Building className="h-5 w-5 text-white" />
            </div>
            تفاصيل التخطيط
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">المساحات المخططة</h4>
                <ul className="space-y-2 text-sm">
                  {planningDetails?.areas?.map((area: any, index: number) => (
                    <li key={index} className="flex justify-between">
                      <span>{area.type}</span>
                      <span className="font-medium">{area.area} م²</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">المواصفات التقنية</h4>
                <ul className="space-y-2 text-sm">
                  {planningDetails?.specifications?.map((spec: any, index: number) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Government Requirements */}
      <Card className="shadow-lg border-2 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-purple-800 dark:text-purple-200">
            <div className="p-2 bg-purple-600 rounded-lg">
              <FileText className="h-5 w-5 text-white" />
            </div>
            الاشتراطات الحكومية والخدمات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Municipality */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Building className="h-5 w-5 text-purple-600" />
                <h5 className="font-semibold text-purple-700 dark:text-purple-300">البلدية</h5>
              </div>
              <ul className="space-y-1 text-sm">
                {governmentRequirements?.municipality?.map((req: string, index: number) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Electricity */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-600" />
                <h5 className="font-semibold text-purple-700 dark:text-purple-300">الكهرباء</h5>
              </div>
              <ul className="space-y-1 text-sm">
                {governmentRequirements?.electricity?.map((req: string, index: number) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Water */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Droplets className="h-5 w-5 text-blue-600" />
                <h5 className="font-semibold text-purple-700 dark:text-purple-300">المياه</h5>
              </div>
              <ul className="space-y-1 text-sm">
                {governmentRequirements?.water?.map((req: string, index: number) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Telecommunications */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Wifi className="h-5 w-5 text-green-600" />
                <h5 className="font-semibold text-purple-700 dark:text-purple-300">الاتصالات</h5>
              </div>
              <ul className="space-y-1 text-sm">
                {governmentRequirements?.telecommunications?.map((req: string, index: number) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cost Estimate */}
      <Card className="shadow-lg border-2 border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-amber-800 dark:text-amber-200">
            <div className="p-2 bg-amber-600 rounded-lg">
              <Calculator className="h-5 w-5 text-white" />
            </div>
            تقدير التكاليف
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            {costEstimate?.options?.map((option: any, index: number) => (
              <Card key={index} className="bg-white/80 dark:bg-gray-800/80 border-2">
                <CardHeader className="pb-3">
                  <CardTitle className="text-center text-lg">
                    {option.level}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-center">
                    <span className="text-2xl font-bold text-primary">{option.totalCost}</span>
                    <p className="text-sm text-muted-foreground">{option.pricePerSqm}</p>
                  </div>
                  <ul className="text-sm space-y-1">
                    {option.includes?.map((item: string, itemIndex: number) => (
                      <li key={itemIndex} className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      {timeline && (
        <Card className="shadow-lg border-2 border-indigo-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-indigo-800 dark:text-indigo-200">
              جدول التنفيذ الزمني
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {timeline.phases?.map((phase: any, index: number) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-indigo-50 dark:bg-indigo-950 rounded-lg">
                  <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-indigo-700 dark:text-indigo-300">{phase.title}</h4>
                    <p className="text-sm text-indigo-600 dark:text-indigo-400">{phase.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recommendations */}
      {recommendations && (
        <Card className="shadow-lg border-2 border-emerald-200">
          <CardHeader>
            <CardTitle className="text-emerald-800 dark:text-emerald-200">
              توصيات وملاحظات مهمة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {recommendations.map((rec: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5" />
                  <span className="text-sm">{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="grid md:grid-cols-2 gap-4">
        <Button 
          variant="outline" 
          className="border-green-500 text-green-700 hover:bg-green-50"
          data-testid="button-download-plan"
        >
          <Download className="h-4 w-4 mr-2" />
          تحميل المخطط PDF
        </Button>
        <Button 
          className="bg-green-600 hover:bg-green-700"
          data-testid="button-request-consultation"
        >
          <FileText className="h-4 w-4 mr-2" />
          طلب استشارة مفصلة
        </Button>
      </div>
    </div>
  );
}
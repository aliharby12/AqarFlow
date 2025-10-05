import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Calculator, 
  TrendingUp, 
  MapPin, 
  DollarSign, 
  Clock, 
  Users, 
  Building2,
  FileText,
  BarChart3,
  Target
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface ProjectStudyData {
  projectName: string;
  projectType: string;
  location: string;
  totalArea: string;
  finishingLevel: string;
  hasBasement: boolean;
  parkingSpaces: string;
  projectDuration: string;
  targetMarket: string;
  specialRequirements: string;
}

interface StudyResult {
  id: string;
  feasibilityScore: number;
  expectedROI: string;
  marketDemand: string;
  riskLevel: string;
  recommendations: string[];
  dataIntegration?: any;
  realMarketInsights?: {
    avgMarketPrice: string;
    avgOccupancyRate: string;
    avgGrowthRate: string;
    dataSource: string;
    accuracy: string;
  };
  financialProjections: {
    totalCost: string;
    expectedRevenue: string;
    breakEvenPeriod: string;
    profitMargin: string;
  };
  projectVisualization?: {
    buildingLayout: string;
    architecturalStyle: string;
    amenities: string[];
    landscaping: string;
    sustainability: string;
    visualDescription: string;
  };
  detailedFinancialModel?: {
    cashFlow: any[];
    profitabilityRatios: {
      ROI: string;
      IRR: string;
      NPV: string;
    };
  };
  costBreakdown?: {
    landCost: string;
    constructionCost: string;
    infrastructureCost: string;
    permitsAndLicenses: string;
    marketingCost: string;
    contingency: string;
    totalProjectCost: string;
  };
  roiAnalysis?: {
    annualROI: string[];
    paybackPeriod: string;
    riskFactors: string[];
    recommendations: string[];
  };
}

export default function StudiesSection() {
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<ProjectStudyData>({
    projectName: "",
    projectType: "",
    location: "",
    totalArea: "",
    finishingLevel: "",
    hasBasement: false,
    parkingSpaces: "",
    projectDuration: "",
    targetMarket: "",
    specialRequirements: "",
  });

  const [studyResult, setStudyResult] = useState<StudyResult | null>(null);

  const generateStudyMutation = useMutation({
    mutationFn: async (data: ProjectStudyData) => {
      const response = await apiRequest('POST', '/api/project-study', data);
      return response.json();
    },
    onSuccess: (data) => {
      setStudyResult(data.study);
      toast({
        title: "تم إنشاء الدراسة بنجاح",
        description: "تمت معالجة بيانات المشروع وإنشاء دراسة الجدوى الاقتصادية",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "خطأ في إنشاء الدراسة",
        description: error instanceof Error ? error.message : "حدث خطأ غير متوقع",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.projectName || !formData.projectType || !formData.location || !formData.finishingLevel || !formData.parkingSpaces) {
      toast({
        variant: "destructive",
        title: "بيانات ناقصة",
        description: "يرجى تعبئة جميع الحقول المطلوبة",
      });
      return;
    }
    generateStudyMutation.mutate(formData);
  };

  const handleInputChange = (field: keyof ProjectStudyData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <section className="py-12 bg-muted/30 fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">دراسة المشاريع العقارية</h2>
          <p className="text-muted-foreground text-lg">دراسات جدوى شاملة للمشاريع العقارية بالذكاء الاصطناعي</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* نموذج دراسة المشروع */}
          <Card className="shadow-lg border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-blue-800 dark:text-blue-200">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
                نموذج دراسة الجدوى
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* معلومات المشروع الأساسية */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="projectName" className="text-blue-700 dark:text-blue-300 font-medium">
                      اسم المشروع *
                    </Label>
                    <Input
                      id="projectName"
                      placeholder="مثال: مجمع سكني الواحة"
                      value={formData.projectName}
                      onChange={(e) => handleInputChange("projectName", e.target.value)}
                      className="border-blue-300 focus:border-blue-500"
                      data-testid="input-project-name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="projectType" className="text-blue-700 dark:text-blue-300 font-medium">
                      نوع المشروع *
                    </Label>
                    <Select value={formData.projectType} onValueChange={(value) => handleInputChange("projectType", value)}>
                      <SelectTrigger className="border-blue-300 focus:border-blue-500" data-testid="select-project-type">
                        <SelectValue placeholder="اختر نوع المشروع" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residential_complex">مجمع سكني</SelectItem>
                        <SelectItem value="commercial_mall">مجمع تجاري</SelectItem>
                        <SelectItem value="office_building">مبنى مكاتب</SelectItem>
                        <SelectItem value="mixed_development">تطوير مختلط</SelectItem>
                        <SelectItem value="industrial_project">مشروع صناعي</SelectItem>
                        <SelectItem value="hotel_resort">فندق أو منتجع</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* الموقع والمساحة */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-blue-700 dark:text-blue-300 font-medium">
                      الموقع *
                    </Label>
                    <Input
                      id="location"
                      placeholder="مثال: حي الياسمين، الرياض"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      className="border-blue-300 focus:border-blue-500"
                      data-testid="input-location"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="totalArea" className="text-blue-700 dark:text-blue-300 font-medium">
                      المساحة الإجمالية (متر مربع)
                    </Label>
                    <Input
                      id="totalArea"
                      type="number"
                      placeholder="مثال: 50000"
                      value={formData.totalArea}
                      onChange={(e) => handleInputChange("totalArea", e.target.value)}
                      className="border-blue-300 focus:border-blue-500"
                      data-testid="input-total-area"
                    />
                  </div>
                </div>

                {/* التشطيب والمواصفات */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="finishingLevel" className="text-blue-700 dark:text-blue-300 font-medium">
                      نوع التشطيب *
                    </Label>
                    <Select value={formData.finishingLevel} onValueChange={(value) => handleInputChange("finishingLevel", value)}>
                      <SelectTrigger className="border-blue-300 focus:border-blue-500" data-testid="select-finishing-level">
                        <SelectValue placeholder="اختر نوع التشطيب" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="عادي">عادي - تشطيب أساسي</SelectItem>
                        <SelectItem value="متوسط">متوسط - تشطيب جيد</SelectItem>
                        <SelectItem value="فاخر">فاخر - تشطيب راقي</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="parkingSpaces" className="text-blue-700 dark:text-blue-300 font-medium">
                      عدد مواقف السيارات *
                    </Label>
                    <Input
                      id="parkingSpaces"
                      type="number"
                      placeholder="مثال: 20"
                      value={formData.parkingSpaces}
                      onChange={(e) => handleInputChange("parkingSpaces", e.target.value)}
                      className="border-blue-300 focus:border-blue-500"
                      data-testid="input-parking-spaces"
                    />
                  </div>
                </div>

                {/* البدروم والمدة */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-blue-700 dark:text-blue-300 font-medium">
                      وجود بدروم
                    </Label>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <input
                        type="checkbox"
                        id="hasBasement"
                        checked={formData.hasBasement}
                        onChange={(e) => handleInputChange("hasBasement", e.target.checked)}
                        className="rounded border-blue-300 focus:ring-blue-500"
                        data-testid="checkbox-has-basement"
                      />
                      <Label htmlFor="hasBasement" className="text-sm">
                        يحتوي المشروع على بدروم (سيتم احتساب التكلفة الإضافية)
                      </Label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="projectDuration" className="text-blue-700 dark:text-blue-300 font-medium">
                      مدة المشروع المتوقعة
                    </Label>
                    <Select value={formData.projectDuration} onValueChange={(value) => handleInputChange("projectDuration", value)}>
                      <SelectTrigger className="border-blue-300 focus:border-blue-500" data-testid="select-project-duration">
                        <SelectValue placeholder="اختر المدة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6months">6 أشهر</SelectItem>
                        <SelectItem value="1year">سنة واحدة</SelectItem>
                        <SelectItem value="18months">سنة ونصف</SelectItem>
                        <SelectItem value="2years">سنتان</SelectItem>
                        <SelectItem value="3years">3 سنوات</SelectItem>
                        <SelectItem value="5years">5 سنوات</SelectItem>
                        <SelectItem value="more">أكثر من 5 سنوات</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* السوق المستهدف */}
                <div className="space-y-2">
                  <Label htmlFor="targetMarket" className="text-blue-700 dark:text-blue-300 font-medium">
                    السوق المستهدف
                  </Label>
                  <Select value={formData.targetMarket} onValueChange={(value) => handleInputChange("targetMarket", value)}>
                    <SelectTrigger className="border-blue-300 focus:border-blue-500" data-testid="select-target-market">
                      <SelectValue placeholder="اختر السوق المستهدف" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="luxury">الفئة الفاخرة</SelectItem>
                      <SelectItem value="middle_class">الطبقة المتوسطة</SelectItem>
                      <SelectItem value="affordable">الإسكان الميسور</SelectItem>
                      <SelectItem value="business">قطاع الأعمال</SelectItem>
                      <SelectItem value="mixed">مختلط</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* متطلبات خاصة */}
                <div className="space-y-2">
                  <Label htmlFor="specialRequirements" className="text-blue-700 dark:text-blue-300 font-medium">
                    متطلبات أو مميزات خاصة
                  </Label>
                  <Textarea
                    id="specialRequirements"
                    placeholder="مثال: مرافق رياضية، مساحات خضراء، أنظمة ذكية، مواقف سيارات..."
                    value={formData.specialRequirements}
                    onChange={(e) => handleInputChange("specialRequirements", e.target.value)}
                    className="border-blue-300 focus:border-blue-500 min-h-20"
                    data-testid="textarea-special-requirements"
                  />
                </div>

                {/* زر الإرسال */}
                <Button
                  type="submit"
                  disabled={generateStudyMutation.isPending}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 text-lg"
                  data-testid="button-generate-study"
                >
                  {generateStudyMutation.isPending ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      جاري إنشاء الدراسة...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      إنشاء دراسة الجدوى
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* نتائج الدراسة */}
          {studyResult ? (
            <Card className="shadow-lg border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-green-800 dark:text-green-200">
                  <div className="p-2 bg-green-600 rounded-lg">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  نتائج دراسة الجدوى
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* نقاط الجدوى الرئيسية */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-green-800 dark:text-green-200">درجة الجدوى</span>
                    </div>
                    <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                      {studyResult.feasibilityScore}%
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                      <span className="font-medium text-blue-800 dark:text-blue-200">العائد المتوقع</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                      {studyResult.expectedROI}
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-5 w-5 text-purple-600" />
                      <span className="font-medium text-purple-800 dark:text-purple-200">الطلب في السوق</span>
                    </div>
                    <Badge className={`${
                      studyResult.marketDemand === 'عالي' ? 'bg-green-100 text-green-800' :
                      studyResult.marketDemand === 'متوسط' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {studyResult.marketDemand}
                    </Badge>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                    <div className="flex items-center gap-2 mb-2">
                      <Building2 className="h-5 w-5 text-orange-600" />
                      <span className="font-medium text-orange-800 dark:text-orange-200">مستوى المخاطر</span>
                    </div>
                    <Badge className={`${
                      studyResult.riskLevel === 'منخفض' ? 'bg-green-100 text-green-800' :
                      studyResult.riskLevel === 'متوسط' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {studyResult.riskLevel}
                    </Badge>
                  </div>
                </div>

                {/* مؤشرات السوق الحقيقية */}
                {studyResult.realMarketInsights && (
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 p-4 rounded-lg border-2 border-blue-200">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3 flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-blue-600" />
                      بيانات السوق الحقيقية المدمجة
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                        <span className="text-gray-600 dark:text-gray-400">متوسط سعر المتر:</span>
                        <p className="font-bold text-blue-700 dark:text-blue-300">{studyResult.realMarketInsights.avgMarketPrice}</p>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                        <span className="text-gray-600 dark:text-gray-400">معدل الإشغال:</span>
                        <p className="font-bold text-green-700 dark:text-green-300">{studyResult.realMarketInsights.avgOccupancyRate}</p>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                        <span className="text-gray-600 dark:text-gray-400">معدل النمو:</span>
                        <p className="font-bold text-orange-700 dark:text-orange-300">{studyResult.realMarketInsights.avgGrowthRate}</p>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                        <span className="text-gray-600 dark:text-gray-400">مصدر البيانات:</span>
                        <p className="font-medium text-purple-700 dark:text-purple-300 text-xs">{studyResult.realMarketInsights.dataSource}</p>
                      </div>
                    </div>
                    <div className="mt-3 p-2 bg-green-100 dark:bg-green-900 rounded text-center">
                      <span className="text-xs font-medium text-green-800 dark:text-green-200">
                        🎯 دقة التحليل: {studyResult.realMarketInsights.accuracy}
                      </span>
                    </div>
                  </div>
                )}

                {/* التوقعات المالية */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    التوقعات المالية
                    {studyResult.dataIntegration && (
                      <Badge className="bg-green-100 text-green-800 text-xs">مبنية على بيانات حقيقية</Badge>
                    )}
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">التكلفة الإجمالية:</span>
                      <div className="font-medium">{studyResult.financialProjections?.totalCost || "غير متاح"}</div>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">الإيرادات المتوقعة:</span>
                      <div className="font-medium">{studyResult.financialProjections?.expectedRevenue || "غير متاح"}</div>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">فترة التعادل:</span>
                      <div className="font-medium">{studyResult.financialProjections?.breakEvenPeriod || "غير متاح"}</div>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">هامش الربح:</span>
                      <div className="font-medium">{studyResult.financialProjections?.profitMargin || "غير متاح"}</div>
                    </div>
                  </div>
                </div>

                {/* التوصيات */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">التوصيات الاستراتيجية</h4>
                  <ul className="space-y-2">
                    {Array.isArray(studyResult.recommendations) ? 
                      studyResult.recommendations.map((recommendation, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <span className="text-green-600 mt-1">✓</span>
                          <span>{recommendation}</span>
                        </li>
                      )) : (
                        <li className="flex items-start gap-2 text-sm">
                          <span className="text-green-600 mt-1">✓</span>
                          <span>{studyResult.recommendations || "لا توجد توصيات متاحة"}</span>
                        </li>
                      )
                    }
                  </ul>
                </div>

                {/* تفصيل التكاليف */}
                {studyResult.costBreakdown && (
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                      <Calculator className="h-5 w-5 text-blue-600" />
                      تفصيل التكاليف
                    </h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">تكلفة الأرض:</span>
                        <div className="font-medium">{studyResult.costBreakdown.landCost}</div>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">تكلفة البناء:</span>
                        <div className="font-medium">{studyResult.costBreakdown.constructionCost}</div>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">البنية التحتية:</span>
                        <div className="font-medium">{studyResult.costBreakdown.infrastructureCost}</div>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">التراخيص:</span>
                        <div className="font-medium">{studyResult.costBreakdown.permitsAndLicenses}</div>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">التسويق:</span>
                        <div className="font-medium">{studyResult.costBreakdown.marketingCost}</div>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">احتياطي الطوارئ:</span>
                        <div className="font-medium">{studyResult.costBreakdown.contingency}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* النموذج المالي المفصل */}
                {studyResult.detailedFinancialModel && (
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-purple-600" />
                      النموذج المالي المفصل
                    </h4>
                    <div className="grid grid-cols-3 gap-3 text-sm">
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">العائد على الاستثمار:</span>
                        <div className="font-medium text-green-600">{studyResult.detailedFinancialModel?.profitabilityRatios?.ROI || "غير متاح"}</div>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">معدل العائد الداخلي:</span>
                        <div className="font-medium text-blue-600">{studyResult.detailedFinancialModel?.profitabilityRatios?.IRR || "غير متاح"}</div>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">صافي القيمة الحالية:</span>
                        <div className="font-medium text-purple-600">{studyResult.detailedFinancialModel?.profitabilityRatios?.NPV || "غير متاح"}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* تحليل العائد على الاستثمار */}
                {studyResult.roiAnalysis && (
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      تحليل العائد على الاستثمار
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <span className="text-gray-600 dark:text-gray-400 text-sm">فترة الاسترداد:</span>
                        <div className="font-medium text-lg text-green-600">{studyResult.roiAnalysis?.paybackPeriod || "غير متاح"}</div>
                      </div>
                      
                      <div>
                        <span className="text-gray-600 dark:text-gray-400 text-sm">عوامل المخاطر:</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {Array.isArray(studyResult.roiAnalysis?.riskFactors) 
                            ? studyResult.roiAnalysis.riskFactors.map((risk, index) => (
                                <Badge key={index} className="bg-red-100 text-red-800 text-xs">
                                  {typeof risk === 'object' ? JSON.stringify(risk) : risk}
                                </Badge>
                              ))
                            : <span className="text-sm">
                                {typeof studyResult.roiAnalysis?.riskFactors === 'object' 
                                  ? JSON.stringify(studyResult.roiAnalysis.riskFactors, null, 2)
                                  : studyResult.roiAnalysis?.riskFactors || "غير متاح"}
                              </span>
                          }
                        </div>
                      </div>

                      <div>
                        <span className="text-gray-600 dark:text-gray-400 text-sm">العائد السنوي المتوقع (10 سنوات):</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {Array.isArray(studyResult.roiAnalysis?.annualROI) 
                            ? studyResult.roiAnalysis.annualROI.map((roi, index) => (
                                <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                                  {index + 1}: {typeof roi === 'object' ? JSON.stringify(roi) : roi}
                                </span>
                              ))
                            : <span className="text-sm">
                                {typeof studyResult.roiAnalysis?.annualROI === 'object' 
                                  ? JSON.stringify(studyResult.roiAnalysis.annualROI, null, 2)
                                  : studyResult.roiAnalysis?.annualROI || "غير متاح"}
                              </span>
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* التصميم التوقعي للمشروع */}
                {studyResult.projectVisualization && (
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-indigo-600" />
                      التصميم التوقعي للمشروع
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">الطراز المعماري:</span>
                        <p className="mt-1">{studyResult.projectVisualization.architecturalStyle}</p>
                      </div>
                      
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">تخطيط المباني:</span>
                        <p className="mt-1">
                          {typeof studyResult.projectVisualization.buildingLayout === 'object' 
                            ? JSON.stringify(studyResult.projectVisualization.buildingLayout, null, 2)
                            : studyResult.projectVisualization.buildingLayout}
                        </p>
                      </div>

                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">المرافق والخدمات:</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {Array.isArray(studyResult.projectVisualization.amenities) 
                            ? studyResult.projectVisualization.amenities.map((amenity, index) => (
                                <Badge key={index} className="bg-blue-100 text-blue-800 text-xs">
                                  {typeof amenity === 'object' ? JSON.stringify(amenity) : amenity}
                                </Badge>
                              ))
                            : <span className="text-sm">
                                {typeof studyResult.projectVisualization.amenities === 'object' 
                                  ? JSON.stringify(studyResult.projectVisualization.amenities, null, 2)
                                  : studyResult.projectVisualization.amenities}
                              </span>
                          }
                        </div>
                      </div>

                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">التصميم الخارجي:</span>
                        <p className="mt-1">
                          {typeof studyResult.projectVisualization.landscaping === 'object' 
                            ? JSON.stringify(studyResult.projectVisualization.landscaping, null, 2)
                            : studyResult.projectVisualization.landscaping}
                        </p>
                      </div>

                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">الاستدامة:</span>
                        <p className="mt-1">
                          {typeof studyResult.projectVisualization.sustainability === 'object' 
                            ? JSON.stringify(studyResult.projectVisualization.sustainability, null, 2)
                            : studyResult.projectVisualization.sustainability}
                        </p>
                      </div>

                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">الوصف البصري:</span>
                        <p className="mt-1 italic">
                          {typeof studyResult.projectVisualization.visualDescription === 'object' 
                            ? JSON.stringify(studyResult.projectVisualization.visualDescription, null, 2)
                            : studyResult.projectVisualization.visualDescription}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* تحليل المبيعات مقابل التأجير */}
                {studyResult.salesVsRental && (
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                      تحليل المبيعات مقابل التأجير
                    </h4>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      {/* سيناريو المبيعات */}
                      <div className="bg-blue-50 dark:bg-blue-950/50 p-4 rounded-lg">
                        <h5 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">💰 سيناريو المبيعات</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>إجمالي قيمة المبيعات:</span>
                            <span className="font-medium">{studyResult.salesVsRental.salesScenario?.totalSalesValue}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>متوسط سعر الوحدة:</span>
                            <span className="font-medium">{studyResult.salesVsRental.salesScenario?.avgSalePrice}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>فترة البيع:</span>
                            <span className="font-medium">{studyResult.salesVsRental.salesScenario?.salesPeriod}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>صافي الربح:</span>
                            <span className="font-bold text-green-600">{studyResult.salesVsRental.salesScenario?.netProfitFromSales}</span>
                          </div>
                        </div>
                      </div>

                      {/* سيناريو التأجير */}
                      <div className="bg-green-50 dark:bg-green-950/50 p-4 rounded-lg">
                        <h5 className="font-semibold text-green-800 dark:text-green-200 mb-2">🏠 سيناريو التأجير</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>الدخل الشهري:</span>
                            <span className="font-medium">{studyResult.salesVsRental.rentalScenario?.monthlyRentalIncome}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>الدخل السنوي:</span>
                            <span className="font-medium">{studyResult.salesVsRental.rentalScenario?.annualRentalIncome}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>معدل الإشغال:</span>
                            <span className="font-medium">{studyResult.salesVsRental.rentalScenario?.occupancyRate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>صافي الربح السنوي:</span>
                            <span className="font-bold text-green-600">{studyResult.salesVsRental.rentalScenario?.netProfitFromRental}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>فترة الاسترداد:</span>
                            <span className="font-medium">{studyResult.salesVsRental.rentalScenario?.paybackPeriod}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* التوصية */}
                    <div className="bg-orange-50 dark:bg-orange-950/50 p-4 rounded-lg border-l-4 border-orange-400">
                      <h5 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">🎯 التوصية الاستراتيجية</h5>
                      <p className="text-sm text-orange-700 dark:text-orange-300">
                        {studyResult.salesVsRental.recommendation}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-lg border-2 border-gray-200 bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-950 dark:to-slate-950">
              <CardContent className="flex items-center justify-center h-96">
                <div className="text-center">
                  <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
                    في انتظار بيانات المشروع
                  </h3>
                  <p className="text-gray-500 dark:text-gray-500">
                    قم بتعبئة النموذج لإنشاء دراسة الجدوى الاقتصادية
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* معلومات إضافية */}
        <div className="mt-12 bg-amber-50 dark:bg-amber-950 border border-amber-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-600 rounded-lg">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
                عن دراسات الجدوى العقارية
              </h4>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                تشمل دراساتنا تحليل السوق المحلي، التكاليف التقديرية، العائد على الاستثمار، تحليل المخاطر، 
                والتوصيات الاستراتيجية بناءً على أحدث بيانات السوق العقاري السعودي والذكاء الاصطناعي.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
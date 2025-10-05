import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calculator, FileText, AlertCircle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface LandPlanningFormProps {
  onPlanGenerated: (plan: any) => void;
}

export default function LandPlanningForm({ onPlanGenerated }: LandPlanningFormProps) {
  const [formData, setFormData] = useState({
    landArea: "",
    deedType: "",
    currentUse: "",
    proposedUse: "",
    city: "",
    neighborhood: "",
    planningLevel: "",
    specialRequirements: "",
    budget: ""
  });

  // تفاصيل أنواع الصكوك والاشتراطات القانونية
  const deedTypeDetails = {
    "raw": {
      name: "أرض خام",
      description: "أرض غير مطورة بدون خدمات أساسية",
      priceRange: "60-90 ر.س/م²",
      requirements: [
        "موافقة من البلدية على نوع الاستخدام",
        "دراسة جيوتقنية للتربة",
        "تقييم الأثر البيئي (إن لزم الأمر)",
        "خطة الصرف والمياه"
      ]
    },
    "agricultural": {
      name: "صك زراعي", 
      description: "أرض مخصصة للأنشطة الزراعية والثروة الحيوانية",
      priceRange: "70-120 ر.س/م²",
      requirements: [
        "موافقة وزارة البيئة والمياه والزراعة",
        "دراسة جودة التربة والمياه الجوفية",
        "خطة الري والصرف الزراعي",
        "اشتراطات المسافات من المناطق السكنية"
      ]
    },
    "light_industrial": {
      name: "صناعي خفيف",
      description: "أرض للصناعات الخفيفة غير الملوثة",
      priceRange: "120-180 ر.س/م²", 
      requirements: [
        "ترخيص من وزارة الصناعة والثروة المعدنية",
        "دراسة الأثر البيئي والسلامة",
        "اشتراطات الحماية من الحرائق",
        "خطة إدارة النفايات الصناعية",
        "مسافات أمان من المناطق السكنية (50م على الأقل)"
      ]
    },
    "heavy_industrial": {
      name: "صناعي ثقيل",
      description: "أرض للصناعات الثقيلة والكيماوية",
      priceRange: "180-250 ر.س/م²",
      requirements: [
        "ترخيص من وزارة الصناعة والهيئة العامة للاستثمار",
        "دراسة تقييم الأثر البيئي المفصلة",
        "خطة الطوارئ والسلامة الصناعية",
        "نظام معالجة النفايات والانبعاثات",
        "مسافات أمان من المناطق السكنية (500م على الأقل)",
        "موافقة الدفاع المدني والهلال الأحمر"
      ]
    }
  };

  // تفاصيل أنواع التخطيط
  const planningTypeDetails = {
    "mixed_residential": {
      name: "مخطط سكني مختلط",
      description: "يجمع بين السكن والخدمات التجارية البسيطة",
      requirements: [
        "كثافة سكانية: 150-250 نسمة/هكتار",
        "نسبة البناء: 60-70%", 
        "ارتداد أدنى: 3 أمتار من جميع الجهات",
        "مساحة خضراء: 15% من إجمالي المساحة",
        "مواقف سيارات: موقف واحد لكل وحدة سكنية",
        "خدمات تجارية: بحد أقصى 20% من المساحة"
      ]
    },
    "residential_commercial": {
      name: "مخطط سكني تجاري",
      description: "يركز على التطوير التجاري مع السكن",
      requirements: [
        "كثافة سكانية: 100-180 نسمة/هكتار",
        "نسبة البناء: 70-80%",
        "ارتداد أدنى: 5 أمتار من الشوارع الرئيسية",
        "مساحة تجارية: 30-50% من المساحة الإجمالية", 
        "مواقف سيارات: موقفان لكل وحدة تجارية",
        "طرق بعرض لا يقل عن 20 متر للشوارع التجارية"
      ]
    },
    "agricultural_planning": {
      name: "مخطط زراعي",
      description: "مخصص للأنشطة الزراعية والثروة الحيوانية",
      requirements: [
        "كثافة بناء منخفضة: 10-25%",
        "مسافة 100 متر بين الوحدات الزراعية",
        "شبكةري متطورة وخزانات مياه",
        "طرق زراعية بعرض 8-12 متر",
        "مناطق تخزين المعدات والمحاصيل",
        "نظام صرف المياه الزراعية"
      ]
    }
  };

  const { toast } = useToast();

  const generatePlanMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await fetch("/api/land-planning", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error("فشل في إنشاء مخطط الأرض");
      }
      
      const result = await response.json();
      return result.plan;
    },
    onSuccess: (data) => {
      onPlanGenerated(data);
      toast({
        title: "تم إنشاء مخطط الأرض بنجاح! 🎯",
        description: "تم إنشاء مخطط شامل مع كامل الاشتراطات والتسعير",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "خطأ في إنشاء المخطط",
        description: error instanceof Error ? error.message : "حدث خطأ غير متوقع",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.landArea || !formData.deedType || !formData.proposedUse || !formData.planningLevel) {
      toast({
        variant: "destructive",
        title: "بيانات ناقصة",
        description: "يرجى تعبئة جميع الحقول المطلوبة",
      });
      return;
    }
    generatePlanMutation.mutate(formData);
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card className="shadow-lg border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-green-800 dark:text-green-200">
          <div className="p-2 bg-green-600 rounded-lg">
            <MapPin className="h-6 w-6 text-white" />
          </div>
          نموذج تخطيط وفرز الأراضي
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Land Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="landArea" className="text-green-700 dark:text-green-300 font-medium">
                مساحة الأرض (متر مربع) *
              </Label>
              <Input
                id="landArea"
                type="number"
                placeholder="مثال: 10000"
                value={formData.landArea}
                onChange={(e) => handleInputChange("landArea", e.target.value)}
                className="border-green-300 focus:border-green-500"
                data-testid="input-land-area"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="deedType" className="text-green-700 dark:text-green-300 font-medium">
                نوع الصك *
              </Label>
              <Select value={formData.deedType} onValueChange={(value) => handleInputChange("deedType", value)}>
                <SelectTrigger className="border-green-300 focus:border-green-500" data-testid="select-deed-type">
                  <SelectValue placeholder="اختر نوع الصك" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="raw">أرض خام</SelectItem>
                  <SelectItem value="agricultural">صك زراعي</SelectItem>
                  <SelectItem value="light_industrial">صناعي خفيف</SelectItem>
                  <SelectItem value="heavy_industrial">صناعي ثقيل</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Current and Proposed Use */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="currentUse" className="text-green-700 dark:text-green-300 font-medium">
                الاستخدام الحالي
              </Label>
              <Select value={formData.currentUse} onValueChange={(value) => handleInputChange("currentUse", value)}>
                <SelectTrigger className="border-green-300 focus:border-green-500" data-testid="select-current-use">
                  <SelectValue placeholder="اختر الاستخدام الحالي" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vacant">أرض فضاء</SelectItem>
                  <SelectItem value="farming">زراعة</SelectItem>
                  <SelectItem value="livestock">مواشي</SelectItem>
                  <SelectItem value="storage">مخازن</SelectItem>
                  <SelectItem value="mixed">استخدام مختلط</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="proposedUse" className="text-green-700 dark:text-green-300 font-medium">
                الاستخدام المقترح *
              </Label>
              <Select value={formData.proposedUse} onValueChange={(value) => handleInputChange("proposedUse", value)}>
                <SelectTrigger className="border-green-300 focus:border-green-500" data-testid="select-proposed-use">
                  <SelectValue placeholder="اختر الاستخدام المقترح" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mixed_residential">مخطط سكني مختلط</SelectItem>
                  <SelectItem value="residential_commercial">مخطط سكني تجاري</SelectItem>
                  <SelectItem value="agricultural_planning">مخطط زراعي</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Location */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="city" className="text-green-700 dark:text-green-300 font-medium">
                المدينة
              </Label>
              <Select value={formData.city} onValueChange={(value) => handleInputChange("city", value)}>
                <SelectTrigger className="border-green-300 focus:border-green-500" data-testid="select-city">
                  <SelectValue placeholder="اختر المدينة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="riyadh">الرياض</SelectItem>
                  <SelectItem value="jeddah">جدة</SelectItem>
                  <SelectItem value="dammam">الدمام</SelectItem>
                  <SelectItem value="mecca">مكة المكرمة</SelectItem>
                  <SelectItem value="medina">المدينة المنورة</SelectItem>
                  <SelectItem value="taif">الطائف</SelectItem>
                  <SelectItem value="khobar">الخبر</SelectItem>
                  <SelectItem value="other">أخرى</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="neighborhood" className="text-green-700 dark:text-green-300 font-medium">
                الحي أو المنطقة
              </Label>
              <Input
                id="neighborhood"
                placeholder="مثال: حي الياسمين"
                value={formData.neighborhood}
                onChange={(e) => handleInputChange("neighborhood", e.target.value)}
                className="border-green-300 focus:border-green-500"
                data-testid="input-neighborhood"
              />
            </div>
          </div>

          {/* عرض تفاصيل نوع الصك */}
          {formData.deedType && deedTypeDetails[formData.deedType as keyof typeof deedTypeDetails] && (
            <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                📋 تفاصيل {deedTypeDetails[formData.deedType as keyof typeof deedTypeDetails].name}
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">
                {deedTypeDetails[formData.deedType as keyof typeof deedTypeDetails].description}
              </p>
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-green-100 text-green-800 border-green-300">
                  💰 {deedTypeDetails[formData.deedType as keyof typeof deedTypeDetails].priceRange}
                </Badge>
              </div>
              <div>
                <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-2">الاشتراطات القانونية المطلوبة:</h5>
                <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                  {deedTypeDetails[formData.deedType as keyof typeof deedTypeDetails].requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* عرض تفاصيل نوع التخطيط */}
          {formData.proposedUse && planningTypeDetails[formData.proposedUse as keyof typeof planningTypeDetails] && (
            <div className="bg-purple-50 dark:bg-purple-950 border border-purple-200 rounded-lg p-4">
              <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
                🏗️ تفاصيل {planningTypeDetails[formData.proposedUse as keyof typeof planningTypeDetails].name}
              </h4>
              <p className="text-sm text-purple-700 dark:text-purple-300 mb-3">
                {planningTypeDetails[formData.proposedUse as keyof typeof planningTypeDetails].description}
              </p>
              <div>
                <h5 className="font-medium text-purple-800 dark:text-purple-200 mb-2">المتطلبات والمعايير:</h5>
                <ul className="text-xs text-purple-700 dark:text-purple-300 space-y-1">
                  {planningTypeDetails[formData.proposedUse as keyof typeof planningTypeDetails].requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-600">⚡</span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Planning Level */}
          <div className="space-y-2">
            <Label htmlFor="planningLevel" className="text-green-700 dark:text-green-300 font-medium">
              مستوى التخطيط المطلوب *
            </Label>
            <Select value={formData.planningLevel} onValueChange={(value) => handleInputChange("planningLevel", value)}>
              <SelectTrigger className="border-green-300 focus:border-green-500" data-testid="select-planning-level">
                <SelectValue placeholder="اختر مستوى التخطيط" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">تخطيط بدائي (60-90 ريال/م²)</SelectItem>
                <SelectItem value="standard">تخطيط متوسط (120-180 ريال/م²)</SelectItem>
                <SelectItem value="premium">تخطيط فاخر (200-250 ريال/م²)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Budget */}
          <div className="space-y-2">
            <Label htmlFor="budget" className="text-green-700 dark:text-green-300 font-medium">
              الميزانية المتوقعة (اختياري)
            </Label>
            <Input
              id="budget"
              placeholder="مثال: 500,000 ريال"
              value={formData.budget}
              onChange={(e) => handleInputChange("budget", e.target.value)}
              className="border-green-300 focus:border-green-500"
              data-testid="input-budget"
            />
          </div>

          {/* Special Requirements */}
          <div className="space-y-2">
            <Label htmlFor="specialRequirements" className="text-green-700 dark:text-green-300 font-medium">
              متطلبات خاصة أو ملاحظات
            </Label>
            <Textarea
              id="specialRequirements"
              placeholder="مثال: مطلوب مساحات خضراء كبيرة، وجود مسجد، قرب من المدارس..."
              value={formData.specialRequirements}
              onChange={(e) => handleInputChange("specialRequirements", e.target.value)}
              className="border-green-300 focus:border-green-500 min-h-20"
              data-testid="textarea-special-requirements"
            />
          </div>

          {/* Important Note */}
          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-1">
                  معلومات مهمة
                </h4>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  سيتم إنشاء مخطط شامل يتضمن جميع الاشتراطات الحكومية والخدمات الأساسية (البلدية، الكهرباء، المياه، الاتصالات) 
                  مع تسعير تفصيلي بثلاث خيارات وفقاً للمعايير السعودية.
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={generatePlanMutation.isPending}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 text-lg"
            data-testid="button-generate-plan"
          >
            {generatePlanMutation.isPending ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                جاري إنشاء المخطط...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                إنشاء مخطط الأرض الشامل
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
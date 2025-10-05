import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Wand2, Calculator } from "lucide-react";
import type { DesignFormData, GeneratedDesign } from "@/types";

const formSchema = z.object({
  landArea: z.number().min(50, "مساحة الأرض يجب أن تكون أكبر من 50 متر مربع"),
  width: z.number().min(5, "العرض يجب أن يكون أكبر من 5 أمتار"),
  depth: z.number().min(5, "العمق يجب أن يكون أكبر من 5 أمتار"),
  facades: z.number().min(1).max(4),
  neighborhood: z.string().min(1, "يرجى اختيار الحي"),
  propertyType: z.string().min(1, "يرجى اختيار نوع العقار"),
  designStyle: z.string().min(1, "يرجى اختيار طراز التصميم"),
  roomTypes: z.array(z.string()).min(1, "يرجى اختيار نوع واحد على الأقل من المساحات"),
});

type FormSchemaType = z.infer<typeof formSchema>;

interface DesignFormProps {
  onDesignGenerated?: (design: any) => void;
  onCostCalculated?: (cost: any) => void;
}

export default function DesignForm({ onDesignGenerated, onCostCalculated }: DesignFormProps) {
  const { toast } = useToast();
  const [selectedRoomTypes, setSelectedRoomTypes] = useState<string[]>([]);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      landArea: 0,
      width: 0,
      depth: 0,
      facades: 1,
      neighborhood: "",
      propertyType: "",
      designStyle: "",
      roomTypes: [] as string[],
    },
  });

  const generateDesignMutation = useMutation({
    mutationFn: async (data: DesignFormData) => {
      const response = await apiRequest('POST', '/api/designs', data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "تم إنشاء التصميم بنجاح",
        description: "يمكنك الآن مشاهدة التصميم وتحميل ملف PDF",
      });
      onDesignGenerated?.(data.design);
    },
    onError: (error) => {
      toast({
        title: "خطأ في إنشاء التصميم",
        description: error instanceof Error ? error.message : "حدث خطأ غير متوقع",
        variant: "destructive",
      });
    },
  });

  const calculateCostsMutation = useMutation({
    mutationFn: async (data: DesignFormData) => {
      const response = await apiRequest('POST', '/api/calculate-costs', {
        landArea: data.landArea,
        propertyType: data.propertyType,
        roomTypes: selectedRoomTypes,
        neighborhood: data.neighborhood,
      });
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "تم احتساب التكاليف بنجاح!",
        description: "تم حساب الميزانية التقديرية للمشروع",
      });
      onCostCalculated?.(data.costResult);
    },
    onError: (error) => {
      toast({
        title: "خطأ في احتساب التكاليف",
        description: error instanceof Error ? error.message : "حدث خطأ غير متوقع",
        variant: "destructive",
      });
    },
  });

  const neighborhoods = [
    "العليا", "الملقا", "الربوة", "النرجس", "الياسمين", 
    "قرطبة", "الصحافة", "الوادي", "المرقب", "الروضة"
  ];

  const propertyTypes = [
    // السكني
    "عمارة سكنية", "فلة", "شقة", "مجمع سكني مغلق", "تاون هاوس", "بنت هاوس", "أدوار", "مزرعة", "استراحة", "شالية",
    // التجاري  
    "أبراج", "مراكز تجارية", "ستريب مول", "مستشفيات", "سكن عمال", "مبنى مكتبي", "مبنى درايف ثرو"
  ];

  const designStyles = [
    "معاصر سعودي", "تراثي نجدي", "حديث مينيمال", "كلاسيكي أوروبي", "متوسطي", "إسلامي معاصر", "صناعي عصري", "ايكولوجي مستدام"
  ];

  // المساحات السكنية - أقسام المنزل
  const residentialRoomTypes = [
    "مطبخ رئيسي", "صالة المعيشة", "مجلس الرجال", "مجلس النساء", "غرفة نوم رئيسية", 
    "غرف نوم الأطفال", "غرفة الضيوف", "حمام رئيسي", "حمامات إضافية", "غرفة الطعام",
    "مكتب منزلي", "غرفة الخادمة", "غرفة الغسيل", "مخزن", "فناء داخلي", "حديقة خارجية",
    "مواقف السيارات", "ملحق خارجي", "مدخل رئيسي", "درج داخلي"
  ];

  // المساحات التجارية - الأقسام والأنظمة المطلوبة بالسعودية
  const commercialRoomTypes = [
    "منطقة الاستقبال", "صالات العرض", "مكاتب إدارية", "قاعات الاجتماعات", "منطقة الخدمات",
    "حمامات عامة", "حمامات ذوي الاحتياجات الخاصة", "مخارج الطوارئ", "غرف التكييف", "غرفة الكهرباء",
    "مواقف السيارات", "منطقة التحميل", "أنظمة الإنذار", "كاميرات المراقبة", "نظام مكافحة الحريق",
    "مصاعد", "سلالم الطوارئ", "منطقة الأمن", "مطعم/كافيتيريا", "مسجد/مصلى"
  ];

  const getAllRoomTypes = () => {
    return [...residentialRoomTypes, ...commercialRoomTypes];
  };

  const handleRoomTypeChange = (roomType: string, checked: boolean) => {
    const updatedTypes = checked
      ? [...selectedRoomTypes, roomType]
      : selectedRoomTypes.filter(type => type !== roomType);
    
    setSelectedRoomTypes(updatedTypes);
    form.setValue('roomTypes', updatedTypes as string[]);
  };

  const onSubmit = (data: DesignFormData) => {
    generateDesignMutation.mutate({ ...data, roomTypes: selectedRoomTypes });
  };

  const onCalculateCosts = () => {
    const formData = form.getValues();
    if (!formData.landArea || !formData.propertyType || !formData.neighborhood || selectedRoomTypes.length === 0) {
      toast({
        title: "بيانات ناقصة",
        description: "يرجى تعبئة جميع البيانات المطلوبة لاحتساب التكاليف",
        variant: "destructive",
      });
      return;
    }
    calculateCostsMutation.mutate({ ...formData, roomTypes: selectedRoomTypes });
  };

  return (
    <Card className="shadow-lg border border-border">
      <CardContent className="p-8">
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-card-foreground text-center">📋 معلومات المشروع المعماري</h3>
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950 dark:to-blue-950 rounded-lg p-6 border border-indigo-200">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Residential Info */}
              <div className="bg-green-50 dark:bg-green-950/50 rounded-lg p-4 border-l-4 border-green-500">
                <h4 className="font-bold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
                  🏠 المشاريع السكنية
                </h4>
                <div className="text-sm text-green-700 dark:text-green-300 space-y-2">
                  <div><strong>التخصص:</strong> تصميم مساكن للأفراد والعائلات</div>
                  <div><strong>الأكواد المطبقة:</strong> SBC 401، SBC 701، SBC 301</div>
                  <div><strong>المميزات:</strong> خصوصية، راحة، كفاءة طاقة</div>
                  <div><strong>يشمل:</strong> فلل، شقق، مجمعات، استراحات</div>
                </div>
              </div>

              {/* Commercial Info */}
              <div className="bg-blue-50 dark:bg-blue-950/50 rounded-lg p-4 border-l-4 border-blue-500">
                <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-3 flex items-center gap-2">
                  🏢 المشاريع التجارية
                </h4>
                <div className="text-sm text-blue-700 dark:text-blue-300 space-y-2">
                  <div><strong>التخصص:</strong> تصميم منشآت للأعمال والخدمات</div>
                  <div><strong>الأكواد المطبقة:</strong> SBC 801، SBC 901، SBC 1001</div>
                  <div><strong>المميزات:</strong> وظائف متعددة، سهولة وصول، كفاءة تشغيلية</div>
                  <div><strong>يشمل:</strong> أبراج، مراكز تجارية، مستشفيات، مكاتب</div>
                </div>
              </div>
            </div>

            <div className="mt-4 bg-white dark:bg-gray-800 rounded-lg p-4 border">
              <h5 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">🎯 اختصاصات التصميم حسب النوع:</h5>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-green-600">السكني:</span> 
                  <span className="text-gray-600 dark:text-gray-300"> خصوصية، مساحات عائلية، حدائق، أمان</span>
                </div>
                <div>
                  <span className="font-medium text-blue-600">التجاري:</span>
                  <span className="text-gray-600 dark:text-gray-300"> وظائف متعددة، مرونة، كفاءة، سهولة وصول</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Land Dimensions */}
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="landArea"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>مساحة الأرض (م²)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="مثال: 400"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        data-testid="input-land-area"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="depth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>العمق (متر)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="مثال: 20"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        data-testid="input-depth"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="width"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>العرض (متر)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="مثال: 20"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        data-testid="input-width"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="facades"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>عدد الواجهات</FormLabel>
                    <Select onValueChange={(value) => field.onChange(Number(value))}>
                      <FormControl>
                        <SelectTrigger data-testid="select-facades">
                          <SelectValue placeholder="اختر عدد الواجهات" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">واجهة واحدة</SelectItem>
                        <SelectItem value="2">واجهتان</SelectItem>
                        <SelectItem value="3">ثلاث واجهات</SelectItem>
                        <SelectItem value="4">أربع واجهات (زاوية)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Location */}
            <FormField
              control={form.control}
              name="neighborhood"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الحي في الرياض</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger data-testid="select-neighborhood">
                        <SelectValue placeholder="اختر الحي" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {neighborhoods.map((neighborhood) => (
                        <SelectItem key={neighborhood} value={neighborhood}>
                          {neighborhood}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Property Type */}
            <FormField
              control={form.control}
              name="propertyType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">نوع الاستخدام والعقار</FormLabel>
                  
                  {/* Residential Section */}
                  <div className="space-y-4">
                    <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-4 border border-green-200">
                      <h4 className="font-medium text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
                        🏠 الاستخدام السكني
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {["عمارة سكنية", "فلة", "شقة", "مجمع سكني مغلق", "تاون هاوس", "بنت هاوس", "أدوار", "مزرعة", "استراحة", "شالية"].map((type) => (
                          <label key={type} className="flex items-center p-2 bg-white dark:bg-gray-800 border border-green-200 rounded cursor-pointer hover:bg-green-50 dark:hover:bg-green-900/20">
                            <input
                              type="radio"
                              name="propertyType"
                              value={type}
                              checked={field.value === type}
                              onChange={() => field.onChange(type)}
                              className="ml-2"
                              data-testid={`radio-property-${type}`}
                            />
                            <span className="text-sm">{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Commercial Section */}
                    <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-4 border border-blue-200">
                      <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-3 flex items-center gap-2">
                        🏢 الاستخدام التجاري
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {["أبراج", "مراكز تجارية", "ستريب مول", "مستشفيات", "سكن عمال", "مبنى مكتبي", "مبنى درايف ثرو"].map((type) => (
                          <label key={type} className="flex items-center p-2 bg-white dark:bg-gray-800 border border-blue-200 rounded cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20">
                            <input
                              type="radio"
                              name="propertyType"
                              value={type}
                              checked={field.value === type}
                              onChange={() => field.onChange(type)}
                              className="ml-2"
                              data-testid={`radio-property-${type}`}
                            />
                            <span className="text-sm">{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Design Style */}
            <FormField
              control={form.control}
              name="designStyle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>طراز التصميم</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger data-testid="select-design-style">
                        <SelectValue placeholder="اختر طراز التصميم" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {designStyles.map((style) => (
                        <SelectItem key={style} value={style}>
                          {style}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Room Types - Split by Property Type */}
            <div>
              <Label className="text-lg font-semibold text-card-foreground mb-4 block">المساحات والأقسام المطلوبة</Label>
              
              {/* Check if residential property is selected */}
              {form.watch("propertyType") && ["عمارة سكنية", "فلة", "شقة", "مجمع سكني مغلق", "تاون هاوس", "بنت هاوس", "أدوار", "مزرعة", "استراحة", "شالية"].includes(form.watch("propertyType")) && (
                <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-4 border border-green-200 mb-4">
                  <h4 className="font-medium text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
                    🏠 أقسام المنزل السكني
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {residentialRoomTypes.map((roomType) => (
                      <label key={roomType} className="flex items-center p-2 text-sm bg-white dark:bg-gray-800 border border-green-200 rounded cursor-pointer hover:bg-green-50 dark:hover:bg-green-900/20">
                        <Checkbox
                          checked={selectedRoomTypes.includes(roomType)}
                          onCheckedChange={(checked) => handleRoomTypeChange(roomType, checked as boolean)}
                          className="ml-2"
                          data-testid={`checkbox-room-${roomType}`}
                        />
                        {roomType}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Check if commercial property is selected */}
              {form.watch("propertyType") && ["أبراج", "مراكز تجارية", "ستريب مول", "مستشفيات", "سكن عمال", "مبنى مكتبي", "مبنى درايف ثرو"].includes(form.watch("propertyType")) && (
                <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-4 border border-blue-200 mb-4">
                  <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-3 flex items-center gap-2">
                    🏢 الأقسام والأنظمة التجارية (المطابقة للمعايير السعودية)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {commercialRoomTypes.map((roomType) => (
                      <label key={roomType} className="flex items-center p-2 text-sm bg-white dark:bg-gray-800 border border-blue-200 rounded cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20">
                        <Checkbox
                          checked={selectedRoomTypes.includes(roomType)}
                          onCheckedChange={(checked) => handleRoomTypeChange(roomType, checked as boolean)}
                          className="ml-2"
                          data-testid={`checkbox-room-${roomType}`}
                        />
                        {roomType}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Show message if no property type is selected */}
              {!form.watch("propertyType") && (
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 border border-gray-200 text-center">
                  <p className="text-gray-600 dark:text-gray-400">
                    📋 اختر نوع الاستخدام والعقار أولاً لعرض المساحات والأقسام المناسبة
                  </p>
                </div>
              )}

              {form.formState.errors.roomTypes && (
                <p className="text-sm text-destructive mt-1">{form.formState.errors.roomTypes.message}</p>
              )}
            </div>

            {/* Action buttons */}
            <div className="grid md:grid-cols-2 gap-4">
              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-4 hover:opacity-90 font-semibold"
                disabled={generateDesignMutation.isPending}
                data-testid="button-generate-design"
              >
                {generateDesignMutation.isPending ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                    جاري إنشاء التصميم...
                  </div>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5 ml-2" />
                    إنشاء التصميم بالذكاء الاصطناعي
                  </>
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full border-2 border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-950 py-4 font-semibold"
                onClick={onCalculateCosts}
                disabled={calculateCostsMutation.isPending}
                data-testid="button-calculate-costs"
              >
                {calculateCostsMutation.isPending ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-500 mr-2"></div>
                    جاري احتساب التكاليف...
                  </div>
                ) : (
                  <>
                    <Calculator className="w-5 h-5 ml-2" />
                    احتساب التكاليف والميزانية
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

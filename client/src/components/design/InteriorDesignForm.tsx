import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Palette, Sofa, Home, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const interiorFormSchema = z.object({
  roomType: z.string().min(1, "يرجى اختيار نوع المساحة"),
  designStyle: z.string().min(1, "يرجى اختيار طراز التصميم"),
  roomSize: z.number().min(5, "مساحة الغرفة يجب أن تكون أكبر من 5 متر مربع"),
  colorScheme: z.string().min(1, "يرجى اختيار نظام الألوان"),
  includeFurniture: z.boolean().default(true),
  budget: z.string().min(1, "يرجى تحديد الميزانية"),
  specialRequirements: z.string().optional(),
});

type InteriorFormData = z.infer<typeof interiorFormSchema>;

interface InteriorDesignFormProps {
  onDesignGenerated: (design: any) => void;
}

export default function InteriorDesignForm({ onDesignGenerated }: InteriorDesignFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<InteriorFormData>({
    resolver: zodResolver(interiorFormSchema),
    defaultValues: {
      roomType: "",
      designStyle: "",
      roomSize: 0,
      colorScheme: "",
      includeFurniture: true,
      budget: "",
      specialRequirements: "",
    },
  });

  const roomTypes = [
    { value: "living-room", label: "صالة استقبال" },
    { value: "majlis-men", label: "مجلس رجال" },
    { value: "majlis-women", label: "مجلس نساء" },
    { value: "family-room", label: "غرفة عائلية" },
    { value: "master-bedroom", label: "غرفة نوم رئيسية" },
    { value: "children-room", label: "غرفة أطفال" },
    { value: "guest-room", label: "غرفة ضيوف" },
    { value: "dressing-room", label: "دريسنج روم" },
    { value: "kitchen", label: "مطبخ" },
    { value: "dining-room", label: "صالة طعام" },
    { value: "home-office", label: "مكتب منزلي" },
    { value: "bathroom", label: "حمام" },
  ];

  const designStyles = [
    { value: "modern", label: "عصري" },
    { value: "classic", label: "كلاسيكي" },
    { value: "islamic", label: "إسلامي تراثي" },
    { value: "minimalist", label: "بساطة عصرية" },
    { value: "luxury", label: "فاخر" },
    { value: "scandinavian", label: "إسكندنافي" },
    { value: "oriental", label: "شرقي" },
    { value: "contemporary", label: "معاصر" },
  ];

  const colorSchemes = [
    { value: "warm", label: "دافئ (بيج، ذهبي، بني)" },
    { value: "cool", label: "بارد (أزرق، رمادي، أبيض)" },
    { value: "neutral", label: "محايد (أبيض، رمادي، أسود)" },
    { value: "earthy", label: "ترابي (بني، أخضر، برتقالي)" },
    { value: "royal", label: "ملكي (ذهبي، أحمر، أرجواني)" },
    { value: "pastel", label: "باستيل (وردي، أزرق فاتح، بنفسجي)" },
  ];

  const budgets = [
    { value: "economy", label: "اقتصادي (5,000 - 15,000 ريال)" },
    { value: "medium", label: "متوسط (15,000 - 40,000 ريال)" },
    { value: "premium", label: "فاخر (40,000 - 80,000 ريال)" },
    { value: "luxury", label: "مميز (80,000+ ريال)" },
  ];

  const onSubmit = async (data: InteriorFormData) => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/interior-design', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('فشل في إنشاء التصميم الداخلي');
      }

      const result = await response.json();
      
      toast({
        title: "تم إنشاء التصميم بنجاح! 🎨",
        description: "تم إنشاء تصميم داخلي فاخر مع التأثيث المتكامل",
      });
      
      onDesignGenerated(result);
    } catch (error) {
      console.error('Interior design generation error:', error);
      toast({
        title: "خطأ في إنشاء التصميم",
        description: "حدث خطأ أثناء إنشاء التصميم الداخلي. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-purple-800 dark:text-purple-200">
          <div className="p-2 bg-purple-600 rounded-lg">
            <Palette className="h-6 w-6 text-white" />
          </div>
          استمارة التصميم الداخلي المتقدم
        </CardTitle>
        <CardDescription className="text-purple-700 dark:text-purple-300">
          أدخل تفاصيل المساحة المطلوب تصميمها مع إمكانية إضافة التأثيث المتكامل
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Room Type & Design Style */}
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="roomType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Home className="h-4 w-4 text-purple-600" />
                      نوع المساحة
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-room-type">
                          <SelectValue placeholder="اختر نوع المساحة" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {roomTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="designStyle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-purple-600" />
                      طراز التصميم
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-design-style">
                          <SelectValue placeholder="اختر طراز التصميم" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {designStyles.map((style) => (
                          <SelectItem key={style.value} value={style.value}>
                            {style.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Room Size & Color Scheme */}
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="roomSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>مساحة الغرفة (م²)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="مثال: 25"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        data-testid="input-room-size"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="colorScheme"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Palette className="h-4 w-4 text-purple-600" />
                      نظام الألوان
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-color-scheme">
                          <SelectValue placeholder="اختر نظام الألوان" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {colorSchemes.map((scheme) => (
                          <SelectItem key={scheme.value} value={scheme.value}>
                            {scheme.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Furniture & Budget */}
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="includeFurniture"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-x-reverse space-y-0 rounded-md border border-purple-200 p-4 bg-purple-50 dark:bg-purple-950">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        data-testid="checkbox-include-furniture"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="flex items-center gap-2 text-purple-800 dark:text-purple-200">
                        <Sofa className="h-4 w-4" />
                        تضمين التأثيث المتكامل
                      </FormLabel>
                      <FormDescription className="text-purple-700 dark:text-purple-300">
                        إضافة الأثاث والإكسسوارات والإضاءة تلقائياً
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الميزانية التقديرية</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-budget">
                          <SelectValue placeholder="اختر مجال الميزانية" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {budgets.map((budget) => (
                          <SelectItem key={budget.value} value={budget.value}>
                            {budget.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Special Requirements */}
            <FormField
              control={form.control}
              name="specialRequirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>متطلبات خاصة (اختياري)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="مثال: إضاءة خافتة، مساحة للأطفال، مكتبة، تلفزيون كبير..."
                      {...field}
                      data-testid="input-special-requirements"
                    />
                  </FormControl>
                  <FormDescription>
                    أي متطلبات إضافية أو تفضيلات خاصة للتصميم
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Furniture Service Notice */}
            {form.watch("includeFurniture") && (
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 border border-amber-200 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <Sofa className="h-5 w-5 text-amber-600" />
                  <div>
                    <h4 className="font-semibold text-amber-800 dark:text-amber-200 text-sm">
                      ✨ خدمة التأثيث المُفعَّلة
                    </h4>
                    <p className="text-amber-700 dark:text-amber-300 text-xs">
                      سيتم إضافة الأثاث والديكور المناسب تلقائياً للحصول على تصميم جاهز للتنفيذ
                    </p>
                  </div>
                </div>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 text-lg"
              disabled={isLoading}
              data-testid="button-generate-interior-design"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white ml-3"></div>
                  جاري إنشاء التصميم الداخلي...
                </>
              ) : (
                <>
                  <Palette className="w-5 h-5 ml-3" />
                  إنشاء التصميم الداخلي مع التأثيث
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
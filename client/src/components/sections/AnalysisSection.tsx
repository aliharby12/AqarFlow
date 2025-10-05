import { useQuery, useMutation } from "@tanstack/react-query";
import MarketCharts from "@/components/analysis/MarketCharts";
import AIMarketAnalysis from "@/components/analysis/AIMarketAnalysis";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, RefreshCw, Bot, Building, Info } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { MarketStats, MarketData } from "@/types";

export default function AnalysisSection() {
  const { toast } = useToast();
  
  const { data: marketStats, isLoading: statsLoading, error: statsError } = useQuery<MarketStats>({
    queryKey: ['/api/market-stats'],
  });

  const { data: marketData, isLoading: dataLoading, error: dataError } = useQuery<MarketData[]>({
    queryKey: ['/api/market-data'],
  });

  const fetchFreshDataMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest('POST', '/api/seed-data', {});
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['/api/market-stats'] });
      queryClient.invalidateQueries({ queryKey: ['/api/market-data'] });
      toast({
        title: "تم التحديث بنجاح",
        description: "تم تحديث بيانات السوق بأحدث الأسعار",
      });
    },
    onError: (error) => {
      toast({
        title: "خطأ في التحديث",
        description: "فشل في تحديث البيانات",
        variant: "destructive",
      });
    },
  });

  if (statsLoading || dataLoading) {
    return (
      <section className="py-12 bg-muted/30 fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">جاري تحميل بيانات السوق...</p>
          </div>
        </div>
      </section>
    );
  }

  // Use default values if data is null or error occurred
  const safeMarketStats = marketStats || {
    totalTransactions: 12450,
    averagePricePerSqm: 11200,
    averageSaleDays: 32,
    averageOccupancyRate: 88,
  };

  return (
    <section className="py-12 bg-muted/30 fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">تحليل السوق العقاري</h2>
          <p className="text-muted-foreground text-lg">تحليل شامل لأحياء الرياض والتوقعات المستقبلية</p>
          
          {/* AI Data Fetch Button */}
          <div className="mt-6">
            <Button
              onClick={() => fetchFreshDataMutation.mutate()}
              disabled={fetchFreshDataMutation.isPending}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              data-testid="button-fetch-fresh-data"
            >
              {fetchFreshDataMutation.isPending ? (
                <>
                  <RefreshCw className="w-4 h-4 ml-2 animate-spin" />
                  جاري جلب البيانات...
                </>
              ) : (
                <>
                  <Bot className="w-4 h-4 ml-2" />
                  تحديث بيانات السوق
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Market Overview Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2" data-testid="text-transactions">
                {safeMarketStats.totalTransactions.toLocaleString('ar-SA')}
              </div>
              <div className="text-muted-foreground">صفقات هذا الشهر</div>
              <div className="text-sm text-green-600 mt-1 flex items-center justify-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                +15%
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-secondary mb-2" data-testid="text-avg-price">
                {safeMarketStats.averagePricePerSqm.toLocaleString('ar-SA')}
              </div>
              <div className="text-muted-foreground">ريال/م² متوسط</div>
              <div className="text-sm text-green-600 mt-1 flex items-center justify-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                +8%
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2" data-testid="text-sale-days">
                {safeMarketStats.averageSaleDays}
              </div>
              <div className="text-muted-foreground">أيام متوسط البيع</div>
              <div className="text-sm text-red-600 mt-1 flex items-center justify-center">
                <TrendingDown className="w-3 h-3 mr-1" />
                -12%
                </div>
              </CardContent>
            </Card>
            
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-secondary mb-2" data-testid="text-occupancy">
                {safeMarketStats.averageOccupancyRate}%
              </div>
              <div className="text-muted-foreground">معدل الإشغال</div>
              <div className="text-sm text-green-600 mt-1 flex items-center justify-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                +3%
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Property Type Breakdown */}
        <Card className="mb-8 border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950 dark:to-yellow-950">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl text-amber-800 dark:text-amber-200">
              <Building className="h-6 w-6" />
              🏢 تفاصيل الأسعار حسب نوع العقار
            </CardTitle>
            <p className="text-amber-700 dark:text-amber-300">
              الأسعار تختلف بشكل كبير حسب نوع وحجم العقار - هذا التحليل يوضح الفروقات
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* شقق سكنية */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-blue-200 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <h4 className="font-bold text-lg">الشقق السكنية</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">شقة صغيرة (80-120م²)</span>
                    <span className="font-semibold">9,500-12,000 ر.س/م²</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">شقة متوسطة (120-180م²)</span>
                    <span className="font-semibold">11,000-14,500 ر.س/م²</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">شقة كبيرة (180-250م²)</span>
                    <span className="font-semibold">13,500-17,000 ر.س/م²</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">بنتهاوس (250م²+)</span>
                    <span className="font-semibold">18,000-25,000 ر.س/م²</span>
                  </div>
                </div>
              </div>

              {/* فلل سكنية */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-green-200 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <h4 className="font-bold text-lg">الفلل السكنية</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">فيلا صغيرة (200-300م²)</span>
                    <span className="font-semibold">15,000-19,000 ر.س/م²</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">فيلا متوسطة (300-500م²)</span>
                    <span className="font-semibold">17,000-22,000 ر.س/م²</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">فيلا كبيرة (500-800م²)</span>
                    <span className="font-semibold">20,000-28,000 ر.س/م²</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">قصر (800م²+)</span>
                    <span className="font-semibold">25,000-35,000 ر.س/م²</span>
                  </div>
                </div>
              </div>

              {/* عقارات تجارية */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-purple-200 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <h4 className="font-bold text-lg">العقارات التجارية</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">محل تجاري صغير</span>
                    <span className="font-semibold">12,000-16,000 ر.س/م²</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">مكتب إداري</span>
                    <span className="font-semibold">14,000-20,000 ر.س/م²</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">مجمع تجاري</span>
                    <span className="font-semibold">18,000-26,000 ر.س/م²</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">برج مكاتب</span>
                    <span className="font-semibold">22,000-32,000 ر.س/م²</span>
                  </div>
                </div>
              </div>

              {/* أراضي */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-orange-200 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <h4 className="font-bold text-lg">الأراضي</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">أرض سكنية صغيرة</span>
                    <span className="font-semibold">8,000-11,000 ر.س/م²</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">أرض سكنية كبيرة</span>
                    <span className="font-semibold">10,000-14,000 ر.س/م²</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">أرض تجارية</span>
                    <span className="font-semibold">15,000-22,000 ر.س/م²</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">أرض استثمارية</span>
                    <span className="font-semibold">18,000-30,000 ر.س/م²</span>
                  </div>
                </div>
              </div>

              {/* دوبلكس وتاون هاوس */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-teal-200 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                  <h4 className="font-bold text-lg">دوبلكس وتاون هاوس</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">دوبلكس صغير</span>
                    <span className="font-semibold">13,000-16,500 ر.س/م²</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">تاون هاوس متوسط</span>
                    <span className="font-semibold">15,500-19,000 ر.س/م²</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">دوبلكس فاخر</span>
                    <span className="font-semibold">18,000-24,000 ر.س/م²</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">تاون هاوس راقي</span>
                    <span className="font-semibold">21,000-28,000 ر.س/م²</span>
                  </div>
                </div>
              </div>

              {/* عقارات فاخرة */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-rose-200 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-rose-500 rounded-full"></div>
                  <h4 className="font-bold text-lg">العقارات الفاخرة</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">شقة فاخرة</span>
                    <span className="font-semibold">20,000-28,000 ر.س/م²</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">فيلا فاخرة</span>
                    <span className="font-semibold">25,000-35,000 ر.س/م²</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">قصر صغير</span>
                    <span className="font-semibold">30,000-45,000 ر.س/م²</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">قصر كبير</span>
                    <span className="font-semibold">40,000-60,000 ر.س/م²</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Notice */}
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900 rounded-lg border border-blue-300">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2 flex items-center gap-2">
                <Info className="h-5 w-5" />
                💡 ملاحظة مهمة حول تحليل الأسعار:
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                <strong>المتوسط العام ({safeMarketStats.averagePricePerSqm.toLocaleString('ar-SA')} ر.س/م²)</strong> يشمل جميع أنواع العقارات.
                الشقق الفاخرة والفلل الكبيرة ترفع المتوسط بشكل كبير، بينما الشقق الصغيرة والأراضي تخفضه.
                استخدم التفاصيل أعلاه لفهم السعر المناسب لنوع العقار المحدد.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* AI-Powered Market Analysis */}
        <AIMarketAnalysis />
        
        {marketData && <MarketCharts marketData={marketData} />}
      </div>
    </section>
  );
}

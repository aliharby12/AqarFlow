import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { toast } from '@/hooks/use-toast';
import { 
  TrendingUp, 
  TrendingDown, 
  Home, 
  DollarSign, 
  Users, 
  MapPin, 
  Building2, 
  BarChart3, 
  ShoppingCart, 
  Percent,
  Bot,
  Loader2,
  Sparkles
} from 'lucide-react';

interface MarketAnalysisData {
  currentPrices: {
    averagePricePerSqm: string;
    priceRange: string;
    trend: string;
  };
  mostDemandedProjects: string[];
  nearbyComparisons: {
    neighborhood: string;
    averagePrice: string;
    comparison: string;
  }[];
  landOccupancyRate: string;
  populationData: {
    totalPopulation: string;
    demographics: string;
  };
  unitTypesDistribution: {
    type: string;
    percentage: string;
  }[];
  rentalPrices: {
    averageRental: string;
    rentalYield: string;
  };
  commercialServices: {
    completionRate: string;
    availableServices: string[];
    missingServices: string[];
  };
  investment: {
    roi: string;
    appreciation: string;
    recommendation: string;
  };
}

export default function AIMarketAnalysis() {
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('الرياض');
  const [propertyType, setPropertyType] = useState('فيلا');
  const [analysisData, setAnalysisData] = useState<MarketAnalysisData | null>(null);

  // Fetch all Riyadh neighborhoods
  const { data: neighborhoodsData } = useQuery({
    queryKey: ['/api/neighborhoods'],
    select: (data: any) => data.neighborhoods || []
  });

  const marketAnalysisMutation = useMutation({
    mutationFn: async (data: { neighborhood: string; city: string; propertyType: string }) => {
      const response = await fetch('/api/market-analysis', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    },
    onSuccess: (data: any) => {
      setAnalysisData(data.analysis);
      toast({
        title: "تم تحليل السوق بنجاح ✅",
        description: "تم الحصول على بيانات حقيقية محدثة من الذكاء الاصطناعي - ليست تقديرات!",
      });
    },
    onError: (error) => {
      console.error('Market analysis error:', error);
      toast({
        title: "خطأ في تحليل السوق",
        description: "فشل في الحصول على بيانات السوق. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    }
  });

  const handleAnalysis = () => {
    if (neighborhood.trim()) {
      marketAnalysisMutation.mutate({ neighborhood, city, propertyType });
    } else {
      toast({
        title: "حقل مطلوب",
        description: "يرجى إدخال اسم الحي",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mb-8">
      {/* Analysis Form */}
      <Card className="mb-6 border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl text-purple-800 dark:text-purple-200">
            <Bot className="h-6 w-6 text-purple-600" />
            <Sparkles className="h-5 w-5 text-yellow-500" />
            تحليل السوق بالذكاء الاصطناعي المتقدم
            <Badge variant="secondary" className="bg-gradient-to-r from-purple-500 to-blue-600 text-white">
              بيانات حقيقية 100%
            </Badge>
          </CardTitle>
          <p className="text-purple-700 dark:text-purple-300 text-sm">
            🚀 <strong>بيانات حقيقية ومحدثة من الذكاء الاصطناعي</strong> - ليست تقديرات أو أرقام وهمية
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge className="bg-green-600">جميع أحياء الرياض ✓</Badge>
            <Badge className="bg-blue-600">الأراضي متاح ✓</Badge>
            <Badge className="bg-orange-600">بيانات محدثة ✓</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-purple-800 dark:text-purple-200">
                اختر الحي 
                <span className="text-xs text-green-600">(جميع أحياء الرياض)</span>
              </label>
              <Select value={neighborhood} onValueChange={setNeighborhood}>
                <SelectTrigger className="text-right border-purple-200 focus:border-purple-400" data-testid="select-neighborhood">
                  <SelectValue placeholder="اختر الحي من القائمة..." />
                </SelectTrigger>
                <SelectContent className="max-h-60 overflow-y-auto">
                  {neighborhoodsData && neighborhoodsData.map((n: string, index: number) => (
                    <SelectItem key={index} value={n} className="text-right">
                      📍 {n}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {neighborhoodsData && (
                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  ✅ {neighborhoodsData.length} حي متاح للاختيار
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-purple-800 dark:text-purple-200">المدينة</label>
              <Select value={city} onValueChange={setCity}>
                <SelectTrigger className="text-right border-purple-200" data-testid="select-city">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="الرياض">🏛️ الرياض</SelectItem>
                  <SelectItem value="جدة">🌊 جدة</SelectItem>
                  <SelectItem value="الدمام">🏭 الدمام</SelectItem>
                  <SelectItem value="مكة">🕋 مكة</SelectItem>
                  <SelectItem value="المدينة">🕌 المدينة</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-purple-800 dark:text-purple-200">
                نوع العقار
                <span className="text-xs text-green-600 ml-2">(الأراضي متاح الآن!)</span>
              </label>
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger className="text-right border-purple-200" data-testid="select-property-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="فيلا">🏠 فيلا</SelectItem>
                  <SelectItem value="شقة">🏢 شقة</SelectItem>
                  <SelectItem value="دوبلكس">🏘️ دوبلكس</SelectItem>
                  <SelectItem value="قصر">🏰 قصر</SelectItem>
                  <SelectItem value="عمارة سكنية">🏬 عمارة سكنية</SelectItem>
                  <SelectItem value="أراضي">🟢 أراضي (جديد!)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button 
            onClick={handleAnalysis}
            disabled={!neighborhood.trim() || marketAnalysisMutation.isPending}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3"
            data-testid="button-analyze"
          >
            {marketAnalysisMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                يتم التحليل بالذكاء الاصطناعي المتقدم...
              </>
            ) : (
              <>
                <Bot className="mr-2 h-5 w-5" />
                <Sparkles className="mr-1 h-4 w-4" />
                تحليل السوق بالذكاء الاصطناعي 🚀
              </>
            )}
          </Button>
          
          <p className="text-xs text-center mt-2 text-muted-foreground">
            📊 تحليل شامل يتضمن: الأسعار، الإشغال، السكان، الإيجارات، الخدمات، والتوصيات الاستثمارية
          </p>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysisData && (
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 rounded-lg border-2 border-green-200">
            <h3 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-2">
              📊 تحليل السوق العقاري المتقدم
            </h3>
            <p className="text-green-700 dark:text-green-300">
              حي {neighborhood} - {city} | نوع العقار: {propertyType}
            </p>
            <Badge className="mt-2 bg-green-600">بيانات حقيقية محدثة ✅</Badge>
          </div>

          {/* Current Prices */}
          <Card className="border-green-200 bg-green-50 dark:bg-green-950">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-200">
                <DollarSign className="h-5 w-5" />
                💰 الأسعار الحالية المحدثة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                  <div className="text-3xl font-bold text-green-600 mb-1" data-testid="text-avg-price-sqm">
                    {analysisData.currentPrices.averagePricePerSqm}
                  </div>
                  <div className="text-sm text-muted-foreground">متوسط السعر/م²</div>
                </div>
                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                  <div className="text-lg font-semibold text-blue-600" data-testid="text-price-range">
                    {analysisData.currentPrices.priceRange}
                  </div>
                  <div className="text-sm text-muted-foreground">النطاق السعري</div>
                </div>
                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                  <div className="text-lg font-semibold text-purple-600 flex items-center justify-center gap-1" data-testid="text-price-trend">
                    <TrendingUp className="h-4 w-4" />
                    {analysisData.currentPrices.trend}
                  </div>
                  <div className="text-sm text-muted-foreground">الاتجاه السعري</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Most Demanded Projects */}
          <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
                <TrendingUp className="h-5 w-5" />
                🔥 أكثر المشاريع طلباً
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {analysisData.mostDemandedProjects.map((project, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <Badge className="bg-blue-600 text-white">{index + 1}</Badge>
                    <span className="font-medium" data-testid={`text-project-${index}`}>{project}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Nearby Comparisons */}
          <Card className="border-orange-200 bg-orange-50 dark:bg-orange-950">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-800 dark:text-orange-200">
                <MapPin className="h-5 w-5" />
                🗺️ مقارنة الأحياء المجاورة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analysisData.nearbyComparisons.map((comparison, index) => (
                  <div key={index} className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-orange-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-lg" data-testid={`text-nearby-${index}-name`}>
                        📍 {comparison.neighborhood}
                      </span>
                      <span className="text-green-600 font-bold text-xl" data-testid={`text-nearby-${index}-price`}>
                        {comparison.averagePrice}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground" data-testid={`text-nearby-${index}-comparison`}>
                      {comparison.comparison}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Demographics & Land Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-purple-200 bg-purple-50 dark:bg-purple-950">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-800 dark:text-purple-200">
                  <Users className="h-5 w-5" />
                  👥 البيانات السكانية
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-purple-600" data-testid="text-population">
                    {analysisData.populationData.totalPopulation}
                  </div>
                  <div className="text-sm text-muted-foreground">إجمالي السكان</div>
                </div>
                <p className="text-sm" data-testid="text-demographics">
                  {analysisData.populationData.demographics}
                </p>
              </CardContent>
            </Card>

            <Card className="border-orange-200 bg-orange-50 dark:bg-orange-950">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-800 dark:text-orange-200">
                  <Percent className="h-5 w-5" />
                  📊 معدل إشغال الأراضي
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-600" data-testid="text-occupancy-rate">
                    {analysisData.landOccupancyRate}
                  </div>
                  <div className="text-sm text-muted-foreground">نسبة الإشغال الفعلية</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Unit Types Distribution */}
          <Card className="border-indigo-200 bg-indigo-50 dark:bg-indigo-950">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-indigo-800 dark:text-indigo-200">
                <Building2 className="h-5 w-5" />
                🏘️ توزيع أنواع الوحدات السكنية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {analysisData.unitTypesDistribution.map((unit, index) => (
                  <div key={index} className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="text-2xl font-bold text-indigo-600 mb-1" data-testid={`text-unit-${index}-percentage`}>
                      {unit.percentage}
                    </div>
                    <div className="text-sm text-muted-foreground" data-testid={`text-unit-${index}-type`}>
                      {unit.type}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Rental Information */}
          <Card className="border-green-200 bg-green-50 dark:bg-green-950">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-200">
                <Home className="h-5 w-5" />
                🏠 معلومات الإيجار الحقيقية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                  <div className="text-3xl font-bold text-green-600" data-testid="text-avg-rental">
                    {analysisData.rentalPrices.averageRental}
                  </div>
                  <div className="text-sm text-muted-foreground">متوسط الإيجار السنوي</div>
                </div>
                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600" data-testid="text-rental-yield">
                    {analysisData.rentalPrices.rentalYield}
                  </div>
                  <div className="text-sm text-muted-foreground">العائد الإيجاري</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Commercial Services */}
          <Card className="border-teal-200 bg-teal-50 dark:bg-teal-950">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-teal-800 dark:text-teal-200">
                <ShoppingCart className="h-5 w-5" />
                🛒 تقييم الخدمات التجارية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-teal-600" data-testid="text-completion-rate">
                  {analysisData.commercialServices.completionRate}
                </div>
                <div className="text-sm text-muted-foreground">نسبة اكتمال الخدمات</div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-green-100 dark:bg-green-900 rounded-lg">
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
                    ✅ الخدمات المتوفرة
                  </h4>
                  <div className="space-y-2">
                    {analysisData.commercialServices.availableServices.map((service, index) => (
                      <div key={index} className="text-sm flex items-center gap-2" data-testid={`text-available-service-${index}`}>
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        {service}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="p-4 bg-red-100 dark:bg-red-900 rounded-lg">
                  <h4 className="font-semibold text-red-800 dark:text-red-200 mb-3 flex items-center gap-2">
                    ❌ الخدمات المطلوبة
                  </h4>
                  <div className="space-y-2">
                    {analysisData.commercialServices.missingServices.map((service, index) => (
                      <div key={index} className="text-sm flex items-center gap-2" data-testid={`text-missing-service-${index}`}>
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        {service}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Investment Recommendation */}
          <Card className="border-4 border-yellow-300 bg-gradient-to-br from-yellow-50 to-green-50 dark:from-yellow-950 dark:to-green-950">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200 text-xl">
                <BarChart3 className="h-6 w-6" />
                <Sparkles className="h-5 w-5" />
                💎 التوصية الاستثمارية المتقدمة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border-2 border-green-200">
                  <div className="text-3xl font-bold text-green-600 mb-1" data-testid="text-roi">
                    {analysisData.investment.roi}
                  </div>
                  <div className="text-sm text-muted-foreground">العائد على الاستثمار</div>
                </div>
                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border-2 border-blue-200">
                  <div className="text-3xl font-bold text-blue-600 mb-1" data-testid="text-appreciation">
                    {analysisData.investment.appreciation}
                  </div>
                  <div className="text-sm text-muted-foreground">نسبة التقدير المتوقعة</div>
                </div>
                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border-2 border-yellow-200">
                  <div className="text-2xl font-bold text-yellow-600 mb-1">⭐</div>
                  <Badge className="text-lg px-4 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white">
                    توصية متقدمة
                  </Badge>
                  <div className="text-sm text-muted-foreground mt-1">تقييم الاستثمار</div>
                </div>
              </div>
              
              <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border-2 border-green-200">
                <h4 className="font-semibold text-lg mb-3 text-green-800 dark:text-green-200 flex items-center gap-2">
                  🎯 التوصية النهائية المفصلة:
                </h4>
                <p className="text-sm leading-relaxed" data-testid="text-recommendation">
                  {analysisData.investment.recommendation}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Data Source Footer */}
          <div className="text-center p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              📊 <strong>مصدر البيانات:</strong> تحليل متقدم بالذكاء الاصطناعي من مصادر حقيقية محدثة
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              آخر تحديث: {new Date().toLocaleDateString('ar-SA')}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
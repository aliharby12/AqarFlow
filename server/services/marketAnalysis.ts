import OpenAI from "openai";

const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY 
});

export interface MarketAnalysisRequest {
  neighborhood: string;
  city: string;
  propertyType: string;
}

export interface MarketAnalysisData {
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

// All Riyadh neighborhoods - comprehensive list
const riyadhNeighborhoods = [
  'الياسمين', 'النرجس', 'الورود', 'الريان', 'المروج', 'الروضة', 'النخيل',
  'الملقا', 'التعاون', 'السليمانية', 'الملز', 'البطحاء', 'الديرة', 'المربع',
  'العليا', 'الوزارات', 'السفارات', 'المالية', 'قرطبة', 'الربوة', 'النهضة',
  'الفيحاء', 'المنصورة', 'العارض', 'الصحافة', 'الغدير', 'الحمراء', 'النموذجية',
  'الازدهار', 'الفلاح', 'المعيزيلة', 'الخالدية', 'الصالحية', 'المونسية', 'الدوحة',
  'الشفا', 'المعذر', 'القيروان', 'الاندلس', 'غرناطة', 'المنار', 'طيبة', 'الرفيعة',
  'الرائد', 'الحزم', 'العقيق', 'الوشم', 'الشهداء', 'الفروسية', 'المصيف',
  'الملك فهد', 'الملك عبدالعزيز', 'الرحمانية', 'السعادة', 'السلام', 'التضامن',
  'المحمدية', 'العدل', 'اليمامة', 'النسيم', 'الخليج', 'المطار القديم', 'الثعالبة',
  'الدار البيضاء', 'المنصوربة', 'القدس', 'الوادي', 'الحاير', 'نمار', 'الشعلان',
  'ام الحمام الغربي', 'ام الحمام الشرقي', 'الخزامى', 'السلي', 'الدريهمية',
  'الرمال', 'المغرزات', 'الرجراج', 'أرام', 'المسار', 'قطراء', 'البساتين',
  'جرير', 'اشبيلية', 'الجزيرة', 'الزهراء', 'عتيقة', 'الهدا', 'الوسام',
  'الرويس', 'الربيع', 'الواحة', 'المهدية', 'الكندرة', 'لبن', 'عرقة',
  'الحصان', 'السداد', 'الضغط', 'الحزامة', 'الجنادرية', 'طلحة', 'القلة',
  'حطين', 'المرسلات', 'الجرادية', 'عريض', 'اللحامنة', 'الجافورة', 'الموية',
  'المصانع', 'الصغرية', 'المرقب', 'المدائن', 'القيروان الغربية', 'القيروان الشرقية'
];

export async function generateMarketAnalysis(request: MarketAnalysisRequest): Promise<MarketAnalysisData> {
  try {
    const prompt = `
أنت خبير تحليل السوق العقاري الأول في المملكة العربية السعودية، مع شبكة واسعة من المطورين والمستثمرين. لديك وصول فوري لبيانات حقيقية ومحدثة من:
- منصة عقار السعودية
- وزارة الإسكان 
- الهيئة العامة للإحصاء
- بيانات البنوك العقارية
- تطبيقات المطورين الكبار

المطلوب: تحليل شامل ودقيق جداً لحي ${request.neighborhood} في مدينة ${request.city} لنوع العقار: ${request.propertyType}

المتطلبات الإجبارية للتحليل:
1. أسعار حقيقية محدثة للمتر المربع بالريال السعودي
2. أسماء حقيقية لأكثر المشاريع طلباً في الحي
3. مقارنة دقيقة مع 3 أحياء مجاورة بأسعارها الفعلية
4. معدل إشغال الأراضي الحقيقي (نسبة مئوية دقيقة)
5. عدد السكان الفعلي والتركيبة الديموغرافية
6. توزيع أنواع الوحدات بنسب مئوية دقيقة
7. أسعار الإيجار الحقيقية والعائد الإيجاري المحسوب
8. تقييم كامل للخدمات التجارية ونسبة اكتمالها
9. توصية استثمارية مفصلة مع ROI محسوب

أعط بيانات حقيقية فقط، لا تقديرات!

اكتب JSON مفصل:
{
  "currentPrices": {
    "averagePricePerSqm": "السعر الحقيقي بالريال لكل متر مربع",
    "priceRange": "النطاق السعري الكامل (من - إلى)",
    "trend": "الاتجاه السعري الحالي مع النسبة المئوية للتغيير"
  },
  "mostDemandedProjects": [
    "اسم المشروع الأول (اسم حقيقي)",
    "اسم المشروع الثاني (اسم حقيقي)", 
    "اسم المشروع الثالث (اسم حقيقي)",
    "اسم المشروع الرابع (اسم حقيقي)",
    "اسم المشروع الخامس (اسم حقيقي)"
  ],
  "nearbyComparisons": [
    {
      "neighborhood": "اسم الحي المجاور الأول",
      "averagePrice": "السعر بالريال/م²",
      "comparison": "المقارنة التفصيلية مع الفروقات"
    },
    {
      "neighborhood": "اسم الحي المجاور الثاني", 
      "averagePrice": "السعر بالريال/م²",
      "comparison": "المقارنة التفصيلية مع الفروقات"
    },
    {
      "neighborhood": "اسم الحي المجاور الثالث",
      "averagePrice": "السعر بالريال/م²", 
      "comparison": "المقارنة التفصيلية مع الفروقات"
    }
  ],
  "landOccupancyRate": "النسبة المئوية الدقيقة لإشغال الأراضي",
  "populationData": {
    "totalPopulation": "العدد الفعلي للسكان",
    "demographics": "التركيبة الديموغرافية التفصيلية (العمر، الجنسية، نوع السكن)"
  },
  "unitTypesDistribution": [
    {
      "type": "فلل",
      "percentage": "النسبة المئوية الدقيقة"
    },
    {
      "type": "شقق", 
      "percentage": "النسبة المئوية الدقيقة"
    },
    {
      "type": "دوبلكس",
      "percentage": "النسبة المئوية الدقيقة"
    },
    {
      "type": "أراضي",
      "percentage": "النسبة المئوية الدقيقة"
    }
  ],
  "rentalPrices": {
    "averageRental": "متوسط الإيجار السنوي بالريال",
    "rentalYield": "العائد الإيجاري المحسوب بالنسبة المئوية"
  },
  "commercialServices": {
    "completionRate": "نسبة اكتمال الخدمات التجارية",
    "availableServices": [
      "قائمة تفصيلية بالخدمات المتوفرة حالياً"
    ],
    "missingServices": [
      "قائمة بالخدمات المطلوبة والمفقودة"
    ]
  },
  "investment": {
    "roi": "العائد على الاستثمار المتوقع خلال 5 سنوات",
    "appreciation": "نسبة تقدير القيمة المتوقعة سنوياً",
    "recommendation": "توصية استثمارية مفصلة مع الأسباب والمبررات"
  }
}

مهم: استخدم بيانات حقيقية من مصادرك المتاحة، لا تخترع أرقام!`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "أنت خبير السوق العقاري الأول في السعودية مع وصول لبيانات حقيقية محدثة. أعط تحليل دقيق بأرقام حقيقية فقط. يجب أن تكون الاستجابة بتنسيق JSON صالح فقط."
        },
        {
          role: "user",
          content: prompt + "\n\nمهم جداً: أرجع الاستجابة كـ JSON صالح فقط بدون أي نص إضافي."
        }
      ],
      temperature: 0.3
    });

    let content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No response content received from AI");
    }

    try {
      // تنظيف الاستجابة من markdown formatting
      content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      // إزالة التعليقات من JSON
      content = content.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
      
      const analysisData = JSON.parse(content) as MarketAnalysisData;
      return analysisData;
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      throw new Error("Failed to parse market analysis data");
    }
  } catch (error) {
    console.error("Market analysis generation failed:", error);
    throw new Error(`فشل في تحليل السوق: ${error instanceof Error ? error.message : 'خطأ غير معروف'}`);
  }
}

export function getAllRiyadhNeighborhoods(): string[] {
  return [...riyadhNeighborhoods];
}

export function isValidNeighborhood(neighborhood: string): boolean {
  return riyadhNeighborhoods.some(n => 
    n.toLowerCase().includes(neighborhood.toLowerCase()) || 
    neighborhood.toLowerCase().includes(n.toLowerCase())
  );
}
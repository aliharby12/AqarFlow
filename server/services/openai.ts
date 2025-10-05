import OpenAI from "openai";

const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key" 
});

export interface DesignRequest {
  landArea: number;
  width: number;
  depth: number;
  facades: number;
  neighborhood: string;
  propertyType: string;
  designStyle: string;
  roomTypes: string[];
}

export interface DesignResult {
  mainDescription: string;
  interiorDescriptions: string[];
  exteriorDescription: string;
  floorPlan: string;
  materials: {
    exterior: string[];
    interior: string[];
  };
  landscaping: string[];
  estimatedCost: {
    total: string;
    breakdown: {
      structure: string;
      finishes: string;
      landscaping: string;
    };
  };
}

export async function generateArchitecturalDesign(request: DesignRequest): Promise<DesignResult> {
  try {
    const prompt = `
أنت كبير المهندسين المعماريين في أرقى مكتب هندسي بالشرق الأوسط، حاصل على عضوية RIBA البريطانية و AIA الأمريكية، مع 30 عاماً خبرة في مشاريع فائقة الفخامة. صمم مشروعاً معمارياً استثنائياً يتفوق على توقعات العميل:

معلومات المشروع:
- المساحة: ${request.landArea} متر مربع (${request.width} × ${request.depth})
- عدد الواجهات: ${request.facades} 
- الموقع: حي ${request.neighborhood} - الرياض
- النوع: ${request.propertyType}
- الطراز: ${request.designStyle}
- المساحات: ${request.roomTypes.join('، ')}

معايير التميز المعماري:
- توافق فائق مع SBC 601 + معايير LEED الذهبية
- تقنيات مناخية متطورة: تبريد جيوحراري، عزل VIP
- أتمتة ذكية شاملة (KNX/EIB) + إنترنت الأشياء
- حلول معمارية حصرية ومبتكرة للموقع
- خصوصية إسلامية مع تقنيات عصرية متقدمة
- استدامة بيئية + صفر انبعاثات كربونية
- مواد بناء فائقة الجودة مستوردة وحصرية

اكتب JSON مفصل:
{
  "mainDescription": "واجهة معمارية استثنائية تحفة فنية: ارتفاعات مدروسة بدقة هندسية، مواد حصرية فاخرة، ألوان متناغمة مع البيئة المحلية، نوافذ ذكية عالية الأداء، مدخل رئيسي مهيب، عناصر معمارية حرفية متقنة تعكس روح الطراز الأصيل مع لمسة عصرية راقية",
  "interiorDescriptions": [
    "مجلس VIP فاخر: أبعاد سخية مع طقم أصيل حرفي، أرضيات رخام إيطالي، إضاءة LED ديناميكية، تهوية صامتة، تكييف مناطقي ذكي",
    "أجنحة نوم رئيسية منفصلة: غرف واسعة مع خزائن جدارية مخصصة، حمامات سبا فخمة مجهزة بأحدث التقنيات، خصوصية تامة، إطلالات مدروسة",
    "مطبخ ألماني احترافي + غرفة طعام رسمية: تجهيزات Miele و Gaggenau، شفاطات مركزية صامتة، جزيرة طبخ رخامية، تصميم وظيفي متطور",
    "مرافق متقدمة: مكتب منزلي ذكي، غسيل أوتوماتيكي، مخازن مناخية، غرفة تقنية، مصعد منزلي (حسب الحاجة)"
  ],
  "exteriorDescription": "تكسيات خارجية حصرية فائقة الجودة: حجر طبيعي مستورد مقطوع بالليزر، ألوان متدرجة حرفياً، تركيب بتقنية السحابة المطورة، عناصر زخرفية منحوتة يدوياً، كرانيش ثلاثية الأبعاد، نوافذ ألمانية ثلاثية الزجاج مع طلاء حراري متقدم",
  "floorPlan": "مخطط معماري احترافي متقن: توزيع مثالي للمساحات بأبعاد محسوبة هندسياً، توجيه دقيق للقبلة، مداخل مدروسة للخصوصية، مواقف مغطاة مكيفة، حديقة تفاعلية مع نظام ري ذكي، مسبح لانهائي مع جاكوزي، ملحق ضيوف مستقل، شبكة مسارات مضيئة",
  "materials": {
    "exterior": [
      "حجر الترافرتين التركي الفاخر بدرجة كريمية ذهبية، مقطوع بالليزر 3سم، معالج ضد التآكل، من محاجر Denizli المعتمدة",
      "إطارات ألومنيوم ألمانية Schüco 8000AS بسماكة 85مم، لون برونزي داكن، زجاج ثلاثي Guardian ClimaGuard مع طلاء Low-E",
      "عزل حراري PIR بسماكة 15سم + غشاء تنفس ذكي DuPont Tyvek، عزل مائي Sika بضمان 30 سنة",
      "طلاء سيليكوني ألماني Caparol Muresko مقاوم UV مع تقنية الدرع الحراري",
      "سقف مقاوم: خرسانة 25سم + عزل XPS + طبقة حماية EPDM + تيجان حجرية مصنعة"
    ],
    "interior": [
      "أرضيات رخام Carrara الإيطالي الأصلي للمجالس، بلاط بورسلين إسباني Porcelanosa للخدمات، باركيه بلوط أمريكي للغرف",
      "جدران جبسية معالجة صوتياً، طلاء إيطالي San Marco الفاخر، ألواح خشب الجوز البرازيلي للمكتبة",
      "أسقف جبس بورد ألماني Knauf مع إضاءة LED فيليبس قابلة للتحكم، نظام صوتي Sonos مدمج",
      "نجارة إيطالية مخصصة من خشب الجوز، أبواب صوتية ألمانية Hörmann، دواليب جدارية بنظام إيطالي",
      "حمامات: رخام Statuario، أدوات صحية Duravit الألمانية، خلاطات Hansgrohe، إضاءة Artemide الإيطالية"
    ]
  },
  "landscaping": [
    "حديقة استوائية متطورة: 12 نخلة ملكية واشنطونيا + 8 نخيل بلح مجدول عمر 15 سنة، موزعة استراتيجياً حول المسبح والمداخل",
    "نباتات عطرية فاخرة: ورد جوري دمشقي، ياسمين عربي، لافندر فرنسي، أشجار الليمون العضوي، نبات الآس الأندلسي",
    "نظام ري ذكي Hunter إسرائيلي مع حساسات رطوبة وبرمجة مناخية، شبكة تنقيط مدفونة مع تحكم تطبيقي",
    "ممرات حجر البازلت الأردني مع إضاءة مدمجة، جلسات خارجية إيطالية Minotti مع مظلات كهربائية ألمانية",
    "عشب صناعي سويسري CCGrass الفاخر مقاوم UV، مناطق عشب طبيعي Zoysia محدودة مع نظام رش تلقائي",
    "إضاءة معمارية ERCO الألمانية + أنظمة أمان Bosch مع كاميرات 4K وإنذار صامت متصل بالشركة الأمنية"
  ],
  "estimatedCost": {
    "total": "2,850,000 ريال سعودي (تكلفة دقيقة شاملة جميع المواد الفاخرة والتقنيات المتقدمة - أسعار السوق العقاري الفاخر 2025)",
    "breakdown": {
      "structure": "950,000 ريال (أساسات عميقة مع عزل شامل + هيكل خرساني عالي المقاومة + أعمال العزل والحماية)",
      "finishes": "1,550,000 ريال (مواد تشطيب إيطالية وألمانية فاخرة + تكسيات حجرية حصرية + أنظمة التقنية الذكية الشاملة)",
      "landscaping": "350,000 ريال (تشجير احترافي + مسبح لانهائي + أنظمة الري الذكية + إضاءة معمارية + أثاث خارجي فاخر)"
    }
  }
}

مهم جداً:
- اكتب أوصافاً واقعية دقيقة تقنياً
- استخدم أرقاماً وتفاصيل محددة
- اعتمد على مواد البناء السعودية المتاحة
- احسب التكاليف بدقة حسب السوق السعودي 2024-2025
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "أنت مهندس معماري متخصص في التصاميم السعودية والعربية العصرية. قدم تصاميم عالية الجودة مع تفاصيل دقيقة للمواد والتكاليف بأرقام حقيقية من السوق السعودي. تأكد من أن إجابتك JSON صالح وكامل."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 4000,
    });

    let content = response.choices[0].message.content || "{}";
    
    // تنظيف الاستجابة من markdown formatting
    content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    // إزالة التعليقات من JSON
    content = content.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
    
    const result = JSON.parse(content);
    return result as DesignResult;
  } catch (error) {
    console.error("Error generating design:", error);
    throw new Error("فشل في إنشاء التصميم. يرجى المحاولة مرة أخرى.");
  }
}

export interface MarketAnalysisRequest {
  neighborhood: string;
  city: string;
  propertyType: string;
}

export interface MarketAnalysisResult {
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

export async function generateMarketAnalysis(request: MarketAnalysisRequest): Promise<MarketAnalysisResult> {
  try {
    const prompt = `
أنت خبير تحليل السوق العقاري السعودي مع قاعدة بيانات محدثة 2025. قدم تحليلاً شاملاً ودقيقاً لحي ${request.neighborhood} في ${request.city} لنوع العقار: ${request.propertyType}.

مطلوب تحليل شامل بالأرقام الحقيقية المحدثة (ليس تقديرات):

1. الأسعار الحالية المحدثة للمتر المربع
2. أكثر المشاريع طلباً في الحي
3. مقارنات مع الأحياء المجاورة المشابهة
4. معدل إشغال الأراضي الفعلي
5. البيانات السكانية الدقيقة
6. توزيع أنواع الوحدات السكنية
7. أسعار الإيجارات الحالية
8. اكتمال الخدمات التجارية والنسب الفعلية
9. توصيات الاستثمار بناءً على البيانات الحقيقية

أرجع البيانات بصيغة JSON دقيقة:
{
  "currentPrices": {
    "averagePricePerSqm": "السعر الحقيقي للمتر بالريال (مثال: 3,200 ريال/م²)",
    "priceRange": "النطاق السعري الفعلي (مثال: 2,800 - 3,600 ريال/م²)",
    "trend": "الاتجاه السعري الحالي مع النسبة (مثال: ارتفاع 8% خلال 6 أشهر)"
  },
  "mostDemandedProjects": [
    "أسماء المشاريع الأكثر طلباً حالياً في الحي (حقيقية)",
    "مشروع آخر بالاسم الحقيقي",
    "ثالث مشروع حقيقي مطلوب"
  ],
  "nearbyComparisons": [
    {
      "neighborhood": "اسم الحي المجاور الحقيقي",
      "averagePrice": "السعر الحقيقي (مثال: 3,100 ريال/م²)",
      "comparison": "المقارنة الدقيقة (مثال: أقل بـ 3% من حي الياسمين)"
    }
  ],
  "landOccupancyRate": "النسبة الحقيقية لإشغال الأراضي (مثال: 76% من الأراضي مستغلة)",
  "populationData": {
    "totalPopulation": "العدد الحقيقي للسكان (مثال: 45,200 نسمة)",
    "demographics": "التركيبة السكانية الفعلية (مثال: 65% عائلات سعودية، 35% وافدون)"
  },
  "unitTypesDistribution": [
    {"type": "فلل", "percentage": "النسبة الحقيقية (مثال: 45%)"},
    {"type": "شقق", "percentage": "النسبة الحقيقية (مثال: 35%)"},
    {"type": "دوبلكس", "percentage": "النسبة الحقيقية (مثال: 20%)"}
  ],
  "rentalPrices": {
    "averageRental": "متوسط الإيجار الحقيقي (مثال: 28,000 ريال/سنوياً)",
    "rentalYield": "العائد الإيجاري الفعلي (مثال: 4.2% سنوياً)"
  },
  "commercialServices": {
    "completionRate": "نسبة اكتمال الخدمات الحقيقية (مثال: 85% مكتملة)",
    "availableServices": ["قائمة بالخدمات المتوفرة حالياً"],
    "missingServices": ["قائمة بالخدمات المطلوبة غير المتوفرة"]
  },
  "investment": {
    "roi": "العائد على الاستثمار المتوقع حقيقياً (مثال: 12% خلال 3 سنوات)",
    "appreciation": "نسبة التقدير المتوقعة (مثال: 6% سنوياً)",
    "recommendation": "توصية الاستثمار بناءً على البيانات الحقيقية"
  }
}

مهم جداً: استخدم بيانات حقيقية محدثة من مصادر موثوقة، وليس تقديرات أو أرقام عشوائية.
  `.trim();

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "أنت محلل عقاري خبير في السوق السعودي مع إمكانية الوصول لقواعد البيانات المحدثة. قدم بيانات حقيقية دقيقة وليس تقديرات. تأكد من أن إجابتك JSON صالح وكامل."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 3000,
    });

    let content = response.choices[0].message.content || "{}";
    
    // تنظيف الاستجابة من markdown formatting
    content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    // إزالة التعليقات من JSON
    content = content.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
    
    const result = JSON.parse(content);
    return result as MarketAnalysisResult;
  } catch (error) {
    console.error("Error generating market analysis:", error);
    throw new Error("فشل في تحليل السوق. يرجى المحاولة مرة أخرى.");
  }
}

export async function generateDesignImages(designResult: DesignResult, designStyle: string, neighborhood: string = "الرياض"): Promise<string[]> {
  try {
    // Generate 8 comprehensive images covering all aspects
    const imageTypes = [
      {
        type: "main_exterior",
        prompt: `Award-winning luxury Saudi ${designStyle} architecture masterpiece in prestigious ${neighborhood} district. ${designResult.mainDescription}. Ultra-premium Turkish travertine stone cladding, German Schuco windows, sophisticated color palette. Professional architectural photography, Canon EOS R5 quality, golden hour lighting, 8K resolution, Architectural Digest standard, hyper-realistic materials and textures visible`
      },
      {
        type: "side_perspective",
        prompt: `Sophisticated three-quarter perspective view of luxury ${designStyle} villa showcasing architectural depth and premium materials. ${designResult.exteriorDescription}. Professional landscape integration, Award-winning design, dramatic shadows highlighting textures, ultra-realistic rendering, cinematic lighting, architectural photography excellence, 8K quality`
      },
      {
        type: "aerial_view",
        prompt: `Premium aerial masterplan view of complete luxury estate featuring ${designStyle} architecture. ${designResult.floorPlan}. DJI Inspire 3 professional drone photography, resort-quality landscaping visible, infinity pool, covered parking, manicured gardens, perfect lighting, ultra-high definition, real estate luxury marketing quality`
      },
      {
        type: "interior_majlis", 
        prompt: `Opulent Saudi majlis interior design worthy of royal palaces. ${designResult.interiorDescriptions[0] || 'Luxurious VIP majlis with premium finishes'}. Italian Carrara marble floors, handcrafted ceiling details, authentic Arabic carpets, warm LED lighting design, sophisticated furniture arrangement, ultra-realistic textures, Architectural Digest quality interior photography, 8K resolution`
      },
      {
        type: "interior_living",
        prompt: `Luxury master bedroom suite with spa-like en-suite bathroom. ${designResult.interiorDescriptions[1] || 'Premium bedroom with Italian furnishing'}. Five-star hotel interior quality, Minotti furniture, premium textiles, sophisticated lighting design, natural light streaming through smart glass windows, ultra-realistic materials, professional interior photography, 8K resolution`
      },
      {
        type: "detailed_floorplan",
        prompt: `Professional architectural floor plan presentation with precise technical drawings. ${designResult.floorPlan}. CAD-quality technical illustration, architect-level precision, room dimensions in Arabic/English, furniture layout indicated, landscape integration shown, professional presentation standards, clean lines, technical excellence`
      },
      {
        type: "landscape_garden",
        prompt: `Award-winning landscape design featuring premium desert-adapted plants and luxury outdoor amenities. ${designResult.landscaping.join(', ')}. Resort-quality gardens, mature date palms, fragrant Arabic roses, smart irrigation system, infinity pool, outdoor Italian furniture, professional landscape lighting, ultra-realistic botanical details, 8K garden photography`
      },
      {
        type: "night_illumination",
        prompt: `Spectacular evening architectural showcase with sophisticated lighting design highlighting luxury materials. Professional architectural lighting by ERCO, warm interior glow through premium windows, landscape illumination, water feature lighting, dramatic sky backdrop. Award-winning night photography, cinematic quality, ultra-realistic lighting effects, 8K resolution`
      }
    ];

    const imagePromises = imageTypes.map(async (imageSpec) => {
      try {
        const response = await openai.images.generate({
          model: "dall-e-3",
          prompt: imageSpec.prompt + ". عالي الجودة واقعي جداً، تفاصيل معمارية دقيقة، جودة فوتوغرافية مهنية، ultra realistic, architectural photography, 8K resolution, professional lighting",
          n: 1,
          size: "1792x1024",
          quality: "hd",
          style: "natural"
        });
        
        return response.data?.[0]?.url || "";
      } catch (error) {
        console.error(`Error generating ${imageSpec.type} image:`, error);
        return "";
      }
    });

    const imageUrls = await Promise.all(imagePromises);
    return imageUrls.filter(url => url !== "");
  } catch (error) {
    console.error("Error generating images:", error);
    throw new Error("فشل في إنشاء صور التصميم. يرجى المحاولة مرة أخرى.");
  }
}

// Interior design interfaces and function
export interface InteriorDesignRequest {
  roomType: string;
  designStyle: string;
  roomSize: number;
  colorScheme: string;
  includeFurniture: boolean;
  budget: string;
  specialRequirements?: string;
}

export interface InteriorDesignResult {
  designDescription: string;
  colorPalette: string[];
  furniture: string[];
  lighting: string;
  materials: string[];
  estimatedCost: string;
  imageUrls: string[];
}

export async function generateInteriorDesign(request: InteriorDesignRequest): Promise<InteriorDesignResult> {
  try {
    // Translate room types and styles to Arabic
    const roomTypeMap: { [key: string]: string } = {
      'living-room': 'صالة استقبال',
      'majlis-men': 'مجلس رجال',
      'majlis-women': 'مجلس نساء',
      'family-room': 'غرفة عائلية',
      'master-bedroom': 'غرفة نوم رئيسية',
      'children-room': 'غرفة أطفال',
      'guest-room': 'غرفة ضيوف',
      'dressing-room': 'دريسنج روم',
      'kitchen': 'مطبخ',
      'dining-room': 'صالة طعام',
      'home-office': 'مكتب منزلي',
      'bathroom': 'حمام'
    };

    const styleMap: { [key: string]: string } = {
      'modern': 'عصري',
      'classic': 'كلاسيكي',
      'islamic': 'إسلامي تراثي',
      'minimalist': 'بساطة عصرية',
      'luxury': 'فاخر',
      'scandinavian': 'إسكندنافي',
      'oriental': 'شرقي',
      'contemporary': 'معاصر'
    };

    const colorMap: { [key: string]: string } = {
      'warm': 'دافئ (بيج، ذهبي، بني)',
      'cool': 'بارد (أزرق، رمادي، أبيض)',
      'neutral': 'محايد (أبيض، رمادي، أسود)',
      'earthy': 'ترابي (بني، أخضر، برتقالي)',
      'royal': 'ملكي (ذهبي، أحمر، أرجواني)',
      'pastel': 'باستيل (وردي، أزرق فاتح، بنفسجي)'
    };

    const roomTypeArabic = roomTypeMap[request.roomType] || request.roomType;
    const styleArabic = styleMap[request.designStyle] || request.designStyle;
    const colorArabic = colorMap[request.colorScheme] || request.colorScheme;

    const prompt = `
أنت مصمم ديكور داخلي عالمي متخصص في السوق السعودي، خبرة عميقة في المنتجات المتوفرة محلياً والتصاميم الواقعية القابلة للتنفيذ.

صمم ${roomTypeArabic} بطراز ${styleArabic} بمساحة ${request.roomSize} متر مربع، بنظام ألوان ${colorArabic}.
${request.includeFurniture ? 'يجب تضمين التأثيث الكامل مع أسماء المنتجات الحقيقية المتوفرة في السعودية.' : 'تركيز على الألوان والمواد فقط.'}
الميزانية: ${request.budget}
${request.specialRequirements ? `متطلبات خاصة: ${request.specialRequirements}` : ''}

شروط التصميم:
1. استخدم منتجات حقيقية متوفرة في المتاجر السعودية (ايكيا، هوم سنتر، ساكو، 2XL، العثيم، البيت العربي)
2. أسعار واقعية ومناسبة للسوق المحلي
3. مواد متوفرة فعلياً في السعودية
4. تصميم قابل للتنفيذ بسهولة
5. مناسب للثقافة والذوق السعودي

اكتب تصميماً واقعياً مفصلاً بصيغة JSON:

{
  "designDescription": "وصف واقعي مفصل للتصميم مع ذكر المنتجات الحقيقية وأماكن توفرها، والتوزيع العملي للمساحة",
  "colorPalette": ["لون محدد مع رمز اللون", "لون ثاني مع الرمز", "لون التأكيد", "لون مكمل"],
  "furniture": [
    "${request.includeFurniture ? 'قطعة أثاث محددة مع اسم المنتج ورقم الموديل من متجر معين (مثال: كنبة لوڤسيت ايكيا موديل GRÖNLID)' : 'لا يوجد أثاث مطلوب'}",
    "${request.includeFurniture ? 'قطعة أثاث ثانية محددة مع المتجر والسعر التقديري' : ''}",
    "${request.includeFurniture ? 'إكسسوارات محددة مع أسماء المنتجات والمتاجر' : ''}",
    "${request.includeFurniture ? 'قطع إضافية ضرورية مع تفاصيل المنتج' : ''}"
  ],
  "lighting": "نظام إضاءة واقعي مع أسماء منتجات حقيقية (مثال: لمبة LED فيليبس، إضاءة معلقة من ايكيا موديل FOTO)",
  "materials": ["أرضية محددة مع النوع والعلامة التجارية", "دهان الجدران مع اسم اللون والشركة", "مواد تشطيب متوفرة محلياً"],
  "estimatedCost": "تكلفة تفصيلية واقعية: الأثاث (مبلغ تقديري) + الإضاءة (مبلغ) + التشطيبات (مبلغ) + المجموع الإجمالي بالريال"
}

يجب أن يكون التصميم عملياً وقابلاً للتنفيذ فوراً في السعودية مع منتجات متوفرة حالياً.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "أنت مصمم ديكور داخلي خبير متخصص في السوق السعودي مع معرفة عميقة بالمنتجات المتوفرة محلياً. قدم تصاميم واقعية قابلة للتنفيذ مع منتجات حقيقية وأسعار فعلية. تأكد من أن إجابتك JSON صالح ومكتمل مع تفاصيل دقيقة للمنتجات."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 2000
    });

    let content = response.choices[0].message.content;
    if (!content) {
      throw new Error("لم يتم إنشاء التصميم بنجاح");
    }

    let designData;
    try {
      // تنظيف الاستجابة من markdown formatting
      content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      // إزالة التعليقات من JSON
      content = content.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
      
      designData = JSON.parse(content);
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      throw new Error("خطأ في تحليل نتيجة التصميم");
    }

    // Generate interior design images
    const imageUrls = await generateInteriorDesignImages(designData, request);

    return {
      designDescription: designData.designDescription || "",
      colorPalette: designData.colorPalette || [],
      furniture: designData.furniture || [],
      lighting: designData.lighting || "",
      materials: designData.materials || [],
      estimatedCost: designData.estimatedCost || "",
      imageUrls
    };
  } catch (error) {
    console.error("Error generating interior design:", error);
    throw new Error("فشل في إنشاء التصميم الداخلي. يرجى المحاولة مرة أخرى.");
  }
}

export async function generateLandPlanImage(planData: any) {
  try {
    const landArea = planData.landArea || 5000;
    const city = planData.city || 'الرياض';
    const proposedUse = planData.proposedUse || 'residential';
    
    // وصف تفصيلي للمخطط باللغة الإنجليزية
    const prompt = `
      Professional aerial view master plan drawing of a ${proposedUse} development project in ${city}, Saudi Arabia.
      Land area: ${landArea} square meters.
      
      The plan should show:
      - Residential plots clearly marked and numbered
      - Commercial areas with building footprints
      - Streets with proper widths (12-20 meters) clearly labeled with measurements
      - Public services: mosque with minaret, school building, public park with trees
      - Green spaces and landscaping areas
      - Parking areas and garage spaces
      - Infrastructure lines for utilities
      - Street names in Arabic and English
      
      Style: Technical architectural master plan drawing, top-down orthographic view, 
      clean professional line work, different colors for zoning:
      - Residential: light yellow/beige
      - Commercial: light blue  
      - Green spaces: light green
      - Streets: gray with white lane markings
      - Public buildings: distinct colors
      
      Include: compass rose, scale bar, legend, plot numbers, street widths,
      modern Middle Eastern urban planning standards, high contrast, CAD-style precision,
      technical drawing aesthetic with Arabic labels
    `;

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1792x1024",
      quality: "hd",
      style: "natural"
    });

    return {
      imageUrl: response.data?.[0]?.url || null,
      prompt: prompt,
      planDetails: {
        area: landArea,
        city: city,
        type: proposedUse
      }
    };
    
  } catch (error) {
    console.error('Error generating land plan image:', error);
    
    // في حالة الفشل، إرجاع بيانات بدون صورة
    return {
      imageUrl: null,
      error: 'فشل في توليد صورة المخطط',
      planDetails: {
        area: planData.landArea || 5000,
        city: planData.city || 'الرياض',
        type: planData.proposedUse || 'residential'
      }
    };
  }
}

async function generateInteriorDesignImages(designData: any, request: InteriorDesignRequest): Promise<string[]> {
  try {
    const roomTypeMap: { [key: string]: string } = {
      'living-room': 'luxury living room',
      'majlis-men': 'traditional Arabic men majlis',
      'majlis-women': 'elegant women majlis',
      'family-room': 'cozy family room',
      'master-bedroom': 'master bedroom suite',
      'children-room': 'children bedroom',
      'guest-room': 'guest bedroom',
      'dressing-room': 'walk-in dressing room',
      'kitchen': 'modern luxury kitchen',
      'dining-room': 'formal dining room',
      'home-office': 'home office study',
      'bathroom': 'luxury bathroom spa'
    };

    const roomTypeEnglish = roomTypeMap[request.roomType] || 'luxury interior room';
    
    const imageTypes = [
      {
        type: "main_view",
        prompt: `Ultra-luxury ${roomTypeEnglish} interior design, ${request.designStyle} style, ${request.roomSize}sqm space. ${designData.designDescription}. Premium furniture and decor, sophisticated lighting, rich textures, high-end materials. Professional interior photography, 8K resolution, architectural lighting, ultra-realistic details, luxury home magazine quality`
      },
      {
        type: "detail_view", 
        prompt: `Close-up detail shot of luxury ${roomTypeEnglish} showing exquisite ${request.designStyle} furniture and decor elements. ${designData.furniture?.join(', ')}. Premium materials, artistic lighting, ultra-realistic textures, professional interior photography, 8K quality`
      },
      {
        type: "lighting_ambiance",
        prompt: `Evening ambiance of luxury ${roomTypeEnglish} with sophisticated lighting design. ${designData.lighting}. Warm atmospheric lighting, cozy mood, luxury interior, ultra-realistic lighting effects, professional interior photography, 8K resolution`
      }
    ];

    // Only generate 2 images to be cost-effective
    const selectedImages = imageTypes.slice(0, 2);

    const imagePromises = selectedImages.map(async (imageSpec) => {
      try {
        const response = await openai.images.generate({
          model: "dall-e-3",
          prompt: imageSpec.prompt + ". Saudi Arabian luxury interior design, cultural elements, ultra-realistic, professional photography, 8K resolution",
          n: 1,
          size: "1792x1024",
          quality: "hd",
          style: "natural"
        });
        
        return response.data?.[0]?.url || "";
      } catch (error) {
        console.error(`Error generating ${imageSpec.type} interior image:`, error);
        return "";
      }
    });

    const imageUrls = await Promise.all(imagePromises);
    return imageUrls.filter(url => url !== "");
  } catch (error) {
    console.error("Error generating interior design images:", error);
    return [];
  }
}

export interface SimilarProduct {
  name: string;
  description: string;
  price: string;
  url: string;
  image: string;
  category: string;
  brand: string;
  rating: number;
}

export async function generateSimilarProducts(designData: any, budget: string): Promise<SimilarProduct[]> {
  try {
    const budgetMap: { [key: string]: string } = {
      'budget': 'منخفض (أقل من 10,000 ريال)',
      'mid-range': 'متوسط (10,000 - 50,000 ريال)',
      'high-end': 'عالي (50,000 - 150,000 ريال)',
      'luxury': 'فاخر (أكثر من 150,000 ريال)'
    };

    const budgetArabic = budgetMap[budget] || budget;

    const prompt = `
أنت خبير تسوق ديكور منزلي متخصص في السوق السعودي مع خبرة عميقة في المتاجر المحلية والعالمية المتوفرة في السعودية.

بناءً على التصميم الداخلي التالي:
- الوصف: ${designData.designDescription}
- الأثاث المطلوب: ${designData.furniture?.join(', ')}
- الألوان: ${designData.colorPalette?.join(', ')}
- المواد: ${designData.materials?.join(', ')}
- الميزانية: ${budgetArabic}

اقترح 8 منتجات ديكور حقيقية ومحددة من المتاجر التالية المتوفرة في السعودية:

المتاجر المعتمدة مع أقسامها:
- ايكيا السعودية (ikea.com.sa/ar/products/) - أذكر رقم المنتج
- هوم سنتر (homecenter.sa/ar/) - أذكر فئة المنتج
- مكتبة جرير (jarir.com/sa-ar/) - أذكر القسم المحدد
- ساكو (saco.sa/ar/) - أذكر التصنيف
- البيت العربي (alarabihome.sa/) - أذكر نوع المنتج
- مفروشات العثيم (alothaimfurniture.sa/) - أذكر الفئة
- 2XL فرنيتشر (2xl.com.sa/ar/) - أذكر القسم
- مودرن هوم (modernhome.sa/) - أذكر التصنيف
- سنتر بوينت (centrepointstores.com/sa/ar/) - أذكر الفئة
- نايس للأثاث (niceshome.sa/) - أذكر نوع المنتج

مطلوب تحديد منتجات محددة بأسماء حقيقية وأرقام موديل إن أمكن:

[
  {
    "name": "اسم المنتج الفعلي مع رقم الموديل",
    "description": "وصف دقيق للمنتج والمواد المستخدمة",
    "price": "السعر الحالي بالريال (مثال: 1,299 ريال)",
    "url": "رابط مباشر للمنتج أو بحث محدد (مثال: ikea.com.sa/ar/products/groenlid-sofa أو homecenter.sa/ar/furniture/sofas)",
    "image": "وصف دقيق لشكل ولون المنتج",
    "category": "التصنيف الدقيق",
    "brand": "العلامة التجارية أو اسم المتجر",
    "rating": 4.5
  }
]

شروط مهمة:
1. استخدم منتجات حقيقية متوفرة فعلياً في هذه المتاجر
2. اذكر أسماء المنتجات بدقة مع أرقام الموديل إن وجدت
3. السعر يجب أن يكون واقعي ومتناسب مع السوق السعودي
4. في حقل URL، اكتب رابط مباشر للمنتج أو رابط بحث محدد بدلاً من الموقع العام
5. تأكد من مناسبة المنتجات للثقافة والذوق السعودي
6. ركز على المنتجات ذات الجودة العالية والسمعة الطيبة`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "أنت خبير تسوق ديكور منزلي متخصص في السوق السعودي مع معرفة واسعة بالمنتجات الحقيقية المتوفرة في المتاجر الكبرى. مهمتك تقديم منتجات محددة بأسماء حقيقية وأرقام موديل دقيقة مع أسعار واقعية تناسب السوق السعودي. تأكد من أن إجابتك JSON صالح ومكتمل مع 8 منتجات بالضبط."
        },
        {
          role: "user", 
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    let content = response.choices[0].message.content;
    if (!content) {
      return [];
    }

    let products;
    try {
      // تنظيف الاستجابة من markdown formatting
      content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      // إزالة التعليقات من JSON
      content = content.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
      
      products = JSON.parse(content);
    } catch (parseError) {
      console.error("JSON parse error for similar products:", parseError);
      return [];
    }

    return Array.isArray(products) ? products : [];
  } catch (error) {
    console.error("Error generating similar products:", error);
    return [];
  }
}

export interface LandPlanRequest {
  landArea: number;
  deedType: string;
  currentUse?: string;
  proposedUse: string;
  city: string;
  neighborhood?: string;
  planningLevel: string;
  specialRequirements?: string;
  budget?: string;
}

export interface LandPlanResult {
  landInfo: {
    area: string;
    deedType: string;
    proposedUse: string;
    location: string;
  };
  planningDetails: {
    areas: Array<{
      type: string;
      area: string;
    }>;
    specifications: string[];
  };
  governmentRequirements: {
    municipality: string[];
    electricity: string[];
    water: string[];
    telecommunications: string[];
  };
  costEstimate: {
    options: Array<{
      level: string;
      totalCost: string;
      pricePerSqm: string;
      includes: string[];
    }>;
  };
  timeline: {
    phases: Array<{
      title: string;
      duration: string;
    }>;
  };
  recommendations: string[];
}

export async function generateLandPlan(request: LandPlanRequest): Promise<LandPlanResult> {
  try {
    // Create a structured response based on the request for immediate results
    const landPlan: LandPlanResult = {
      landInfo: {
        area: `${request.landArea.toLocaleString('ar-SA')} متر مربع`,
        deedType: `تحويل صك ${request.deedType} إلى ${request.proposedUse}`,
        proposedUse: `${request.proposedUse} متقدم بمعايير عالمية`,
        location: `${request.neighborhood ? `${request.neighborhood}، ` : ''}${request.city} - موقع استراتيجي`
      },
      planningDetails: {
        areas: [
          {type: "مساحات البناء", area: `${Math.round(request.landArea * 0.35).toLocaleString('ar-SA')} م² (35%)`},
          {type: "الشوارع والمواقف", area: `${Math.round(request.landArea * 0.22).toLocaleString('ar-SA')} م² (22%)`},
          {type: "المساحات الخضراء", area: `${Math.round(request.landArea * 0.28).toLocaleString('ar-SA')} م² (28%)`},
          {type: "المرافق والخدمات", area: `${Math.round(request.landArea * 0.12).toLocaleString('ar-SA')} م² (12%)`},
          {type: "مناطق الأنشطة", area: `${Math.round(request.landArea * 0.03).toLocaleString('ar-SA')} م² (3%)`}
        ],
        specifications: [
          `التزام كامل بأكواد البناء السعودية SBC للمنطقة ${request.city}`,
          "شبكة طرق حديثة بعرض 12-20 متر حسب كثافة المرور",
          "أنظمة صرف متطورة للأمطار مع محطات معالجة",
          "شبكة إنارة LED ذكية موفرة للطاقة",
          "مساحات خضراء مع نباتات محلية مقاومة للمناخ",
          "نظام أمان ومراقبة شامل متصل بالجهات الأمنية",
          "تصميم مقاوم للزلازل حسب منطقة الخطر الزلزالي",
          "معايير إمكانية الوصول للمعاقين حسب المعايير الدولية"
        ]
      },
      governmentRequirements: {
        municipality: [
          "رخصة فرز وتقسيم من الأمانة",
          "موافقة المخطط العام للمدينة",
          "اشتراطات الارتدادات (5-10 متر)",
          "نسب البناء المسموحة حسب التصنيف",
          "مواقف السيارات (1.5 موقف/وحدة)",
          "المساحات الخضراء (30% كحد أدنى)"
        ],
        electricity: [
          "شبكة كهرباء 33 كيلو فولت رئيسية",
          "محطات تحويل كل 500 متر",
          "إنارة عامة LED بكفاءة عالية",
          "أعمدة إنارة كل 25-30 متر",
          "شبكة توزيع تحت الأرض",
          "عدادات ذكية لجميع الوحدات"
        ],
        water: [
          "شبكة مياه رئيسية قطر 200-400 مم",
          "محطات ضخ ورفع مياه",
          "شبكة صرف صحي منفصلة",
          "معالجة مياه الأمطار والسيول",
          "خزانات مياه طوارئ",
          "نظام ري ذكي للمساحات الخضراء"
        ],
        telecommunications: [
          "شبكة ألياف بصرية FTTH",
          "أبراج اتصالات 4G/5G",
          "كابلات تحت الأرض",
          "أنظمة أمان ومراقبة",
          "بنية تحتية ذكية IoT",
          "نقاط Wi-Fi عامة"
        ]
      },
      costEstimate: {
        options: [
          {
            level: "📍 تخطيط بدائي",
            totalCost: `${(request.landArea * 20).toLocaleString('ar-SA')} ريال`,
            pricePerSqm: "20 ريال/م²",
            includes: [
              "مخطط أساسي للفرز",
              "تحديد الطرق الرئيسية", 
              "الخدمات الأساسية فقط",
              "موافقات بدائية"
            ]
          },
          {
            level: "🏘️ تخطيط متوسط",
            totalCost: `${(request.landArea * 45).toLocaleString('ar-SA')} ريال`, 
            pricePerSqm: "45 ريال/م²",
            includes: [
              "تخطيط شامل مع الخدمات",
              "شبكات البنية التحتية",
              "مساحات خضراء ومرافق",
              "موافقات حكومية كاملة"
            ]
          },
          {
            level: "🌟 تخطيط فاخر",
            totalCost: `${(request.landArea * 95).toLocaleString('ar-SA')} ريال`,
            pricePerSqm: "95 ريال/م²", 
            includes: [
              "تخطيط ذكي متقدم",
              "أنظمة ذكية شاملة",
              "تصميم ميادين ومعالم",
              "استدامة بيئية متقدمة"
            ]
          }
        ]
      },
      timeline: {
        phases: [
          {title: "المسوحات والدراسات الأولية", duration: "2-4 أسابيع"},
          {title: "التصميم والتخطيط", duration: "4-8 أسابيع"},
          {title: "الموافقات الحكومية", duration: "8-16 أسبوع"},
          {title: "تنفيذ البنية التحتية", duration: "6-12 شهر"},
          {title: "التشطيبات والتسليم", duration: "2-4 أشهر"}
        ]
      },
      recommendations: [
        `ضرورة عمل دراسة جيوتقنية شاملة قبل البدء للأرض بمساحة ${request.landArea.toLocaleString('ar-SA')} م²`,
        `التنسيق المبكر مع أمانة ${request.city} والجهات الحكومية المختصة`,
        "اعتماد أنظمة ذكية للتوفير في تكاليف التشغيل المستقبلية",
        "تخصيص مناطق للطاقة الشمسية وتجميع المياه حسب المناخ المحلي",
        "تطبيق معايير الاستدامة البيئية السعودية ومعايير LEED",
        `حجز مساحات مستقبلية للتوسعات تتناسب مع نمو ${request.proposedUse}`,
        request.specialRequirements ? `مراعاة المتطلبات الخاصة: ${request.specialRequirements}` : "دراسة احتياجات المنطقة المحيطة"
      ].filter(Boolean)
    };

    return landPlan;
  } catch (error) {
    console.error("Error generating land plan:", error);
    throw error;
  }
}

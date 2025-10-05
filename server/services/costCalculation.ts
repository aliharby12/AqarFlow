// Saudi Arabia Construction Cost Calculation Service
// Based on real market data and industry standards for 2024-2025

export interface CostCalculationParams {
  landArea: number;
  propertyType: string;
  roomTypes: string[];
  neighborhood: string;
  finishingLevel?: string;
  hasBasement?: boolean;
  parkingSpaces?: number;
}

export interface CostEstimateResult {
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
    basement?: number;
    parking?: number;
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
}

// Saudi Arabia Construction Costs (SAR per m²) - Updated 2025 - أسعار محدثة ودقيقة
const SAUDI_CONSTRUCTION_COSTS = {
  // Base costs per square meter - التكاليف الأساسية لكل متر مربع
  residential: {
    basic: {
      structure: 950,    // الهيكل الأساسي - محدث 2025
      finishing: 700,    // التشطيبات الأساسية - محدث
      electrical: 180,   // الكهرباء - محدث
      plumbing: 140,     // السباكة - محدث
      hvac: 240,         // التكييف - محدث
      permits: 60,       // التراخيص - محدث
    },
    standard: {
      structure: 1200,   // محدث للمعايير الحالية
      finishing: 950,
      electrical: 230,
      plumbing: 180,
      hvac: 300,
      permits: 70,
    },
    luxury: {
      structure: 1600,   // محدث للمشاريع الفاخرة
      finishing: 1400,
      electrical: 350,
      plumbing: 250,
      hvac: 400,
      permits: 80,
    }
  },
  commercial: {
    basic: {
      structure: 1400,   // محدث للمشاريع التجارية 2025
      finishing: 950,
      electrical: 300,
      plumbing: 220,
      hvac: 350,
      permits: 120,
    },
    standard: {
      structure: 1750,   // محدث للمعايير التجارية الحالية
      finishing: 1200,
      electrical: 400,
      plumbing: 270,
      hvac: 480,
      permits: 140,
    },
    luxury: {
      structure: 2300,   // محدث للمشاريع التجارية الفاخرة
      finishing: 1700,
      electrical: 600,
      plumbing: 350,
      hvac: 700,
      permits: 180,
    }
  }
};

// Neighborhood multipliers based on location premium
const NEIGHBORHOOD_MULTIPLIERS = {
  // Premium neighborhoods
  "العليا": 1.25,
  "الملقا": 1.20,
  "النرجس": 1.15,
  "الياسمين": 1.15,
  "قرطبة": 1.10,
  "الصحافة": 1.10,
  "الربوة": 1.08,
  
  // Standard neighborhoods
  "الوادي": 1.00,
  "المرقب": 1.00,
  "الروضة": 0.95,
  "الفيحاء": 0.95,
  "الملز": 0.90,
  "المنفوحة": 0.85,
  "الدرعية": 0.90,
  
  // Default for unlisted neighborhoods
  default: 1.00
};

// Room complexity factors
const ROOM_COMPLEXITY = {
  // Basic rooms
  "غرف نوم الأطفال": 1.0,
  "غرفة الضيوف": 1.0,
  "مخزن": 0.8,
  "مدخل رئيسي": 0.9,
  
  // Standard complexity
  "صالة المعيشة": 1.2,
  "غرفة نوم رئيسية": 1.3,
  "غرفة الطعام": 1.1,
  "مكتب منزلي": 1.1,
  
  // High complexity
  "مطبخ رئيسي": 1.8,
  "حمام رئيسي": 1.6,
  "حمامات إضافية": 1.4,
  "مجلس الرجال": 1.4,
  "مجلس النساء": 1.4,
  
  // Utility and special areas
  "غرفة الخادمة": 1.1,
  "غرفة الغسيل": 1.3,
  "فناء داخلي": 0.7,
  "حديقة خارجية": 0.6,
  "مواقف السيارات": 0.5,
  "ملحق خارجي": 0.8,
  "درج داخلي": 1.2,
  
  // Commercial spaces
  "منطقة الاستقبال": 1.5,
  "صالات العرض": 1.3,
  "مكاتب إدارية": 1.2,
  "قاعات الاجتماعات": 1.4,
  "منطقة الخدمات": 1.1,
  "حمامات عامة": 1.6,
  "حمامات ذوي الاحتياجات الخاصة": 1.8,
  "مخارج الطوارئ": 1.0,
  "غرف التكييف": 2.0,
  "غرفة الكهرباء": 2.2,
  "منطقة التحميل": 0.8,
  "أنظمة الإنذار": 1.5,
  "كاميرات المراقبة": 1.3,
  "نظام مكافحة الحريق": 2.5,
  "مصاعد": 3.0,
  "سلالم الطوارئ": 1.2,
  "منطقة الأمن": 1.4,
  "مطعم/كافيتيريا": 1.8,
  "مسجد/مصلى": 1.3,
};

function determinePropertyCategory(propertyType: string): 'residential' | 'commercial' {
  const residential = [
    "عمارة سكنية", "فلة", "شقة", "مجمع سكني مغلق", "تاون هاوس", 
    "بنت هاوس", "أدوار", "مزرعة", "استراحة", "شالية"
  ];
  
  return residential.includes(propertyType) ? 'residential' : 'commercial';
}

function determineQualityLevel(propertyType: string, roomTypes: string[]): 'basic' | 'standard' | 'luxury' {
  const luxuryIndicators = [
    "مجلس الرجال", "مجلس النساء", "فناء داخلي", "حديقة خارجية", 
    "غرفة الخادمة", "ملحق خارجي", "مطعم/كافيتيريا", "مسجد/مصلى"
  ];
  
  const luxuryCount = roomTypes.filter(room => luxuryIndicators.includes(room)).length;
  const roomCount = roomTypes.length;
  
  if (luxuryCount >= 3 || propertyType === "بنت هاوس" || roomCount >= 12) {
    return 'luxury';
  } else if (luxuryCount >= 1 || roomCount >= 8) {
    return 'standard';
  }
  
  return 'basic';
}

function calculateBuildingArea(landArea: number, propertyType: string): number {
  // Building coverage ratios based on Saudi building codes
  const coverageRatios = {
    "فلة": 0.65,
    "عمارة سكنية": 0.75,
    "شقة": 0.85,
    "مجمع سكني مغلق": 0.60,
    "تاون هاوس": 0.70,
    "بنت هاوس": 0.80,
    "أدوار": 0.70,
    "مزرعة": 0.40,
    "استراحة": 0.50,
    "شالية": 0.55,
    "أبراج": 0.80,
    "مراكز تجارية": 0.85,
    "ستريب مول": 0.90,
    "مستشفيات": 0.75,
    "سكن عمال": 0.80,
    "مبنى مكتبي": 0.80,
    "مبنى درايف ثرو": 0.70,
  };
  
  const ratio = coverageRatios[propertyType as keyof typeof coverageRatios] || 0.65;
  return Math.floor(landArea * ratio);
}

export async function calculateConstructionCost(params: CostCalculationParams): Promise<CostEstimateResult> {
  const { landArea, propertyType, roomTypes, neighborhood, finishingLevel = 'متوسط', hasBasement = false, parkingSpaces = 0 } = params;
  
  // Determine project characteristics
  const category = determinePropertyCategory(propertyType);
  const qualityLevel = determineQualityLevel(propertyType, roomTypes);
  const buildingArea = calculateBuildingArea(landArea, propertyType);
  
  // Get base costs and apply finishing level multiplier
  const baseCosts = SAUDI_CONSTRUCTION_COSTS[category][qualityLevel];
  
  // تطبيق مضاعف نوع التشطيب
  const finishingMultiplier = {
    'عادي': 0.8,
    'متوسط': 1.0,
    'فاخر': 1.4
  }[finishingLevel] || 1.0;
  
  // Apply neighborhood multiplier
  const neighborhoodMultiplier = NEIGHBORHOOD_MULTIPLIERS[neighborhood as keyof typeof NEIGHBORHOOD_MULTIPLIERS] || NEIGHBORHOOD_MULTIPLIERS.default;
  
  // Calculate room complexity factor
  // حل مشكلة NaN عند عدم وجود أنواع غرف
  const safeRoomTypes = roomTypes && roomTypes.length > 0 ? roomTypes : ['غرفة نوم', 'صالة'];
  const roomComplexityFactors = safeRoomTypes.map(room => 
    ROOM_COMPLEXITY[room as keyof typeof ROOM_COMPLEXITY] || 1.0
  );
  const avgComplexity = roomComplexityFactors.reduce((sum, factor) => sum + factor, 0) / roomComplexityFactors.length;
  const complexityMultiplier = Math.max(0.8, Math.min(2.0, avgComplexity));
  
  // Base calculations with finishing level adjustment
  const structureBase = baseCosts.structure * buildingArea * neighborhoodMultiplier;
  const finishingBase = baseCosts.finishing * buildingArea * neighborhoodMultiplier * complexityMultiplier * finishingMultiplier;
  const electricalBase = baseCosts.electrical * buildingArea * neighborhoodMultiplier;
  const plumbingBase = baseCosts.plumbing * buildingArea * neighborhoodMultiplier;
  const hvacBase = baseCosts.hvac * buildingArea * neighborhoodMultiplier;
  const permitsBase = baseCosts.permits * buildingArea;

  // حساب تكلفة البدروم إضافية
  const basementCost = hasBasement ? buildingArea * 400 * neighborhoodMultiplier : 0; // 400 ريال/م² للبدروم
  
  // حساب تكلفة المواقف
  const parkingCost = parkingSpaces * 8000; // 8000 ريال لكل موقف
  
  // Landscaping cost (percentage of land area for residential, fixed for commercial)
  const landscapingCost = category === 'residential' 
    ? landArea * 80 * neighborhoodMultiplier // 80 SAR per m² for landscaping
    : buildingArea * 0.1 * 150; // 10% of building area at 150 SAR/m²
  
  // Calculate detailed breakdown
  const foundation = structureBase * 0.25;
  const structure = structureBase * 0.60;
  const roofing = structureBase * 0.15;
  const walls = finishingBase * 0.40;
  const flooring = finishingBase * 0.35;
  const finishes = finishingBase * 0.25;
  const electrical = electricalBase;
  const plumbing = plumbingBase;
  const hvac = hvacBase;
  const permits = permitsBase;
  
  // Labor cost (30% of material costs including basement)
  const materialCosts = structureBase + finishingBase + electricalBase + plumbingBase + hvacBase + basementCost;
  const labor = materialCosts * 0.30;
  
  // Contingency (10% of total before contingency)
  const subtotal = materialCosts + landscapingCost + permits + labor + parkingCost;
  const contingency = subtotal * 0.10;
  
  // Total costs
  const structuralCost = structureBase + basementCost;
  const finishingCost = finishingBase;
  const electricalCost = electricalBase;
  const plumbingCost = plumbingBase;
  const hvacCost = hvacBase;
  const permitsCost = permits;
  const contingencyCost = contingency;
  const totalCost = subtotal + contingency;
  
  const costPerSquareMeter = totalCost / buildingArea;
  
  return {
    structuralCost,
    finishingCost,
    electricalCost,
    plumbingCost,
    hvacCost,
    landscapingCost,
    permitsCost,
    contingencyCost,
    totalCost,
    costBreakdown: {
      foundation,
      structure,
      roofing,
      walls,
      flooring,
      electrical,
      plumbing,
      hvac,
      finishes,
      landscaping: landscapingCost,
      basement: basementCost,
      parking: parkingCost,
      permits,
      labor,
      contingency,
    },
    costPerSquareMeter,
    projectDetails: {
      buildingArea,
      roomCount: roomTypes.length,
      complexity: qualityLevel,
      qualityLevel: `${qualityLevel} (${category})`,
    }
  };
}
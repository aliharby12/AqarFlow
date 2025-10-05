export interface DesignFormData {
  landArea: number;
  width: number;
  depth: number;
  facades: number;
  neighborhood: string;
  propertyType: string;
  roomTypes: string[];
}

export interface GeneratedDesign {
  id: string;
  mainDescription: string;
  interiorDescriptions: string[];
  exteriorDescription: string;
  floorPlan: string;
  designUrls?: string[];
  pdfUrl?: string;
  status: string;
}

export interface MarketStats {
  totalTransactions: number;
  averagePricePerSqm: number;
  averageSaleDays: number;
  averageOccupancyRate: number;
}

export interface PropertyFilters {
  propertyType?: string;
  listingType?: string;
  neighborhood?: string;
}

export interface Agent {
  id: string;
  name: string;
  specialization: string;
  yearsOfExperience: number;
  rating: number;
  completedDeals: number;
  phone: string;
  email: string;
  profilePicture?: string;
  neighborhoods: string[];
}

export interface Agency {
  id: string;
  name: string;
  yearsInMarket: number;
  annualDeals: number;
  agentCount: number;
  specializations: string[];
  locations: string[];
  phone: string;
  email: string;
  logo?: string;
}

export type ActiveSection = 'design' | 'analysis' | 'listings' | 'studies';

// Study result types
export interface StudyResult {
  id: string;
  feasibilityScore: number;
  expectedROI: string;
  marketDemand: string;
  riskLevel: string;
  financialProjections: {
    totalCost: string;
    expectedRevenue: string;
    breakEvenPeriod: string;
    profitMargin: string;
  };
  recommendations: string[];
  locationAnalysis?: any;
  projectVisualization?: any;
  detailedFinancialModel?: any;
  costBreakdown?: any;
  roiAnalysis?: any;
  dataIntegration?: any;
  realMarketInsights?: {
    avgMarketPrice: string;
    avgOccupancyRate: string;
    avgGrowthRate: string;
    dataSource: string;
    accuracy: string;
  };
  createdAt: string;
  projectDetails: any;
}

// Re-export types from shared schema
export type {
  Property,
  MarketData,
  DesignRequest,
} from "@shared/schema";

import { type DesignRequest, type InsertDesignRequest, type Property, type InsertProperty, type Agency, type InsertAgency, type MarketData, type InsertMarketData, type CostEstimate, type InsertCostEstimate, designRequests, properties, agencies, marketData, costEstimates } from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  // Design Requests
  createDesignRequest(request: InsertDesignRequest): Promise<DesignRequest>;
  getDesignRequest(id: string): Promise<DesignRequest | undefined>;
  updateDesignRequest(id: string, updates: Partial<DesignRequest>): Promise<DesignRequest | undefined>;

  // Properties
  getAllProperties(): Promise<Property[]>;
  getPropertiesByFilters(filters: { propertyType?: string; listingType?: string; neighborhood?: string }): Promise<Property[]>;
  getProperty(id: string): Promise<Property | undefined>;
  createProperty(property: InsertProperty): Promise<Property>;

  // Agencies
  getAllAgencies(): Promise<Agency[]>;
  getAgency(id: string): Promise<Agency | undefined>;
  createAgency(agency: InsertAgency): Promise<Agency>;

  // Market Data
  getMarketData(): Promise<MarketData[]>;
  getMarketDataByNeighborhood(neighborhood: string): Promise<MarketData[]>;
  createMarketData(data: InsertMarketData): Promise<MarketData>;

  // Cost Estimates
  createCostEstimate(estimate: InsertCostEstimate): Promise<CostEstimate>;
  getCostEstimate(id: string): Promise<CostEstimate | undefined>;
}

export class DatabaseStorage implements IStorage {
  // Design Requests
  async createDesignRequest(request: InsertDesignRequest): Promise<DesignRequest> {
    const [designRequest] = await db
      .insert(designRequests)
      .values(request)
      .returning();
    return designRequest;
  }

  async getDesignRequest(id: string): Promise<DesignRequest | undefined> {
    const [designRequest] = await db
      .select()
      .from(designRequests)
      .where(eq(designRequests.id, id));
    return designRequest || undefined;
  }

  async updateDesignRequest(id: string, updates: Partial<DesignRequest>): Promise<DesignRequest | undefined> {
    const [designRequest] = await db
      .update(designRequests)
      .set(updates)
      .where(eq(designRequests.id, id))
      .returning();
    return designRequest || undefined;
  }

  // Properties
  async getAllProperties(): Promise<Property[]> {
    return await db.select().from(properties);
  }

  async getPropertiesByFilters(filters: { propertyType?: string; listingType?: string; neighborhood?: string }): Promise<Property[]> {
    const whereConditions = [];
    
    if (filters.propertyType) {
      whereConditions.push(eq(properties.propertyType, filters.propertyType));
    }
    if (filters.listingType) {
      whereConditions.push(eq(properties.listingType, filters.listingType));
    }
    if (filters.neighborhood) {
      whereConditions.push(eq(properties.neighborhood, filters.neighborhood));
    }
    
    if (whereConditions.length === 0) {
      return await db.select().from(properties);
    }
    
    if (whereConditions.length === 1) {
      return await db.select().from(properties).where(whereConditions[0]);
    }
    
    return await db.select().from(properties).where(and(...whereConditions));
  }

  async getProperty(id: string): Promise<Property | undefined> {
    const [property] = await db
      .select()
      .from(properties)
      .where(eq(properties.id, id));
    return property || undefined;
  }

  async createProperty(property: InsertProperty): Promise<Property> {
    const [newProperty] = await db
      .insert(properties)
      .values(property)
      .returning();
    return newProperty;
  }

  // Agencies
  async getAllAgencies(): Promise<Agency[]> {
    return await db.select().from(agencies);
  }

  async getAgency(id: string): Promise<Agency | undefined> {
    const [agency] = await db
      .select()
      .from(agencies)
      .where(eq(agencies.id, id));
    return agency || undefined;
  }

  async createAgency(agency: InsertAgency): Promise<Agency> {
    const [newAgency] = await db
      .insert(agencies)
      .values(agency)
      .returning();
    return newAgency;
  }

  // Market Data
  async getMarketData(): Promise<MarketData[]> {
    return await db.select().from(marketData);
  }

  async getMarketDataByNeighborhood(neighborhood: string): Promise<MarketData[]> {
    return await db
      .select()
      .from(marketData)
      .where(eq(marketData.neighborhood, neighborhood));
  }

  async createMarketData(data: InsertMarketData): Promise<MarketData> {
    const [newData] = await db
      .insert(marketData)
      .values(data)
      .returning();
    return newData;
  }

  // Cost Estimates
  async createCostEstimate(estimate: InsertCostEstimate): Promise<CostEstimate> {
    const [costEstimate] = await db
      .insert(costEstimates)
      .values(estimate)
      .returning();
    return costEstimate;
  }

  async getCostEstimate(id: string): Promise<CostEstimate | undefined> {
    const [costEstimate] = await db
      .select()
      .from(costEstimates)
      .where(eq(costEstimates.id, id));
    return costEstimate || undefined;
  }
}

export const storage = new DatabaseStorage();
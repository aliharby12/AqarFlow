import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Design Requests Table
export const designRequests = pgTable("design_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  landArea: integer("land_area").notNull(),
  width: integer("width").notNull(),
  depth: integer("depth").notNull(),
  facades: integer("facades").notNull(),
  neighborhood: text("neighborhood").notNull(),
  propertyType: text("property_type").notNull(),
  designStyle: text("design_style").notNull(),
  roomTypes: jsonb("room_types").$type<string[]>().notNull(),
  designUrls: jsonb("design_urls").$type<string[]>(),
  pdfUrl: text("pdf_url"),
  status: text("status").notNull().default("pending"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// Cost Estimates Table
export const costEstimates = pgTable("cost_estimates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  landArea: integer("land_area").notNull(),
  propertyType: text("property_type").notNull(),
  roomTypes: jsonb("room_types").$type<string[]>().notNull(),
  neighborhood: text("neighborhood").notNull(),
  structuralCost: decimal("structural_cost", { precision: 12, scale: 2 }).notNull(),
  finishingCost: decimal("finishing_cost", { precision: 12, scale: 2 }).notNull(),
  electricalCost: decimal("electrical_cost", { precision: 12, scale: 2 }).notNull(),
  plumbingCost: decimal("plumbing_cost", { precision: 12, scale: 2 }).notNull(),
  hvacCost: decimal("hvac_cost", { precision: 12, scale: 2 }).notNull(),
  landscapingCost: decimal("landscaping_cost", { precision: 12, scale: 2 }).notNull(),
  permitsCost: decimal("permits_cost", { precision: 12, scale: 2 }).notNull(),
  contingencyCost: decimal("contingency_cost", { precision: 12, scale: 2 }).notNull(),
  totalCost: decimal("total_cost", { precision: 12, scale: 2 }).notNull(),
  costBreakdown: jsonb("cost_breakdown").$type<{
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
    permits: number;
    labor: number;
    contingency: number;
  }>().notNull(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// Properties Table
export const properties = pgTable("properties", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  price: decimal("price", { precision: 12, scale: 2 }).notNull(),
  area: integer("area").notNull(),
  bedrooms: integer("bedrooms"),
  bathrooms: integer("bathrooms"),
  propertyType: text("property_type").notNull(),
  listingType: text("listing_type").notNull(), // للبيع، للإيجار، للاستثمار
  neighborhood: text("neighborhood").notNull(),
  imageUrls: jsonb("image_urls").$type<string[]>().notNull(),
  investmentAnalysis: jsonb("investment_analysis").$type<{
    expectedGrowth: string;
    rentalYield?: string;
    rating: string;
    viability: string;
  }>().notNull(),
  features: jsonb("features").$type<string[]>(),
  available: boolean("available").notNull().default(true),
});

// Agents Table
export const agents = pgTable("agents", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  title: text("title").notNull(),
  imageUrl: text("image_url"),
  rating: decimal("rating", { precision: 2, scale: 1 }).notNull(),
  reviewCount: integer("review_count").notNull(),
  completedDeals: integer("completed_deals").notNull(),
  experience: integer("experience").notNull(),
  specialties: jsonb("specialties").$type<string[]>().notNull(),
  workAreas: jsonb("work_areas").$type<string[]>().notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
});

// Real Estate Agencies Table
export const agencies = pgTable("agencies", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  yearsInMarket: integer("years_in_market").notNull(),
  annualDeals: integer("annual_deals").notNull(),
  agentCount: integer("agent_count").notNull(),
  rating: decimal("rating", { precision: 2, scale: 1 }).notNull(),
  logoUrl: text("logo_url"),
});

// Market Analysis Data Table
export const marketData = pgTable("market_data", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  neighborhood: text("neighborhood").notNull(),
  pricePerSqm: decimal("price_per_sqm", { precision: 8, scale: 2 }).notNull(),
  transactionCount: integer("transaction_count").notNull(),
  growthPrediction: decimal("growth_prediction", { precision: 5, scale: 2 }).notNull(),
  investmentType: text("investment_type").notNull(),
  occupancyRate: decimal("occupancy_rate", { precision: 5, scale: 2 }).notNull(),
  avgSaleDays: integer("avg_sale_days").notNull(),
  month: text("month").notNull(),
  year: integer("year").notNull(),
});

// Insert Schemas
export const insertDesignRequestSchema = createInsertSchema(designRequests).omit({
  id: true,
  createdAt: true,
  designUrls: true,
  pdfUrl: true,
  status: true,
});

export const insertPropertySchema = createInsertSchema(properties).omit({
  id: true,
});

export const insertAgentSchema = createInsertSchema(agents).omit({
  id: true,
});

export const insertAgencySchema = createInsertSchema(agencies).omit({
  id: true,
});

export const insertMarketDataSchema = createInsertSchema(marketData).omit({
  id: true,
});

export const insertCostEstimateSchema = createInsertSchema(costEstimates).omit({
  id: true,
  createdAt: true,
});

// Types
export type DesignRequest = typeof designRequests.$inferSelect;
export type InsertDesignRequest = z.infer<typeof insertDesignRequestSchema>;

export type Property = typeof properties.$inferSelect;
export type InsertProperty = z.infer<typeof insertPropertySchema>;

export type Agent = typeof agents.$inferSelect;
export type InsertAgent = z.infer<typeof insertAgentSchema>;

export type Agency = typeof agencies.$inferSelect;
export type InsertAgency = z.infer<typeof insertAgencySchema>;

export type MarketData = typeof marketData.$inferSelect;
export type InsertMarketData = z.infer<typeof insertMarketDataSchema>;

export type CostEstimate = typeof costEstimates.$inferSelect;
export type InsertCostEstimate = z.infer<typeof insertCostEstimateSchema>;

// Additional types for frontend
export type DesignFormData = {
  landArea: number;
  width: number;
  depth: number;
  facades: number;
  neighborhood: string;
  propertyType: string;
  designStyle: string;
  roomTypes: string[];
};

export type GeneratedDesign = {
  id: string;
  mainDesignUrl: string;
  interiorUrls: string[];
  pdfUrl: string;
};

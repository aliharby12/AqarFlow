import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PropertyCard from "@/components/listings/PropertyCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Property, PropertyFilters } from "@/types";

export default function ListingsSection() {
  const [filters, setFilters] = useState<PropertyFilters>({});

  const { data: properties, isLoading } = useQuery<Property[]>({
    queryKey: ['/api/properties', filters.propertyType, filters.listingType, filters.neighborhood],
  });

  const handleFilterChange = (key: keyof PropertyFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value === 'all' ? undefined : value
    }));
  };

  if (isLoading) {
    return (
      <section className="py-12 bg-white fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">جاري تحميل العقارات...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-white fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">عرض العقارات</h2>
            <p className="text-muted-foreground">عقارات مختارة بعناية مع تحليل الاستثمار</p>
          </div>
          
          <div className="flex space-x-2 space-x-reverse">
            <Select onValueChange={(value) => handleFilterChange('listingType', value)}>
              <SelectTrigger className="w-40" data-testid="select-listing-type">
                <SelectValue placeholder="جميع الأنواع" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الأنواع</SelectItem>
                <SelectItem value="للبيع">للبيع</SelectItem>
                <SelectItem value="للإيجار">للإيجار</SelectItem>
                <SelectItem value="للاستثمار">للاستثمار</SelectItem>
              </SelectContent>
            </Select>
            
            <Select onValueChange={(value) => handleFilterChange('neighborhood', value)}>
              <SelectTrigger className="w-40" data-testid="select-neighborhood">
                <SelectValue placeholder="جميع الأحياء" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الأحياء</SelectItem>
                <SelectItem value="العليا">العليا</SelectItem>
                <SelectItem value="الملقا">الملقا</SelectItem>
                <SelectItem value="النرجس">النرجس</SelectItem>
                <SelectItem value="الياسمين">الياسمين</SelectItem>
                <SelectItem value="الربوة">الربوة</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties?.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            className="px-8 py-3"
            data-testid="button-load-more"
          >
            عرض المزيد من العقارات
          </Button>
        </div>
      </div>
    </section>
  );
}

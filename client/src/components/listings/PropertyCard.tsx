import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Expand, Bed, Bath, TrendingUp } from "lucide-react";
import type { Property } from "@/types";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const getListingTypeBadge = (listingType: string) => {
    switch (listingType) {
      case 'للبيع':
        return 'bg-green-100 text-green-800';
      case 'للإيجار':
        return 'bg-blue-100 text-blue-800';
      case 'للاستثمار':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatPrice = (price: string, listingType: string) => {
    const numPrice = parseFloat(price);
    if (listingType === 'للإيجار') {
      return `${numPrice.toLocaleString('ar-SA')} ريال/شهر`;
    }
    return `${numPrice.toLocaleString('ar-SA')} ريال`;
  };

  return (
    <Card className="property-card overflow-hidden hover:shadow-lg transition-all duration-300">
      {property.imageUrls && property.imageUrls[0] && (
        <img 
          src={property.imageUrls[0]}
          alt={property.title}
          className="w-full h-48 object-cover"
          data-testid={`img-property-${property.id}`}
        />
      )}
      
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold" data-testid={`text-property-title-${property.id}`}>
            {property.title}
          </h3>
          <Badge className={getListingTypeBadge(property.listingType)}>
            {property.listingType}
          </Badge>
        </div>
        
        <div className="text-2xl font-bold text-primary mb-4" data-testid={`text-property-price-${property.id}`}>
          {formatPrice(property.price, property.listingType)}
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center">
            <Expand className="w-4 h-4 ml-1" />
            <span>{property.area}م²</span>
          </div>
          {property.bedrooms && property.bedrooms > 0 && (
            <div className="flex items-center">
              <Bed className="w-4 h-4 ml-1" />
              <span>{property.bedrooms} غرف</span>
            </div>
          )}
          {property.bathrooms && property.bathrooms > 0 && (
            <div className="flex items-center">
              <Bath className="w-4 h-4 ml-1" />
              <span>{property.bathrooms} حمام</span>
            </div>
          )}
        </div>
        
        {/* Investment Analysis */}
        {property.investmentAnalysis && (
          <div className="bg-muted rounded-lg p-4 mb-4">
            <h4 className="font-medium text-sm mb-2 flex items-center">
              <TrendingUp className="w-4 h-4 ml-1 text-primary" />
              تحليل الاستثمار
            </h4>
            <div className="text-xs text-muted-foreground space-y-1">
              {property.investmentAnalysis.expectedGrowth && (
                <div>• متوقع نمو القيمة: {property.investmentAnalysis.expectedGrowth}</div>
              )}
              {property.investmentAnalysis.rentalYield && (
                <div>• عائد الإيجار المتوقع: {property.investmentAnalysis.rentalYield}</div>
              )}
              {property.investmentAnalysis.rating && (
                <div>• تقييم الاستثمار: {property.investmentAnalysis.rating}</div>
              )}
            </div>
          </div>
        )}
        
        <Button 
          className="w-full bg-primary text-primary-foreground hover:opacity-90"
          data-testid={`button-property-details-${property.id}`}
        >
          عرض التفاصيل
        </Button>
      </CardContent>
    </Card>
  );
}

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Phone, Eye } from "lucide-react";
import type { Agent } from "@/types";

interface AgentCardProps {
  agent: Agent;
}

export default function AgentCard({ agent }: AgentCardProps) {
  const renderStars = (rating: string) => {
    const numRating = parseFloat(rating);
    const fullStars = Math.floor(numRating);
    const hasHalfStar = numRating % 1 !== 0;
    
    return (
      <div className="flex text-yellow-400">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-current" />
        ))}
        {hasHalfStar && <Star className="w-4 h-4 fill-current opacity-50" />}
      </div>
    );
  };

  return (
    <Card className="shadow-sm border border-border">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          {agent.imageUrl && (
            <img 
              src={agent.imageUrl}
              alt={agent.name}
              className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              data-testid={`img-agent-${agent.id}`}
            />
          )}
          <h3 className="text-xl font-semibold" data-testid={`text-agent-name-${agent.id}`}>
            {agent.name}
          </h3>
          <p className="text-muted-foreground">{agent.title}</p>
        </div>

        {/* Rating */}
        <div className="flex items-center justify-center mb-4">
          {renderStars(agent.rating)}
          <span className="mr-2 text-sm text-muted-foreground" data-testid={`text-agent-rating-${agent.id}`}>
            ({agent.rating} من {agent.reviewCount} تقييم)
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-xl font-bold text-primary" data-testid={`text-agent-deals-${agent.id}`}>
              {agent.completedDeals}
            </div>
            <div className="text-xs text-muted-foreground">صفقة مكتملة</div>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-xl font-bold text-secondary" data-testid={`text-agent-experience-${agent.id}`}>
              {agent.experience}
            </div>
            <div className="text-xs text-muted-foreground">سنوات خبرة</div>
          </div>
        </div>

        {/* Specialties */}
        <div className="mb-6">
          <h4 className="font-medium mb-2">التخصصات:</h4>
          <div className="flex flex-wrap gap-2">
            {agent.specialties.map((specialty, index) => (
              <Badge 
                key={index}
                className={`text-xs ${index % 2 === 0 ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}`}
              >
                {specialty}
              </Badge>
            ))}
          </div>
        </div>

        {/* Work Areas */}
        <div className="mb-6">
          <h4 className="font-medium mb-2">مناطق العمل:</h4>
          <p className="text-sm text-muted-foreground">
            {agent.workAreas.join(', ')}
          </p>
        </div>

        {/* Contact */}
        <div className="flex space-x-2 space-x-reverse">
          <Button 
            className="flex-1 bg-primary text-primary-foreground hover:opacity-90 text-sm py-2"
            data-testid={`button-call-agent-${agent.id}`}
          >
            <Phone className="w-4 h-4 ml-1" />
            اتصال
          </Button>
          <Button 
            variant="outline"
            className="flex-1 hover:bg-accent text-sm py-2"
            data-testid={`button-view-agent-${agent.id}`}
          >
            <Eye className="w-4 h-4 ml-1" />
            الملف
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

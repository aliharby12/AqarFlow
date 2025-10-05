import { useQuery } from "@tanstack/react-query";
import AgentCard from "@/components/agents/AgentCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, Home } from "lucide-react";
import type { Agent, Agency } from "@/types";

export default function AgentsSection() {
  const { data: agents, isLoading: agentsLoading } = useQuery<Agent[]>({
    queryKey: ['/api/agents'],
  });

  const { data: agencies, isLoading: agenciesLoading } = useQuery<Agency[]>({
    queryKey: ['/api/agencies'],
  });

  if (agentsLoading || agenciesLoading) {
    return (
      <section className="py-12 bg-muted/30 fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">جاري تحميل بيانات الوسطاء...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-muted/30 fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">دليل الوسطاء العقاريين</h2>
          <p className="text-muted-foreground text-lg">وسطاء معتمدون مع تقييمات حقيقية من العملاء</p>
        </div>

        {/* Agents Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {agents?.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>

        {/* Top Agencies */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-12">أفضل المكاتب العقارية</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {agencies?.map((agency, index) => (
              <Card key={agency.id} className="p-8">
                <CardContent className="p-0">
                  <div className="flex items-center mb-6">
                    <div className={`p-3 rounded-lg ml-4 ${index === 0 ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                      {index === 0 ? <Building className="w-6 h-6" /> : <Home className="w-6 h-6" />}
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold" data-testid={`text-agency-name-${agency.id}`}>
                        {agency.name}
                      </h4>
                      <p className="text-muted-foreground">{agency.yearsInMarket} سنة في السوق</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-center mb-6">
                    <div>
                      <div className={`text-2xl font-bold ${index === 0 ? 'text-primary' : 'text-secondary'}`}>
                        {agency.annualDeals}+
                      </div>
                      <div className="text-sm text-muted-foreground">صفقة سنوياً</div>
                    </div>
                    <div>
                      <div className={`text-2xl font-bold ${index === 0 ? 'text-secondary' : 'text-primary'}`}>
                        {agency.agentCount}
                      </div>
                      <div className="text-sm text-muted-foreground">وسيط معتمد</div>
                    </div>
                    <div>
                      <div className={`text-2xl font-bold ${index === 0 ? 'text-primary' : 'text-secondary'}`}>
                        ⭐ 4.8
                      </div>
                      <div className="text-sm text-muted-foreground">تقييم العملاء</div>
                    </div>
                  </div>
                  
                  <Button 
                    className={`w-full py-3 ${index === 0 ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'} hover:opacity-90`}
                    data-testid={`button-agency-details-${agency.id}`}
                  >
                    تفاصيل المكتب
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

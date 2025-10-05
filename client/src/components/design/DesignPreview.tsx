import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Share, Compass } from "lucide-react";

interface DesignPreviewProps {
  generatedDesign: any;
}

export default function DesignPreview({ generatedDesign }: DesignPreviewProps) {

  const handleDownloadPDF = () => {
    if (generatedDesign?.pdfUrl) {
      window.open(generatedDesign.pdfUrl, '_blank');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'تصميم معماري من منصة العقار الذكي',
        text: 'شاهد هذا التصميم المعماري الرائع',
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <Card className="shadow-lg border border-border">
      <CardContent className="p-8">
        <h3 className="text-2xl font-semibold mb-6 text-card-foreground">معاينة التصميم</h3>
        
        {!generatedDesign ? (
          <div className="bg-muted rounded-lg p-8 text-center min-h-96 flex flex-col items-center justify-center">
            <Compass className="w-16 h-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-lg">املأ النموذج واضغط "إنشاء التصميم" لعرض المخطط</p>
          </div>
        ) : (
          <div className="fade-in">
            {/* Main Design Image */}
            {generatedDesign.designUrls && generatedDesign.designUrls[0] && (
              <img 
                src={generatedDesign.designUrls[0]}
                alt="التصميم المعماري الرئيسي" 
                className="w-full rounded-lg mb-4"
                data-testid="img-main-design"
              />
            )}
            
            {/* Additional Design Images - Show all images */}
            {generatedDesign.designUrls && generatedDesign.designUrls.length > 1 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {generatedDesign.designUrls.slice(1).map((url, index) => (
                  <div key={index} className="relative">
                    <img 
                      src={url}
                      alt={`تصميم إضافي ${index + 1}`}
                      className="w-full rounded-lg hover:scale-105 transition-transform cursor-pointer"
                      data-testid={`img-additional-${index}`}
                      onClick={() => window.open(url, '_blank')}
                    />
                    <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                      {['جانبي', 'جوي', 'مجلس', 'معيشة', 'مخطط', 'حديقة', 'ليلي'][index] || `صورة ${index + 1}`}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Design Details */}
            {generatedDesign.designResult && (
              <div className="space-y-4 mb-6">
                {/* Materials Section */}
                {generatedDesign.designResult.materials && (
                  <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 border border-primary/20">
                    <h4 className="font-bold mb-4 text-primary flex items-center">
                      🏗️ المواد المقترحة والمعتمدة
                    </h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-white rounded-lg p-4 shadow-sm border">
                        <p className="text-base font-semibold mb-3 text-green-700">
                          🧱 التكسيات الخارجية:
                        </p>
                        <ul className="text-sm space-y-2">
                          {generatedDesign.designResult.materials.exterior?.map((material, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-green-600 mr-2">✓</span>
                              <span>{material}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow-sm border">
                        <p className="text-base font-semibold mb-3 text-blue-700">
                          🏡 التشطيبات الداخلية:
                        </p>
                        <ul className="text-sm space-y-2">
                          {generatedDesign.designResult.materials.interior?.map((material, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-blue-600 mr-2">✓</span>
                              <span>{material}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Landscaping Section */}
                {generatedDesign.designResult.landscaping && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
                    <h4 className="font-bold mb-4 text-green-700 flex items-center">
                      🌳 التشجير والمناظر الطبيعية
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {generatedDesign.designResult.landscaping.map((plant, idx) => (
                        <div key={idx} className="flex items-start bg-white rounded-lg p-3 shadow-sm border border-green-100">
                          <span className="text-green-500 mr-2 mt-0.5">🌱</span>
                          <span className="text-sm">{plant}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Cost Estimation */}
                {generatedDesign.designResult.estimatedCost && (
                  <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-xl p-6">
                    <h4 className="font-bold mb-4 text-amber-800 flex items-center text-lg">
                      💰 التكلفة التقديرية الشاملة
                    </h4>
                    <div className="text-center mb-4">
                      <div className="text-3xl font-bold text-amber-700 bg-white rounded-lg py-3 px-6 inline-block shadow-md border border-amber-200">
                        💸 {generatedDesign.designResult.estimatedCost.total}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white rounded-lg p-4 text-center shadow-sm border border-amber-100">
                        <div className="text-2xl mb-2">🏗️</div>
                        <p className="font-semibold text-amber-800">الهيكل الإنشائي</p>
                        <p className="text-lg font-bold text-amber-700">{generatedDesign.designResult.estimatedCost.breakdown?.structure}</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 text-center shadow-sm border border-amber-100">
                        <div className="text-2xl mb-2">🎨</div>
                        <p className="font-semibold text-amber-800">التشطيبات والتكسيات</p>
                        <p className="text-lg font-bold text-amber-700">{generatedDesign.designResult.estimatedCost.breakdown?.finishes}</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 text-center shadow-sm border border-amber-100">
                        <div className="text-2xl mb-2">🌿</div>
                        <p className="font-semibold text-amber-800">التشجير والحدائق</p>
                        <p className="text-lg font-bold text-amber-700">{generatedDesign.designResult.estimatedCost.breakdown?.landscaping}</p>
                      </div>
                    </div>
                    <div className="text-center mt-4">
                      <p className="text-xs text-amber-600 bg-amber-100 rounded-lg py-2 px-4 inline-block">
                        * الأسعار تقديرية حسب أسعار السوق السعودي 2025 وقابلة للتغيير
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-3 space-x-reverse">
              <Button 
                className="flex-1 bg-secondary text-secondary-foreground hover:opacity-90"
                onClick={handleDownloadPDF}
                disabled={!generatedDesign.pdfUrl}
                data-testid="button-download-pdf"
              >
                <Download className="w-4 h-4 ml-2" />
                تحميل PDF
              </Button>
              <Button 
                variant="outline"
                className="flex-1 hover:bg-accent"
                onClick={handleShare}
                data-testid="button-share"
              >
                <Share className="w-4 h-4 ml-2" />
                مشاركة
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

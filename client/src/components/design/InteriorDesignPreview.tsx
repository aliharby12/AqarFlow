import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Share, Palette, Sofa, Eye, Lightbulb, ShoppingBag, ExternalLink, Star } from "lucide-react";

interface InteriorDesignPreviewProps {
  generatedDesign: any;
}

export default function InteriorDesignPreview({ generatedDesign }: InteriorDesignPreviewProps) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'تصميم داخلي من منصة وصل',
        text: 'شاهد هذا التصميم الداخلي الرائع',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <Card className="shadow-lg border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-purple-800 dark:text-purple-200">
          <div className="p-2 bg-purple-600 rounded-lg">
            <Eye className="h-6 w-6 text-white" />
          </div>
          معاينة التصميم الداخلي
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!generatedDesign ? (
          <div className="bg-white/70 dark:bg-gray-800/70 rounded-lg p-8 text-center min-h-96 flex flex-col items-center justify-center">
            <Palette className="w-16 h-16 text-purple-400 mb-4" />
            <p className="text-purple-600 dark:text-purple-300 text-lg">
              املأ النموذج واضغط "إنشاء التصميم الداخلي" لعرض النتيجة
            </p>
          </div>
        ) : (
          <div className="space-y-6 fade-in">
            {/* Interior Design Images */}
            {generatedDesign.design?.imageUrls && generatedDesign.design.imageUrls.length > 0 && (
              <div className="space-y-4">
                <h4 className="font-semibold text-purple-800 dark:text-purple-200 flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  صور التصميم الداخلي
                </h4>
                <div className="grid gap-4">
                  {generatedDesign.design.imageUrls.map((url: string, index: number) => (
                    <div key={index} className="relative">
                      <img 
                        src={url}
                        alt={`تصميم داخلي ${index + 1}`}
                        className="w-full rounded-lg hover:scale-105 transition-transform cursor-pointer shadow-lg"
                        onClick={() => window.open(url, '_blank')}
                        data-testid={`img-interior-${index}`}
                      />
                      <div className="absolute bottom-3 right-3 bg-purple-600/90 text-white px-3 py-1 rounded-full text-sm">
                        {index === 0 ? 'المنظر الرئيسي' : index === 1 ? 'تفاصيل الأثاث' : 'الإضاءة المزاجية'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Design Description */}
            {generatedDesign.design?.designDescription && (
              <Card className="bg-white/80 dark:bg-gray-800/80">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-3 flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    وصف التصميم
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {generatedDesign.design.designDescription}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Color Palette */}
            {generatedDesign.design?.colorPalette && generatedDesign.design.colorPalette.length > 0 && (
              <Card className="bg-white/80 dark:bg-gray-800/80">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-3 flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    لوحة الألوان
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {generatedDesign.design.colorPalette.map((color: string, index: number) => (
                      <div key={index} className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg">
                        <div className="w-6 h-6 rounded-full border-2 border-gray-300" 
                             style={{ 
                               backgroundColor: index === 0 ? '#8B7355' : 
                                              index === 1 ? '#D4C5B9' : 
                                              index === 2 ? '#6B46C1' : '#E5E5E5' 
                             }}>
                        </div>
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {typeof color === 'string' ? color : 
                           typeof color === 'object' && color !== null ? 
                           ((color as any).color || (color as any).name || (color as any).hex || JSON.stringify(color)) : 
                           String(color)}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Furniture */}
            {generatedDesign.design?.furniture && generatedDesign.design.furniture.length > 0 && (
              <Card className="bg-white/80 dark:bg-gray-800/80">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-3 flex items-center gap-2">
                    <Sofa className="h-5 w-5" />
                    الأثاث والتأثيث
                  </h4>
                  <div className="space-y-3">
                    {generatedDesign.design.furniture.map((item: string, index: number) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                        <Sofa className="h-5 w-5 text-purple-600 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                          {typeof item === 'string' ? item : 
                           typeof item === 'object' && item !== null ? 
                           ((item as any).name || (item as any).details || JSON.stringify(item)) : 
                           String(item)}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Lighting */}
            {generatedDesign.design?.lighting && (
              <Card className="bg-white/80 dark:bg-gray-800/80">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-3 flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    نظام الإضاءة
                  </h4>
                  <div className="p-3 bg-amber-50 dark:bg-amber-900/30 rounded-lg">
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                      {typeof generatedDesign.design.lighting === 'string' ? generatedDesign.design.lighting : 
                       typeof generatedDesign.design.lighting === 'object' && generatedDesign.design.lighting !== null ? 
                       ((generatedDesign.design.lighting as any).description || (generatedDesign.design.lighting as any).details || JSON.stringify(generatedDesign.design.lighting)) : 
                       String(generatedDesign.design.lighting)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Materials */}
            {generatedDesign.design?.materials && generatedDesign.design.materials.length > 0 && (
              <Card className="bg-white/80 dark:bg-gray-800/80">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-3">
                    🏗️ المواد والتشطيبات
                  </h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {generatedDesign.design.materials.map((material: string, index: number) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <span className="text-purple-600">✓</span>
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {typeof material === 'string' ? material : 
                           typeof material === 'object' && material !== null ? 
                           ((material as any).name || (material as any).type || JSON.stringify(material)) : 
                           String(material)}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Estimated Cost */}
            {generatedDesign.design?.estimatedCost && (
              <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 border-2 border-amber-200">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-3 flex items-center gap-2">
                    💰 التكلفة التقديرية
                  </h4>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {typeof generatedDesign.design.estimatedCost === 'string' ? generatedDesign.design.estimatedCost : 
                       typeof generatedDesign.design.estimatedCost === 'object' && generatedDesign.design.estimatedCost !== null ? 
                       ((generatedDesign.design.estimatedCost as any).total || (generatedDesign.design.estimatedCost as any).summary || JSON.stringify(generatedDesign.design.estimatedCost)) : 
                       String(generatedDesign.design.estimatedCost)}
                    </p>
                  </div>
                  <div className="text-center mt-3">
                    <Badge className="bg-amber-600 text-white">
                      * التكاليف تقديرية وقابلة للتغيير حسب المواصفات النهائية
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Similar Products Section */}
            {generatedDesign.similarProducts && generatedDesign.similarProducts.length > 0 && (
              <Card className="mt-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 border-emerald-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-emerald-800 dark:text-emerald-200">
                    <div className="p-2 bg-emerald-600 rounded-lg">
                      <ShoppingBag className="h-5 w-5 text-white" />
                    </div>
                    منتجات مشابهة للتصميم
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {generatedDesign.similarProducts.map((product: any, index: number) => (
                      <div 
                        key={index} 
                        className="bg-white/70 dark:bg-gray-800/70 rounded-lg p-4 border border-emerald-200 hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <h4 className="font-semibold text-emerald-800 dark:text-emerald-200 text-sm">
                              {product.name}
                            </h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                              {product.description}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 ml-2">
                            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                            <span className="text-xs text-gray-600">{product.rating}</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center mb-3">
                          <Badge variant="secondary" className="text-xs">
                            {product.category}
                          </Badge>
                          <span className="font-bold text-emerald-700 dark:text-emerald-300 text-sm">
                            {product.price}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            من {product.brand}
                          </span>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="text-xs h-7 border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                            onClick={() => {
                              let finalUrl = '';
                              
                              // Check if URL is already a complete link
                              if (product.url.startsWith('http://') || product.url.startsWith('https://')) {
                                finalUrl = product.url;
                              } 
                              // Check if URL starts with a domain (e.g., ikea.com.sa/ar/products/...)
                              else if (product.url.includes('.com') || product.url.includes('.sa')) {
                                finalUrl = product.url.startsWith('//') ? `https:${product.url}` : `https://${product.url}`;
                              }
                              // Fall back to creating search URLs based on store name
                              else {
                                const storeName = product.url.toLowerCase();
                                
                                if (storeName.includes('ايكيا') || storeName.includes('ikea')) {
                                  finalUrl = `https://www.ikea.com.sa/ar/search/?q=${encodeURIComponent(product.name)}`;
                                } else if (storeName.includes('هوم سنتر') || storeName.includes('homecenter')) {
                                  finalUrl = `https://www.homecenter.sa/ar/search?q=${encodeURIComponent(product.name)}`;
                                } else if (storeName.includes('جرير') || storeName.includes('jarir')) {
                                  finalUrl = `https://www.jarir.com/sa-ar/catalogsearch/result/?q=${encodeURIComponent(product.name)}`;
                                } else if (storeName.includes('ساكو') || storeName.includes('saco')) {
                                  finalUrl = `https://www.saco.sa/ar/search?query=${encodeURIComponent(product.name)}`;
                                } else if (storeName.includes('2xl')) {
                                  finalUrl = `https://www.2xl.com.sa/ar/search?q=${encodeURIComponent(product.name)}`;
                                } else if (storeName.includes('سنتر بوينت') || storeName.includes('centrepoint')) {
                                  finalUrl = `https://www.centrepointstores.com/sa/ar/search?q=${encodeURIComponent(product.name)}`;
                                } else {
                                  // More specific Google search with site restriction if possible
                                  const siteSearch = storeName.includes('.') ? ` site:${storeName.split(' ')[0]}` : '';
                                  finalUrl = `https://www.google.com/search?q=${encodeURIComponent(product.name + ' ' + product.brand)}${siteSearch}`;
                                }
                              }
                              
                              window.open(finalUrl, '_blank');
                            }}
                            data-testid={`button-product-${index}`}
                          >
                            <ExternalLink className="h-3 w-3 ml-1" />
                            عرض المنتج
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-center mt-4">
                    <Badge className="bg-emerald-600 text-white text-xs">
                      💡 المنتجات المقترحة تناسب ميزانيتك وأسلوب التصميم المختار
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-3 space-x-reverse pt-4 border-t border-purple-200">
              <Button 
                variant="outline"
                className="flex-1 border-purple-300 text-purple-700 hover:bg-purple-50"
                onClick={handleShare}
                data-testid="button-share-interior"
              >
                <Share className="w-4 h-4 ml-2" />
                مشاركة التصميم
              </Button>
              <Button 
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                disabled={!generatedDesign.design?.imageUrls?.[0]}
                onClick={() => generatedDesign.design?.imageUrls?.[0] && window.open(generatedDesign.design.imageUrls[0], '_blank')}
                data-testid="button-view-full"
              >
                <Eye className="w-4 h-4 ml-2" />
                عرض بالحجم الكامل
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
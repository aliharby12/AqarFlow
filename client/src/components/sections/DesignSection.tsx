import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, Home, Palette, Sofa, FileText, CheckCircle, MapPin, ChevronDown, ChevronUp } from "lucide-react";
import DesignForm from "@/components/design/DesignForm";
import InteriorDesignForm from "@/components/design/InteriorDesignForm";
import LandPlanningForm from "@/components/design/LandPlanningForm";
import DesignPreview from "@/components/design/DesignPreview";
import InteriorDesignPreview from "@/components/design/InteriorDesignPreview";
import LandPlanningPreview from "@/components/design/LandPlanningPreview";
import { CostEstimate } from "@/components/design/CostEstimate";

export default function DesignSection() {
  const [generatedDesign, setGeneratedDesign] = useState(null);
  const [costEstimate, setCostEstimate] = useState(null);
  const [activeTab, setActiveTab] = useState("architectural");
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({});

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handleDesignGenerated = (design: any) => {
    setGeneratedDesign(design);
  };

  const handleCostCalculated = (cost: any) => {
    setCostEstimate(cost);
  };

  // Building codes and regulations
  const saudiBuildingCodes = {
    residential: [
      "SBC 101 - الأحمال والقوى",
      "SBC 201 - أحكام عامة للبناء", 
      "SBC 301 - الوقاية من الحريق",
      "SBC 401 - المباني السكنية",
      "SBC 501 - الميكانيكا والسباكة",
      "SBC 601 - الكهرباء",
      "SBC 701 - الطاقة والعزل الحراري"
    ],
    commercial: [
      "SBC 101 - الأحمال والقوى التجارية",
      "SBC 201 - أحكام عامة للمباني التجارية",
      "SBC 301 - الوقاية من الحريق التجاري", 
      "SBC 801 - المباني التجارية",
      "SBC 901 - الوصول للمعاقين",
      "SBC 501 - أنظمة التهوية التجارية",
      "SBC 1001 - اللافتات والإعلانات"
    ]
  };

  return (
    <section className="py-12 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            التصاميم الهندسية والمعمارية المتقدمة
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            خدمات تصميم شاملة تتضمن التصاميم المعمارية والديكور الداخلي مع الالتزام بأكواد البناء السعودية
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto">
            <TabsTrigger value="architectural" className="flex items-center gap-2" data-testid="tab-architectural">
              <Building2 className="h-4 w-4" />
              التصاميم المعمارية
            </TabsTrigger>
            <TabsTrigger value="interior" className="flex items-center gap-2" data-testid="tab-interior">
              <Palette className="h-4 w-4" />
              الديكور الداخلي
            </TabsTrigger>
            <TabsTrigger value="landplanning" className="flex items-center gap-2" data-testid="tab-landplanning">
              <MapPin className="h-4 w-4" />
              تخطيط الأراضي
            </TabsTrigger>
          </TabsList>

          {/* Architectural Design Tab */}
          <TabsContent value="architectural" className="space-y-8">
            {/* Building Types Section - مبسط */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Residential Section */}
              <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-200">
                        <Home className="h-6 w-6" />
                        🏠 المباني السكنية
                      </CardTitle>
                      <p className="text-green-700 dark:text-green-300 text-sm">
                        فلل، شقق، مجمعات سكنية، قصور
                      </p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-green-600"
                      onClick={() => toggleSection('residential')}
                    >
                      {expandedSections['residential'] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      {expandedSections['residential'] ? 'إخفاء' : 'المزيد'}
                    </Button>
                  </div>
                </CardHeader>
                {expandedSections['residential'] && (
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2 flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          أكواد البناء السعودية للسكني:
                        </h4>
                        <div className="space-y-1">
                          {saudiBuildingCodes.residential.map((code, index) => (
                            <div key={index} className="flex items-center gap-2 text-xs">
                              <CheckCircle className="h-3 w-3 text-green-600" />
                              <span>{code}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="pt-3 border-t border-green-200">
                        <h5 className="font-medium text-green-800 dark:text-green-200 mb-2">أنواع الاستخدام السكني:</h5>
                        <div className="flex flex-wrap gap-1">
                          {["عمارة سكنية", "فلة", "شقة", "مجمع سكني مغلق", "تاون هاوس", "بنت هاوس", "أدوار", "مزرعة", "استراحة", "شالية"].map((type) => (
                            <Badge key={type} className="bg-green-600 text-white text-xs">{type}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>

              {/* Commercial Section */}
              <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
                        <Building2 className="h-6 w-6" />
                        🏢 المباني التجارية
                      </CardTitle>
                      <p className="text-blue-700 dark:text-blue-300 text-sm">
                        مكاتب، محلات، مراكز تجارية، فنادق
                      </p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-blue-600"
                      onClick={() => toggleSection('commercial')}
                    >
                      {expandedSections['commercial'] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      {expandedSections['commercial'] ? 'إخفاء' : 'المزيد'}
                    </Button>
                  </div>
                </CardHeader>
                {expandedSections['commercial'] && (
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2 flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          أكواد البناء السعودية للتجاري:
                        </h4>
                        <div className="space-y-1">
                          {saudiBuildingCodes.commercial.map((code, index) => (
                            <div key={index} className="flex items-center gap-2 text-xs">
                              <CheckCircle className="h-3 w-3 text-blue-600" />
                              <span>{code}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="pt-3 border-t border-blue-200">
                        <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-2">أنواع الاستخدام التجاري:</h5>
                        <div className="flex flex-wrap gap-1">
                          {["عمارة تجارية", "مكتب", "محل تجاري", "مطعم", "مقهى", "صالون", "مجمع تجاري", "فندق", "مستشفى", "صيدلية"].map((type) => (
                            <Badge key={type} className="bg-blue-600 text-white text-xs">{type}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            </div>

            {/* Project Information Header */}
            <Card className="mb-8 border-2 border-indigo-200 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950 dark:to-blue-950">
              <CardHeader>
                <CardTitle className="text-center text-2xl text-indigo-800 dark:text-indigo-200">
                  📋 معلومات المشروع المعماري
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Residential Project Info */}
                  <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-6 border-2 border-green-200">
                    <h3 className="text-lg font-bold text-green-800 dark:text-green-200 mb-4 flex items-center gap-2">
                      🏠 معلومات المشاريع السكنية
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">أنواع العقارات السكنية:</h4>
                        <div className="text-sm text-green-600 dark:text-green-400 space-y-1">
                          <div>• <strong>عمارة سكنية:</strong> مباني متعددة الطوابق للسكن</div>
                          <div>• <strong>فلة:</strong> منازل مستقلة بحدائق خاصة</div>
                          <div>• <strong>شقة:</strong> وحدات سكنية في مباني مشتركة</div>
                          <div>• <strong>مجمع سكني مغلق:</strong> مجتمعات سكنية محاطة بأسوار</div>
                          <div>• <strong>تاون هاوس:</strong> منازل متصلة بطرازعصري</div>
                          <div>• <strong>بنت هاوس:</strong> شقق علوية فاخرة</div>
                          <div>• <strong>أدوار:</strong> طوابق منفصلة في مباني</div>
                          <div>• <strong>مزرعة:</strong> مساكن في مناطق زراعية</div>
                          <div>• <strong>استراحة:</strong> منازل للراحة والاسترخاء</div>
                          <div>• <strong>شالية:</strong> منازل صيفية أو جبلية</div>
                        </div>
                      </div>
                      
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                        <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">🏗️ أكواد البناء السعودية للسكني:</h4>
                        <div className="text-xs space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            <span>SBC 401 - المباني السكنية</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            <span>SBC 701 - الطاقة والعزل الحراري</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            <span>SBC 301 - الوقاية من الحريق</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            <span>SBC 501 - الميكانيكا والسباكة</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Commercial Project Info */}
                  <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-6 border-2 border-blue-200">
                    <h3 className="text-lg font-bold text-blue-800 dark:text-blue-200 mb-4 flex items-center gap-2">
                      🏢 معلومات المشاريع التجارية
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">أنواع العقارات التجارية:</h4>
                        <div className="text-sm text-blue-600 dark:text-blue-400 space-y-1">
                          <div>• <strong>أبراج:</strong> مباني شاهقة متعددة الاستخدامات</div>
                          <div>• <strong>مراكز تجارية:</strong> مجمعات للتسوق والخدمات</div>
                          <div>• <strong>ستريب مول:</strong> محلات تجارية في خط واحد</div>
                          <div>• <strong>مستشفيات:</strong> منشآت طبية متخصصة</div>
                          <div>• <strong>سكن عمال:</strong> مباني إقامة للعمالة</div>
                          <div>• <strong>مبنى مكتبي:</strong> مكاتب إدارية وتجارية</div>
                          <div>• <strong>مبنى درايف ثرو:</strong> خدمات السيارات السريعة</div>
                        </div>
                      </div>
                      
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">🏗️ أكواد البناء السعودية للتجاري:</h4>
                        <div className="text-xs space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            <span>SBC 801 - المباني التجارية</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            <span>SBC 901 - الوصول للمعاقين</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            <span>SBC 1001 - اللافتات والإعلانات</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            <span>SBC 301 - الوقاية من الحريق التجاري</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Requirements */}
                <div className="mt-6 bg-amber-50 dark:bg-amber-950/30 rounded-lg p-4 border border-amber-200">
                  <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2 flex items-center gap-2">
                    📊 متطلبات إضافية لجميع المشاريع
                  </h4>
                  <div className="grid md:grid-cols-3 gap-4 text-sm text-amber-700 dark:text-amber-300">
                    <div>
                      <strong>المتطلبات البيئية:</strong>
                      <ul className="mt-1 space-y-1 text-xs">
                        <li>• تقييم الأثر البيئي</li>
                        <li>• كفاءة الطاقة</li>
                        <li>• إدارة المياه</li>
                      </ul>
                    </div>
                    <div>
                      <strong>متطلبات السلامة:</strong>
                      <ul className="mt-1 space-y-1 text-xs">
                        <li>• أنظمة الإنذار</li>
                        <li>• مخارج الطوارئ</li>
                        <li>• مقاومة الزلازل</li>
                      </ul>
                    </div>
                    <div>
                      <strong>المتطلبات التقنية:</strong>
                      <ul className="mt-1 space-y-1 text-xs">
                        <li>• البنية التحتية الذكية</li>
                        <li>• الاتصالات</li>
                        <li>• أنظمة الأمان</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Design Form and Preview */}
            <div className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <DesignForm 
                  onDesignGenerated={handleDesignGenerated} 
                  onCostCalculated={handleCostCalculated}
                />
                <DesignPreview generatedDesign={generatedDesign} />
              </div>
              
              {/* Cost Estimate Results */}
              {costEstimate && (
                <div className="mt-8">
                  <CostEstimate costResult={costEstimate} />
                </div>
              )}
            </div>
          </TabsContent>

          {/* Interior Design Tab */}
          <TabsContent value="interior" className="space-y-8">
            <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-800 dark:text-purple-200 text-2xl">
                  <Palette className="h-7 w-7" />
                  🎨 الديكور والتصميم الداخلي المتقدم
                </CardTitle>
                <p className="text-purple-700 dark:text-purple-300">
                  تصاميم داخلية فاخرة مع خدمات التأثيث المتكاملة
                </p>
              </CardHeader>
              <CardContent>
                {/* Interior Design Categories */}
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2 flex items-center gap-2">
                      <Home className="h-4 w-4" />
                      غرف المعيشة
                    </h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>• صالات استقبال</div>
                      <div>• مجالس رجال</div>
                      <div>• مجالس نساء</div>
                      <div>• غرف عائلية</div>
                    </div>
                  </div>

                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2 flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      غرف النوم
                    </h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>• غرفة نوم رئيسية</div>
                      <div>• غرف أطفال</div>
                      <div>• غرف ضيوف</div>
                      <div>• دريسنج روم</div>
                    </div>
                  </div>

                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2 flex items-center gap-2">
                      <Sofa className="h-4 w-4" />
                      مساحات أخرى
                    </h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>• مطابخ عصرية</div>
                      <div>• مكاتب منزلية</div>
                      <div>• صالات طعام</div>
                      <div>• حمامات فاخرة</div>
                    </div>
                  </div>
                </div>

                {/* Furnishing Service Notice */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 border border-amber-200 rounded-lg p-6 mb-6">
                  <div className="flex items-start gap-3">
                    <Sofa className="h-6 w-6 text-amber-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
                        ✨ خدمة التأثيث المتكاملة
                      </h4>
                      <p className="text-amber-700 dark:text-amber-300 text-sm mb-3">
                        نقوم بإضافة التأثيث المناسب تلقائياً على التصميم الداخلي المختار ليصبح جاهزاً للتنفيذ
                      </p>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <div className="text-xs text-amber-600 font-medium">يشمل التأثيث:</div>
                          <div className="text-xs text-amber-700 dark:text-amber-300">
                            • أثاث مخصص حسب المساحة<br />
                            • إكسسوارات ديكورية<br />
                            • إضاءة متقدمة<br />
                            • ستائر ومفروشات
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-xs text-amber-600 font-medium">مميزات الخدمة:</div>
                          <div className="text-xs text-amber-700 dark:text-amber-300">
                            • تناسق كامل مع التصميم<br />
                            • اختيار ألوان متناغمة<br />
                            • مقاسات دقيقة<br />
                            • جودة عالية مضمونة
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Interior Design Form and Preview */}
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <InteriorDesignForm onDesignGenerated={handleDesignGenerated} />
              <InteriorDesignPreview generatedDesign={generatedDesign} />
            </div>
          </TabsContent>

          {/* Land Planning Tab */}
          <TabsContent value="landplanning" className="space-y-8">
            <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-green-800 dark:text-green-200">
                  <div className="p-2 bg-green-600 rounded-lg">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  تخطيط وفرز الأراضي الخام
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Land Deed Types */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <Card className="bg-white/70 dark:bg-gray-800/70">
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-green-700 dark:text-green-300 mb-3">صك زراعي</h4>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <li>• تحويل للاستخدام السكني</li>
                          <li>• تحويل للاستخدام التجاري</li>
                          <li>• الحفاظ على الطابع الزراعي</li>
                          <li>• متطلبات الري والصرف</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/70 dark:bg-gray-800/70">
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-green-700 dark:text-green-300 mb-3">أرض خام</h4>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <li>• تخطيط سكني شامل</li>
                          <li>• مشاريع تجارية متكاملة</li>
                          <li>• استخدام مختلط</li>
                          <li>• مراكز الأحياء</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/70 dark:bg-gray-800/70">
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-green-700 dark:text-green-300 mb-3">صك استثماري</h4>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <li>• مجمعات تجارية كبرى</li>
                          <li>• أبراج متعددة الاستخدام</li>
                          <li>• مراكز خدمية متقدمة</li>
                          <li>• مشاريع سياحية</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Government Requirements */}
                  <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-blue-800 dark:text-blue-200 text-lg">
                        📋 الاشتراطات الحكومية والخدمات الأساسية
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div>
                          <h5 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">🏛️ البلدية والأمانة</h5>
                          <ul className="text-sm space-y-1">
                            <li>• رخصة فرز وتقسيم</li>
                            <li>• موافقة المخطط العام</li>
                            <li>• اشتراطات الارتدادات</li>
                            <li>• نسب البناء المسموحة</li>
                            <li>• مواقف السيارات</li>
                            <li>• المساحات الخضراء</li>
                          </ul>
                        </div>

                        <div>
                          <h5 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">⚡ الكهرباء</h5>
                          <ul className="text-sm space-y-1">
                            <li>• شبكة الكهرباء الرئيسية</li>
                            <li>• محطات التحويل</li>
                            <li>• الإنارة العامة</li>
                            <li>• أعمدة الإنارة</li>
                            <li>• خطوط التوزيع</li>
                            <li>• العدادات الذكية</li>
                          </ul>
                        </div>

                        <div>
                          <h5 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">💧 المياه والصرف</h5>
                          <ul className="text-sm space-y-1">
                            <li>• شبكة المياه الرئيسية</li>
                            <li>• محطات الضخ</li>
                            <li>• شبكة الصرف الصحي</li>
                            <li>• معالجة مياه الأمطار</li>
                            <li>• خزانات المياه</li>
                            <li>• أنظمة الري</li>
                          </ul>
                        </div>

                        <div>
                          <h5 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">📡 الاتصالات</h5>
                          <ul className="text-sm space-y-1">
                            <li>• شبكة الألياف البصرية</li>
                            <li>• أبراج الاتصالات</li>
                            <li>• شبكة الإنترنت</li>
                            <li>• أنظمة الأمان والمراقبة</li>
                            <li>• البنية التحتية الذكية</li>
                            <li>• شبكات 5G</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Pricing Options */}
                  <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 border-amber-200">
                    <CardHeader>
                      <CardTitle className="text-amber-800 dark:text-amber-200 text-lg">
                        💰 خيارات التسعير لتخطيط الأراضي
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-6">
                        <Card className="bg-white/80 dark:bg-gray-800/80 border-2 border-green-300">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-center text-green-700 dark:text-green-300">
                              📍 تخطيط بدائي
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="text-center">
                              <span className="text-2xl font-bold text-green-600">15-25 ريال/م²</span>
                              <p className="text-sm text-gray-600">للمساحات الكبيرة</p>
                            </div>
                            <ul className="text-sm space-y-1">
                              <li>• مخطط أساسي للفرز</li>
                              <li>• تحديد الطرق الرئيسية</li>
                              <li>• الخدمات الأساسية فقط</li>
                              <li>• موافقات بدائية</li>
                            </ul>
                          </CardContent>
                        </Card>

                        <Card className="bg-white/80 dark:bg-gray-800/80 border-2 border-blue-300">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-center text-blue-700 dark:text-blue-300">
                              🏘️ تخطيط متوسط
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="text-center">
                              <span className="text-2xl font-bold text-blue-600">35-55 ريال/م²</span>
                              <p className="text-sm text-gray-600">الخيار الأكثر طلباً</p>
                            </div>
                            <ul className="text-sm space-y-1">
                              <li>• تخطيط شامل مع الخدمات</li>
                              <li>• شبكات البنية التحتية</li>
                              <li>• مساحات خضراء ومرافق</li>
                              <li>• موافقات حكومية كاملة</li>
                            </ul>
                          </CardContent>
                        </Card>

                        <Card className="bg-white/80 dark:bg-gray-800/80 border-2 border-purple-300">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-center text-purple-700 dark:text-purple-300">
                              🌟 تخطيط فاخر
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="text-center">
                              <span className="text-2xl font-bold text-purple-600">75-120 ريال/م²</span>
                              <p className="text-sm text-gray-600">للمشاريع المتميزة</p>
                            </div>
                            <ul className="text-sm space-y-1">
                              <li>• تخطيط ذكي متقدم</li>
                              <li>• أنظمة ذكية شاملة</li>
                              <li>• تصميم ميادين ومعالم</li>
                              <li>• استدامة بيئية متقدمة</li>
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                      
                      <div className="mt-6 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg border">
                        <h4 className="font-semibold text-amber-700 dark:text-amber-300 mb-2">
                          📊 مثال تفصيلي للتسعير (أرض 10,000 م²)
                        </h4>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="font-medium">تخطيط بدائي:</span>
                            <p>20 ريال/م² × 10,000 م² = 200,000 ريال</p>
                          </div>
                          <div>
                            <span className="font-medium">تخطيط متوسط:</span>
                            <p>45 ريال/م² × 10,000 م² = 450,000 ريال</p>
                          </div>
                          <div>
                            <span className="font-medium">تخطيط فاخر:</span>
                            <p>95 ريال/م² × 10,000 م² = 950,000 ريال</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {/* Land Planning Form and Preview */}
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <LandPlanningForm onPlanGenerated={handleDesignGenerated} />
              <LandPlanningPreview generatedPlan={generatedDesign} />
            </div>
          </TabsContent>
        </Tabs>

        {/* Key Features */}
        <Card className="mt-8 border-2 border-indigo-200 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950 dark:to-blue-950">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-indigo-800 dark:text-indigo-200 mb-4 text-center">
              🌟 مميزات منصة وصل للتصميم
            </h3>
            <div className="grid md:grid-cols-5 gap-4">
              <div className="text-center p-3">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-sm mb-1">التزام كامل</h4>
                <p className="text-xs text-muted-foreground">بأكواد البناء السعودية</p>
              </div>
              
              <div className="text-center p-3">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-sm mb-1">تصاميم شاملة</h4>
                <p className="text-xs text-muted-foreground">سكنية وتجارية متقدمة</p>
              </div>
              
              <div className="text-center p-3">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Palette className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-sm mb-1">ديكور متكامل</h4>
                <p className="text-xs text-muted-foreground">مع خدمة التأثيث</p>
              </div>
              
              <div className="text-center p-3">
                <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Sofa className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-sm mb-1">جاهز للتنفيذ</h4>
                <p className="text-xs text-muted-foreground">تصاميم قابلة للتطبيق فوراً</p>
              </div>

              <div className="text-center p-3">
                <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-sm mb-1">تخطيط أراضي</h4>
                <p className="text-xs text-muted-foreground">فرز ومخططات معتمدة</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
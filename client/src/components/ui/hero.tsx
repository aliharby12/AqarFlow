export default function Hero() {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* خلفية متحركة */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-primary/3 to-transparent"></div>
      
      <div className="relative max-w-7xl mx-auto text-center">
        <div className="fade-in">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              وصل للتقنيات العقارية
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
            حلول عقارية متكاملة بتقنية الذكاء الاصطناعي - تصاميم هندسية، تحليل السوق، دراسات الجدوى، وعروض العقارات
          </p>
        </div>
        
        <div className="slide-up grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white/60 dark:bg-card/60 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-white/20 interactive-element">
            <div className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-2">15,000+</div>
            <div className="text-muted-foreground font-medium">تصميم هندسي</div>
          </div>
          <div className="bg-white/60 dark:bg-card/60 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-white/20 interactive-element">
            <div className="text-4xl font-bold bg-gradient-to-r from-secondary to-secondary/80 bg-clip-text text-transparent mb-2">25,000+</div>
            <div className="text-muted-foreground font-medium">تحليل سوق</div>
          </div>
          <div className="bg-white/60 dark:bg-card/60 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-white/20 interactive-element">
            <div className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">50,000+</div>
            <div className="text-muted-foreground font-medium">عقار مدرج</div>
          </div>
        </div>
      </div>
    </section>
  );
}

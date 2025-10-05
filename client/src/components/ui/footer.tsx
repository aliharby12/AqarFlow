import { Building, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 space-x-reverse mb-4">
              <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                <Building className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold">وصل للتقنيات العقارية</span>
            </div>
            <p className="text-background/80 mb-4">
              منصة شاملة للخدمات العقارية في المملكة العربية السعودية
            </p>
            <div className="flex space-x-3 space-x-reverse">
              <i className="fab fa-twitter text-background/60 hover:text-background cursor-pointer"></i>
              <i className="fab fa-linkedin text-background/60 hover:text-background cursor-pointer"></i>
              <i className="fab fa-instagram text-background/60 hover:text-background cursor-pointer"></i>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">الخدمات</h4>
            <ul className="space-y-2 text-background/80">
              <li><a href="#" className="hover:text-background">التصاميم الهندسية</a></li>
              <li><a href="#" className="hover:text-background">تحليل السوق</a></li>
              <li><a href="#" className="hover:text-background">عرض العقارات</a></li>
              <li><a href="#" className="hover:text-background">دليل الوسطاء</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">الدعم</h4>
            <ul className="space-y-2 text-background/80">
              <li><a href="#" className="hover:text-background">مركز المساعدة</a></li>
              <li><a href="#" className="hover:text-background">اتصل بنا</a></li>
              <li><a href="#" className="hover:text-background">الأسئلة الشائعة</a></li>
              <li><a href="#" className="hover:text-background">سياسة الخصوصية</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">تواصل معنا</h4>
            <div className="space-y-3 text-background/80">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Phone className="w-4 h-4" />
                <span>+966 11 123 4567</span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Mail className="w-4 h-4" />
                <span>info@smartrealestate.sa</span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <MapPin className="w-4 h-4" />
                <span>الرياض، المملكة العربية السعودية</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/60">
          <p>&copy; 2024 وصل للتقنيات العقارية. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}

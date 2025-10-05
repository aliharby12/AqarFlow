import { Building, Search, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ActiveSection } from "@/types";

interface NavigationProps {
  activeSection: ActiveSection;
  onSectionChange: (section: ActiveSection) => void;
}

export default function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  const navItems = [
    { id: 'design' as ActiveSection, label: 'التصاميم الهندسية', testId: 'nav-design' },
    { id: 'analysis' as ActiveSection, label: 'تحليل السوق', testId: 'nav-analysis' },
    { id: 'listings' as ActiveSection, label: 'عرض العقارات', testId: 'nav-listings' },
    { id: 'studies' as ActiveSection, label: 'دراسة المشاريع العقارية', testId: 'nav-studies' },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <header className="glass-effect shadow-lg border-b border-border/50 sticky top-0 z-50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="bg-gradient-to-br from-primary to-secondary text-primary-foreground p-3 rounded-2xl shadow-lg interactive-element">
                <Building className="text-xl w-7 h-7" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">وصل للتقنيات العقارية</h1>
                <p className="text-sm text-muted-foreground -mt-1">حلول عقارية متكاملة</p>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-2 space-x-reverse bg-muted/30 p-1 rounded-2xl">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  data-testid={item.testId}
                  className={`nav-btn px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeSection === item.id
                      ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                      : 'text-muted-foreground hover:text-primary hover:bg-white/80 dark:hover:bg-muted/80'
                  }`}
                  onClick={() => onSectionChange(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </nav>
            
            <div className="flex items-center space-x-3 space-x-reverse">
              <Button 
                className="bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground hover:from-secondary/90 hover:to-secondary/70 shadow-lg rounded-xl px-6 py-3 interactive-element"
                data-testid="button-register"
              >
                <UserPlus className="w-4 h-4 ml-2" />
                إنشاء حساب
              </Button>
              <button 
                className="text-muted-foreground hover:text-primary p-3 rounded-xl hover:bg-white/80 dark:hover:bg-muted/80 interactive-element"
                data-testid="button-search"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-white border-b border-border px-4 py-2">
        <div className="flex space-x-2 space-x-reverse overflow-x-auto">
          {navItems.map((item) => (
            <button
              key={`mobile-${item.id}`}
              data-testid={`mobile-${item.testId}`}
              className={`nav-btn whitespace-nowrap px-4 py-2 rounded-lg transition-colors ${
                activeSection === item.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent'
              }`}
              onClick={() => onSectionChange(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

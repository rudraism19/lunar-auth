import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import ThreeBackground from './ThreeBackground';

interface LayoutProps {
  children: React.ReactNode;
  currentSection: string;
  onSectionChange: (section: string) => void;
}

const Layout = ({ children, currentSection, onSectionChange }: LayoutProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'events', label: 'Events' },
    { id: 'calendar', label: 'Calendar' },
    { id: 'features', label: 'Features' },
    { id: 'attendance', label: 'Attendance' },
    { id: 'aims', label: 'Aims' },
    { id: 'about', label: 'About Author' },
  ];

  // Don't render Layout for home section
  if (currentSection === 'home') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen gradient-secondary relative overflow-hidden">
      {/* Three.js Background */}
      <ThreeBackground />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gradient-to-r from-yellow-50/90 via-blue-50/90 to-red-50/90 backdrop-blur-md border-b-2 border-yellow-200/50 z-50 shadow-primary">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img 
                src="https://img.icons8.com/color/48/graduation-cap.png" 
                alt="College Logo" 
                className="w-10 h-10 rounded-full shadow-secondary"
              />
              <span className="text-2xl font-bold text-primary" style={{ textShadow: '0 0 10px rgba(33, 150, 243, 0.15)' }}>FestHub</span>
            </div>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Button
                    variant={currentSection === item.id ? "default" : "ghost"}
                    onClick={() => onSectionChange(item.id)}
                    className={`font-medium transition-all duration-300 ${
                      currentSection === item.id 
                        ? 'btn-festhub' 
                        : 'bg-gradient-to-r from-blue-50 to-yellow-50 text-primary border border-blue-200/50 hover:btn-festhub hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Button>
                </li>
              ))}
            </ul>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 animate-slide-up">
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={currentSection === item.id ? "default" : "ghost"}
                    onClick={() => {
                      onSectionChange(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`justify-start transition-all duration-300 ${
                      currentSection === item.id 
                        ? 'btn-festhub' 
                        : 'bg-gradient-to-r from-blue-50 to-yellow-50 text-primary border border-blue-200/50 hover:btn-festhub hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20 relative z-10">
        <div className="section-enter">
          {children}
        </div>
      </main>

      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-muted z-40">
        <div className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300 ease-out" style={{ width: '0%' }} />
      </div>
    </div>
  );
};

export default Layout;
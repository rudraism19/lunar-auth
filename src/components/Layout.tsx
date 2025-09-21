import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, LogOut, User as UserIcon, Sparkles, Home, Calendar as CalendarIcon, Users, CheckSquare, Target } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface LayoutProps {
  children: React.ReactNode;
  currentSection: string;
  onSectionChange: (section: string) => void;
  user: any; // Simplified user object for now
}

const Layout = ({ children, currentSection, onSectionChange, user }: LayoutProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'events', label: 'Events', icon: Users },
    { id: 'calendar', label: 'Calendar', icon: CalendarIcon },
    { id: 'attendance', label: 'Attendance', icon: CheckSquare },
    { id: 'features', label: 'Features', icon: Sparkles },
    { id: 'aims', label: 'Aims', icon: Target },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleScroll = () => {
    const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    setScrollProgress((window.scrollY / totalHeight) * 100);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/10 to-accent/5">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-md border-b border-border z-50 animate-in fade-in slide-in-from-top-4 duration-500">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110">
                    <img src="/image.png" alt="FestHub Logo" className="w-full h-full object-cover rounded-full" />
                </div>
                <span className="text-2xl font-bold text-primary">FestHub</span>
            </div>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-6">
              {navItems.map((item, index) => (
                <li key={item.id} className="animate-in fade-in slide-in-from-top-2" style={{ animationDelay: `${100 + index * 100}ms`}}>
                  <Button
                    variant={currentSection === item.id ? "default" : "ghost"}
                    onClick={() => onSectionChange(item.id)}
                    className="font-medium transition-transform hover:scale-105"
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Button>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4">
              {user && (
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full transition-transform hover:scale-110">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>
                          {user.email ? user.email.charAt(0).toUpperCase() : <UserIcon />}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onSectionChange('user-info')}>
                      <UserIcon className="mr-2 h-4 w-4" />
                      <span>My Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
               {/* Mobile Menu Button */}
              <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="transition-transform hover:scale-110"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 animate-in slide-in-from-top-4 duration-300">
              <div className="flex flex-col gap-2">
                {navItems.map((item, index) => (
                  <Button
                    key={item.id}
                    variant={currentSection === item.id ? "default" : "ghost"}
                    onClick={() => {
                      onSectionChange(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className="justify-start animate-in fade-in slide-in-from-left-4"
                    style={{ animationDelay: `${100 + index * 50}ms`}}
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        {children}
      </main>

      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-muted z-40">
        <div className="h-full bg-primary transition-all duration-300 ease-out" style={{ width: `${scrollProgress}%` }} />
      </div>
    </div>
  );
};

export default Layout;

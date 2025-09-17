import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

interface NavbarProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

const FestHubNavbar = ({ currentSection, onSectionChange }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: 'https://img.icons8.com/color/24/home.png' },
    { id: 'events', label: 'Events', icon: 'https://img.icons8.com/color/24/theatre-mask.png' },
    { id: 'calendar', label: 'Calendar', icon: 'https://img.icons8.com/color/24/calendar.png' },
    { id: 'features', label: 'Features', icon: 'https://img.icons8.com/color/24/flash-on.png' },
    { id: 'attendance', label: 'Attendance', icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAACIElEQVR4nGNgQAP1QTZKbRHWXV1RNrNbw82DGEgBbeFW4VNSnB8tLfT7v6zQ7//sDPcPLaGWnfX29hzE6Gfsi3O4BNIIw4vyfP4vzPX+3xlls4ag7oogE6VZ6W4/QBqXFvj9n5/r9X9dU8j/uUXevyckON4laEBZoJnMhETH75vaIv7vnRT///aWkv9fz7X+PzY/9X9XlO1jggZMrPQQbYmy/P3lbAtYIwyfXZ71vyvB9j1BA2bW+3Atbfb/hKwZhG9tKf6/pNnvGgMxYHmrX8XbY/UoBlzbnP9peo2jPlEGzKz34dozJ+79V6g3Pp5u+r95csRtmHzoqkLO2FkVavb19Sw4DVnfG7Lh8KKk/8eXpf4/sjj5/6I23y6QxsqNPYsmH5n/aPH5VV/7Dsy6Xbq2vQVFY1TXwYT0yWcPdE6c9PbC2rx/93aW/D+4OOdP1aQ1j0tWzHuy9c6u/7se7AXjPQ/3/994Y+vPsvUdJWDNse1HO2tWPPrcvf3DfxCetnTD/wXzJ/2fvPLg/87tb/5PPrwCRfPLr6/+X3h16X/X7ulHGUKbDuiWLLj1BqYZHbdsvvd/0dm1/8++PP//2tsbYM3X394EG9a3f/ZNhtjuo9O6tr3DqhmEQXJ9+5eDbX797Q1cMwi37pq6lyGy7YBXTMfBVnw4f9Hsw2uubv6z+8E+uOZ5p5e/zV/W5EdU9IJA6frOYpCfQc4G2QzTDACZ66YCjYyAeAAAAABJRU5ErkJggg==' },
    { id: 'aims', label: 'Aims', icon: 'https://img.icons8.com/color/24/goal.png' },
  ];

  return (
    <nav className="fixed top-0 w-full z-[1000] px-8 py-4 flex justify-between items-center slide-in-right"
         style={{ 
           background: 'linear-gradient(90deg, hsl(48 100% 93%) 0%, hsl(194 100% 91%) 60%, hsl(0 100% 93%) 100%)',
           backdropFilter: 'blur(10px)',
           borderBottom: '2px solid hsl(48 85% 73%)',
           boxShadow: '0 2px 12px rgba(33, 150, 243, 0.10)'
         }}>
      {/* Logo */}
      <div className="flex items-center gap-3 hover-scale">
        <img 
          src="https://img.icons8.com/color/40/graduation-cap.png" 
          alt="UIT RGPV Shivpuri Logo" 
          className="h-10 w-10 rounded-full shadow-gold float"
        />
        <span className="text-2xl font-bold text-[hsl(207_90%_54%)] glow" 
              style={{ textShadow: '0 0 10px rgba(33, 150, 243, 0.15)' }}>
          FestHub
        </span>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-center gap-8">
        {navItems.map((item, index) => (
          <li key={item.id} className="slide-in-left" style={{ animationDelay: `${index * 0.1}s` }}>
            <button
              onClick={() => onSectionChange(item.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl border-2 font-semibold relative overflow-hidden hover-lift hover-glow ${
                currentSection === item.id
                  ? 'text-white bg-gradient-to-r from-[hsl(207_90%_54%)] to-[hsl(45_93%_47%)] border-[hsl(45_93%_47%)] shadow-elegant'
                  : 'text-[hsl(207_90%_54%)] bg-gradient-to-r from-[hsl(194_100%_91%)] to-[hsl(48_100%_93%)] border-[hsl(194_100%_91%)] hover:text-white hover:bg-gradient-to-r hover:from-[hsl(207_90%_54%)] hover:to-[hsl(45_93%_47%)] hover:border-[hsl(45_93%_47%)] hover:shadow-elegant'
              }`}
              style={{ boxShadow: '0 2px 8px hsl(207 90% 54% / 0.13)' }}
            >
              <img src={item.icon} alt={item.label} className="w-5 h-5 hover-scale" />
              {item.label}
            </button>
          </li>
        ))}
      </ul>

      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden text-[hsl(207_90%_54%)]"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-gradient-to-r from-[hsl(48_100%_93%)] to-[hsl(194_100%_91%)] border-t-2 border-[hsl(48_85%_73%)] p-4">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSectionChange(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  currentSection === item.id
                    ? 'text-white bg-gradient-to-r from-[hsl(207_90%_54%)] to-[hsl(45_93%_47%)]'
                    : 'text-[hsl(207_90%_54%)] hover:bg-white/50'
                }`}
              >
                <img src={item.icon} alt={item.label} className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default FestHubNavbar;
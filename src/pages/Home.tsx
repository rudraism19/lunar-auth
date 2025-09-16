import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Trophy, Zap, Target } from 'lucide-react';
import ThreeBackground from '@/components/ThreeBackground';
import LoginModal from '@/components/LoginModal';

interface HomeProps {
  onSectionChange: (section: string) => void;
}

const Home = ({ onSectionChange }: HomeProps) => {
  const [showLogin, setShowLogin] = useState(false);

  const handleLogin = () => {
    // Handle login logic here
    console.log('User logged in');
  };

  const features = [
    {
      icon: Calendar,
      title: 'Event Calendar',
      description: 'View all upcoming events and holidays in a beautiful calendar.',
      section: 'calendar',
      iconUrl: 'https://img.icons8.com/color/96/calendar.png',
    },
    {
      icon: Zap,
      title: 'QR Attendance',
      description: 'Mark attendance quickly using QR codes or unique codes.',
      section: 'attendance',
      iconUrl: 'https://img.icons8.com/color/96/qr-code.png',
    },
    {
      icon: Trophy,
      title: 'Competitions',
      description: 'Participate and register for arts, tech, and sports competitions.',
      section: 'events',
      iconUrl: 'https://img.icons8.com/color/96/trophy.png',
    },
    {
      icon: Target,
      title: 'Community',
      description: 'Connect with other students and teachers during fests.',
      section: 'about',
      iconUrl: 'https://img.icons8.com/color/96/group-foreground-selected.png',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col gradient-secondary relative overflow-hidden">
      {/* Three.js Background */}
      <ThreeBackground />
      
      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center p-6 bg-gradient-to-r from-yellow-50/90 via-blue-50/90 to-red-50/90 backdrop-blur-md border-b-2 border-yellow-200/50 shadow-primary">
        <div className="text-2xl font-bold text-primary letter-spacing-wider" style={{ textShadow: '0 0 10px rgba(33, 150, 243, 0.15)' }}>
          FestHub
        </div>
        <div className="flex gap-4">
          <Button 
            className="btn-festhub px-6 py-3 rounded-xl"
            onClick={() => setShowLogin(true)}
          >
            Login
          </Button>
          <Button 
            className="btn-festhub px-6 py-3 rounded-xl"
            onClick={() => setShowLogin(true)}
          >
            Register
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 pb-8 relative z-10">
        <div className="animate-float">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-4 bg-gradient-to-r from-primary via-purple-500 to-accent bg-clip-text text-transparent animate-pulse" style={{ animation: 'glow 2s ease-in-out infinite alternate' }}>
            Welcome to FestHub
          </h1>
        </div>
        
        <p className="text-lg text-center mb-12 text-muted-foreground max-w-2xl animate-fade-in">
          Your one-stop platform for managing college fests, events, and attendance!
        </p>

        {/* Feature Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card-festhub w-56 cursor-pointer animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => onSectionChange(feature.section)}
            >
              <img 
                src={feature.iconUrl} 
                alt={feature.title}
                className="w-16 h-16 mx-auto mb-4 transition-transform duration-300 hover:scale-110"
              />
              <h3 className="text-xl font-semibold mb-2 text-primary">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onLogin={handleLogin}
      />
    </div>
  );
};

export default Home;
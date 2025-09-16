import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Trophy, Zap, Target } from 'lucide-react';

interface HomeProps {
  onSectionChange: (section: string) => void;
}

const Home = ({ onSectionChange }: HomeProps) => {
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
    <div className="min-h-screen flex flex-col gradient-secondary">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 bg-transparent">
        <div className="text-2xl font-bold text-primary letter-spacing-wider">
          FestHub
        </div>
        <div className="flex gap-4">
          <Button className="btn-festhub px-6 py-3 rounded-xl">
            Login
          </Button>
          <Button className="btn-festhub px-6 py-3 rounded-xl">
            Register
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 pb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
          Welcome to FestHub
        </h1>
        <p className="text-lg text-center mb-12 text-muted-foreground max-w-2xl">
          Your one-stop platform for managing college fests, events, and attendance!
        </p>

        {/* Feature Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card-festhub p-8 text-center cursor-pointer w-56"
              onClick={() => onSectionChange(feature.section)}
            >
              <img 
                src={feature.iconUrl} 
                alt={feature.title}
                className="w-16 h-16 mx-auto mb-4"
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
    </div>
  );
};

export default Home;
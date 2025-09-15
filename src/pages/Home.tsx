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
      title: 'Events',
      description: 'Discover upcoming festivals, competitions, and cultural events.',
      section: 'events',
      color: 'text-blue-500',
    },
    {
      icon: Zap,
      title: 'Features',
      description: 'Explore smart attendance, real-time displays, and personalized suggestions.',
      section: 'features',
      color: 'text-yellow-500',
    },
    {
      icon: Target,
      title: 'Aims',
      description: 'Learn about our mission to revolutionize college event management.',
      section: 'aims',
      color: 'text-green-500',
    },
    {
      icon: Trophy,
      title: 'Calendar',
      description: 'Stay updated with our interactive calendar featuring important dates.',
      section: 'calendar',
      color: 'text-purple-500',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center space-y-8 mb-16">
        {/* Logo */}
        <div className="flex justify-center items-center gap-4 mb-8">
          <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-lg">
            <span className="text-primary-foreground font-bold text-3xl">F</span>
          </div>
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <img 
              src="https://img.icons8.com/color/96/graduation-cap.png" 
              alt="College Logo" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Hero Content */}
        <div className="space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            College Event Manager
          </h1>
          
          <p className="text-xl text-muted-foreground italic font-medium">
            "Excellence is never an accident."
          </p>
          
          <p className="text-lg text-foreground max-w-3xl mx-auto leading-relaxed">
            Smart platform for events, attendance, and routines.
            <br />
            <span className="text-sm text-muted-foreground mt-2 block">
              Featuring QR attendance, face recognition, Bluetooth connectivity, Wi-Fi integration, 
              calendar management, smart suggestions, analytics, and achievement tracking.
            </span>
          </p>
        </div>

        {/* Feature Icons */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {[
            { src: "https://img.icons8.com/color/48/qr-code.png", alt: "QR Code" },
            { src: "https://img.icons8.com/color/48/face-id.png", alt: "Face Recognition" },
            { src: "https://img.icons8.com/color/48/bluetooth.png", alt: "Bluetooth" },
            { src: "https://img.icons8.com/color/48/wifi.png", alt: "Wi-Fi" },
            { src: "https://img.icons8.com/color/48/calendar.png", alt: "Calendar" },
            { src: "https://img.icons8.com/color/48/idea.png", alt: "Suggestions" },
            { src: "https://img.icons8.com/color/48/trophy.png", alt: "Trophy" },
            { src: "https://img.icons8.com/color/48/analytics.png", alt: "Analytics" },
            { src: "https://img.icons8.com/color/48/medal.png", alt: "Medal" },
          ].map((icon, index) => (
            <img 
              key={index}
              src={icon.src} 
              alt={icon.alt}
              className="w-12 h-12 transition-transform hover:scale-110"
            />
          ))}
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card 
              key={index}
              className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg border-border/50 hover:border-primary/50"
              onClick={() => onSectionChange(feature.section)}
            >
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
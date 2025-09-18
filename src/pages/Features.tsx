
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Smartphone, 
  Wifi, 
  QrCode, 
  UserCheck, 
  Calendar,
  BarChart,
  Bell,
  MapPin 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Features = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: QrCode,
      title: 'QR Code Attendance',
      description: 'Quick and contactless attendance marking using QR code scanning.',
      status: 'Live',
      color: 'text-blue-500',
      path: '/attendance',
    },
    {
      icon: UserCheck,
      title: 'Face Recognition',
      description: 'AI-powered face recognition for automated attendance tracking.',
      status: 'Coming Soon',
      color: 'text-green-500',
      path: '/features',
    },
    {
      icon: Wifi,
      title: 'WiFi Router Detection',
      description: 'Automatic attendance when connected to college WiFi network.',
      status: 'Coming Soon',
      color: 'text-purple-500',
      path: '/features',
    },
    {
      icon: Smartphone,
      title: '6-Digit Code System',
      description: 'Simple numeric code entry for quick attendance marking.',
      status: 'Live',
      color: 'text-orange-500',
      path: '/attendance',
    },
    {
      icon: Calendar,
      title: 'Smart Calendar',
      description: 'Intelligent event scheduling with conflict detection and reminders.',
      status: 'Live',
      color: 'text-pink-500',
      path: '/calendar',
    },
    {
      icon: BarChart,
      title: 'Real-time Analytics',
      description: 'Comprehensive attendance reports and event participation analytics.',
      status: 'Live',
      color: 'text-indigo-500',
      path: '/aims',
    },
    {
      icon: Bell,
      title: 'Smart Notifications',
      description: 'Personalized reminders and updates for events and deadlines.',
      status: 'Beta',
      color: 'text-yellow-500',
      path: '/features',
    },
    {
      icon: MapPin,
      title: 'Location-Based Services',
      description: 'Geo-fencing for automatic check-ins and location-aware features.',
      status: 'Coming Soon',
      color: 'text-red-500',
      path: '/features',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Live': return 'bg-green-100 text-green-800 border-green-200';
      case 'Beta': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Coming Soon': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const handleCardClick = (status: string, path: string) => {
    if (status !== 'Coming Soon') {
      navigate(path);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">Features</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Discover the advanced features that make FestHub the ultimate college event management platform
        </p>
      </div>

      {/* Main Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card 
              key={index}
              onClick={() => handleCardClick(feature.status, feature.path)}
              className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/50 relative overflow-hidden cursor-pointer"
            >
              <CardHeader className="text-center pb-4">
                <div className="flex justify-between items-start mb-4">
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${getStatusColor(feature.status)}`}
                  >
                    {feature.status}
                  </Badge>
                </div>
                
                <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>

              <CardContent>
                <CardDescription className="text-center leading-relaxed text-sm">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Technology Stack */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center mb-8">Built with Modern Technology</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {[
            { name: 'React', icon: 'https://img.icons8.com/color/48/react-native.png' },
            { name: 'TypeScript', icon: 'https://img.icons8.com/color/48/typescript.png' },
            { name: 'Supabase', icon: 'https://img.icons8.com/color/48/database.png' },
            { name: 'Tailwind CSS', icon: 'https://img.icons8.com/color/48/tailwindcss.png' },
            { name: 'Node.js', icon: 'https://img.icons8.com/color/48/nodejs.png' },
            { name: 'AI/ML', icon: 'https://img.icons8.com/color/48/artificial-intelligence.png' },
          ].map((tech, index) => (
            <div key={index} className="text-center group">
              <img 
                src={tech.icon} 
                alt={tech.name}
                className="w-12 h-12 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300"
              />
              <span className="text-sm text-muted-foreground">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics */}
      
    </div>
  );
};

export default Features;

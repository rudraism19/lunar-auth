import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Users, Zap, Heart, Award, BookOpen } from 'lucide-react';

const Aims = () => {
  const aims = [
    {
      icon: Target,
      title: 'Streamline Event Management',
      description: 'Simplify the process of organizing, managing, and participating in college events through digital innovation.',
      color: 'text-blue-500',
      status: 'Primary Goal',
    },
    {
      icon: Users,
      title: 'Enhance Student Engagement',
      description: 'Increase student participation in college activities and foster a vibrant campus community.',
      color: 'text-green-500',
      status: 'Community Focus',
    },
    {
      icon: Zap,
      title: 'Automate Attendance Systems',
      description: 'Eliminate manual attendance processes with smart, accurate, and efficient digital solutions.',
      color: 'text-yellow-500',
      status: 'Innovation',
    },
    {
      icon: Heart,
      title: 'Improve Student Experience',
      description: 'Create a seamless, user-friendly platform that makes college life more enjoyable and organized.',
      color: 'text-red-500',
      status: 'User Centric',
    },
    {
      icon: Award,
      title: 'Recognition & Achievements',
      description: 'Implement a comprehensive system to track and celebrate student achievements and participation.',
      color: 'text-purple-500',
      status: 'Motivation',
    },
    {
      icon: BookOpen,
      title: 'Educational Integration',
      description: 'Bridge the gap between academic learning and extracurricular activities for holistic development.',
      color: 'text-indigo-500',
      status: 'Academic Focus',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Primary Goal': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Community Focus': return 'bg-green-100 text-green-800 border-green-200';
      case 'Innovation': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'User Centric': return 'bg-red-100 text-red-800 border-red-200';
      case 'Motivation': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Academic Focus': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">Our Aims</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Discover our mission to revolutionize college event management and enhance the overall student experience
        </p>
      </div>

      {/* Mission Statement */}
      <Card className="mb-16 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <CardContent className="pt-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-primary">Our Mission</h2>
            <p className="text-lg leading-relaxed max-w-4xl mx-auto">
              To create a comprehensive digital ecosystem that transforms how educational institutions manage events, 
              track attendance, and engage with their student community. We aim to bridge technology and education 
              to create meaningful, efficient, and enjoyable experiences for all stakeholders.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Aims Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {aims.map((aim, index) => {
          const Icon = aim.icon;
          return (
            <Card 
              key={index}
              className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/50"
            >
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Badge 
                    variant="outline" 
                    className={`text-xs mb-2 ${getStatusColor(aim.status)}`}
                  >
                    {aim.status}
                  </Badge>
                </div>
                
                <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className={`w-8 h-8 ${aim.color}`} />
                </div>
                
                <CardTitle className="text-xl">{aim.title}</CardTitle>
              </CardHeader>

              <CardContent>
                <CardDescription className="text-center leading-relaxed">
                  {aim.description}
                </CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Vision Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Our Vision</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="leading-relaxed">
              To become the leading platform for educational event management, setting new standards 
              for student engagement and institutional efficiency.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Paperless and environmentally friendly operations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Real-time data analytics and insights</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Scalable solutions for institutions of all sizes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Integration with existing educational systems</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Core Values</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary">Innovation</div>
                <p className="text-sm text-muted-foreground mt-1">Cutting-edge technology</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary">Accessibility</div>
                <p className="text-sm text-muted-foreground mt-1">Easy for everyone</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary">Reliability</div>
                <p className="text-sm text-muted-foreground mt-1">Dependable solutions</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary">Growth</div>
                <p className="text-sm text-muted-foreground mt-1">Continuous improvement</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Impact Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Expected Impact</CardTitle>
          <CardDescription className="text-center">
            The positive changes we aim to achieve
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">80%</div>
              <p className="text-sm text-muted-foreground">Reduction in administrative overhead</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">95%</div>
              <p className="text-sm text-muted-foreground">Attendance accuracy improvement</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">60%</div>
              <p className="text-sm text-muted-foreground">Increase in event participation</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <p className="text-sm text-muted-foreground">Digital transformation</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Aims;
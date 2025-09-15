import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Trophy, Users, MapPin } from 'lucide-react';

const Events = () => {
  const [activeTab, setActiveTab] = useState('arts');

  const events = {
    arts: [
      {
        id: 1,
        title: 'Creative Arts Festival',
        date: 'May 1-3, 2025',
        prize: '₹40,000',
        description: 'Showcase your creativity in painting, sculpture, music, and dance.',
        participants: 150,
        location: 'Main Auditorium',
        image: 'https://img.icons8.com/color/96/paint-palette.png',
      },
      {
        id: 2,
        title: 'Photography Contest',
        date: 'May 15, 2025',
        prize: '₹15,000',
        description: 'Capture the beauty of campus life and nature.',
        participants: 80,
        location: 'Campus Grounds',
        image: 'https://img.icons8.com/color/96/camera.png',
      },
    ],
    tech: [
      {
        id: 3,
        title: 'CodeFest Hackathon',
        date: 'April 5-6, 2025',
        prize: '₹1,00,000',
        description: 'Build innovative solutions in 48 hours.',
        participants: 200,
        location: 'Computer Lab',
        image: 'https://img.icons8.com/color/96/laptop.png',
      },
      {
        id: 4,
        title: 'AI/ML Workshop',
        date: 'April 20, 2025',
        prize: 'Certificate',
        description: 'Learn the fundamentals of artificial intelligence.',
        participants: 100,
        location: 'Tech Auditorium',
        image: 'https://img.icons8.com/color/96/artificial-intelligence.png',
      },
    ],
    sports: [
      {
        id: 5,
        title: 'Inter-College Olympics',
        date: 'February 20-25, 2025',
        prize: '₹75,000',
        description: 'Compete in various sports across multiple categories.',
        participants: 300,
        location: 'Sports Complex',
        image: 'https://img.icons8.com/color/96/trophy.png',
      },
      {
        id: 6,
        title: 'Cricket Tournament',
        date: 'March 10-12, 2025',
        prize: '₹25,000',
        description: 'Show your cricket skills in this exciting tournament.',
        participants: 120,
        location: 'Cricket Ground',
        image: 'https://img.icons8.com/color/96/cricket.png',
      },
    ],
  };

  const tabs = [
    { id: 'arts', label: 'Arts', icon: 'https://img.icons8.com/color/32/paint-palette.png' },
    { id: 'tech', label: 'Tech', icon: 'https://img.icons8.com/color/32/laptop.png' },
    { id: 'sports', label: 'Sports', icon: 'https://img.icons8.com/color/32/trophy.png' },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">Events</h1>
        <p className="text-lg text-muted-foreground">
          Discover and participate in exciting college events
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="flex flex-wrap gap-4 p-1 bg-muted rounded-lg">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'ghost'}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-2"
            >
              <img src={tab.icon} alt={tab.label} className="w-5 h-5" />
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events[activeTab as keyof typeof events].map((event) => (
          <Card key={event.id} className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/50">
            <CardHeader className="space-y-4">
              <div className="flex justify-between items-start">
                <Badge variant="secondary" className="text-xs">
                  <img src={tabs.find(t => t.id === activeTab)?.icon} alt="" className="w-4 h-4 mr-1" />
                  {tabs.find(t => t.id === activeTab)?.label}
                </Badge>
                <div className="text-right">
                  <div className="text-lg font-bold text-primary">{event.prize}</div>
                </div>
              </div>
              
              <div className="text-center">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                />
                <CardTitle className="text-xl">{event.title}</CardTitle>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <CardDescription className="text-sm leading-relaxed">
                {event.description}
              </CardDescription>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-muted-foreground" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span>{event.participants} participants</span>
                </div>
              </div>

              <Button className="w-full mt-4">
                Register Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Events;
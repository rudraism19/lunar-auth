import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, MapPin, Award, Users } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

import technicalIcon from '@/assets/icons/technical.svg';
import culturalIcon from '@/assets/icons/cultural.svg';
import sportsIcon from '@/assets/icons/sports.svg';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  prize: string;
  teamSize: string;
  image: string;
  category: 'technical' | 'cultural' | 'sports';
  registrationUrl: string;
}

const events: Event[] = [
  {
    id: 1,
    title: 'Codefest',
    description: 'A 24-hour hackathon to build innovative solutions.',
    date: 'October 10, 2024',
    location: 'Online',
    prize: '₹50,000',
    teamSize: '2-4 members',
    image: 'https://cdn-icons-png.flaticon.com/512/1006/1006363.png',
    category: 'technical',
    registrationUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSe0wLCFpnVHrfpMVPk8UK99uQ0xjGTVcisrP-8NA0zR-4Lbhg/viewform?usp=header',
  },
  {
    id: 2,
    title: 'Melody Night',
    description: 'An evening of soulful music and performances.',
    date: 'October 12, 2024',
    location: 'Amphitheatre',
    prize: '₹20,000',
    teamSize: 'Solo/Group',
    image: 'https://cdn-icons-png.flaticon.com/512/3004/3004473.png',
    category: 'cultural',
    registrationUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSe0wLCFpnVHrfpMVPk8UK99uQ0xjGTVcisrP-8NA0zR-4Lbhg/viewform?usp=header',
  },
  {
    id: 3,
    title: 'Blitz Chess',
    description: 'A fast-paced chess tournament for all skill levels.',
    date: 'October 11, 2024',
    location: 'Auditorium',
    prize: '₹10,000',
    teamSize: 'Individual',
    image: 'https://cdn-icons-png.flaticon.com/512/2618/2618459.png',
    category: 'sports',
    registrationUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSe0wLCFpnVHrfpMVPk8UK99uQ0xjGTVcisrP-8NA0zR-4Lbhg/viewform?usp=header',
  },
];

const tabs = [
    { id: 'all', label: 'All Events', icon: 'https://cdn-icons-png.flaticon.com/512/1006/1006363.png' },
    { id: 'technical', label: 'Technical', icon: technicalIcon },
    { id: 'cultural', label: 'Cultural', icon: culturalIcon },
    { id: 'sports', label: 'Sports', icon: sportsIcon },
  ];

const Events = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const handleRegisterClick = (url: string) => {
    window.open(url, '_blank');
  };

  const filteredEvents = activeTab === 'all' 
    ? events 
    : events.filter(event => event.category === activeTab);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">FestHub Events</h1>
        <p className="mt-2 text-lg text-muted-foreground">Explore and register for the most exciting events of the year.</p>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id} className="flex-col h-16">
              <img src={tab.icon} alt="" className="w-6 h-6 mb-1" />
              <span>{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEvents.map(event => (
          <Card key={event.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <img src={event.image} alt={event.title} className="w-full h-48 object-cover rounded-t-lg" />
              <CardTitle className="pt-4">{event.title}</CardTitle>
              <Badge>{event.category}</Badge>
            </CardHeader>
            <CardContent>
              <CardDescription>{event.description}</CardDescription>
              <div className="mt-4 space-y-2 text-sm">
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
                  <span>{event.teamSize}</span>
                </div>
                 <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-muted-foreground" />
                  <span>{event.prize}</span>
                </div>
              </div>
              <Button className="w-full mt-4" onClick={() => handleRegisterClick(event.registrationUrl)}>
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

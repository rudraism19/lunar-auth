import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { format, isSameDay, parseISO } from 'date-fns';

interface Event {
  date: string;
  name: string;
  type: 'national' | 'religious' | 'cultural' | 'regional';
  description?: string;
}

const IndianCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Comprehensive Indian calendar events for 2025
  const indianEvents: Event[] = [
    // January 2025
    { date: '2025-01-01', name: 'New Year\'s Day', type: 'national' },
    { date: '2025-01-14', name: 'Makar Sankranti', type: 'religious', description: 'Hindu festival marking the sun\'s transition into Capricorn' },
    { date: '2025-01-15', name: 'Pongal (Tamil Nadu)', type: 'regional', description: 'Tamil harvest festival' },
    { date: '2025-01-26', name: 'Republic Day', type: 'national', description: 'Constitution of India came into effect' },

    // February 2025
    { date: '2025-02-12', name: 'Vasant Panchami', type: 'religious', description: 'Festival dedicated to Goddess Saraswati' },
    { date: '2025-02-26', name: 'Maha Shivratri', type: 'religious', description: 'Great night of Lord Shiva' },

    // March 2025
    { date: '2025-03-13', name: 'Holi', type: 'religious', description: 'Festival of colors' },
    { date: '2025-03-14', name: 'Dhulandi', type: 'religious', description: 'Second day of Holi' },
    { date: '2025-03-30', name: 'Ram Navami', type: 'religious', description: 'Birthday of Lord Rama' },

    // April 2025
    { date: '2025-04-06', name: 'Mahavir Jayanti', type: 'religious', description: 'Birthday of Lord Mahavira' },
    { date: '2025-04-13', name: 'Baisakhi', type: 'regional', description: 'Punjabi New Year and harvest festival' },
    { date: '2025-04-14', name: 'Ambedkar Jayanti', type: 'national', description: 'Birthday of Dr. B.R. Ambedkar' },
    { date: '2025-04-18', name: 'Good Friday', type: 'religious' },

    // May 2025
    { date: '2025-05-01', name: 'Labour Day', type: 'national' },
    { date: '2025-05-12', name: 'Buddha Purnima', type: 'religious', description: 'Birthday of Gautama Buddha' },

    // June 2025
    { date: '2025-06-15', name: 'Rath Yatra', type: 'religious', description: 'Chariot festival of Lord Jagannath' },

    // July 2025
    { date: '2025-07-13', name: 'Guru Purnima', type: 'religious', description: 'Day dedicated to gurus and teachers' },

    // August 2025
    { date: '2025-08-15', name: 'Independence Day', type: 'national', description: 'India\'s independence from British rule' },
    { date: '2025-08-16', name: 'Janmashtami', type: 'religious', description: 'Birthday of Lord Krishna' },
    { date: '2025-08-20', name: 'Raksha Bandhan', type: 'cultural', description: 'Festival celebrating brother-sister bond' },

    // September 2025
    { date: '2025-09-07', name: 'Ganesh Chaturthi', type: 'religious', description: 'Birthday of Lord Ganesha' },

    // October 2025
    { date: '2025-10-02', name: 'Gandhi Jayanti', type: 'national', description: 'Birthday of Mahatma Gandhi' },
    { date: '2025-10-11', name: 'Dussehra', type: 'religious', description: 'Victory of good over evil' },
    { date: '2025-10-20', name: 'Karva Chauth', type: 'cultural', description: 'Festival observed by married women' },
    { date: '2025-10-31', name: 'Diwali', type: 'religious', description: 'Festival of lights' },

    // November 2025
    { date: '2025-11-01', name: 'Govardhan Puja', type: 'religious' },
    { date: '2025-11-02', name: 'Bhai Dooj', type: 'cultural', description: 'Festival celebrating brother-sister relationship' },
    { date: '2025-11-15', name: 'Guru Nanak Jayanti', type: 'religious', description: 'Birthday of Guru Nanak' },

    // December 2025
    { date: '2025-12-25', name: 'Christmas Day', type: 'religious' },
  ];

  const getEventsForDate = (date: Date) => {
    return indianEvents.filter(event => 
      isSameDay(parseISO(event.date), date)
    );
  };

  const getEventTypeColor = (type: Event['type']) => {
    switch (type) {
      case 'national': return 'bg-red-100 text-red-800 border-red-200';
      case 'religious': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'cultural': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'regional': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getEventTypeIcon = (type: Event['type']) => {
    switch (type) {
      case 'national': return '🇮🇳';
      case 'religious': return '🕉️';
      case 'cultural': return '🎭';
      case 'regional': return '🌾';
      default: return '📅';
    }
  };

  const hasEvents = (date: Date) => {
    return getEventsForDate(date).length > 0;
  };

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  return (
    <section className="min-h-screen pt-20 pb-16 fade-in" 
             style={{ 
               background: 'linear-gradient(135deg, hsl(45 93% 47%) 0%, hsl(194 100% 91%) 60%, hsl(0 100% 93%) 100%)',
               borderRadius: '24px',
               boxShadow: '0 8px 32px rgba(255, 215, 0, 0.12)'
             }}>
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-8 fade-in-up">
          <h2 className="text-4xl font-bold text-[hsl(207_90%_54%)] mb-4 glow">
            Indian Festival Calendar 2025
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Discover India's rich cultural heritage through our comprehensive calendar of festivals, 
            national holidays, and regional celebrations.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calendar Section */}
          <Card className="p-6 hover-lift hover-glow slide-in-left" 
                style={{ 
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 8px 32px rgba(33, 150, 243, 0.15)'
                }}>
            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <CalendarIcon className="w-6 h-6 text-[hsl(207_90%_54%)]" />
                <CardTitle className="text-2xl text-[hsl(207_90%_54%)]">
                  {format(currentMonth, 'MMMM yyyy')}
                </CardTitle>
              </div>
              <div className="flex justify-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                  className="hover-scale"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                  className="hover-scale"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                month={currentMonth}
                onMonthChange={setCurrentMonth}
                className="rounded-md border-0 pointer-events-auto"
                modifiers={{
                  hasEvents: (date) => hasEvents(date)
                }}
                modifiersStyles={{
                  hasEvents: {
                    backgroundColor: 'hsl(45 93% 47% / 0.2)',
                    color: 'hsl(207 90% 54%)',
                    fontWeight: 'bold',
                    borderRadius: '6px'
                  }
                }}
              />
            </CardContent>
          </Card>

          {/* Events Detail Section */}
          <Card className="p-6 hover-lift hover-glow slide-in-right" 
                style={{ 
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 8px 32px rgba(33, 150, 243, 0.15)'
                }}>
            <CardHeader>
              <CardTitle className="text-2xl text-[hsl(207_90%_54%)]">
                {selectedDate ? format(selectedDate, 'PPP') : 'Select a Date'}
              </CardTitle>
              <CardDescription>
                {selectedDateEvents.length > 0 
                  ? `${selectedDateEvents.length} event${selectedDateEvents.length > 1 ? 's' : ''} on this date`
                  : 'No events scheduled for this date'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedDateEvents.length > 0 ? (
                <div className="space-y-4">
                  {selectedDateEvents.map((event, index) => (
                    <div key={index} className="p-4 rounded-lg border-2 hover-scale bounce-in" 
                         style={{ 
                           background: 'linear-gradient(120deg, hsl(194 100% 91%) 0%, hsl(48 100% 93%) 100%)',
                           animationDelay: `${index * 0.1}s`
                         }}>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{getEventTypeIcon(event.type)}</span>
                          <h3 className="font-semibold text-lg text-[hsl(207_90%_54%)]">
                            {event.name}
                          </h3>
                        </div>
                        <Badge className={`${getEventTypeColor(event.type)} capitalize hover-scale`}>
                          {event.type}
                        </Badge>
                      </div>
                      {event.description && (
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {event.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 fade-in">
                  <div className="text-6xl mb-4 float">📅</div>
                  <p className="text-gray-500">
                    Click on a highlighted date to see festival details
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Legend */}
        <Card className="mt-8 p-6 hover-lift fade-in-up" 
              style={{ 
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 32px rgba(33, 150, 243, 0.15)'
              }}>
          <CardHeader>
            <CardTitle className="text-xl text-[hsl(207_90%_54%)] text-center">
              Festival Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { type: 'national' as const, label: 'National Holidays', icon: '🇮🇳' },
                { type: 'religious' as const, label: 'Religious Festivals', icon: '🕉️' },
                { type: 'cultural' as const, label: 'Cultural Events', icon: '🎭' },
                { type: 'regional' as const, label: 'Regional Festivals', icon: '🌾' }
              ].map((category, index) => (
                <div key={category.type} 
                     className="flex items-center gap-3 p-3 rounded-lg hover-scale scale-in"
                     style={{ 
                       background: 'linear-gradient(120deg, hsl(194 100% 91%) 0%, hsl(48 100% 93%) 100%)',
                       animationDelay: `${index * 0.1}s`
                     }}>
                  <span className="text-2xl">{category.icon}</span>
                  <div>
                    <Badge className={`${getEventTypeColor(category.type)} mb-1`}>
                      {category.type}
                    </Badge>
                    <p className="text-sm text-gray-700">{category.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default IndianCalendar;
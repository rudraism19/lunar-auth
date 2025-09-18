import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Sample events data
  const events = [
    { date: '2025-01-01', name: 'New Year', type: 'holiday' },
    { date: '2025-01-14', name: 'Makar Sankranti', type: 'festival' },
    { date: '2025-01-26', name: 'Republic Day', type: 'holiday' },
    { date: '2025-02-03', name: 'Vasant Panchami', type: 'festival' },
    { date: '2025-02-26', name: 'Maha Shivaratri', type: 'festival' },
    { date: '2025-02-20', name: 'Inter-College Olympics', type: 'sports' },
    { date: '2025-02-21', name: 'Inter-College Olympics', type: 'sports' },
    { date: '2025-02-22', name: 'Inter-College Olympics', type: 'sports' },
    { date: '2025-03-08', name: "Women's Day", type: 'holiday' },
    { date: '2025-03-13', name: 'Holi', type: 'festival' },
    { date: '2025-03-29', name: 'Ugadi', type: 'festival' },
    { date: '2025-04-05', name: 'CodeFest Hackathon', type: 'tech' },
    { date: '2025-04-06', name: 'CodeFest Hackathon', type: 'tech' },
    { date: '2025-04-06', name: 'Rama Navami', type: 'festival' },
    { date: '2025-04-13', name: 'Mahavir Jayanti', type: 'holiday' },
    { date: '2025-04-14', name: 'Ambedkar Jayanti', type: 'holiday' },
    { date: '2025-04-18', name: 'Good Friday', type: 'holiday' },
    { date: '2025-05-01', name: 'Creative Arts Festival', type: 'arts' },
    { date: '2025-05-02', name: 'Creative Arts Festival', type: 'arts' },
    { date: '2025-05-03', name: 'Creative Arts Festival', type: 'arts' },
    { date: '2025-05-12', name: 'Buddha Purnima', type: 'holiday' },
    { date: '2025-05-30', name: 'Eid al-Fitr', type: 'festival' },
    { date: '2025-06-29', name: 'Rath Yatra', type: 'festival' },
    { date: '2025-08-06', name: 'Eid al-Adha', type: 'festival' },
    { date: '2025-08-15', name: 'Independence Day', type: 'holiday' },
    { date: '2025-08-26', name: 'Janmashtami', type: 'festival' },
    { date: '2025-09-07', name: 'Ganesh Chaturthi', type: 'festival' },
    { date: '2025-09-08', name: 'Onam', type: 'festival' },
    { date: '2025-09-23', name: 'Navaratri', type: 'festival' },
    { date: '2025-10-02', name: 'Gandhi Jayanti', type: 'holiday' },
    { date: '2025-10-02', name: 'Dussehra', type: 'festival' },
    { date: '2025-10-21', name: 'Diwali', type: 'festival' },
    { date: '2025-10-09', name: 'Karva Chauth', type: 'festival' },
    { date: '2025-10-20', name: 'Dhanteras', type: 'festival' },
    { date: '2025-10-22', name: 'Govardhan Puja', type: 'festival' },
    { date: '2025-10-23', name: 'Bhai Dooj', type: 'festival' },
    { date: '2025-10-28', name: 'Chhath Puja', type: 'festival' },
    { date: '2025-11-02', name: 'Gurpurab', type: 'festival' },
    { date: '2025-12-24', name: 'Christmas Eve', type: 'holiday' },
    { date: '2025-12-25', name: 'Christmas', type: 'holiday' },
  ];

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateString);
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'holiday': return 'bg-red-100 text-red-800 border-red-200';
      case 'sports': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'tech': return 'bg-green-100 text-green-800 border-green-200';
      case 'arts': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'festival': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(currentDate.getMonth() - 1);
    } else {
      newDate.setMonth(currentDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Event Calendar</h1>
        <p className="text-lg text-muted-foreground">
          Stay updated with important dates and events
        </p>
      </div>

      <Card className="max-w-5xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateMonth('prev')}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <CardTitle className="text-2xl">
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </CardTitle>
            
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateMonth('next')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className="p-3 text-center font-semibold text-muted-foreground bg-muted rounded-lg"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {getDaysInMonth().map((date, index) => (
              <div
                key={index}
                className={`min-h-[80px] p-1 border rounded-lg ${
                  date
                    ? isToday(date)
                      ? 'bg-orange-200 border-orange-400'
                      : 'bg-orange-100 hover:bg-orange-200 border-border transition-colors'
                    : ''
                }`}
              >
                {date && (
                  <>
                    <div
                      className={`text-xs font-medium mb-1 ${
                        isToday(date) 
                          ? 'bg-orange-400 text-white rounded-full w-5 h-5 flex items-center justify-center' 
                          : ''
                      }`}
                    >
                      {date.getDate()}
                    </div>
                    
                    <div className="space-y-1">
                      {getEventsForDate(date).map((event, eventIndex) => (
                        <Badge
                          key={eventIndex}
                          variant="outline"
                          className={`text-xs p-1 w-full justify-start ${getEventColor(event.type)}`}
                        >
                          <div className="truncate">{event.name}</div>
                        </Badge>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-4 mt-6 pt-6 border-t border-border">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-red-200 border border-red-300"></div>
              <span className="text-sm">Holidays</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-yellow-200 border border-yellow-300"></div>
              <span className="text-sm">Festivals</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-blue-200 border border-blue-300"></div>
              <span className="text-sm">Sports</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-green-200 border border-green-300"></div>
              <span className="text-sm">Tech</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-purple-200 border border-purple-300"></div>
              <span className="text-sm">Arts</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Calendar;

import { useState } from 'react';
import { Toaster } from '@/components/ui/toaster';
import FestHubLogin from '@/components/FestHubLogin';
import FestHubNavbar from '@/components/FestHubNavbar';
import FestHubHome from '@/pages/FestHubHome';
import FestHubAttendance from '@/pages/FestHubAttendance';
import Events from '@/pages/Events';
import IndianCalendar from '@/pages/IndianCalendar';
import Features from '@/pages/Features';
import Aims from '@/pages/Aims';
import About from '@/pages/About';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');

  const handleLogin = (success: boolean) => {
    if (success) {
      setIsLoggedIn(true);
    }
  };

  const handleSectionChange = (section: string) => {
    setCurrentSection(section);
  };

  if (!isLoggedIn) {
    return (
      <>
        <FestHubLogin onLogin={handleLogin} />
        <Toaster />
      </>
    );
  }

  const renderSection = () => {
    switch (currentSection) {
      case 'home':
        return <FestHubHome onSectionChange={handleSectionChange} />;
      case 'events':
        return <Events />;
      case 'calendar':
        return <IndianCalendar />;
      case 'features':
        return <Features />;
      case 'attendance':
        return <FestHubAttendance />;
      case 'aims':
        return <Aims />;
      case 'about':
        return <About />;
      default:
        return <FestHubHome onSectionChange={handleSectionChange} />;
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Background Canvas */}
      <canvas 
        id="threejs-canvas" 
        className="fixed top-0 left-0 w-full h-full -z-10 opacity-15"
      />
      
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-muted z-40">
        <div className="h-full bg-[hsl(207_90%_54%)] transition-all duration-300 ease-out" style={{ width: '0%' }} />
      </div>

      {/* Floating Shapes */}
      <div className="fixed inset-0 pointer-events-none z-10">
        <div className="absolute top-1/4 left-1/4 text-4xl animate-bounce opacity-20 float">🎯</div>
        <div className="absolute top-1/3 right-1/4 text-4xl animate-pulse opacity-20 float" style={{ animationDelay: '1s' }}>🏆</div>
        <div className="absolute bottom-1/3 left-1/3 text-4xl animate-bounce opacity-20 float" style={{ animationDelay: '2s' }}>🎪</div>
      </div>

      <FestHubNavbar 
        currentSection={currentSection} 
        onSectionChange={handleSectionChange} 
      />
      
      <main className="relative z-20">
        {renderSection()}
      </main>
      
      <Toaster />
    </div>
  );
}

export default App;
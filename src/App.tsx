import { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";

// Components
import Layout from "./components/Layout";
import Login from "./components/Login";

// Pages
import Home from "./pages/Home";
import Events from "./pages/Events";
import Calendar from "./pages/Calendar";
import Features from "./pages/Features";
import Attendance from "./pages/Attendance";
import Aims from "./pages/Aims";
import UserInfo from "./pages/UserInfo";

const queryClient = new QueryClient();

const App = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState('home');

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSectionChange = (section: string) => {
    setCurrentSection(section);
  };

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'home':
        return <Home onSectionChange={handleSectionChange} />;
      case 'events':
        return <Events />;
      case 'calendar':
        return <Calendar />;
      case 'features':
        return <Features />;
      case 'attendance':
        return <Attendance />;
      case 'aims':
        return <Aims />;
      case 'user-info':
        return <UserInfo />;
      default:
        return <Home onSectionChange={handleSectionChange} />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary/5 via-secondary/10 to-accent/5">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto animate-pulse">
            <span className="text-primary-foreground font-bold text-xl">F</span>
          </div>
          <p className="text-muted-foreground">Loading FestHub...</p>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        
        {!session ? (
          <Login onLoginSuccess={() => {}} />
        ) : (
          <Layout 
            user={session.user}
            currentSection={currentSection} 
            onSectionChange={handleSectionChange}
          >
            {renderCurrentSection()}
          </Layout>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

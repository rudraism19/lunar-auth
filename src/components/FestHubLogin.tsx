import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ThreeLoginBackground from './ThreeLoginBackground';

interface FestHubLoginProps {
  onLogin: (success: boolean) => void;
}

const FestHubLogin = ({ onLogin }: FestHubLoginProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Demo credentials matching the original
    if (username === 'admin' && password === 'festhub2025') {
      onLogin(true);
    } else {
      setError('Invalid username or password.');
      onLogin(false);
    }
  };

  return (
    <div className="login-container">
      <ThreeLoginBackground />
      <form onSubmit={handleSubmit} className="login-form">
        <div className="flex items-center gap-4 mb-4 relative z-10">
          <img 
            src="https://img.icons8.com/color/96/graduation-cap.png" 
            alt="FestHub Logo" 
            className="h-[70px] w-[70px] rounded-full shadow-gold border-2 border-[hsl(207_90%_54%)] transition-shadow duration-300"
          />
        </div>
        
        <h1 className="text-4xl font-bold text-[hsl(207_90%_54%)] text-center mb-2 relative z-10" 
            style={{ textShadow: '0 0 12px hsl(207 90% 54% / 0.27)' }}>
          FestHub
        </h1>
        
        <h2 className="text-xl font-medium mb-4 text-center text-gray-800 relative z-10">Login</h2>
        
        <div className="w-full relative z-10">
          <div className="relative">
            <img 
              src="https://img.icons8.com/ios-filled/24/2196f3/user.png" 
              alt="User Icon" 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
            />
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="pl-10 py-3 border-2 border-[hsl(207_90%_54%)] rounded-lg text-base w-full bg-gradient-to-r from-[hsl(194_100%_91%)] to-[hsl(48_100%_93%)] shadow-blue transition-all duration-200 focus:border-[hsl(45_93%_47%)] focus:shadow-gold"
            />
          </div>
        </div>
        
        <div className="w-full relative z-10">
          <div className="relative">
            <img 
              src="https://img.icons8.com/ios-filled/24/2196f3/lock-2.png" 
              alt="Password Icon" 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="pl-10 py-3 border-2 border-[hsl(207_90%_54%)] rounded-lg text-base w-full bg-gradient-to-r from-[hsl(194_100%_91%)] to-[hsl(48_100%_93%)] shadow-blue transition-all duration-200 focus:border-[hsl(45_93%_47%)] focus:shadow-gold"
            />
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full py-3 bg-[hsl(207_90%_54%)] hover:bg-[hsl(45_93%_47%)] text-white font-semibold rounded-lg shadow-blue hover:shadow-elegant transition-all duration-300 relative z-10 btn-festhub"
        >
          Login
        </Button>
        
        {error && (
          <div className="text-red-600 text-center text-sm mt-2 bg-red-50 rounded-md px-3 py-2 shadow-sm relative z-10">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default FestHubLogin;
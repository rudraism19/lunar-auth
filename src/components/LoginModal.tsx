import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, User, Lock } from 'lucide-react';
import ThreeBackground from './ThreeBackground';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

const LoginModal = ({ isOpen, onClose, onLogin }: LoginModalProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation - you can replace with real authentication
    if (username && password) {
      onLogin();
      onClose();
      setError('');
    } else {
      setError('Please enter both username and password');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center">
      {/* Animated Background */}
      <ThreeBackground opacity={0.7} />
      
      {/* Backdrop */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/95 via-yellow-50/95 to-red-50/95 backdrop-blur-md" />
      
      {/* Modal Content */}
      <div className="relative z-10 animate-scale-in">
        <form 
          onSubmit={handleSubmit}
          className="bg-white/85 backdrop-blur-sm p-10 rounded-2xl shadow-elegant min-w-[320px] flex flex-col gap-5 items-center relative overflow-hidden border border-blue-100/50"
          style={{
            animation: 'popInLogin 1.1s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          {/* Decorative Elements */}
          <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-gradient-to-tr from-blue-400/20 to-transparent rounded-full" />
          
          {/* Close Button */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
          </Button>

          {/* Logo */}
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-secondary mb-2 border-2 border-primary transition-all duration-300 hover:shadow-lg">
            <span className="text-white font-bold text-2xl">F</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-primary text-center mb-2" style={{ textShadow: '0 0 12px rgba(33, 150, 243, 0.3)' }}>
            FestHub
          </h1>
          <h2 className="text-xl text-center mb-4 text-gray-700">Login</h2>

          {/* Username Field */}
          <div className="w-full relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary/70 w-5 h-5" />
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="pl-10 py-3 bg-gradient-to-r from-blue-50 to-yellow-50 border-primary/30 focus:border-primary transition-all duration-300"
              required
            />
          </div>

          {/* Password Field */}
          <div className="w-full relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary/70 w-5 h-5" />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 py-3 bg-gradient-to-r from-blue-50 to-yellow-50 border-primary/30 focus:border-primary transition-all duration-300"
              required
            />
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            className="w-full btn-festhub py-3 text-lg font-semibold"
          >
            Login
          </Button>

          {/* Error Message */}
          {error && (
            <div className="w-full text-center text-red-600 bg-red-50/80 rounded-lg py-2 px-4 text-sm animate-fade-in">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
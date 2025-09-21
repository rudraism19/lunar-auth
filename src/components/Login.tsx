import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { User, Lock, Mail, Phone, Briefcase, UserCheck } from 'lucide-react';
import { toast } from 'sonner';

const FeatureCard = ({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) => (
  <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card/50 backdrop-blur-sm border-primary/20">
    <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 text-primary rounded-full flex items-center justify-center">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2 text-primary">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </Card>
);

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login = ({ onLoginSuccess }: LoginProps) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    toast.info('Redirecting to Google for sign in...');

    try {
      const redirectUrl = `${window.location.origin}/`;

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) throw error;

    } catch (err: any) {
      setError(err.message || 'An error occurred during Google sign in');
      toast.error(err.message || 'An error occurred during Google sign in');
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
              mobile,
            },
            emailRedirectTo: window.location.origin,
          }
        });
        if (error) throw error;
        setShowAuthForm(false);
        setShowVerificationMessage(true);
        toast.success('Account created! Please check your email to verify your account.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        onLoginSuccess();
        setShowAuthForm(false);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };
  
  const showForm = (signUp = false) => {
    setIsSignUp(signUp);
    setShowAuthForm(true);
    setShowVerificationMessage(false);
    setError('');
    setEmail('');
    setPassword('');
    setName('');
    setMobile('');
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background text-foreground">
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 backdrop-blur-lg" />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-background/30 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <img src="/image.png" alt="FestHub Logo" className="w-10 h-10 rounded-full border-2 border-primary/50" />
          <h1 className="text-2xl font-bold text-primary tracking-tight">FestHub</h1>
        </div>
        <div className="space-x-2">
          <Button variant="outline" onClick={() => showForm(false)}>Login</Button>
          <Button onClick={() => showForm(true)}>Register</Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="pt-32 md:pt-40">
        <section className="container mx-auto text-center px-4">
        {(!showAuthForm && !showVerificationMessage) && (
          <div className='animate-in fade-in slide-in-from-top-4 duration-500'>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-br from-primary to-secondary py-2">
              Reinventing Campus Events
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto mb-10">
              FestHub is your all-in-one solution to streamline college event management. From automated attendance to role-based dashboards, we empower students and faculty to create and enjoy unforgettable campus experiences.
            </p>
            <Button size="lg" onClick={() => showForm(true)} className="shadow-lg shadow-primary/20">
              Get Started for Free
            </Button>
          </div>
        )}

        {showAuthForm && (
            <Card className="max-w-md mx-auto bg-card/80 backdrop-blur-xl border-primary/20 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-primary">{isSignUp ? 'Create your FestHub Account' : 'Welcome Back'}</CardTitle>
                <CardDescription>
                  {isSignUp ? 'Join the new era of campus events.' : 'Log in to access your dashboard.'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full"
                  variant="outline"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-muted" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <form onSubmit={handleEmailAuth} className="space-y-4">
                  {isSignUp && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input id="name" type="text" placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)} className="pl-10" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="mobile">Mobile Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input id="mobile" type="tel" placeholder="Enter your mobile number" value={mobile} onChange={(e) => setMobile(e.target.value)} className="pl-10" required />
                        </div>
                      </div>
                    </>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="password" type="password" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10" required />
                    </div>
                  </div>

                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Log In'}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="text-center flex-col gap-2">
                  <Button
                    variant="link"
                    onClick={() => showForm(!isSignUp)}
                    className="text-sm mx-auto"
                  >
                    {isSignUp 
                      ? 'Already have an account? Log in' 
                      : "Don\'t have an account? Sign up"
                    }
                  </Button>
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => setShowAuthForm(false)}
                    className="text-xs text-muted-foreground"
                  > 
                    Back to Home
                  </Button>
              </CardFooter>
            </Card>
        )}
        
        {showVerificationMessage && (
          <Card className="max-w-md mx-auto bg-card/80 backdrop-blur-xl border-primary/20 animate-in fade-in zoom-in-95 duration-500">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-primary">Check your email</CardTitle>
              <CardDescription>
                We\'ve sent a verification link to your email address. Please click the link to complete your registration.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button
                variant="link"
                size="sm"
                onClick={() => { setShowVerificationMessage(false); }}
                className="mx-auto"
              >
                Back to Home
              </Button>
            </CardFooter>
          </Card>
        )}

        </section>

        {/* Features Section */}
        {(!showAuthForm && !showVerificationMessage) && (
          <section className="container mx-auto px-4 py-24 animate-in fade-in slide-in-from-bottom-10 duration-500 delay-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                title="Smart Attendance"
                description="Generate unique QR and 6-digit codes for secure, instant, and hassle-free attendance marking. No more manual check-ins."
                icon={<UserCheck className="w-8 h-8" />}
              />
              <FeatureCard
                title="Role-Based Dashboards"
                description="Enjoy a tailored experience with dedicated dashboards for students and teachers, providing relevant tools and insights at a glance."
                icon={<Briefcase className="w-8 h-8" />}
              />
              <FeatureCard 
                title="Seamless Authentication"
                description="Effortless and secure login with Google or email, powered by Supabase for robust user management and data protection."
                icon={<Lock className="w-8 h-8" />}
              />
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Login;

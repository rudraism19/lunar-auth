import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QrCode, Wifi, Hash, Camera } from 'lucide-react';

const Attendance = () => {
  const [activeMethod, setActiveMethod] = useState('wifi');
  const [attendanceCode, setAttendanceCode] = useState('');

  const attendanceMethods = [
    {
      id: 'wifi',
      title: 'WiFi Router',
      icon: Wifi,
      description: 'Connect to the college WiFi to mark your attendance automatically.',
      color: 'text-blue-500',
      status: 'Connected',
    },
    {
      id: 'code',
      title: '6 Digit Code',
      icon: Hash,
      description: 'Enter the unique 6 digit code provided by your instructor.',
      color: 'text-green-500',
      status: 'Ready',
    },
    {
      id: 'qr',
      title: 'QR Code',
      icon: QrCode,
      description: 'Scan the QR code displayed by your instructor.',
      color: 'text-purple-500',
      status: 'Ready',
    },
    {
      id: 'face',
      title: 'Face Recognition',
      icon: Camera,
      description: 'Use AI-powered face recognition for automatic attendance.',
      color: 'text-orange-500',
      status: 'Beta',
    },
  ];

  const handleCodeSubmit = () => {
    if (attendanceCode.length === 6) {
      // Handle attendance code submission
      console.log('Attendance code submitted:', attendanceCode);
      setAttendanceCode('');
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">Attendance</h1>
        <p className="text-lg text-muted-foreground">
          Mark your attendance using multiple convenient methods
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <Tabs value={activeMethod} onValueChange={setActiveMethod}>
          {/* Method Selection */}
          <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full mb-8">
            {attendanceMethods.map((method) => (
              <TabsTrigger 
                key={method.id} 
                value={method.id}
                className="flex flex-col gap-2 py-3"
              >
                <method.icon className={`w-5 h-5 ${method.color}`} />
                <span className="text-sm">{method.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* WiFi Method */}
          <TabsContent value="wifi">
            <Card>
              <CardHeader className="text-center">
                <Wifi className="w-16 h-16 mx-auto text-blue-500 mb-4" />
                <CardTitle>WiFi Router Attendance</CardTitle>
                <CardDescription>
                  Connect to the college WiFi network to automatically mark your attendance
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div className="space-y-4">
                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                    ✓ Connected to UIT-RGPV-WiFi
                  </Badge>
                  <p className="text-muted-foreground">
                    You are connected to the college WiFi network. Your attendance will be marked automatically.
                  </p>
                </div>
                <img 
                  src="https://img.icons8.com/color/96/wifi.png" 
                  alt="WiFi Attendance" 
                  className="w-24 h-24 mx-auto"
                />
                <Button className="w-full md:w-auto">
                  Mark Attendance
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Code Method */}
          <TabsContent value="code">
            <Card>
              <CardHeader className="text-center">
                <Hash className="w-16 h-16 mx-auto text-green-500 mb-4" />
                <CardTitle>6 Digit Code Attendance</CardTitle>
                <CardDescription>
                  Enter the unique 6 digit code provided by your instructor
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div className="space-y-4 max-w-md mx-auto">
                  <Input
                    type="text"
                    placeholder="Enter 6 digit code"
                    value={attendanceCode}
                    onChange={(e) => setAttendanceCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="text-center text-2xl font-mono tracking-wider"
                    maxLength={6}
                  />
                  <p className="text-sm text-muted-foreground">
                    Ask your instructor for the attendance code
                  </p>
                </div>
                <img 
                  src="https://img.icons8.com/color/96/password.png" 
                  alt="Code Attendance" 
                  className="w-24 h-24 mx-auto"
                />
                <Button 
                  className="w-full md:w-auto"
                  onClick={handleCodeSubmit}
                  disabled={attendanceCode.length !== 6}
                >
                  Submit Code
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* QR Code Method */}
          <TabsContent value="qr">
            <Card>
              <CardHeader className="text-center">
                <QrCode className="w-16 h-16 mx-auto text-purple-500 mb-4" />
                <CardTitle>QR Code Attendance</CardTitle>
                <CardDescription>
                  Scan the QR code displayed by your instructor to mark attendance
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Open your camera and scan the QR code shown on the projector or instructor's device
                  </p>
                </div>
                <img 
                  src="https://img.icons8.com/color/96/qr-code.png" 
                  alt="QR Attendance" 
                  className="w-24 h-24 mx-auto"
                />
                <Button className="w-full md:w-auto">
                  Open Camera Scanner
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Face Recognition Method */}
          <TabsContent value="face">
            <Card>
              <CardHeader className="text-center">
                <Camera className="w-16 h-16 mx-auto text-orange-500 mb-4" />
                <CardTitle>Face Recognition Attendance</CardTitle>
                <CardDescription>
                  Use AI-powered face recognition for automatic attendance marking
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div className="space-y-4">
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                    Beta Feature
                  </Badge>
                  <p className="text-muted-foreground">
                    Position yourself in front of the camera for face recognition. Make sure you have good lighting.
                  </p>
                </div>
                <img 
                  src="https://img.icons8.com/color/96/face-id.png" 
                  alt="Face Recognition" 
                  className="w-24 h-24 mx-auto"
                />
                <Button className="w-full md:w-auto">
                  Start Face Recognition
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Recent Attendance */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recent Attendance</CardTitle>
            <CardDescription>Your last 5 attendance records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { event: 'Morning Assembly', date: '2025-01-15', method: 'WiFi', status: 'Present' },
                { event: 'Computer Science Lecture', date: '2025-01-14', method: 'QR Code', status: 'Present' },
                { event: 'Mathematics Lab', date: '2025-01-13', method: '6-Digit Code', status: 'Present' },
                { event: 'Physics Practical', date: '2025-01-12', method: 'Face Recognition', status: 'Present' },
                { event: 'English Literature', date: '2025-01-11', method: 'WiFi', status: 'Late' },
              ].map((record, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium">{record.event}</p>
                    <p className="text-sm text-muted-foreground">{record.date}</p>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant="outline" 
                      className={
                        record.status === 'Present' 
                          ? 'bg-green-100 text-green-800 border-green-200' 
                          : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                      }
                    >
                      {record.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{record.method}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Attendance;
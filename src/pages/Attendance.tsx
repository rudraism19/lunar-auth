import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { QrCode, Hash, Users, GraduationCap } from 'lucide-react';

const Attendance = () => {
  const [selectedRole, setSelectedRole] = useState<'teacher' | 'student'>('teacher');
  const [selectedMethod, setSelectedMethod] = useState<'code' | 'qr' | null>(null);
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [generatedQR, setGeneratedQR] = useState<string>('');
  const [teacherName, setTeacherName] = useState('');
  const [subject, setSubject] = useState('');
  const [studentCode, setStudentCode] = useState('');

  const generateCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
  };

  const generateQR = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(code)}`;
    setGeneratedQR(qrUrl);
    setGeneratedCode(code);
  };

  return (
    <div className="container mx-auto px-4 py-16 space-y-8">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-purple-500 to-accent bg-clip-text text-transparent">
          Attendance System
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Mark attendance using QR codes, unique codes, or advanced recognition technology
        </p>
      </div>

      {/* Role Selection */}
      <div className="flex justify-center gap-8 mb-12">
        <Button
          variant={selectedRole === 'teacher' ? 'default' : 'outline'}
          onClick={() => {
            setSelectedRole('teacher');
            setSelectedMethod(null);
            setGeneratedCode('');
            setGeneratedQR('');
          }}
          className={`px-8 py-4 text-lg transition-all duration-300 ${
            selectedRole === 'teacher' ? 'btn-festhub' : 'hover:btn-festhub hover:text-white'
          }`}
        >
          <GraduationCap className="mr-2 h-5 w-5" />
          Teacher
        </Button>
        <Button
          variant={selectedRole === 'student' ? 'default' : 'outline'}
          onClick={() => {
            setSelectedRole('student');
            setSelectedMethod(null);
          }}
          className={`px-8 py-4 text-lg transition-all duration-300 ${
            selectedRole === 'student' ? 'btn-festhub' : 'hover:btn-festhub hover:text-white'
          }`}
        >
          <Users className="mr-2 h-5 w-5" />
          Student
        </Button>
      </div>

      {/* Teacher Section */}
      {selectedRole === 'teacher' && (
        <div className="space-y-8 animate-fade-in">
          {/* Method Selection */}
          <div className="flex justify-center gap-8 mb-8">
            <Button
              variant={selectedMethod === 'code' ? 'default' : 'outline'}
              onClick={() => setSelectedMethod('code')}
              className={`px-6 py-3 transition-all duration-300 ${
                selectedMethod === 'code' ? 'btn-festhub' : 'hover:btn-festhub hover:text-white'
              }`}
            >
              <Hash className="mr-2 h-4 w-4" />
              6 Digit Code
            </Button>
            <Button
              variant={selectedMethod === 'qr' ? 'default' : 'outline'}
              onClick={() => setSelectedMethod('qr')}
              className={`px-6 py-3 transition-all duration-300 ${
                selectedMethod === 'qr' ? 'btn-festhub' : 'hover:btn-festhub hover:text-white'
              }`}
            >
              <QrCode className="mr-2 h-4 w-4" />
              QR Code
            </Button>
          </div>

          {/* Code Generation Form */}
          {selectedMethod && (
            <Card className="max-w-2xl mx-auto attendance-form animate-slide-up">
              <CardHeader>
                <CardTitle className="text-center text-2xl text-primary">
                  {selectedMethod === 'code' ? 'Generate 6 Digit Code' : 'Generate QR Code'}
                </CardTitle>
                <CardDescription className="text-center">
                  Fill in your details to generate attendance {selectedMethod === 'code' ? 'code' : 'QR code'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Teacher Name</label>
                    <Input
                      value={teacherName}
                      onChange={(e) => setTeacherName(e.target.value)}
                      placeholder="Enter teacher name"
                      className="bg-gradient-to-r from-blue-50 to-yellow-50 border-primary/30 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Subject</label>
                    <Input
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Enter subject"
                      className="bg-gradient-to-r from-blue-50 to-yellow-50 border-primary/30 focus:border-primary"
                    />
                  </div>
                </div>

                <Button
                  onClick={selectedMethod === 'code' ? generateCode : generateQR}
                  className="w-full btn-festhub py-3 text-lg"
                  disabled={!teacherName || !subject}
                >
                  Generate {selectedMethod === 'code' ? 'Code' : 'QR Code'}
                </Button>

                {/* Generated Code Display */}
                {generatedCode && selectedMethod === 'code' && (
                  <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-yellow-50 rounded-lg animate-scale-in">
                    <h3 className="text-lg font-semibold mb-2 text-primary">Generated Code:</h3>
                    <div className="text-3xl font-bold text-primary mb-4">{generatedCode}</div>
                    <img 
                      src="https://img.icons8.com/color/96/password.png" 
                      alt="Code" 
                      className="mx-auto w-16 h-16"
                    />
                  </div>
                )}

                {/* Generated QR Display */}
                {generatedQR && selectedMethod === 'qr' && (
                  <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-yellow-50 rounded-lg animate-scale-in">
                    <h3 className="text-lg font-semibold mb-2 text-primary">Generated Code: {generatedCode}</h3>
                    <img 
                      src={generatedQR} 
                      alt="QR Code" 
                      className="mx-auto mb-4 rounded-lg shadow-lg"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Student Section */}
      {selectedRole === 'student' && (
        <div className="space-y-8 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Code Entry */}
            <Card className="attendance-form animate-slide-up">
              <CardHeader>
                <CardTitle className="text-center text-xl text-primary">
                  <Hash className="inline-block mr-2 h-5 w-5" />
                  Enter 6 Digit Code
                </CardTitle>
                <CardDescription className="text-center">
                  Enter the 6-digit code provided by your teacher
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  value={studentCode}
                  onChange={(e) => setStudentCode(e.target.value)}
                  placeholder="Enter 6 digit code"
                  maxLength={6}
                  className="text-center text-xl font-mono bg-gradient-to-r from-blue-50 to-yellow-50 border-primary/30 focus:border-primary"
                />
                <Button 
                  className="w-full btn-festhub py-3"
                  disabled={studentCode.length !== 6}
                >
                  Submit Attendance
                </Button>
              </CardContent>
            </Card>

            {/* QR Scanner */}
            <Card className="attendance-form animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <CardTitle className="text-center text-xl text-primary">
                  <QrCode className="inline-block mr-2 h-5 w-5" />
                  Scan QR Code
                </CardTitle>
                <CardDescription className="text-center">
                  Scan the QR code displayed by your teacher
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-center">
                <p className="text-muted-foreground">Please allow camera access to scan the QR code.</p>
                <Button className="btn-festhub px-8 py-3">
                  Allow Camera Access
                </Button>
                <div className="text-sm text-muted-foreground mt-4">
                  Camera status: Ready to scan
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Feature Icons */}
      <div className="flex justify-center gap-8 mt-16 opacity-60">
        {[
          { src: "https://img.icons8.com/color/48/qr-code.png", alt: "QR Code" },
          { src: "https://img.icons8.com/color/48/face-id.png", alt: "Face Recognition" },
          { src: "https://img.icons8.com/color/48/bluetooth.png", alt: "Bluetooth" },
          { src: "https://img.icons8.com/color/48/wifi.png", alt: "Wi-Fi" },
        ].map((icon, index) => (
          <img 
            key={index}
            src={icon.src} 
            alt={icon.alt}
            className="w-12 h-12 transition-transform hover:scale-110 animate-float"
            style={{ animationDelay: `${index * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
};

export default Attendance;
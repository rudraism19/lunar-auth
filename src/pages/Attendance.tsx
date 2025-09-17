import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QrCode, Hash, User as UserIcon, Mail, Users, BookUser, Calendar, Book } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const Attendance = () => {
  const [userRole, setUserRole] = useState(null);
  const [activeMethod, setActiveMethod] = useState('code');
  const [attendanceCode, setAttendanceCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [subject, setSubject] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10)); // Default to today
  const [user, setUser] = useState(null);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data) {
        setUser(data.user);
      }
    };

    fetchUserData();

    // Mock attendance data (replace with actual Supabase call)
    setAttendance([
        { event: 'Computer Science Lecture', date: '2025-01-14', method: 'QR Code', status: 'Present' },
        { event: 'Mathematics Lab', date: '2025-01-13', method: '6-Digit Code', status: 'Present' },
    ]);
  }, []);

  const handleCodeSubmit = () => {
    if (attendanceCode.length === 6) {
      console.log('Attendance code submitted:', attendanceCode);
      setAttendanceCode('');
    }
  };

  const generateNewCode = () => {
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(newCode);
    setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?data=${newCode}&size=200x200&ecc=H`);
  };

  // Role Selection View
  const renderRoleSelection = () => (
    <Card className="max-w-2xl mx-auto text-center animate-in fade-in duration-500">
      <CardHeader>
        <CardTitle>Select Your Role</CardTitle>
        <CardDescription>Are you a student or a teacher?</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row gap-4 justify-center p-8">
        <Button variant="outline" className="flex-1 py-8 text-lg" onClick={() => setUserRole('student')}>
          <Users className="w-6 h-6 mr-2" />
          Student
        </Button>
        <Button variant="outline" className="flex-1 py-8 text-lg" onClick={() => setUserRole('teacher')}>
          <BookUser className="w-6 h-6 mr-2" />
          Teacher
        </Button>
      </CardContent>
    </Card>
  );

  // Student View
  const renderStudentView = () => (
    <Tabs value={activeMethod} onValueChange={setActiveMethod}>
      <TabsList className="grid grid-cols-2 w-full mb-8">
        <TabsTrigger value="code" className="flex flex-col gap-2 py-3">
          <Hash className="w-5 h-5 text-green-500" />
          <span className="text-sm">6 Digit Code</span>
        </TabsTrigger>
        <TabsTrigger value="qr" className="flex flex-col gap-2 py-3">
          <QrCode className="w-5 h-5 text-purple-500" />
          <span className="text-sm">QR Code</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="code">
        <Card>
          <CardHeader className="text-center">
            <Hash className="w-16 h-16 mx-auto text-green-500 mb-4" />
            <CardTitle>6 Digit Code Attendance</CardTitle>
            <CardDescription>Enter the unique code provided by your instructor</CardDescription>
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
            </div>
            <Button onClick={handleCodeSubmit} disabled={attendanceCode.length !== 6}>Submit Code</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="qr">
        <Card>
          <CardHeader className="text-center">
            <QrCode className="w-16 h-16 mx-auto text-purple-500 mb-4" />
            <CardTitle>QR Code Attendance</CardTitle>
            <CardDescription>Scan the QR code displayed by your instructor</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <img src="https://img.icons8.com/color/96/qr-code.png" alt="QR Attendance" className="w-24 h-24 mx-auto" />
            <Button>Open Camera Scanner</Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );

  // Teacher View
  const renderTeacherView = () => (
    <Card>
      <CardHeader>
        <CardTitle>Teacher Dashboard</CardTitle>
        <CardDescription>Generate a new code for your class</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!generatedCode ? (
          <div className="space-y-4">
            <div className="grid sm:grid-cols-1 gap-4">
                <div>
                  <label htmlFor="teacherName" className="text-sm font-medium flex items-center mb-2"><UserIcon className="w-4 h-4 mr-2"/>Teacher Name</label>
                  <Input id="teacherName" placeholder="e.g., Dr. Smith" value={teacherName} onChange={e => setTeacherName(e.target.value)} />
                </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <div>
                <label htmlFor="subject" className="text-sm font-medium flex items-center mb-2"><Book className="w-4 h-4 mr-2"/>Subject Name</label>
                <Input id="subject" placeholder="e.g., Computer Science" value={subject} onChange={e => setSubject(e.target.value)} />
              </div>
              <div>
                <label htmlFor="date" className="text-sm font-medium flex items-center mb-2"><Calendar className="w-4 h-4 mr-2"/>Date</label>
                <Input id="date" type="date" value={date} onChange={e => setDate(e.target.value)} />
              </div>
            </div>
            <Button className="w-full" onClick={generateNewCode} disabled={!teacherName || !subject || !date}>
              Generate New Code
            </Button>
          </div>
        ) : (
          <div className="text-center p-8 bg-muted rounded-lg">
            <div className="mb-4">
                <p className="text-sm font-medium text-muted-foreground">Teacher: {teacherName}</p>
                <p className="text-sm font-medium text-muted-foreground">{subject} - {date}</p>
            </div>
            <h3 className="text-lg font-medium">Attendance Code:</h3>
            <p className="text-6xl font-bold tracking-widest my-4 font-mono">{generatedCode}</p>
            {qrCodeUrl && <img src={qrCodeUrl} alt="Attendance QR Code" className="w-48 h-48 mx-auto rounded-lg border p-1" />}
            <Button variant="outline" className="mt-4" onClick={() => setGeneratedCode(null)}>Create a new code</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">Attendance</h1>
        <p className="text-lg text-muted-foreground">
          Select your role to mark or manage attendance
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {!userRole && renderRoleSelection()}
        {userRole === 'student' && renderStudentView()}
        {userRole === 'teacher' && renderTeacherView()}
        
        {userRole && (
          <Button variant="link" className="mt-4" onClick={() => setUserRole(null)}>Back to role selection</Button>
        )}

        {userRole === 'student' && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Recent Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {attendance.map((record, index) => (
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
                        className={record.status === 'Present' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
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
        )}
      </div>
    </div>
  );
};

export default Attendance;

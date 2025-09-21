import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QrCode, Hash, User as UserIcon, BookUser, Calendar, Book, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import QrCodeScanner from '@/components/QrCodeScanner';
import CodeInput from '@/components/CodeInput';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface AttendanceProps {
  activeMethod: string;
  onMethodChange: (method: string) => void;
}

const Attendance = ({ activeMethod, onMethodChange }: AttendanceProps) => {
  const [userRole, setUserRole] = useState(null);
  const [generatedCode, setGeneratedCode] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [subject, setSubject] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [user, setUser] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [codeInputKey, setCodeInputKey] = useState(Date.now());

  const mockLectures = [
    { teacherName: 'Dr. Evelyn Reed', subject: 'Advanced Quantum Physics' },
    { teacherName: 'Prof. Alan Turing', subject: 'Introduction to Algorithms' },
    { teacherName: 'Dr. Marie Curie', subject: 'Radioactivity and Chemistry' },
    { teacherName: 'Prof. Isaac Newton', subject: 'Classical Mechanics' },
    { teacherName: 'Dr. Ada Lovelace', subject: 'Computational Theory' },
    { teacherName: 'Prof. Stephen Hawking', subject: 'Cosmology and Black Holes' },
    { teacherName: 'Dr. Jane Goodall', subject: 'Primate Behavior' },
    { teacherName: 'Prof. Noam Chomsky', subject: 'Linguistic Theory' },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data) {
        setUser(data.user);
      }
    };

    fetchUserData();

    setAttendance([
        { event: 'Computer Science Lecture', date: '2025-01-14', method: 'QR Code', status: 'Present' },
        { event: 'Mathematics Lab', date: '2025-01-13', method: '6-Digit Code', status: 'Present' },
    ]);
  }, []);

  const handleCodeComplete = (code: string) => {
    console.log('Marking attendance for code:', code);

    const index = parseInt(code.slice(-1), 10) % mockLectures.length;
    const selectedLecture = mockLectures[index];

    const lectureData = {
      code: code,
      subject: selectedLecture.subject,
      teacherName: selectedLecture.teacherName,
      date: new Date().toISOString().slice(0, 10),
      method: '6-Digit Code'
    };

    const newRecord = {
        event: lectureData.subject,
        date: lectureData.date,
        method: lectureData.method,
        status: 'Present'
    };

    setAttendance(prev => [newRecord, ...prev]);
    setSubmissionStatus({ message: `Attendance for ${lectureData.teacherName}'s class marked successfully!`, type: 'success' });
    
    setTimeout(() => {
      setSubmissionStatus(null);
      setCodeInputKey(Date.now());
    }, 3000);
  };

  const handleScanSuccess = (decodedText) => {
    try {
      const data = JSON.parse(decodedText);
      if (data.code && data.teacherName && data.subject) {
        setScannedData({ ...data, method: 'QR Code' });
        setShowConfirmation(true);
        setIsScannerOpen(false);
      } else {
        alert("Invalid QR Code. Please scan a valid code.");
      }
    } catch (error) {
        setScannedData({ code: decodedText, teacherName: 'N/A', subject: 'N/A', date: 'N/A', method: 'QR Code' });
        setShowConfirmation(true);
        setIsScannerOpen(false);
    }
  };

  const handleConfirmation = () => {
    setShowConfirmation(false);

    const newRecord = {
        event: scannedData.subject,
        date: scannedData.date,
        method: scannedData.method,
        status: 'Present'
    };

    setAttendance(prev => [newRecord, ...prev]);
    setSubmissionStatus({ message: `Attendance for ${scannedData.teacherName}'s class marked successfully!`, type: 'success' });
    
    setScannedData(null);
    setTimeout(() => {
      setSubmissionStatus(null);
      setCodeInputKey(Date.now());
    }, 3000);
  };

  const handleCancelConfirmation = () => {
    setShowConfirmation(false);
    setScannedData(null);
    setCodeInputKey(Date.now());
  };

  const generateNewCode = () => {
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    const lectureData = {
        code: newCode,
        teacherName,
        subject,
        date,
    };
    const qrData = JSON.stringify(lectureData);
    setGeneratedCode(newCode);
    setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrData)}&size=200x200&ecc=H`);
  };

  const renderRoleSelection = () => (
    <Card className="max-w-2xl mx-auto text-center animate-in fade-in duration-500">
      <CardHeader>
        <CardTitle>Select Your Role</CardTitle>
        <CardDescription>Are you a student or a teacher?</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row gap-4 justify-center p-8">
        <Button variant="outline" className="flex-1 py-8 text-lg" onClick={() => setUserRole('student')}>
          <UserIcon className="w-6 h-6 mr-2" />
          Student
        </Button>
        <Button variant="outline" className="flex-1 py-8 text-lg" onClick={() => setUserRole('teacher')}>
          <BookUser className="w-6 h-6 mr-2" />
          Teacher
        </Button>
      </CardContent>
    </Card>
  );

  const renderStudentView = () => (
    <Tabs value={activeMethod} onValueChange={onMethodChange}>
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
          <CardContent className="text-center space-y-6 min-h-[150px]">
            <div className="space-y-4 max-w-md mx-auto">
              <CodeInput key={codeInputKey} length={6} onComplete={handleCodeComplete} />
              {submissionStatus && (
                <div className={`mt-4 text-sm font-medium flex items-center justify-center gap-2 ${submissionStatus.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                  {submissionStatus.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                  {submissionStatus.message}
                </div>
              )}
            </div>
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
            <Button onClick={() => setIsScannerOpen(!isScannerOpen)}>
              {isScannerOpen ? 'Close Scanner' : 'Open Camera Scanner'}
            </Button>
          </CardContent>
        </Card>
        {isScannerOpen && (
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>QR Code Scanner</CardTitle>
            </CardHeader>
            <CardContent>
              <QrCodeScanner onScanSuccess={handleScanSuccess} />
            </CardContent>
          </Card>
        )}
      </TabsContent>
    </Tabs>
  );

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
                <p className-="text-sm font-medium text-muted-foreground">{subject} - {date}</p>
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
        {showConfirmation && scannedData && (
        <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Attendance</AlertDialogTitle>
              <AlertDialogDescription>
                You are about to mark your attendance for the following lecture:
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="my-4 space-y-2">
                <p><strong>Subject:</strong> {scannedData.subject}</p>
                <p><strong>Teacher:</strong> {scannedData.teacherName}</p>
                <p><strong>Date:</strong> {scannedData.date}</p>
                <p className="font-mono text-center text-2xl bg-muted p-2 rounded-md">{scannedData.code}</p>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleCancelConfirmation}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmation}>Confirm</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

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
                        variant={record.status === 'Present' ? 'default' : 'secondary'}
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

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const FestHubAttendance = () => {
  const [selectedRole, setSelectedRole] = useState<'teacher' | 'student'>('teacher');
  const [selectedMethod, setSelectedMethod] = useState<'code' | 'qr' | null>(null);
  const [studentMethod, setStudentMethod] = useState<'code' | 'qr' | null>(null);
  const [generatedCode, setGeneratedCode] = useState('');
  const [qrData, setQrData] = useState<{ code: string; qrUrl: string } | null>(null);
  const [cameraStatus, setCameraStatus] = useState('');

  const generateCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
  };

  const generateQR = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(code)}`;
    setQrData({ code, qrUrl });
  };

  const requestCamera = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
        setCameraStatus('Camera access granted!');
      } catch (err) {
        setCameraStatus('Camera access denied.');
      }
    } else {
      setCameraStatus('Camera not supported on this device.');
    }
  };

  const handleRippleEffect = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  };

  return (
    <section className="min-h-screen pt-20 pb-16 fade-in" 
             style={{ 
               background: 'linear-gradient(135deg, hsl(45 93% 47%) 0%, hsl(194 100% 91%) 60%, hsl(0 100% 93%) 100%)',
               borderRadius: '24px',
               boxShadow: '0 8px 32px rgba(255, 215, 0, 0.12)'
             }}>
      <div className="max-w-4xl mx-auto px-8">
        <h2 className="text-4xl font-bold text-center mb-8 text-[hsl(207_90%_54%)] glow fade-in-up">Attendance</h2>
        
        {/* Role Selection */}
        <div className="flex justify-center gap-8 mb-8 fade-in-up" style={{ animationDelay: '0.2s' }}>
          <Button
            onClick={(e) => {
              setSelectedRole('teacher');
              setSelectedMethod(null);
              setStudentMethod(null);
              handleRippleEffect(e);
            }}
            className={`btn-festhub relative overflow-hidden hover-scale ${selectedRole === 'teacher' ? 'shadow-elegant' : ''}`}
          >
            👨‍🏫 Teacher
          </Button>
          <Button
            onClick={(e) => {
              setSelectedRole('student');
              setSelectedMethod(null);
              setStudentMethod(null);
              handleRippleEffect(e);
            }}
            className={`btn-festhub relative overflow-hidden hover-scale ${selectedRole === 'student' ? 'shadow-elegant' : ''}`}
          >
            👨‍🎓 Student
          </Button>
        </div>

        {/* Teacher Section */}
        {selectedRole === 'teacher' && (
          <div className="attendance-inner-tab scale-in">
            {!selectedMethod ? (
              <div className="flex flex-wrap justify-center gap-4 mb-8 fade-in-up">
                <Button
                  onClick={(e) => {
                    setSelectedMethod('code');
                    handleRippleEffect(e);
                  }}
                  className="btn-festhub relative overflow-hidden hover-scale"
                >
                  🔢 6 Digit Code
                </Button>
                <Button
                  onClick={(e) => {
                    setSelectedMethod('qr');
                    handleRippleEffect(e);
                  }}
                  className="btn-festhub relative overflow-hidden hover-scale"
                >
                  📱 QR Code
                </Button>
              </div>
            ) : (
              <>
                {selectedMethod === 'code' && (
                  <div className="text-center">
                    <h3 className="text-2xl font-semibold mb-6 text-[hsl(207_90%_54%)]">Attendance via 6 Digit Code</h3>
                    <div className="flex flex-wrap justify-center gap-4 mb-6">
                      <Input
                        placeholder="Teacher Name"
                        className="max-w-[200px] py-3 border-2 border-[hsl(207_90%_54%)] rounded-lg bg-gradient-to-r from-[hsl(194_100%_91%)] to-[hsl(48_100%_93%)] shadow-blue focus:border-[hsl(45_93%_47%)] focus:shadow-gold"
                      />
                      <Input
                        placeholder="Teaching Subject"
                        className="max-w-[200px] py-3 border-2 border-[hsl(207_90%_54%)] rounded-lg bg-gradient-to-r from-[hsl(194_100%_91%)] to-[hsl(48_100%_93%)] shadow-blue focus:border-[hsl(45_93%_47%)] focus:shadow-gold"
                      />
                    </div>
                    <Button
                      onClick={(e) => {
                        generateCode();
                        handleRippleEffect(e);
                      }}
                      className="btn-festhub relative overflow-hidden mb-4"
                    >
                      Generate 6 Digit Code
                    </Button>
                    {generatedCode && (
                      <div className="text-2xl font-bold text-[hsl(207_90%_54%)] mb-4">
                        Generated Code: {generatedCode}
                      </div>
                    )}
                    <img src="https://img.icons8.com/color/96/password.png" alt="Code Attendance" className="mx-auto block mt-4" />
                  </div>
                )}

                {selectedMethod === 'qr' && (
                  <div className="text-center">
                    <h3 className="text-2xl font-semibold mb-6 text-[hsl(207_90%_54%)]">Attendance via QR Code</h3>
                    <div className="flex flex-wrap justify-center gap-4 mb-6">
                      <Input
                        placeholder="Teacher Name"
                        className="max-w-[200px] py-3 border-2 border-[hsl(207_90%_54%)] rounded-lg bg-gradient-to-r from-[hsl(194_100%_91%)] to-[hsl(48_100%_93%)] shadow-blue focus:border-[hsl(45_93%_47%)] focus:shadow-gold"
                      />
                      <Input
                        placeholder="Teaching Subject"
                        className="max-w-[200px] py-3 border-2 border-[hsl(207_90%_54%)] rounded-lg bg-gradient-to-r from-[hsl(194_100%_91%)] to-[hsl(48_100%_93%)] shadow-blue focus:border-[hsl(45_93%_47%)] focus:shadow-gold"
                      />
                    </div>
                    <Button
                      onClick={(e) => {
                        generateQR();
                        handleRippleEffect(e);
                      }}
                      className="btn-festhub relative overflow-hidden mb-4"
                    >
                      Generate QR Code
                    </Button>
                    {qrData && (
                      <div className="mt-4">
                        <div className="text-lg font-semibold text-[hsl(207_90%_54%)] mb-2">
                          Generated Code: {qrData.code}
                        </div>
                        <img src={qrData.qrUrl} alt="QR Code" className="mx-auto block" />
                      </div>
                    )}
                    <img src="https://img.icons8.com/color/96/qr-code.png" alt="QR Attendance" className="mx-auto block mt-4" />
                  </div>
                )}
                
                <Button
                  onClick={() => setSelectedMethod(null)}
                  className="btn-festhub relative overflow-hidden mt-6 mx-auto"
                >
                  Back
                </Button>
              </>
            )}
          </div>
        )}

        {/* Student Section */}
        {selectedRole === 'student' && (
          <div className="attendance-inner-tab">
            <h3 className="text-2xl font-semibold mb-6 text-center text-[hsl(207_90%_54%)]">Student Attendance</h3>
            
            {!studentMethod ? (
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                <Button
                  onClick={(e) => {
                    setStudentMethod('code');
                    handleRippleEffect(e);
                  }}
                  className="btn-festhub relative overflow-hidden"
                >
                  Enter 6 Digit Code
                </Button>
                <Button
                  onClick={(e) => {
                    setStudentMethod('qr');
                    handleRippleEffect(e);
                  }}
                  className="btn-festhub relative overflow-hidden"
                >
                  Scan QR Code
                </Button>
              </div>
            ) : (
              <>
                {studentMethod === 'code' && (
                  <div className="text-center">
                    <Input
                      type="text"
                      maxLength={6}
                      placeholder="Enter 6 digit code"
                      className="max-w-[220px] mx-auto py-3 border-2 border-[hsl(207_90%_54%)] rounded-lg text-lg bg-gradient-to-r from-[hsl(194_100%_91%)] to-[hsl(48_100%_93%)] shadow-blue focus:border-[hsl(45_93%_47%)] focus:shadow-gold mb-4"
                    />
                    <Button
                      onClick={(e) => handleRippleEffect(e)}
                      className="btn-festhub relative overflow-hidden"
                    >
                      Submit
                    </Button>
                  </div>
                )}

                {studentMethod === 'qr' && (
                  <div className="text-center">
                    <p className="mb-4 text-gray-700">Please allow camera access to scan the QR code.</p>
                    <Button
                      onClick={(e) => {
                        requestCamera();
                        handleRippleEffect(e);
                      }}
                      className="btn-festhub relative overflow-hidden mb-4"
                    >
                      Allow Camera
                    </Button>
                    {cameraStatus && (
                      <div className={`mt-4 font-semibold ${
                        cameraStatus.includes('granted') ? 'text-[hsl(207_90%_54%)]' : 'text-red-600'
                      }`}>
                        {cameraStatus}
                      </div>
                    )}
                  </div>
                )}
                
                <Button
                  onClick={() => setStudentMethod(null)}
                  className="btn-festhub relative overflow-hidden mt-6 mx-auto"
                >
                  Back
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default FestHubAttendance;
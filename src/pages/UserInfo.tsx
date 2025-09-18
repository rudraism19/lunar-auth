import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Mail, Phone, CheckCircle, XCircle, Edit, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Mock data for registered events and attendance history
const registeredEvents = [
  {
    id: 1,
    name: 'Codefest',
    date: 'October 10, 2024',
    status: 'Registered',
  },
  {
    id: 2,
    name: 'Melody Night',
    date: 'October 12, 2024',
    status: 'Registered',
  },
];

const attendanceHistory = [
  {
    id: 1,
    name: 'Blitz Chess',
    date: 'October 11, 2024',
    status: 'Attended',
  },
  {
    id: 2,
    name: 'Introduction to AI',
    date: 'September 5, 2024',
    status: 'Absent',
  },
];

const UserInfo = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data.user) {
        setUser(data.user);
        setFullName(data.user.user_metadata.full_name || '');
        setMobile(data.user.user_metadata.mobile || '');
      } else {
        console.error('Error fetching user:', error);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (avatarFile) {
      const objectUrl = URL.createObjectURL(avatarFile);
      setAvatarPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [avatarFile]);

  const handleUpdateProfile = async () => {
    if (!user) return;

    let avatar_url = user.user_metadata.avatar_url;

    if (avatarFile) {
      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(`${user.id}/${avatarFile.name}`, avatarFile, {
          cacheControl: '3600',
          upsert: true,
        });

      if (data) {
        const { data: publicUrlData } = supabase.storage.from('avatars').getPublicUrl(data.path);
        avatar_url = publicUrlData.publicUrl;
      } else {
        console.error('Error uploading avatar:', error?.message);
      }
    }

    const { data: updatedUserData, error: updateUserError } = await supabase.auth.updateUser({
      data: { full_name: fullName, avatar_url, mobile },
    });

    if (updatedUserData.user) {
      setUser(updatedUserData.user);
      setIsEditing(false);
      setAvatarFile(null);
      setAvatarPreview(null);
    } else {
      console.error('Error updating user:', updateUserError?.message);
    }
  };
  
  const handleCancelEdit = () => {
    setIsEditing(false);
    setAvatarFile(null);
    setAvatarPreview(null);
    if (user) {
        setFullName(user.user_metadata.full_name || '');
        setMobile(user.user_metadata.mobile || '');
    }
  };

  if (loading) {
    return <div>Loading user information...</div>;
  }

  if (!user) {
    return <div>Please log in to view your information.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">My Profile</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="flex flex-col items-center text-center">
                <div className="relative">
                    <Avatar className="w-24 h-24 mb-4">
                        <AvatarImage src={avatarPreview || user.user_metadata.avatar_url} />
                        <AvatarFallback>{user.user_metadata.full_name?.[0] || 'U'}</AvatarFallback>
                    </Avatar>
                    {isEditing && (
                        <>
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            className="hidden" 
                            onChange={(e) => setAvatarFile(e.target.files ? e.target.files[0] : null)} 
                            accept="image/*"
                        />
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="absolute bottom-4 right-0 rounded-full bg-background/80" 
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <Camera className="h-5 w-5" />
                        </Button>
                        </>
                    )}
                </div>
              {isEditing ? (
                <Input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="text-center"
                  placeholder="Full Name"
                />
              ) : (
                <CardTitle className="text-2xl">{user.user_metadata.full_name || 'User'}</CardTitle>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Mail className="text-muted-foreground" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="text-muted-foreground" />
                {isEditing ? (
                  <Input
                    type="text"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="Phone Number"
                  />
                ) : (
                  <span>{user.user_metadata.mobile || 'Not provided'}</span>
                )}
              </div>
              {isEditing ? (
                <div className="flex gap-2 mt-6">
                  <Button onClick={handleUpdateProfile} className="flex-1">Save Changes</Button>
                  <Button variant="outline" onClick={handleCancelEdit} className="flex-1">Cancel</Button>
                </div>
              ) : (
                <Button onClick={() => setIsEditing(true)} variant="outline" className="w-full">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Registered Events</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {registeredEvents.map(event => (
                    <TableRow key={event.id}>
                      <TableCell>{event.name}</TableCell>
                      <TableCell>{event.date}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{event.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Attendance History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceHistory.map(item => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>
                        <Badge variant={item.status === 'Attended' ? 'default' : 'destructive'}>
                          {item.status === 'Attended' ? <CheckCircle className="w-4 h-4 mr-1" /> : <XCircle className="w-4 h-4 mr-1" />}
                          {item.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;

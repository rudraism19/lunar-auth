import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Github, Linkedin, Mail, ExternalLink, Code, Lightbulb, Heart } from 'lucide-react';

const About = () => {
  const skills = [
    'React & TypeScript',
    'Node.js & Express',
    'MongoDB & Supabase', 
    'Python & AI/ML',
    'Mobile Development',
    'UI/UX Design',
    'Database Design',
    'System Architecture',
  ];

  const achievements = [
    { title: 'Full Stack Developer', organization: 'Multiple Projects', year: '2022-2025' },
    { title: 'Open Source Contributor', organization: 'GitHub Community', year: '2023-2025' },
    { title: 'Hackathon Winner', organization: 'College Tech Fest', year: '2024' },
    { title: 'Teaching Assistant', organization: 'UIT RGPV', year: '2023-2024' },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">About the Author</h1>
        <p className="text-lg text-muted-foreground">
          Meet the developer behind FestHub
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Author Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Profile Card */}
          <Card className="lg:col-span-1">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                {/* Profile Image Placeholder */}
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <span className="text-4xl font-bold text-primary-foreground">HK</span>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold">Hacker Kushwah</h2>
                  <p className="text-muted-foreground">Full Stack Developer</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Computer Science Student<br />
                    UIT RGPV, Bhopal
                  </p>
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-4 pt-4">
                  <Button size="icon" variant="outline">
                    <Github className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="outline">
                    <Linkedin className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="outline">
                    <Mail className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="outline">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bio */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                About Me
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="leading-relaxed">
                Hello! I'm Hacker Kushwah, a passionate Computer Science student at UIT RGPV, Bhopal, 
                and the creator of FestHub. With a deep love for technology and problem-solving, 
                I developed FestHub to address the real challenges students and institutions face 
                in managing events and attendance.
              </p>
              
              <p className="leading-relaxed">
                As a full-stack developer with expertise in modern web technologies, I believe in 
                creating solutions that are not just functional, but also beautiful and user-friendly. 
                FestHub represents my vision of how technology can enhance the educational experience 
                and bring communities together.
              </p>

              <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                <Lightbulb className="w-5 h-5 text-yellow-500 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Vision</p>
                  <p className="text-sm text-muted-foreground">
                    "To bridge the gap between technology and education, making campus life 
                    more connected, efficient, and enjoyable for everyone."
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Skills & Technologies */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5 text-blue-500" />
                Skills & Technologies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{achievement.title}</p>
                      <p className="text-xs text-muted-foreground">{achievement.organization}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {achievement.year}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Project Philosophy */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle>Project Philosophy</CardTitle>
            <CardDescription>The principles that guided the development of FestHub</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="font-semibold">User-Centric Design</h3>
                <p className="text-sm text-muted-foreground">
                  Every feature is designed with the end user in mind, ensuring simplicity and efficiency.
                </p>
              </div>
              
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="font-semibold">Innovation First</h3>
                <p className="text-sm text-muted-foreground">
                  Leveraging cutting-edge technologies to solve traditional problems in new ways.
                </p>
              </div>
              
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto rounded-full bg-purple-100 flex items-center justify-center">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="font-semibold">Community Impact</h3>
                <p className="text-sm text-muted-foreground">
                  Building solutions that strengthen educational communities and foster collaboration.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Get in Touch</CardTitle>
            <CardDescription>
              Have questions about FestHub or want to collaborate? I'd love to hear from you!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Contact Information</h4>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    hackerkushwah@gmail.com
                  </p>
                  <p className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                    Portfolio: hackerkushwah.dev
                  </p>
                  <p className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-muted-foreground" />
                    GitHub: @hackerkushwah
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Let's Connect</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  I'm always open to discussing new projects, creative ideas, or opportunities to 
                  improve educational technology.
                </p>
                <div className="flex gap-2">
                  <Button size="sm" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Send Email
                  </Button>
                  <Button size="sm" variant="outline" className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
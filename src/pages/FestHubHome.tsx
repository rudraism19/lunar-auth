interface HomeProps {
  onSectionChange: (section: string) => void;
}

const FestHubHome = ({ onSectionChange }: HomeProps) => {
  const tabCards = [
    {
      id: 'events',
      icon: '🎭',
      title: 'Events',
      description: 'Discover upcoming festivals, competitions, and cultural events.'
    },
    {
      id: 'features', 
      icon: '⚡',
      title: 'Features',
      description: 'Explore our advanced features and smart attendance system.'
    },
    {
      id: 'aims',
      icon: '🎯', 
      title: 'Aims',
      description: 'Learn about our mission to revolutionize event management.'
    },
    {
      id: 'calendar',
      icon: '📅',
      title: 'Calendar', 
      description: 'Stay updated with our interactive calendar.'
    }
  ];

  const techIcons = [
    { src: "https://img.icons8.com/color/48/000000/qr-code.png", alt: "QR Attendance" },
    { src: "https://img.icons8.com/color/48/000000/face-id.png", alt: "Face Recognition" },
    { src: "https://img.icons8.com/color/48/000000/bluetooth.png", alt: "Bluetooth" },
    { src: "https://img.icons8.com/color/48/000000/wifi.png", alt: "Wi-Fi" },
    { src: "https://img.icons8.com/color/48/000000/calendar.png", alt: "Calendar" },
    { src: "https://img.icons8.com/color/48/000000/idea.png", alt: "Suggestions" },
    { src: "https://img.icons8.com/color/48/000000/trophy.png", alt: "Trophy" },
    { src: "https://img.icons8.com/color/48/000000/analytics.png", alt: "Analytics" },
    { src: "https://img.icons8.com/color/48/000000/medal.png", alt: "Medal" }
  ];

  return (
    <section className="min-h-screen pt-20 pb-16 fade-in" 
             style={{ 
               background: 'linear-gradient(135deg, hsl(45 93% 47%) 0%, hsl(194 100% 91%) 60%, hsl(0 100% 93%) 100%)',
               borderRadius: '24px',
               boxShadow: '0 8px 32px rgba(255, 215, 0, 0.12)'
             }}>
      <div className="max-w-6xl mx-auto px-8">
        <div className="flex flex-col justify-center items-center text-center min-h-screen pt-20">
          {/* Logo Section */}
          <div className="flex justify-center items-center gap-4 mb-8 bounce-in">
            <img 
              src="https://img.icons8.com/color/96/graduation-cap.png" 
              alt="FestHub Logo" 
              className="h-[120px] w-[120px] shadow-gold border-2 border-[hsl(207_90%_54%)] rounded-full hover-scale float"
            />
            <img 
              src="https://img.icons8.com/color/96/000000/graduation-cap.png" 
              alt="College Logo" 
              className="h-24 w-24 mb-4 hover-scale float"
              style={{ animationDelay: '0.5s' }}
            />
          </div>

          {/* Hero Content */}
          <div className="space-y-6 mb-8 fade-in-up">
            <h1 className="text-6xl md:text-7xl font-bold mb-4 glow"
                style={{
                  background: 'linear-gradient(45deg, hsl(207 90% 54%), hsl(187 85% 53%), hsl(174 100% 41%))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
              College Event Manager
            </h1>
            
            <p className="text-2xl italic text-gray-900 mb-12 opacity-90 fade-in-up"
               style={{ 
                 textShadow: '0 0 10px rgba(100, 255, 218, 0.3)',
                 animationDelay: '0.2s'
               }}>
              "Excellence is never an accident."
            </p>
            
            <p className="text-lg text-gray-800 max-w-4xl mx-auto leading-relaxed mb-8 fade-in-up"
               style={{ animationDelay: '0.4s' }}>
              Smart platform for events, attendance, and routines.
            </p>

            {/* Technology Icons */}
            <div className="flex flex-wrap justify-center gap-4 mb-12 fade-in-up"
                 style={{ animationDelay: '0.6s' }}>
              {techIcons.map((icon, index) => (
                <img 
                  key={index}
                  src={icon.src} 
                  alt={icon.alt}
                  className="w-12 h-12 hover-scale float"
                  style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                />
              ))}
            </div>
          </div>

          {/* Feature Cards */}
          <div className="flex flex-wrap justify-center items-stretch gap-8 mt-8">
            {tabCards.map((card, index) => (
              <div
                key={card.id}
                onClick={() => onSectionChange(card.id)}
                className="bg-white border-2 border-[hsl(194_100%_91%)] rounded-2xl p-8 text-center cursor-pointer hover-lift hover-glow relative overflow-hidden min-w-[280px] flex-1 max-w-[320px] scale-in"
                style={{ 
                  boxShadow: '0 4px 16px rgba(33, 150, 243, 0.07)',
                  animationDelay: `${1.2 + index * 0.1}s`
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[hsl(207_90%_54%)] to-[hsl(45_93%_47%)] transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
                
                <h3 className="text-[hsl(207_90%_54%)] mb-4 text-2xl font-semibold">
                  <span className="inline-block hover-scale">{card.icon}</span> {card.title}
                </h3>
                
                <p className="opacity-85 leading-relaxed text-gray-600">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FestHubHome;
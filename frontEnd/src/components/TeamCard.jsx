/**
 * TeamCard Component - Reusable team section card with modern styling
 * 
 * This component is designed for reusability and receives props for customization.
 * Features: gradient backgrounds, glassmorphism effects, hover animations
 */

export default function TeamCard({
    color = "bg-blue-500",
    icon = "⚡",
    teamName = "Electrical Team",
    title = "Electrical Engineering Team",
    description,
    skills = [],
  }) {
    return (
      <div className="bg-navy-light rounded-2xl overflow-hidden shadow-2xl hover:shadow-glow transition-all duration-300 border border-white/5 hover:border-royal/30">
        <div className="flex flex-col md:flex-row h-full">
          {/* Left Column - Icon */}
          <div className={`${color} p-8 flex flex-col items-center justify-center min-w-[200px] relative overflow-hidden`}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
            <div className="text-6xl mb-4 relative z-10 transform transition-transform duration-300 hover:scale-110">{icon}</div>
            <h3 className="text-xl font-bold text-white relative z-10">{teamName}</h3>
          </div>
  
          {/* Right Column - Content */}
          <div className="p-8 flex-1 bg-gradient-to-br from-navy-lighter/50 to-transparent">
            <h3 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">{title}</h3>
            <p className="text-gray-300 mb-6 leading-relaxed text-lg">{description}</p>
  
            <div className="grid grid-cols-2 gap-3">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="glass-effect text-white px-4 py-3 rounded-lg text-sm text-center hover:bg-white/10 transition-all duration-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
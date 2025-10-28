/**
 * Home Page - WasteShark Landing Page
 * 
 * No Authentication or context dependencies.
 * No navbar, waiting for Kardin's code
 * 
 */

import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <>
      <div className="min-h-screen bg-navy text-white">
        {/* Hero Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
              Autonomous Pool Cleaning <br />
              <span className="text-royal">for Debris Removal</span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto text-gray-300 leading-relaxed">
              WasteShark is an advanced autonomous pool cleaning robot that efficiently
              removes large debris with the simple press of a button. Experience hassle-free
              pool maintenance with our cutting-edge technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <button className="px-12 py-4 bg-royal text-white rounded-lg text-lg font-semibold hover:bg-blue-600 transition-all">
                  Get Started
                </button>
              </Link>
              <a href="#about">
                <button className="px-12 py-4 bg-transparent border-2 border-white text-white rounded-lg text-lg font-semibold hover:bg-white hover:text-navy transition-all">
                  Learn More
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Lower Content Section */}
      <section className="bg-[#0a1a3a] text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Revolutionary Pool Technology
            </h2>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto text-gray-300 leading-relaxed">
              Our autonomous robots combine cutting-edge AI with precision engineering to
              deliver the most advanced pool cleaning experience.
            </p>
          </div>
        </div>
      </section>
    </div>


      {/* About Our Team Section */}
      <section className="bg-gradient-to-b from-navy via-indigo-950/30 to-navy text-white py-24 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden opacity-40">
          <div className="absolute top-40 right-1/4 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 left-1/4 w-72 h-72 bg-teal-500/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              About Our Team
            </h2>
            <p className="text-xl max-w-4xl mx-auto text-gray-200 leading-relaxed">
              Meet the talented individuals behind WasteShark's innovative pool cleaning technology. Our diverse team of experts brings together cutting-edge engineering and design to create the most advanced autonomous pool cleaning robot on the market.
            </p>
          </div>

          {/* Team Cards with scroll animation */}
          <div className="flex flex-col gap-8">
            <div 
              ref={(el) => (teamCardsRef.current[0] = el)}
              className="opacity-0 transition-all duration-700"
              style={{ transitionDelay: '0ms' }}
            >
              <TeamCard
                color="bg-gradient-to-br from-cyan-500 via-blue-500 to-blue-600"
                icon="⚡"
                teamName="Electrical Team"
                title="Electrical Engineering Team"
                description="Our electrical engineers design and develop the advanced control systems, sensors, and power management that make WasteShark's autonomous navigation possible. They ensure reliable operation and efficient power consumption."
                skills={[
                  'Autonomous Navigation Systems',
                  'Sensor Integration',
                  'Control Algorithms',
                  'Power Management'
                ]}
              />
            </div>

            <div 
              ref={(el) => (teamCardsRef.current[1] = el)}
              className="opacity-0 transition-all duration-700"
              style={{ transitionDelay: '100ms' }}
            >
              <TeamCard
                color="bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600"
                icon="🔧"
                teamName="Mechanical Team"
                title="Mechanical Engineering Team"
                description="Our mechanical engineers create the robust, water-resistant chassis and propulsion systems that allow WasteShark to navigate and clean pools effectively. They focus on durability and performance in aquatic environments."
                skills={[
                  'Underwater Propulsion',
                  'Debris Collection Systems',
                  'Durable Materials',
                  'Waterproof Design'
                ]}
              />
            </div>

            <div 
              ref={(el) => (teamCardsRef.current[2] = el)}
              className="opacity-0 transition-all duration-700"
              style={{ transitionDelay: '200ms' }}
            >
              <TeamCard
                color="bg-gradient-to-br from-purple-500 via-pink-500 to-rose-600"
                icon="💻"
                teamName="Software Team"
                title="Software Development Team"
                description="Our software engineers develop the intelligent algorithms and user interface that make WasteShark easy to use. They create the one-button operation system and ensure seamless user experience."
                skills={[
                  'AI Navigation',
                  'User Interface Design',
                  'Machine Learning',
                  'Mobile App Development'
                ]}
              />
            </div>
          </div>
        </div>
      </section>

</>
  )
}

export default Home

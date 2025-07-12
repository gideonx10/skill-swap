<<<<<<< HEAD:components/Landing.tsx
import React from "react";
import { ArrowRight, Users, Zap, Star, Play } from "lucide-react";
=======
"use client"
import React from 'react';
import { ArrowRight, Users, Zap, Star, Play } from 'lucide-react';
import HowItWorks from './HowItWorks';
import UseCases from './UseCases';
import Testimonials from './Testimonals';
import Footer from './Footer';
>>>>>>> 62774be4ecc6975f20a4c07a3ab3d20e4f7cd723:components/homepage/Landing.tsx

const Landing: React.FC = () => {
  return (
    <>
    <div className="h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-900 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-200/40 to-indigo-200/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-purple-200/40 to-pink-200/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-indigo-200/30 to-blue-200/30 rounded-full blur-2xl"></div>
      </div>

      {/* Geometric Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(79, 70, 229, 0.3) 0%, transparent 50%),
                              radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)`,
          }}
        ></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center px-8 py-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <div className="w-6 h-6 bg-white rounded-lg"></div>
          </div>
          <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-display">
            SKILLSWAP
          </span>
        </div>
        <div className="flex items-center space-x-8">
          <a
            href="#"
            className="text-gray-700 hover:text-indigo-600 transition-colors font-semibold font-display"
          >
            Features
          </a>
          <a
            href="#"
            className="text-gray-700 hover:text-indigo-600 transition-colors font-semibold font-display"
          >
            Pricing
          </a>
          <a
            href="#"
            className="text-gray-700 hover:text-indigo-600 transition-colors font-semibold font-display"
          >
            About
          </a>
          <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg font-display">
            Sign In
          </button>
        </div>
      </nav>

      {/* Main Content Grid */}
      <div className="relative z-10 grid grid-cols-12 h-full px-8 -mt-20">
        {/* Left Column - Hero Text */}
        <div className="col-span-12 lg:col-span-7 flex flex-col justify-center space-y-8">
          <div className="space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-indigo-100">
              <Zap className="w-4 h-4 text-indigo-600 mr-2" />
              <span className="text-sm font-bold text-indigo-800 font-display">
                Next-Gen Skill Exchange
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="pt-5 pb-5 text-[3rem] sm:text-[3.5rem] md:text-[4rem] lg:text-[4.5rem] xl:text-[5rem] font-black tracking-[-0.03em] text-gray-900 leading-[0.9] transform scale-y-120 font-display">
              <span className="block">EXCHANGE</span>
              <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                SKILLS
              </span>
              <span className="block">GLOBALLY</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-gray-600 max-w-2xl font-medium leading-relaxed font-sans">
              Connect with skilled professionals worldwide. Trade your
              expertise, learn new skills, and build meaningful professional
              relationships.
            </p>
          </div>

          {/* CTA Section */}
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <button className="group bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 flex items-center space-x-3 shadow-xl font-display">
              <span>Start Trading Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group flex items-center space-x-3 text-gray-700 hover:text-indigo-600 transition-colors font-semibold font-display">
              <div className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-indigo-100 group-hover:border-indigo-200 transition-colors">
                <Play className="w-5 h-5 text-indigo-600" />
              </div>
              <span className="text-lg">Watch Demo</span>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center space-x-8 pt-4">
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full border-2 border-white"></div>
                <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full border-2 border-white"></div>
                <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-red-400 rounded-full border-2 border-white"></div>
              </div>
              <span className="text-sm font-semibold text-gray-600 font-display">
                10K+ Active Users
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-bold text-gray-900 font-display">
                4.9
              </span>
              <span className="text-sm text-gray-600 font-display">
                (2.1k reviews)
              </span>
            </div>
          </div>
        </div>

        {/* Right Column - Feature Cards */}
        <div className="col-span-12 lg:col-span-5 flex flex-col justify-center space-y-6 lg:pl-8">
          {[
            {
              icon: <Users className="w-6 h-6 text-white" />,
              bg: "bg-gradient-to-br from-indigo-500 to-purple-500",
              title: "Smart Matching",
              desc: "AI-powered skill matching system",
            },
            {
              icon: <Zap className="w-6 h-6 text-white" />,
              bg: "bg-gradient-to-br from-purple-500 to-pink-500",
              title: "Instant Connect",
              desc: "Real-time skill exchange platform",
            },
            {
              icon: <Star className="w-6 h-6 text-white" />,
              bg: "bg-gradient-to-br from-pink-500 to-red-500",
              title: "Verified Reviews",
              desc: "Trusted feedback system",
            },
          ].map(({ icon, bg, title, desc }, i) => (
            <div
              key={i}
              className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-indigo-100 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center`}
                >
                  {icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 font-display">
                    {title}
                  </h3>
                  <p className="text-gray-600 text-sm font-sans">{desc}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Stats Card */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-2xl shadow-xl text-white">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-black font-display">25K+</div>
                <div className="text-xs opacity-90 font-sans">
                  Skills Traded
                </div>
              </div>
              <div>
                <div className="text-2xl font-black font-display">500+</div>
                <div className="text-xs opacity-90 font-sans">Categories</div>
              </div>
              <div>
                <div className="text-2xl font-black font-display">95%</div>
                <div className="text-xs opacity-90 font-sans">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    </>
  );
};

export default Landing;

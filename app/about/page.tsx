"use client";
import React from "react";
import {
  Users,
  Zap,
  Award,
  Lightbulb,
  Target,
  Globe,
} from "lucide-react";

const AboutPage = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h1 className="pt-5 pb-5 text-[3rem] sm:text-[3.5rem] md:text-[4rem] lg:text-[4.5rem] xl:text-[5rem] font-black tracking-[-0.03em] text-gray-900 leading-[0.9] transform scale-y-120 font-display">
              <span className="block">ABOUT</span>
              <span className="block text-indigo-600">SKILLSWAP</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              We’re on a mission to democratize learning and create a world where knowledge flows freely between passionate individuals. Every skill is valuable, every person is a teacher, and every connection is an opportunity to grow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white rounded-xl border-2 border-indigo-200 p-8">
              <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">10,000+</h3>
              <p className="text-gray-600">Active Learners</p>
            </div>
            <div className="text-center bg-white rounded-xl border-2 border-purple-200 p-8">
              <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">50,000+</h3>
              <p className="text-gray-600">Skills Exchanged</p>
            </div>
            <div className="text-center bg-white rounded-xl border-2 border-pink-200 p-8">
              <div className="w-20 h-20 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">4.8★</h3>
              <p className="text-gray-600">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="pt-5 pb-5 text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] xl:text-[4rem] font-black tracking-[-0.03em] text-gray-900 leading-[0.9] transform scale-y-120 font-display">
                <span className="block">OUR</span>
                <span className="block text-indigo-600">STORY</span>
              </h2>
              <div className="space-y-6 text-lg text-gray-700">
                <p>
                  It all started with a simple observation: everyone has something valuable to teach, and everyone has something new to learn. Traditional education often creates barriers, but we believe learning should be accessible, collaborative, and fun.
                </p>
                <p>
                  Founded in 2024, SkillSwap was born from the idea that the best learning happens when people connect directly. Whether you're a designer wanting to learn coding, a chef interested in photography, or an accountant curious about creative writing — we make it possible.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl p-8 h-96 flex items-center justify-center border-2 border-indigo-200">
                <div className="text-center">
                  <Lightbulb className="w-24 h-24 text-indigo-600 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Innovation Through Connection
                  </h3>
                  <p className="text-gray-600">Building bridges between minds, one skill at a time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-10 rounded-xl border-2 border-indigo-200">
              <div className="w-16 h-16 bg-indigo-600 rounded-lg flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                To create a global community where knowledge is freely shared, skills are valued,
                and every person can both teach and learn. We believe that breaking down traditional
                barriers to education empowers individuals and strengthens communities.
              </p>
            </div>

            <div className="bg-white p-10 rounded-xl border-2 border-purple-200">
              <div className="w-16 h-16 bg-purple-600 rounded-lg flex items-center justify-center mb-6">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                A world where learning is limitless, accessible, and driven by human connection. We
                envision a future where geographical boundaries don't limit growth, where every
                skill is recognized, and where continuous learning is the norm for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="pt-5 pb-5 text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] xl:text-[4rem] font-black tracking-[-0.03em] text-gray-900 leading-[0.9] transform scale-y-120 font-display">
              <span className="block">WHAT MAKES US</span>
              <span className="block text-indigo-600">DIFFERENT</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We’re not just another learning platform. We’re a community-driven ecosystem that puts
              human connection at the heart of education.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl border-2 border-yellow-300">
              <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-gray-900" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">AI-Powered Matching</h3>
              <p className="text-gray-600">
                Our intelligent system connects you with the perfect skill partners based on your goals, schedule, and learning style.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border-2 border-pink-300">
              <div className="w-12 h-12 bg-pink-400 rounded-lg flex items-center justify-center mb-6">
                <Award className="w-6 h-6 text-gray-900" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quality Assurance</h3>
              <p className="text-gray-600">
                Built-in rating system and community moderation ensure high-quality exchanges and maintain platform integrity.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border-2 border-green-300">
              <div className="w-12 h-12 bg-green-400 rounded-lg flex items-center justify-center mb-6">
                <Globe className="w-6 h-6 text-gray-900" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Global Reach</h3>
              <p className="text-gray-600">
                Connect with learners worldwide, breaking geographical barriers and expanding your cultural horizons.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

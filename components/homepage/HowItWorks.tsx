"use client";
import React from 'react';
import { User, Search, MessageCircle, Star, ArrowRight, CheckCircle } from 'lucide-react';

const HowItWorks: React.FC = () => {
  return (
    <section className="py-20 bg-indigo-50">
      <div className="max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            HOW IT WORKS
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get started with skill swapping in just three simple steps. Join thousands of professionals already growing their expertise.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Step 1 */}
          <div className="relative">
            <div className="bg-white p-8 rounded-lg border border-indigo-200 hover:border-indigo-300 transition-all duration-300 h-full">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Create Your Profile</h3>
              <p className="text-gray-600 mb-6 text-center">
                List your skills, set your availability, and tell us what you want to learn. Make your profile shine!
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Add skills & expertise</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Set availability</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Upload profile photo</span>
                </div>
              </div>
            </div>
            {/* Connecting Arrow */}
            <div className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2 z-10">
              <div className="w-12 h-12 bg-white border border-indigo-200 rounded-full flex items-center justify-center">
                <ArrowRight className="w-6 h-6 text-indigo-500" />
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative">
            <div className="bg-white p-8 rounded-lg border border-purple-200 hover:border-purple-300 transition-all duration-300 h-full">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-purple-600 rounded-lg flex items-center justify-center">
                  <Search className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Find Perfect Matches</h3>
              <p className="text-gray-600 mb-6 text-center">
                Browse skills, search by category, or let our AI match you with compatible skill partners.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Smart AI matching</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Browse by category</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Filter by availability</span>
                </div>
              </div>
            </div>
            {/* Connecting Arrow */}
            <div className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2 z-10">
              <div className="w-12 h-12 bg-white border border-purple-200 rounded-full flex items-center justify-center">
                <ArrowRight className="w-6 h-6 text-purple-500" />
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative">
            <div className="bg-white p-8 rounded-lg border border-pink-200 hover:border-pink-300 transition-all duration-300 h-full">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-pink-600 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Start Learning</h3>
              <p className="text-gray-600 mb-6 text-center">
                Connect with your matches, schedule sessions, and begin your skill exchange journey.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Send swap requests</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Schedule sessions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Rate & review</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-indigo-600 p-8 rounded-lg text-white max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Star className="w-6 h-6 text-yellow-400 fill-current" />
              <span className="text-lg font-semibold">Ready to start your skill journey?</span>
            </div>
            <h3 className="text-3xl font-bold mb-6">Join 10,000+ professionals already growing</h3>
            <button className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300">
              Get Started Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
"use client";
import React from "react";
import { Mail, MessageSquare, User } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-20 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white border-2 border-indigo-200 rounded-2xl p-10 shadow-xl">
        <h1 className="text-[3rem] sm:text-[3.5rem] md:text-[4rem] lg:text-[4.5rem] xl:text-[5rem] font-black tracking-[-0.03em] text-gray-900 leading-[0.9] transform scale-y-120 font-display mb-14 text-center">
          <span className="block">CONTACT</span>
          <span className="block text-indigo-600">US</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <div className="space-y-6">
            <div>
              <label className="text-base font-semibold text-gray-800 mb-1 block">Your Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                />
              </div>
            </div>

            <div>
              <label className="text-base font-semibold text-gray-800 mb-1 block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                />
              </div>
            </div>

            <div>
              <label className="text-base font-semibold text-gray-800 mb-1 block">Message</label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-4 text-gray-400 w-5 h-5" />
                <textarea
                  rows={6}
                  placeholder="Write your message..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                />
              </div>
            </div>

            <button className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-all">
              Send Message
            </button>
          </div>

          {/* Contact Info */}
          <div className=" border rounded-xl p-8 space-y-6 shadow-md">
            <h3 className="text-3xl font-bold text-gray-900">Get In Touch</h3>
            <p className="text-lg text-gray-700">
              Have questions, suggestions, or just want to connect? We’re here to help you grow, collaborate, and thrive.
            </p>
            <div className="space-y-4">
              <p className="text-base font-medium text-gray-800">
                📧 Email: <span className="text-indigo-600">support@skillswap.io</span>
              </p>
              <p className="text-base font-medium text-gray-800">
                🕑 Response Time: Within 24 hours (Mon–Fri)
              </p>
              <p className="text-base font-medium text-gray-800">
                🌍 Location: Global platform, accessible everywhere
              </p>
            </div>
            <div className="pt-4 border-t border-indigo-200">
              <p className="text-sm text-gray-500">© 2025 SkillSwap. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
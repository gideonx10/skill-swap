"use client";
import React from "react";
import { Mail, Phone } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0b0c2a] text-gray-300 text-sm">
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 sm:grid-cols-3 gap-8 items-start">
        {/* Branding */}
        <div>
          <h2 className="text-white text-lg font-bold">SkillSwap</h2>
          <p className="text-xs text-gray-400 mt-1">
            Built for the Odoo Hackathon 2025
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-3 text-sm">Quick Links</h3>
          <ul className="space-y-1">
            <li>
              <a href="#features" className="hover:text-indigo-400">
                Features
              </a>
            </li>
            <li>
              <a href="#how-it-works" className="hover:text-indigo-400">
                How It Works
              </a>
            </li>
            <li>
              <a href="#use-cases" className="hover:text-indigo-400">
                Use Cases
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-indigo-400">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-semibold mb-3 text-sm">Contact</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-indigo-400" />
              <span>+91 87800 96103</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-indigo-400" />
              <a
                href="mailto:nirmeetparmar02@gmail.com"
                className="hover:text-indigo-400"
              >
                nirmeetparmar02@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-gray-500 text-xs py-4 border-t border-gray-800">
        © 2025 SkillSwap. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
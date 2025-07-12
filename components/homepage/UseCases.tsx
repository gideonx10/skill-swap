"use client";
import React, { useState } from "react";
import {
  Code,
  Palette,
  TrendingUp,
  Camera,
  Music,
  Languages,
  BookOpen,
  Wrench,
} from "lucide-react";

const UseCases: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  const categories = [
    {
      icon: Code,
      title: "Development",
      description: "Programming, web development, mobile apps",
      color: "bg-blue-600",
      skills: ["React", "Python", "Node.js", "Flutter", "DevOps"],
      borderColor: "border-blue-200",
    },
    {
      icon: Palette,
      title: "Design",
      description: "UI/UX, graphic design, branding",
      color: "bg-purple-600",
      skills: ["Figma", "Photoshop", "Illustrator", "Sketch", "Prototyping"],
      borderColor: "border-purple-200",
    },
    {
      icon: TrendingUp,
      title: "Marketing",
      description: "Digital marketing, SEO, social media",
      color: "bg-green-600",
      skills: [
        "Google Ads",
        "SEO",
        "Content Marketing",
        "Analytics",
        "Email Marketing",
      ],
      borderColor: "border-green-200",
    },
    {
      icon: Camera,
      title: "Content Creation",
      description: "Photography, videography, writing",
      color: "bg-orange-600",
      skills: [
        "Photography",
        "Video Editing",
        "Copywriting",
        "Content Strategy",
        "Adobe Suite",
      ],
      borderColor: "border-orange-200",
    },
    {
      icon: Music,
      title: "Creative Arts",
      description: "Music production, art, illustration",
      color: "bg-pink-600",
      skills: [
        "Music Production",
        "Digital Art",
        "Animation",
        "Voice Acting",
        "Illustration",
      ],
      borderColor: "border-pink-200",
    },
    {
      icon: Languages,
      title: "Languages",
      description: "Language learning, translation, tutoring",
      color: "bg-cyan-600",
      skills: ["Spanish", "French", "Mandarin", "Japanese", "Translation"],
      borderColor: "border-cyan-200",
    },
    {
      icon: BookOpen,
      title: "Teaching",
      description: "Online tutoring, course creation, mentoring",
      color: "bg-indigo-600",
      skills: [
        "Online Tutoring",
        "Curriculum Design",
        "Mentoring",
        "Course Creation",
        "Training",
      ],
      borderColor: "border-indigo-200",
    },
    {
      icon: Wrench,
      title: "Technical Skills",
      description: "Data analysis, automation, consulting",
      color: "bg-slate-600",
      skills: [
        "Data Analysis",
        "Excel",
        "Automation",
        "Consulting",
        "Project Management",
      ],
      borderColor: "border-slate-200",
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black tracking-tight text-gray-900 mb-6">
            WHAT CAN YOU TRADE?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-medium">
            From coding to cooking, design to data science — discover endless
            possibilities for skill exchange across diverse categories.
          </p>
        </div>

        {/* Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div
                key={index}
                className={`transition-all duration-300`}
                onClick={() => setActiveCategory(index)}
              >
                <div
                  className={`flex flex-col justify-between h-full p-6 bg-white border-2 rounded-xl shadow-sm hover:shadow-md cursor-pointer ${
                    category.borderColor
                  } ${
                    activeCategory === index
                      ? "ring-4 ring-blue-200 border-blue-300"
                      : "hover:border-gray-300"
                  }`}
                >
                  <div>
                    <div
                      className={`w-14 h-14 ${category.color} rounded-lg flex items-center justify-center mb-4`}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {category.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {category.description}
                    </p>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {category.skills.slice(0, 3).map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Category Detail Box */}
        <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-sm">
          <div className="flex items-center space-x-4 mb-6">
            <div
              className={`w-12 h-12 ${categories[activeCategory].color} rounded-lg flex items-center justify-center`}
            >
              {React.createElement(categories[activeCategory].icon, {
                className: "w-6 h-6 text-white",
              })}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                {categories[activeCategory].title}
              </h3>
              <p className="text-gray-600">
                {categories[activeCategory].description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Skills */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Popular Skills in {categories[activeCategory].title}
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {categories[activeCategory].skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                  >
                    <div
                      className={`w-2 h-2 ${categories[activeCategory].color} rounded-full`}
                    ></div>
                    <span className="text-sm font-medium text-gray-700">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Trade */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Why Trade {categories[activeCategory].title} Skills?
              </h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-1"></div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      High Demand
                    </p>
                    <p className="text-xs text-gray-600">
                      Always in need by businesses and individuals
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      Great for Beginners
                    </p>
                    <p className="text-xs text-gray-600">
                      Easy to start learning and practicing
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-1"></div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      Remote Friendly
                    </p>
                    <p className="text-xs text-gray-600">
                      Can be taught and learned online
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { number: "500+", label: "Skill Categories" },
            { number: "25K+", label: "Skills Listed" },
            { number: "15K+", label: "Successful Swaps" },
            { number: "98%", label: "Match Success" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="text-center p-6 bg-white rounded-xl border border-gray-200 shadow-sm"
            >
              <div className="text-3xl font-black text-gray-900 mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;

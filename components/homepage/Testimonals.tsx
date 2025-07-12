"use client";
import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, User } from 'lucide-react';

const Testimonials: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "UX Designer",
      company: "TechCorp",
      image: "/api/placeholder/64/64",
      rating: 5,
      content: "SkillSwap transformed my career! I traded my design skills for Python programming and landed a full-stack role. The quality of connections and learning experience exceeded my expectations.",
      skills: ["UI/UX Design", "Python"]
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Marketing Manager",
      company: "StartupHub",
      image: "/api/placeholder/64/64",
      rating: 5,
      content: "Amazing platform! I helped someone with digital marketing strategies while learning web development. The structured approach and professional community made all the difference.",
      skills: ["Digital Marketing", "Web Development"]
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Software Engineer",
      company: "InnovateLabs",
      image: "/api/placeholder/64/64",
      rating: 5,
      content: "The skill exchange process was seamless. I taught React development and learned graphic design. Both skills have significantly boosted my freelance income. Highly recommended!",
      skills: ["React", "Graphic Design"]
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Content Creator",
      company: "MediaFlow",
      image: "/api/placeholder/64/64",
      rating: 5,
      content: "Best investment in my professional development. The mentorship quality is outstanding, and the flexibility to learn at my own pace made it perfect for my busy schedule.",
      skills: ["Content Writing", "Video Editing"]
    },
    {
      id: 5,
      name: "Lisa Park",
      role: "Data Analyst",
      company: "DataViz Co",
      image: "/api/placeholder/64/64",
      rating: 5,
      content: "I've tried many learning platforms, but SkillSwap's peer-to-peer approach is unique. The real-world projects and direct mentorship accelerated my learning tremendously.",
      skills: ["Data Analysis", "Photography"]
    },
    {
      id: 6,
      name: "James Wilson",
      role: "Product Manager",
      company: "GrowthTech",
      image: "/api/placeholder/64/64",
      rating: 5,
      content: "The community aspect is incredible. Not only did I learn new skills, but I also built valuable professional relationships. The platform truly connects like-minded professionals.",
      skills: ["Product Management", "Spanish"]
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentTestimonial(index);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            WHAT PEOPLE SAY
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from professionals who have transformed their careers through skill exchange. Real stories, real results.
          </p>
        </div>

        {/* Main Testimonial Display */}
        <div className="relative bg-gray-50 rounded-lg p-8 mb-12">
          <div className="flex items-start space-x-6">
            {/* Quote Icon */}
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Quote className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <blockquote className="text-lg text-gray-700 leading-relaxed mb-6">
                "{testimonials[currentTestimonial].content}"
              </blockquote>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonials[currentTestimonial].name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  {testimonials[currentTestimonial].skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-medium rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="absolute top-1/2 -left-4 transform -translate-y-1/2">
            <button
              onClick={prevTestimonial}
              className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:border-gray-300 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <div className="absolute top-1/2 -right-4 transform -translate-y-1/2">
            <button
              onClick={nextTestimonial}
              className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:border-gray-300 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Testimonial Dots */}
        <div className="flex justify-center space-x-2 mb-16">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentTestimonial ? 'bg-indigo-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {testimonials.slice(0, 6).map((testimonial, index) => (
            <div key={testimonial.id} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                "{testimonial.content.length > 120 ? testimonial.content.substring(0, 120) + '...' : testimonial.content}"
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900 text-sm">{testimonial.name}</div>
                  <div className="text-xs text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-indigo-600 rounded-lg p-8 text-white text-center">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold mb-2">4.9/5</div>
              <div className="text-indigo-200">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">10K+</div>
              <div className="text-indigo-200">Happy Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">50K+</div>
              <div className="text-indigo-200">Skills Exchanged</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">95%</div>
              <div className="text-indigo-200">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
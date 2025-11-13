import React from "react";
import { Link } from "react-router";
import { Users, BookOpen, HeartHandshake, Globe } from "lucide-react";

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6">
      <div className="max-w-4xl text-center mb-12">
        <div className="flex justify-center items-center gap-3 mb-4">
          <h1 className="text-4xl md:text-5xl font-bold text-primary">
            About StudyMate
          </h1>
        </div>
        <p className="text-gray-600 text-lg leading-relaxed">
          StudyMate is your ultimate platform to connect with like-minded
          learners, share knowledge, and grow together. Whether you're preparing
          for exams, working on group projects, or just looking for motivation —
          StudyMate helps you find the perfect study partner.
        </p>
      </div>

      {/* Mission & Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl">
        {/* Card 1 */}
        <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl transition">
          <Users className="text-primary w-10 h-10 mb-3" />
          <h3 className="text-lg font-semibold mb-2">Connect with Learners</h3>
          <p className="text-gray-600 text-sm">
            Meet students who share your goals, interests, and study habits.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl transition">
          <BookOpen className="text-blue-600 w-10 h-10 mb-3" />
          <h3 className="text-lg font-semibold mb-2">Learn & Collaborate</h3>
          <p className="text-gray-600 text-sm">
            Exchange study materials, take notes together, and grow through
            teamwork.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl transition">
          <HeartHandshake className="text-pink-500 w-10 h-10 mb-3" />
          <h3 className="text-lg font-semibold mb-2">
            Build Study Relationships
          </h3>
          <p className="text-gray-600 text-sm">
            Create meaningful connections that encourage accountability and
            progress.
          </p>
        </div>

        {/* Card 4 */}
        <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl transition">
          <Globe className="text-green-600 w-10 h-10 mb-3" />
          <h3 className="text-lg font-semibold mb-2">Study Anywhere</h3>
          <p className="text-gray-600 text-sm">
            Whether online or offline, StudyMate adapts to your preferred mode
            of learning.
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-16 text-center max-w-3xl">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          Join Our Learning Community
        </h2>
        <p className="text-gray-600 mb-6">
          Thousands of learners have already found their perfect study partners
          on StudyMate. Sign up today and take your learning experience to the
          next level!
        </p>
        <Link to="/register" className="btn btn-primary px-6">
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default About;

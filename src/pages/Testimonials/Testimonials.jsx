import React from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Aisha Rahman",
    image: "https://i.ibb.co/7xRD8xnD/2149455861.jpg",
    review:
      "StudyMate helped me find an amazing study partner! We’ve been preparing for our exams together and my productivity has skyrocketed.",
    rating: 5,
    subject: "Biology",
  },
  {
    id: 2,
    name: "Daniel Kim",
    image: "https://i.ibb.co/M5CS4qJ0/13655.jpg",
    review:
      "The platform is super easy to use, and I found a study buddy within a day. We meet online and review Chemistry topics weekly.",
    rating: 4,
    subject: "Chemistry",
  },
  {
    id: 3,
    name: "Sophia Patel",
    image: "https://i.ibb.co/CKnHC0Kp/2149186122.jpg",
    review:
      "I love how StudyMate connects you with learners who share your goals. It’s like having a friend who keeps you accountable and motivated!",
    rating: 5,
    subject: "Physics",
  },
];

const Testimonials = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6">
      <div className="max-w-4xl text-center mb-12">
        <div className="flex justify-center items-center gap-3 mb-4">
          <h1 className="text-4xl md:text-5xl font-bold text-primary">
            What Our Users Say
          </h1>
        </div>
        <p className="text-gray-600 text-lg leading-relaxed">
          Hear from real students and learners who found their perfect study
          partners on{" "}
          <span className="font-semibold text-primary">StudyMate</span>.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className=" shadow-md hover:shadow-xl transition rounded-2xl p-6 flex flex-col items-center text-center"
          >
            <img
              src={t.image}
              alt={t.name}
              className="w-35 h-35 rounded-full object-cover mb-4 border-4 border-primary/20"
            />
            <h3 className="text-lg font-semibold text-gray-800">{t.name}</h3>
            <p className="text-sm text-gray-500 mb-3">{t.subject} Learner</p>

            <div className="flex justify-center mb-3">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className="text-yellow-400 fill-yellow-400"
                />
              ))}
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">{t.review}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-16">
        <p className="text-gray-700 mb-4 text-lg">
          Have you studied with{" "}
          <span className="text-primary font-semibold">StudyMate</span>?
        </p>
        <button className="btn btn-primary px-6">Share Your Review</button>
      </div>
    </div>
  );
};

export default Testimonials;

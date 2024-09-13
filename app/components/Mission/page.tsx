import React from "react";
import { FaBullseye, FaHandshake, FaGavel } from "react-icons/fa"; // Icons for Mission

const GenZMissionSection = () => {
  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold text-red-600 mb-8">
          আমাদের মিশন
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Mission - Fight Against Corruption */}
          <div className="bg-gray-50 p-6 shadow-lg rounded-lg">
            <div className="flex items-center justify-center text-red-600 text-4xl mb-4">
              <FaGavel />
            </div>
            <h3 className="text-xl font-semibold text-center mb-4">
              দুর্নীতির বিরুদ্ধে যুদ্ধ
            </h3>
            <p className="text-gray-600 text-center">
              আমরা দুর্নীতি এবং অন্যায়ের বিরুদ্ধে নিরলস লড়াই করে একটি
              ন্যায়পরায়ণ সমাজ গড়তে প্রতিশ্রুতিবদ্ধ।
            </p>
          </div>

          {/* Card 2: Mission - Unity and Equality */}
          <div className="bg-gray-50 p-6 shadow-lg rounded-lg">
            <div className="flex items-center justify-center text-red-600 text-4xl mb-4">
              <FaHandshake />
            </div>
            <h3 className="text-xl font-semibold text-center mb-4">
              ঐক্য ও সমান অধিকার
            </h3>
            <p className="text-gray-600 text-center">
              আমাদের লক্ষ্য মানুষকে ঐক্যবদ্ধ করা এবং প্রত্যেক নাগরিকের জন্য সমান
              অধিকার নিশ্চিত করা।
            </p>
          </div>

          {/* Card 3: Mission - Fair Governance */}
          <div className="bg-gray-50 p-6 shadow-lg rounded-lg">
            <div className="flex items-center justify-center text-red-600 text-4xl mb-4">
              <FaBullseye />
            </div>
            <h3 className="text-xl font-semibold text-center mb-4">
              ন্যায্য প্রশাসন প্রতিষ্ঠা
            </h3>
            <p className="text-gray-600 text-center">
              আমাদের মিশন হল ন্যায্য ও সুশাসন প্রতিষ্ঠা করা যা প্রতিটি মানুষের
              অধিকার রক্ষা করবে।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenZMissionSection;

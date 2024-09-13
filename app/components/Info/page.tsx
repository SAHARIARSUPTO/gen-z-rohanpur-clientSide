import React from "react";
import { FaHandsHelping, FaRegLightbulb, FaUsers } from "react-icons/fa"; // Icons

const GenZInfoCards = () => {
  return (
    <div className="bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold text-red-600 mb-8">
          GEN-Z ROHANPUR: আমাদের উদ্দেশ্য
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Community Support */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center justify-center text-red-600 text-4xl mb-4">
              <FaHandsHelping />
            </div>
            <h3 className="text-xl font-semibold text-center mb-4">
              সহায়তা প্রদান
            </h3>
            <p className="text-gray-600 text-center">
              অন্যায় ও দুর্নীতির বিরুদ্ধে সংগ্রাম করার জন্য আমাদের অরাজনৈতিক
              সংগঠনটি জনগণকে সহায়তা প্রদান করে।
            </p>
          </div>

          {/* Card 2: Vision */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center justify-center text-red-600 text-4xl mb-4">
              <FaRegLightbulb />
            </div>
            <h3 className="text-xl font-semibold text-center mb-4">
              আমাদের দৃষ্টি
            </h3>
            <p className="text-gray-600 text-center">
              একটি বৈষম্যহীন সমাজ গড়ে তোলার জন্য একসাথে কাজ করা যেখানে সবার
              অধিকার সুরক্ষিত।
            </p>
          </div>

          {/* Card 3: Collaboration */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center justify-center text-red-600 text-4xl mb-4">
              <FaUsers />
            </div>
            <h3 className="text-xl font-semibold text-center mb-4">
              সম্মিলিত উদ্যোগ
            </h3>
            <p className="text-gray-600 text-center">
              আমরা জনগণকে একত্রিত করি এবং সম্মিলিতভাবে অন্যায় ও দুর্নীতির
              বিরুদ্ধে লড়াই করি।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenZInfoCards;

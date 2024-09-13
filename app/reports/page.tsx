"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

// Define types for the union and report data
interface Union {
  _id: string;
  id: string;
  upazilla_id: string;
  name: string;
  bn_name: string;
  url: string;
  totalReports?: number; // Adding optional field for total reports
}

interface Report {
  _id: string;
  union: string;
  // Other fields...
}

const UnionCardsSection: React.FC = () => {
  const [unions, setUnions] = useState<Union[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch unions
        const unionResponse = await axios.get<Union[]>(
          "https://genz-rohanpur-server.vercel.app/unions"
        );
        const fetchedUnions = unionResponse.data;

        // Fetch reports
        const reportResponse = await axios.get<Report[]>(
          "https://genz-rohanpur-server.vercel.app/reports"
        );
        const fetchedReports = reportResponse.data;

        // Count reports by union
        const reportCount = fetchedReports.reduce(
          (acc: Record<string, number>, report: Report) => {
            acc[report.union] = (acc[report.union] || 0) + 1;
            return acc;
          },
          {}
        );

        // Integrate report counts into unions
        const updatedUnions = fetchedUnions.map((union) => ({
          ...union,
          totalReports: reportCount[union.bn_name] || 0,
        }));

        setUnions(updatedUnions);
        setReports(fetchedReports);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSeeBistarito = (unionName: string) => {
    router.push(`/reports/${encodeURIComponent(unionName)}`);
  };

  return (
    <section className="bg-[#f9f9f9] py-16 min-h-screen relative">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#dc2626] text-center mb-12">
          গোমস্তাপুর উপজেলার সকল ইউনিয়নের রিপোর্ট
        </h2>

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
            <div className="loader border-t-4 border-[#dc2626] border-solid rounded-full h-16 w-16"></div>
          </div>
        )}

        <div className="flex flex-wrap -mx-4">
          {unions.map((union) => (
            <div key={union._id} className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <svg
                  className="w-12 h-12 text-[#dc2626] mb-4 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2 4 4 8-8 2 2"
                  />
                </svg>

                <h3 className="text-2xl font-bold text-[#dc2626] mb-2">
                  {union.bn_name}
                </h3>
                <p className="mb-4 text-xl font-semibold text-gray-800">
                  {union.totalReports !== undefined
                    ? `${union.totalReports} রিপোর্ট`
                    : "ডেটা লোড হচ্ছে"}
                </p>

                <button
                  onClick={() => handleSeeBistarito(union.bn_name)}
                  className="inline-block px-6 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition duration-300"
                >
                  বিস্তারিত দেখুন
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UnionCardsSection;

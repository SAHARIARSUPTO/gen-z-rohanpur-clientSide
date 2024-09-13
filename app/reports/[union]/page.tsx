"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Report {
  _id: string;
  union: string;
  contactNumber: string;
  description: string;
  title: string;
  imageLink: string;
  reportDateTime: string;
  reviewed: boolean;
  solveStatus: string;
}

const UnionReportsPage: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { union } = useParams(); // Get the union name from the dynamic URL

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      setError(null); // Clear previous errors
      try {
        const response = await axios.get<Report[]>(
          "https://genz-rohanpur-server.vercel.app/reports"
        );
        console.log("API Response:", response.data); // Log API response

        // Ensure union is a string
        const unionValue = Array.isArray(union) ? union[0] : union;

        // Filter the reports by the selected union
        const unionReports = response.data.filter(
          (report) => report.union === decodeURIComponent(unionValue || "")
        );

        console.log("Filtered Reports:", unionReports); // Log filtered reports
        setReports(unionReports);
      } catch (error) {
        console.error("Error fetching reports:", error);
        setError("Failed to load reports.");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [union]);

  const formatToGMTPlus6 = (dateString: string) => {
    const date = new Date(dateString);
    const localTimeOffset = date.getTimezoneOffset() * 60000; // in milliseconds
    const gmtPlus6Offset = 6 * 60 * 60000; // GMT+6 in milliseconds
    const gmtPlus6Date = new Date(
      date.getTime() + localTimeOffset + gmtPlus6Offset
    );

    return gmtPlus6Date.toLocaleString("bn-BD", { timeZone: "Asia/Dhaka" });
  };

  return (
    <section className="bg-[#f9f9f9] py-16 min-h-screen relative text-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#dc2626] text-center mb-12">
          {decodeURIComponent(Array.isArray(union) ? union[0] : union || "")}{" "}
          ইউনিয়নের সকল রিপোর্ট
        </h2>

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
            <div className="loader border-t-4 border-[#dc2626] border-solid rounded-full h-16 w-16"></div>
          </div>
        )}

        {error && <p className="text-center text-xl text-red-600">{error}</p>}

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#dc2626] text-white">
              <tr>
                <th className="py-2 px-4 text-left text-sm">Title</th>
                <th className="py-2 px-4 text-left text-sm">Contact Number</th>
                <th className="py-2 px-4 text-left text-sm">Description</th>
                <th className="py-2 px-4 text-left text-sm">Date</th>
                <th className="py-2 px-4 text-left text-sm">Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.length > 0 ? (
                reports.map((report) => (
                  <tr key={report._id} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b text-sm">
                      {report.title}
                    </td>
                    <td className="py-2 px-4 border-b text-sm">
                      {report.contactNumber}
                    </td>
                    <td className="py-2 px-4 border-b text-sm">
                      {report.description}
                    </td>
                    <td className="py-2 px-4 border-b text-sm">
                      {formatToGMTPlus6(report.reportDateTime)}
                    </td>
                    <td className="py-2 px-4 border-b text-sm">
                      <Link
                        href={`/report-details?id=${report._id}`}
                        className="inline-block px-4 py-2 text-white bg-[#dc2626] hover:bg-[#b91c1c] rounded-md text-sm font-medium transition-colors duration-300"
                      >
                        বিস্তারিত
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="py-2 px-4 text-center text-sm text-gray-600"
                  >
                    {decodeURIComponent(
                      Array.isArray(union) ? union[0] : union || ""
                    )}{" "}
                    ইউনিয়নের কোন রিপোর্ট পাওয়া যায়নি।
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default UnionReportsPage;

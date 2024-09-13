"use client"; // Mark this component as a Client Component

import React from "react";
import { useParams } from "next/navigation"; // Import useParams instead of useRouter
import axios from "axios";

import Swal from "sweetalert2";
import Image from "next/image";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import Navbar from "../components/Navbar/page";
import Footer from "../components/Footer/page";

interface ReportType {
  _id: string;
  title: string;
  division: string;
  district: string;
  upazila: string;
  union: string;
  description: string;
  reportDateTime: string;
  reviewed: boolean;
  solveStatus: boolean;
  solveReason?: string;
  imageLink: string;
}

const ReportDetailsPage: React.FC = () => {
  const { id } = useParams(); // Use useParams to get the dynamic route parameter
  const [report, setReport] = React.useState<ReportType | null>(null);
  const [reviewer, setReviewer] = React.useState("");
  const [reviewerContact, setReviewerContact] = React.useState("");
  const [solver, setSolver] = React.useState("");
  const [solverContact, setSolverContact] = React.useState("");

  React.useEffect(() => {
    if (id) {
      const fetchReport = async () => {
        try {
          const response = await axios.get(
            `https://genz-rohanpur-server.vercel.app/reports/${id}`
          );
          setReport(response.data);
        } catch (error) {
          console.error("Error fetching report details:", error);
        }
      };
      fetchReport();
    }
  }, [id]);

  if (!report) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  const handleReview = async () => {
    if (!reviewer || !reviewerContact) {
      Swal.fire({
        title: "Validation Error",
        text: "Please fill out all fields before reviewing the report.",
        icon: "warning",
      });
      return;
    }

    try {
      const reviewData = { reviewer, reviewerContact };
      const response = await axios.put(
        `https://genz-rohanpur-server.vercel.app/reports/${report._id}/review`,
        reviewData
      );
      Swal.fire({
        title: "Reviewed!",
        text:
          response.data.message || "Report marked as reviewed successfully.",
        icon: "success",
      });
    } catch (error) {
      console.error("Error marking report as reviewed:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to mark the report as reviewed.",
        icon: "error",
      });
    }
  };

  const handleSolve = async () => {
    if (!solver || !solverContact) {
      Swal.fire({
        title: "Validation Error",
        text: "Please fill out all fields before solving the report.",
        icon: "warning",
      });
      return;
    }

    try {
      const solveData = { solver, solverContact };
      const response = await axios.put(
        `https://genz-rohanpur-server.vercel.app/reports/${report._id}/solve`,
        solveData
      );
      Swal.fire({
        title: "Solved!",
        text: response.data.message || "Report marked as solved successfully.",
        icon: "success",
      });
    } catch (error) {
      console.error("Error marking report as solved:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to mark the report as solved.",
        icon: "error",
      });
    }
  };

  const handleUnsolve = async () => {
    const { value: reason } = await Swal.fire({
      title: "Provide Reason for Unsolve",
      input: "text",
      inputLabel: "Cause for Unsolving",
      inputPlaceholder: "Enter the reason...",
      showCancelButton: true,
    });

    if (reason) {
      try {
        const unsolveData = { reason };
        const response = await axios.put(
          `https://genz-rohanpur-server.vercel.app/reports/${report._id}/unsolve`,
          unsolveData
        );
        Swal.fire({
          title: "Unsolved!",
          text:
            response.data.message || "Report marked as unsolved successfully.",
          icon: "warning",
        });
      } catch (error) {
        console.error("Error marking report as unsolved:", error);
        Swal.fire({
          title: "Error",
          text: "Failed to mark the report as unsolved.",
          icon: "error",
        });
      }
    }
  };

  return (
    <>
      <Navbar />
      <section className="bg-[#e8f0f2] py-16 min-h-screen">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-red-600 text-center mb-12">
            অভিযোগের শিরোনামঃ {report.title}
          </h2>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="mb-4">
                  <strong>বিভাগঃ </strong> {report.division}
                </p>
                <p className="mb-4">
                  <strong>জেলাঃ </strong> {report.district}
                </p>
                <p className="mb-4">
                  <strong>উপজেলাঃ </strong> {report.upazila}
                </p>
                <p className="mb-4">
                  <strong>ইউনিয়ন/এলাকাঃ </strong> {report.union}
                </p>
                <p className="mb-4">
                  <strong>বিবরণঃ </strong> {report.description}
                </p>
              </div>
              {report.imageLink && (
                <div className="flex justify-center items-center">
                  <a
                    href={report.imageLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={report.imageLink}
                      alt={report.title}
                      className="w-full h-auto object-cover rounded-lg shadow-lg"
                      width={200}
                      height={200}
                    />
                  </a>
                </div>
              )}
            </div>
            <div className="mt-6">
              <p className="mb-4">
                <strong>রিপোর্টের তারিখঃ </strong>{" "}
                {new Date(report.reportDateTime).toLocaleString()}
              </p>
              <div className="flex items-center mb-4">
                <strong className="mr-2">রিভিউঃ </strong>
                {report.reviewed ? (
                  <FaEye className="text-green-500 text-xl" />
                ) : (
                  <FaEyeSlash className="text-red-500 text-xl" />
                )}
              </div>
              <div className="flex items-center mb-4">
                <strong className="mr-2">সলভঃ </strong>
                {report.solveStatus ? (
                  <FaCheckCircle className="text-green-500 text-xl" />
                ) : (
                  <FaTimesCircle className="text-red-500 text-xl" />
                )}
              </div>
              {report.solveReason && (
                <p className="mt-4">
                  <strong>
                    রিপোর্টটি ইতমধ্যে কেউ একজন সলভ করার চেষ্টা করেছিলেন এবং
                    পরবর্তিতে অন্যকেউ আনসলভ করেছেন । আনসলভের কারণঃ ।{" "}
                  </strong>{" "}
                  {report.solveReason}
                </p>
              )}
            </div>
            <div className="mt-6">
              {!report.reviewed && (
                <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center">
                  <input
                    type="text"
                    required
                    placeholder="আপনার নাম লিখুন"
                    value={reviewer}
                    onChange={(e) => setReviewer(e.target.value)}
                    className="input input-bordered w-full md:max-w-xs"
                  />
                  <input
                    type="text"
                    placeholder="আপনার যোগাযোগ নম্বর লিখুন"
                    required
                    value={reviewerContact}
                    onChange={(e) => setReviewerContact(e.target.value)}
                    className="input input-bordered w-full md:max-w-xs"
                  />
                  <button onClick={handleReview} className="btn btn-primary">
                    রিভিউ করুন
                  </button>
                </div>
              )}
              {report.solveStatus && !report.solveReason && (
                <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center">
                  <input
                    type="text"
                    required
                    placeholder="সলভার নাম"
                    value={solver}
                    onChange={(e) => setSolver(e.target.value)}
                    className="input input-bordered w-full md:max-w-xs"
                  />
                  <input
                    type="text"
                    placeholder="সলভার যোগাযোগ নম্বর"
                    required
                    value={solverContact}
                    onChange={(e) => setSolverContact(e.target.value)}
                    className="input input-bordered w-full md:max-w-xs"
                  />
                  <button onClick={handleSolve} className="btn btn-success">
                    সমাধান করুন
                  </button>
                </div>
              )}
              {report.solveStatus && report.solveReason && (
                <button onClick={handleUnsolve} className="btn btn-warning">
                  পুনরায় আনসলভ করুন
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ReportDetailsPage;

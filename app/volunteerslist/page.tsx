"use client";
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer/page";
import Navbar from "../components/Navbar/page";

interface Volunteer {
  _id: string;
  name: string;
  address: string; // Updated to match the new field
  collegeOrUniversity: string;
  age: number;
  contactNumber: string;
}

const VolunteersList = () => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await fetch(
          "https://genz-rohanpur-server.vercel.app/volunteers"
        );
        if (!response.ok) {
          throw new Error("ভলান্টিয়ারদের তথ্য আনা যায়নি");
        }
        const data = await response.json();
        setVolunteers(data);
      } catch (error) {
        // Type guard to check if error is an instance of Error
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("একটি অজানা ত্রুটি ঘটেছে");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchVolunteers();
  }, []);

  if (loading) return <p>লোড হচ্ছে...</p>;
  if (error) return <p>ত্রুটি: {error}</p>;

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <h1 className="text-2xl font-bold mb-6 text-center text-red-600">
          স্বেচ্ছাসেবক তালিকা
        </h1>
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-3 px-4 border-b">নাম</th>
              <th className="py-3 px-4 border-b">কলেজ/বিশ্ববিদ্যালয়</th>
              <th className="py-3 px-4 border-b">বয়স</th>
              <th className="py-3 px-4 border-b">যোগাযোগ নম্বর</th>
            </tr>
          </thead>
          <tbody className="mx-auto text-center align-middle">
            {volunteers.map((volunteer, index) => (
              <tr
                key={volunteer._id}
                className={index % 2 === 0 ? "bg-white" : "bg-sky-100"} // Alternate row colors
              >
                <td className="py-2 px-4 border-b">{volunteer.name}</td>
                <td className="py-2 px-4 border-b">
                  {volunteer.collegeOrUniversity}
                </td>
                <td className="py-2 px-4 border-b">{volunteer.age}</td>
                <td className="py-2 px-4 border-b">
                  {volunteer.contactNumber}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default VolunteersList;

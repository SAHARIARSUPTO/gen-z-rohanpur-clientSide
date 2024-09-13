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
  const [searchQuery, setSearchQuery] = useState<string>("");

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

  // Filter volunteers based on search query
  const filteredVolunteers = volunteers.filter(
    (volunteer) =>
      volunteer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      volunteer.contactNumber.includes(searchQuery)
  );

  if (loading) return <p>লোড হচ্ছে...</p>;
  if (error) return <p>ত্রুটি: {error}</p>;

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 min-h-screen text-black">
        <h1 className="text-2xl font-bold mb-6 text-center text-red-600">
          স্বেচ্ছাসেবক তালিকা
        </h1>
        <div className="mb-6 flex">
          <input
            type="text"
            placeholder="নাম বা যোগাযোগ নম্বর দিয়ে খুঁজুন"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input input-bordered w-full md:w-1/3 bg-white"
          />{" "}
        </div>
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
            {filteredVolunteers.length > 0 ? (
              filteredVolunteers.map((volunteer, index) => (
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
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-2 px-4 text-center">
                  কোনো স্বেচ্ছাসেবক পাওয়া যায়নি
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default VolunteersList;

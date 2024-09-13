/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import React, { useState } from "react";
import image from "./png.svg"; // Ensure this path is correct
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

interface FormData {
  name: string;
  address: string;
  collegeOrUniversity: string;
  age: string;
  contactNumber: string;
}

const VolunteerRegistration: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    address: "",
    collegeOrUniversity: "",
    age: "",
    contactNumber: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://genz-rohanpur-server.vercel.app/volunteers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        MySwal.fire({
          icon: "success",
          title: "সফল!",
          text: result.message,
          confirmButtonColor: "#3085d6",
        }).then(() => {
          setFormData({
            name: "",
            address: "",
            collegeOrUniversity: "",
            age: "",
            contactNumber: "",
          });
        });
      } else {
        MySwal.fire({
          icon: "error",
          title: "ত্রুটি!",
          text: `ত্রুটি: ${result.error}`,
          confirmButtonColor: "#d33",
        });
      }
    } catch (error: any) {
      MySwal.fire({
        icon: "error",
        title: "ত্রুটি!",
        text: `ত্রুটি: ${error.message}`,
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 py-8 sm:py-12 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center lg:justify-between">
          <div className="lg:w-2/5 mb-8 lg:mb-0 flex justify-center">
            <Image
              src={image} // Ensure this path is correct
              alt="Volunteer"
              className="h-auto object-cover"
              width={300}
              height={300}
            />
          </div>

          <div className="lg:w-1/2">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-red-600 mb-6 sm:mb-8">
              স্বেচ্ছাসেবক নিবন্ধন
            </h2>
            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 sm:p-8 shadow-lg rounded-lg"
            >
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    নাম
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="আপনার নাম লিখুন"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    ঠিকানা
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="আপনার ঠিকানা লিখুন"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    কলেজ / বিশ্ববিদ্যালয়
                  </label>
                  <input
                    type="text"
                    name="collegeOrUniversity"
                    value={formData.collegeOrUniversity}
                    onChange={handleChange}
                    placeholder="আপনার কলেজ বা বিশ্ববিদ্যালয় লিখুন"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    বয়স
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="আপনার বয়স লিখুন"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-gray-700 font-semibold mb-2">
                    যোগাযোগ নম্বর
                  </label>
                  <input
                    type="text"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    placeholder="আপনার যোগাযোগ নম্বর লিখুন"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>

              <p className="text-red-500 mt-4 text-center">
                * সঠিক তথ্য প্রদান করুন। আপনার নিবন্ধন নিশ্চিত করতে, ফর্ম পূরণের
                পর অপেক্ষা করুন।
              </p>

              <div className="text-center mt-6">
                <button
                  type="submit"
                  className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
                >
                  {loading ? "অপেক্ষা করুন..." : "নিবন্ধন করুন"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerRegistration;

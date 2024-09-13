"use client";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useRouter } from "next/navigation";
import Footer from "../components/Footer/page";
import Navbar from "../components/Navbar/page";

interface Union {
  id: string;
  bn_name: string;
  name: string; // Adding 'name' field for API submission
}

const ReportPage = () => {
  const [unions, setUnions] = useState<Union[]>([]);
  const [selectedUnion, setSelectedUnion] = useState<string>("");
  const [contactNumber, setContactNumber] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter(); // Initialize router for navigation

  // Fetch unions from API
  useEffect(() => {
    const fetchUnions = async () => {
      try {
        const response = await axios.get(
          "https://genz-rohanpur-server.vercel.app/unions"
        ); // Replace with your API route
        setUnions(response.data);
      } catch (error) {
        console.error("Error fetching unions", error);
      }
    };

    fetchUnions();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageLink = "";
      if (image) {
        const formData = new FormData();
        formData.append("image", image);

        // Upload image to ImageBB
        const imgbbResponse = await axios.post(
          `https://api.imgbb.com/1/upload?key=84637e8bbffbf467ef488486fc948bf5`,
          formData
        );
        imageLink = imgbbResponse.data.data.url;
      }

      const reportData = {
        union: selectedUnion,
        contactNumber,
        description,
        title,
        imageLink,
      };

      // Send report data to server
      await axios.post(
        "https://genz-rohanpur-server.vercel.app/reports",
        reportData
      );

      // Show success notification
      Swal.fire({
        icon: "success",
        title: "রিপোর্ট সফলভাবে জমা দেওয়া হয়েছে!",
        showConfirmButton: false,
        timer: 1500,
      });

      // Redirect to homepage after submission
      router.push("/");

      // Reset form fields
      setSelectedUnion("");
      setContactNumber("");
      setDescription("");
      setTitle("");
      setImage(null);
    } catch (error) {
      console.error("Error submitting report", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-4 text-center">রিপোর্ট করুন</h1>
        <form onSubmit={handleSubmit} className="space-y-4 mb-5">
          <div>
            <label htmlFor="union" className="block text-lg font-medium">
              ইউনিয়ন নির্বাচন করুন
            </label>
            <select
              id="union"
              value={selectedUnion}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setSelectedUnion(e.target.value)
              }
              className="block w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            >
              <option value="">ইউনিয়ন নির্বাচন করুন</option>
              {unions.map((union) => (
                <option key={union.id} value={union.bn_name}>
                  {union.bn_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="contactNumber"
              className="block text-lg font-medium"
            >
              যোগাযোগের নম্বর
            </label>
            <input
              id="contactNumber"
              type="tel"
              value={contactNumber}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setContactNumber(e.target.value)
              }
              className="block w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div>
            <label htmlFor="title" className="block text-lg font-medium">
              শিরোনাম
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
              className="block w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-lg font-medium">
              বিবরণ
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setDescription(e.target.value)
              }
              className="block w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              rows={4}
              required
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-lg font-medium">
              ছবি আপলোড করুন
            </label>
            <input
              id="image"
              type="file"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setImage(e.target.files ? e.target.files[0] : null)
              }
              className="block w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 bg-red-500 text-white font-semibold rounded shadow-md transition-colors duration-300 ease-in-out hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
              loading ? "loading loading-spinner loading-lg" : ""
            }`}
            disabled={loading}
          >
            জমা দিন
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default ReportPage;

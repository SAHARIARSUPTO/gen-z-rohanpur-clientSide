// components/Footer.tsx
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#dc2626] text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <p className="mb-2">
          &copy; {new Date().getFullYear()} GEN-Z ROHANPUR. All rights reserved.
        </p>
        <p className="text-sm mb-4">
          Built with ❤️ by{" "}
          <a
            href="https://www.facebook.com/supto622"
            className="text-white underline hover:text-red-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sahariar Hosen Supto
          </a>{" "}
          |{" "}
          <a
            href="https://www.facebook.com/profile.php?id=61563854144435"
            className="text-white underline hover:text-red-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            BanglaSites Solution
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

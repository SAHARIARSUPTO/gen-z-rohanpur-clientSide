const Intro = () => {
  return (
    <div>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://scontent.fdac165-1.fna.fbcdn.net/v/t39.30808-6/454685709_122106787112443631_5120254942117852571_n.jpg?stp=cp6_dst-jpg&_nc_cat=110&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=Dj7YJdKEYKAQ7kNvgFbLYZM&_nc_ht=scontent.fdac165-1.fna&_nc_gid=Aj69Dyz-nIDc1bB74BFHuHd&oh=00_AYBxzCuBMzpwigVMw9gN-Aon_-_rWy1lAO9HpARZ_gI1aA&oe=66E8478B)",
        }}
      >
        <div className="hero-overlay bg-opacity-80 bg-black"></div>
        <div className="hero-content text-white text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-4xl font-bold">
              সকল ধরনের অন্যায়, দুর্নীতি ও বৈষম্যের বিরুদ্ধে
            </h1>
            <p className="mb-5 text-lg">
              আমরা একটি অরাজনৈতিক সংগঠন, যার লক্ষ্য সকল ধরনের অন্যায়, দুর্নীতি
              ও বৈষম্যকে প্রতিহত করা এবং সমাজে ন্যায়বিচার প্রতিষ্ঠা করা। আমাদের
              সাথে যুক্ত হয়ে, একটি সুষ্ঠু সমাজ গঠনে অবদান রাখুন।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;

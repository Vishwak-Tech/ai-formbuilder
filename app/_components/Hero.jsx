const Hero = () => {
  return (
    <section className="min-h-screen bg-[#FFF8E7] flex items-center justify-center px-6">
      <div className="max-w-5xl border-4 border-black bg-white p-10 shadow-[12px_12px_0px_#000]">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-black leading-tight uppercase">
           The Fastest Way
            <span className="inline-block rotate-[-2deg] border-4 border-black bg-yellow-300 px-3 py-1">
              {" "}
            to Build Forms
            </span>
            <br />
            with AI
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg font-medium md:text-xl">
            Create beautiful forms, surveys, quizzes, and feedback forms with AI. Describe what you need in plain English, and FormCraft AI will generate a fully customizable form in seconds.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-6">
            <a
              href="#"
              className="border-4 border-black bg-yellow-300 px-8 py-4 text-xl font-black uppercase shadow-[6px_6px_0px_#000] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
            >
              + Create AI Form
            </a>

            <a
              href="#"
              className="border-4 border-black bg-white px-8 py-4 text-xl font-black uppercase shadow-[6px_6px_0px_000] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
            >
              Demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

import logo from "../assets/logoo.webp";
const openGithub = useCallback(() => {
  window.open("https://github.com/Devemmy01/SummAI");
}, []);

const Hero = () => {
  return (
    <header className="w-full flex items-center justify-center flex-col">
      <nav className="flex items-center justify-between md:px-10 w-full flex-row mb-10 pt-4">
        <img src={logo} alt="SummAI_logo" className="w-44 md:w-60" />

        <i
          className="bx bxl-github text-[50px] md:text-6xl text-white cursor-pointer hover:text-gray-400 transition-colors duration-300 ease-in-out"
          onClick={openGithub}
          aria-label="Github link"
        ></i>
      </nav>

      <h1 className="mt-5 md:mt-14 text-5xl font-extrabold leading-[1.15] text-slate-100 sm:text-6xl text-center font-sans">
        Transform Articles into Quick Insights using<span className="bg-gradient-to-r from-[#68d391] via-[#48bb78] to-[#38a169] bg-clip-text text-transparent"> SummAI</span> 
      </h1>
      <h2 className="mt-5 text-lg text-slate-300 sm:text-xl text-center max-w-2xl">
        SummAI is an article summarizer that turns long articles, blog posts, and other text documents into condensed readable summaries, so you can read with less effort.
      </h2>
    </header>
  );
};

export default Hero;

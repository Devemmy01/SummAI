  import { motion } from "framer-motion";
  import Summary from "../components/Summary";
  import { SiBuymeacoffee } from "react-icons/si";

  export default function Home() {
    const handleStartSummarizing = () => {
      // Scroll to top smoothly
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Add a flash effect to the input field
      const inputElement = document.querySelector("#url-input");
      if (inputElement) {
        inputElement.focus();
        inputElement.classList.add("highlight-input");

        // Remove the highlight class after animation
        setTimeout(() => {
          inputElement.classList.remove("highlight-input");
        }, 2000);
      }
    };

    return (
      <div className="dark:text-white relative">
        <a
          href="https://www.buymeacoffee.com/NuelCodes"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-black whitespace-nowrap bg-[#FFDD00] hover:bg-[#FFDD00]/90 rounded-full shadow-lg transition-all z-[9999] right-5 bottom-5 fixed"
        >
          <SiBuymeacoffee className="text-lg" />
          <span>Buy me a coffee</span>
        </a>

        <section className="relative overflow-hidden min-h-screen pt-8">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 rounded-full bg-gradient-to-r from-primary-300/20 via-primary-500/20 to-primary-400/20 blur-3xl"></div>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-8 inline-block"
              >
                <span className="px-5 py-2 rounded-full bg-gradient-to-r from-primary-500/15 to-primary-600/25 text-primary-600 dark:text-primary-300 text-sm font-medium border border-primary-200/50 dark:border-primary-700/50 shadow-md backdrop-blur-sm">
                  ✨ AI-Powered Summarization
                </span>
              </motion.div>

              <motion.h1
                className="text-[45px] md:text-[70px] font-bold mb-6 text-gray-900 dark:text-white leading-none tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Turn Articles into <br />
                <span className="text-5xl md:text-7xl bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400 bg-clip-text text-transparent drop-shadow-sm">
                  Quick Insights
                </span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="relative inline-block mb-12"
              >
                <p className="text-[16px] md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4 relative z-10">
                  Instantly summarize any article or blog post into concise,
                  readable summaries. Save time and stay informed with AI-powered
                  content compression.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap justify-center gap-4 md:gap-8 mt-12 mb-16"
              >
                {quickFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    whileHover={{
                      y: -5,
                      boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
                    }}
                    className="flex items-center space-x-3 px-5 py-3 rounded-full bg-white/80 dark:bg-gray-800/70 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/30 shadow-xl"
                  >
                    <span className="text-xl text-primary-500">
                      {feature.icon}
                    </span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                      {feature.text}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="max-w-3xl mx-auto mt-8 bg-white/90 dark:bg-gray-800/90 rounded-2xl backdrop-blur-lg shadow-2xl border border-gray-100/70 dark:border-gray-700/50 p-8 relative overflow-hidden"
            >
              <Summary />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center mt-8 relative"
            >
              <p className="text-gray-600 dark:text-gray-300 font-medium">
                Try it now! Paste any article URL or text to see the magic happen.
              </p>

              {/* Animated arrow indicator */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute left-1/2 transform -translate-x-1/2 mt-4"
              >
                <svg
                  width="20"
                  height="10"
                  viewBox="0 0 20 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 10L0 0H20L10 10Z"
                    fill="currentColor"
                    className="text-primary-500/60"
                  />
                </svg>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>

          {/* Subtle dot pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "radial-gradient(currentColor 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          ></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
            {/* Section header with accent */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                Premium Features,{" "}
                <span className="text-primary-500">Zero Cost</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary-400/0 via-primary-500 to-primary-400/0 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative z-10">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{
                    y: -8,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)",
                  }}
                  className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group overflow-hidden relative"
                >
                  {/* Enhanced gradient accent with animation */}
                  <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-primary-400 via-primary-600 to-primary-400 group-hover:opacity-100 opacity-80 transition-opacity"></div>

                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary-500/5 to-transparent rounded-bl-full"></div>

                  <div className="text-4xl mb-6 bg-gradient-to-br from-primary-500/20 to-primary-600/20 dark:from-primary-400/10 dark:to-primary-500/10 w-20 h-20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                    <span className="group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 relative overflow-hidden">
          {/* Richer gradient background with depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500 dark:from-primary-800 dark:via-primary-700 dark:to-primary-600"></div>

          {/* Advanced mesh pattern overlay */}
          <div
            className="absolute inset-0 opacity-10 mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          {/* Advanced animated gradient spheres */}
          <motion.div
            animate={{
              x: [0, -20, 0],
              y: [0, 20, 0],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              repeat: Infinity,
              duration: 15,
              ease: "easeInOut",
            }}
            className="absolute -left-40 top-10 w-96 h-96 bg-primary-300/40 rounded-full blur-3xl"
          ></motion.div>

          <motion.div
            animate={{
              x: [0, 20, 0],
              y: [0, -20, 0],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              repeat: Infinity,
              duration: 18,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute -right-40 -bottom-20 w-96 h-96 bg-primary-400/40 rounded-full blur-3xl"
          ></motion.div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white drop-shadow-sm">
                100% Free, <span className="italic">No Strings Attached</span>
              </h2>

              {/* Decorative separator */}
              <div className="w-24 h-1 bg-white/50 mx-auto mb-6 rounded-full"></div>

              <p className="text-lg md:text-xl text-white/90 mb-10">
                Experience the power of AI-driven summarization without any cost.
                No credit card required, no hidden fees.
              </p>

              {/* Enhanced call-to-action button */}
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
                }}
                whileTap={{ scale: 0.98 }}
                onClick={handleStartSummarizing}
                className="bg-white text-primary-600 px-10 py-4 rounded-full text-lg font-semibold transition-all shadow-xl border border-white/20 hover:bg-white/95"
              >
                Start Summarizing for Free
              </motion.button>
            </motion.div>
          </div>
        </section>

        <style>{`        
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0px); }
          }
          
          .highlight-input {
            animation: highlight 2s ease-in-out;
          }
          
          @keyframes highlight {
            0%, 100% { box-shadow: 0 0 0 rgba(99, 102, 241, 0); }
            50% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.6); }
          }
        `}</style>
      </div>
    );
  }

  const features = [
    {
      icon: "🚀",
      title: "Lightning Fast",
      description:
        "Get summaries in seconds, not minutes. Save time and focus on what matters.",
    },
    {
      icon: "🎯",
      title: "Accurate Results",
      description:
        "Advanced AI ensures your summaries capture the most important points.",
    },
    {
      icon: "🔒",
      title: "Secure",
      description: "Your content is never stored without your permission.",
    },
  ];

  const quickFeatures = [
    {
      icon: "⚡️",
      text: "Lightning-fast summaries",
    },
    {
      icon: "🎯",
      text: "99% accuracy",
    },
  ];

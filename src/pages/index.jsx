import { motion } from 'framer-motion';
import Summary from '../components/Summary';

export default function Home() {
  const handleStartSummarizing = () => {
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Add a flash effect to the input field
    const inputElement = document.querySelector('#url-input');
    if (inputElement) {
      inputElement.focus();
      inputElement.classList.add('highlight-input');
      
      // Remove the highlight class after animation
      setTimeout(() => {
        inputElement.classList.remove('highlight-input');
      }, 2000);
    }
  };

  return (
    <div className="dark:text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen pt-8">
        {/* Updated Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,64,60,0.1)_50%,transparent_75%,transparent_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#22c55e20_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#22c55e15_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#22c55e15_0%,transparent_50%)]" />
        </div>
        
        {/* Optional: Add a subtle noise texture */}
        <div 
          className="absolute inset-0 opacity-[0.25] mix-blend-overlay -z-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* New decorative elements */}
        <div className="absolute inset-0 -z-5">
          {/* Animated circles */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-20 right-20 w-32 h-32 border-2 border-primary-500/30 rounded-full"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-20 left-20 w-40 h-40 border-2 border-primary-500/20 rounded-full"
          />

          {/* Floating elements */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, 0]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-40 right-[10%] text-6xl hidden md:block"
          >
            📚
          </motion.div>
          <motion.div
            animate={{
              y: [0, 20, 0],
              rotate: [0, -10, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute hidden md:block top-60 left-[15%] text-6xl"
          >
            📝
          </motion.div>

          {/* Animated lines */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute top-1/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary-500/20 to-transparent"
          />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="absolute top-2/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary-500/20 to-transparent"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          {/* Hero content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6 inline-block"
            >
              <span className="px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-medium">
                ✨ AI-Powered Summarization
              </span>
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Transform Articles into
              <br />
              <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                Quick Insights
              </span>
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Instantly summarize any article, blog post, or document into concise, readable summaries. 
              Save time and stay informed with AI-powered content compression.
            </motion.p>

            {/* New feature highlights */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center gap-8 mt-12 mb-16"
            >
              {quickFeatures.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="text-primary-500">{feature.icon}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">{feature.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

         
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="max-w-3xl mx-auto mt-8"
          >
            <Summary />
          </motion.div>

          {/* "Try it now" text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center text-gray-500 dark:text-gray-400 mt-4"
          >
            Try it now! Paste any article URL or text to see the magic happen.
          </motion.p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-primary-50 dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all border border-primary-100 dark:border-gray-700"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Add back the Free Section */}
      <section className="py-16 bg-gradient-to-br from-primary-500 to-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              100% Free, No Strings Attached
            </h2>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              Experience the power of AI-driven summarization without any cost. No credit card required, no hidden fees.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartSummarizing}
              className="bg-white text-primary-600 px-8 py-3 rounded-lg text-lg font-semibold hover:shadow-lg transition-all"
            >
              Start Summarizing for Free
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    icon: "🚀",
    title: "Lightning Fast",
    description: "Get summaries in seconds, not minutes. Save time and focus on what matters."
  },
  {
    icon: "🎯",
    title: "Accurate Results",
    description: "Advanced AI ensures your summaries capture the most important points."
  },
  {
    icon: "🔒",
    title: "Secure",
    description: "Your content is never stored without your permission."
  }
];

const quickFeatures = [
  {
    icon: "⚡️",
    text: "Lightning-fast summaries"
  },
  {
    icon: "🎯",
    text: "99% accuracy"
  },
]; 
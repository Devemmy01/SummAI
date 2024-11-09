import { useState, useEffect, lazy, Suspense } from "react";
import { useLazyGetSummaryQuery } from "../services/article";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext";
import { db } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const ShareButtons = lazy(() => import("./ShareButtons"));

const Summary = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });
  const [allArticles, setAllArticles] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState({ value: 'en', label: 'English' });
  const { user } = useAuth();
  const navigate = useNavigate();

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesFromLocalStorage = localStorage.getItem("articles");

    if (articlesFromLocalStorage) {
      try {
        const parsedArticles = JSON.parse(articlesFromLocalStorage);
        setAllArticles(parsedArticles);
      } catch (error) {
        console.error("Error parsing articles from localStorage:", error);
        // Handle parsing error (optional: set an empty array or default values)
      }
    } else {
      // Set an empty array or default values if no articles in localStorage
      setAllArticles([]);
    }
  }, []);

  const languages = [
    { value: "en", label: "English" },
    { value: "es", label: "Spanish" },
    { value: "fr", label: "French" },
    { value: "de", label: "German" },
    { value: "it", label: "Italian" },
    { value: "pt", label: "Portuguese" },
    // ... add more languages as needed
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { url } = article;
    if (!url) {
      toast.error('Please enter a URL');
      return;
    }

    try {
      const { data } = await getSummary({ 
        url,
        lang: selectedLanguage.value 
      });
      
      if (data?.summary) {
        const newArticle = { ...article, summary: data.summary };
        updateArticles(newArticle);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to generate summary. Please try again.");
    }
  };

  const handleCopy = (copyUrl) => {
    navigator.clipboard.writeText(copyUrl);
    toast.success("Link copied successfully");
  };

  const handleCopysum = (copySum) => {
    navigator.clipboard.writeText(copySum);
    toast.success("Summary copied successfully");
  };

  const handleDelete = (deleteUrl) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      const updatedArticles = allArticles.filter(
        (item) => item.url !== deleteUrl
      );
      setAllArticles(updatedArticles);
      localStorage.setItem("articles", JSON.stringify(updatedArticles));

      // Check if the currently displayed article is deleted
      if (article.url === deleteUrl) {
        // Reset the article state to remove the summary UI
        setArticle({ url: "" });
      }

      // Display a toast notification
      toast.success("Link deleted successfully");
    }
  };

  const getParagraphs = (summary, length) => {
    const paragraphs = summary.split("\n"); // Assuming that paragraphs are separated by newlines
    return paragraphs.slice(0, length).join("\n");
  };

  const SummarizeButton = ({ isFetching, onClick }) => {
    return (
      <button
        onClick={onClick}
        disabled={isFetching}
        className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors disabled:bg-gray-400"
      >
        {isFetching ? (
          <span className="flex items-center space-x-2">
            <span className="animate-spin">⌛</span>
          </span>
        ) : (
          <>
            <span className="hidden md:inline">Summarize</span>
            <span className="md:hidden text-white">✨</span>
          </>
        )}
      </button>
    );
  };

  const updateArticles = (newArticle) => {
    const updatedAllArticles = [newArticle, ...allArticles];
    setArticle(newArticle);
    setAllArticles(updatedAllArticles);
    localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
  };

  const handleSave = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      await addDoc(collection(db, "summaries"), {
        userId: user.uid,
        url: article.url,
        summary: article.summary,
        timestamp: new Date().toISOString(),
      });
      toast.success("Summary saved successfully!");
    } catch (error) {
      console.error("Error saving summary:", error);
      toast.error("Failed to save summary");
    }
  };

  return (
    <>
      <section className="w-full max-w-3xl mx-auto">
        <div className="flex flex-col gap-6">
          {/* Language Dropdown */}
          <div className="relative w-full">
            <select
              value={selectedLanguage.value}
              onChange={(e) => setSelectedLanguage(languages.find(lang => lang.value === e.target.value))}
              className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-gray-700 dark:text-gray-300 focus:outline-none focus:border-primary-500 cursor-pointer"
            >
              {languages.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* URL Input */}
          <div className="flex gap-2">
            <input
              type="url"
              placeholder="Enter article URL..."
              value={article.url}
              name="article url"
              onChange={(e) => setArticle({ ...article, url: e.target.value })}
              className="flex-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-gray-700 dark:text-gray-300 focus:outline-none focus:border-primary-500"
            />
            <SummarizeButton isFetching={isFetching} onClick={handleSubmit} />
          </div>

          {/* Display Summary */}
          {article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-bold text-gray-900 dark:text-white text-xl">
                Article Summary
              </h2>
              <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md p-6">
                <div className="flex flex-col">
                  <div className="text-gray-700 dark:text-gray-300 space-y-4">
                    {article.summary.split('\n').map((paragraph, index) => (
                      paragraph && (
                        <p key={index} className="text-base leading-relaxed">
                          {paragraph}
                        </p>
                      )
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Suspense fallback={<div>Loading...</div>}>
                      <ShareButtons url={article.url} summary={article.summary} />
                    </Suspense>
                    <button
                      onClick={handleSave}
                      className="text-primary-500 hover:text-primary-600 pt-4"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Summary;

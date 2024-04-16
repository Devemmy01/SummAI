import { useState, useEffect } from "react";
import { useLazyGetSummaryQuery } from "../services/article";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ShareButtons from "./ShareButtons";

const Summary = () => {

  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });

  const [allArticles, setAllArticles] = useState([]);
  const [urlCopied, setUrlCopied] = useState("");
  const [summaryCopied, setSummaryCopied] = useState("");
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  const [paragraphLength, setParagraphLength] = useState(3); // Default length of the summary

  const languages = [
    { value: "en", label: "English" },
    { value: "es", label: "Spanish" },
    { value: "fr", label: "French" },
    { value: "de", label: "German" },
    { value: "it", label: "Italian" },
    { value: "pt", label: "Portuguese" },
    { value: "ar", label: "Arabic" },
    { value: "zh", label: "Chinese" },
    { value: "ja", label: "Japanese" },
    { value: "ko", label: "Korean" },
    { value: "ru", label: "Russian" },
    { value: "tr", label: "Turkish" },
    { value: "vi", label: "Vietnamese" },
    { value: "hi", label: "Hindi" },
    { value: "bn", label: "Bengali" },
    { value: "gu", label: "Gujarati" },
    { value: "kn", label: "Kannada" },
    { value: "ml", label: "Malayalam" },
    { value: "mr", label: "Marathi" },
    { value: "pa", label: "Punjabi" },
    { value: "ta", label: "Tamil" },
    { value: "te", label: "Telugu" },
    { value: "ur", label: "Urdu" },
  ];

  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  const [language, setLanguage] = useState("en"); // Default language of the summary

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  const toggleSubmenu = () => {
    setIsSubmenuOpen(!isSubmenuOpen);
    setArticle({ url: "" });
  };

  useEffect(() => {
    setLanguage(selectedLanguage.value);
  }, [selectedLanguage]);
  
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await getSummary({
      url: article.url,
      length: paragraphLength,
      lang: selectedLanguage.value,
    });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };

      const updatedAllArticles = [newArticle, ...allArticles];

      setArticle(newArticle);
      setAllArticles(updatedAllArticles);
      // save to local storage
      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    }
  };

  const handleCopy = (copyUrl) => {
    setUrlCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setUrlCopied(false), 4000);

    toast.success("Link copied successfully");
  };

  const handleCopysum = (copySum) => {
    setSummaryCopied(copySum);
    navigator.clipboard.writeText(copySum);
    setTimeout(() => setSummaryCopied(false), 4000);

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

  return (
    <section className="w-full mt-16 max-w-xl">
      <ToastContainer />
      <div className="w-full flex flex-col gap-2">
        <form
          className="relative flex gap-3 flex-col justify-center items-center"
          onSubmit={handleSubmit}
        >
          <div className="flex w-full gap-3">
            <div className="flex flex-col w-full ">
              <label className="text-gray-400 text-sm font-bold mb-2">
                Paragraph length
              </label>

              <input
                type="number"
                placeholder="Paragraph length"
                value={paragraphLength}
                onChange={(e) => setParagraphLength(e.target.value)}
                className="block w-full rounded-md border border-gray-200 bg-white py-2.5 pl-2 pr-2 text-sm shadow-lg font-satoshi font-medium focus:border-[#07fd44] focus:outline-none focus:ring-0 peer h-[45px]"
              />
            </div>

            <div className="flex flex-col w-full">
              <label className="text-gray-400 text-sm font-bold mb-2">
                Language
              </label>

              <div className="dropdown w-full rounded-md">
                <button className="dropdown-button h-0">
                  {selectedLanguage.label}
                </button>
                <div className="dropdown-content w-full rounded-md">
                  {languages.map((language) => (
                    <div
                      key={language.value}
                      onClick={() => setSelectedLanguage(language)}
                      className="dropdown-item"
                    >
                      {language.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="relative w-full">
            <i className="bx bx-link-alt text-2xl text-gray-400 absolute left-0 w-3 my-2 ml-3"></i>

            <input
              type="url"
              placeholder="Enter a URL "
              value={article.url}
              onChange={(e) =>
                setArticle({
                  ...article,
                  url: e.target.value,
                })
              }
              required
              className="block w-full rounded-md border border-gray-200 bg-white py-2.5 pl-11 pr-12 text-sm shadow-lg font-satoshi font-medium focus:border-[#07fd44] focus:outline-none focus:ring-0 peer"
            />

            <button
              type="submit"
              className="hover:text-[#0cb24c] transition-all absolute inset-y-0 right-0 my-1.5 mr-1.5 flex w-10 items-center justify-center rounded font-sans text-sm font-medium text-gray-400 peer-focus:text-[#0cb24c]"
            >
              <i className="bx bxs-send text-3xl"></i>
            </button>
          </div>
        </form>

        {allArticles.length > 0 && (
          <div
            onClick={toggleSubmenu}
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer text-gray-400 w-[230px] hover:bg-[#0db14c6b]"
          >
            <div className="flex w-full items-center">
              <i className="bx bx-history text-[20px] md:text-3xl text-gray-400"></i>
              <span className="text-[18px] md:text-[25px] ml-4 font-semibold">
                History
              </span>
              <span
                className={`text-sm ${
                  isSubmenuOpen ? "rotate-180" : ""
                } mx-auto flex items-end justify-end`}
              >
                <i className="bx bx-chevron-down text-4xl text-gray-400"></i>
              </span>
            </div>
          </div>
        )}

        <div
          className={`text-left text-sm mt-2 font-semibold ${
            isSubmenuOpen ? "" : "hidden"
          }`}
        >
          <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
            {allArticles.map((item, index) => (
              <div className="link_card" key={`link-${index}`}>
                <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                  {urlCopied === item.url ? (
                    <i className="bx bx-check text-4xl text-green-500"></i>
                  ) : (
                    <i className="bx bxs-copy text-xl text-gray-400"></i>
                  )}
                </div>
                <p
                  onClick={() => setArticle(item)}
                  className="flex-1 font-sans text-blue-700 w-full font-medium text-sm truncate"
                >
                  {item.url}
                </p>

                <i
                  className="bx bxs-trash-alt text-3xl transition-all text-gray-400 hover:text-red-600"
                  onClick={() => handleDelete(item.url)}
                ></i>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Display Result */}
      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <div className="loader"></div>
        ) : error ? (
          <div className="flex flex-col gap-3">
            <p className="font-inter font-bold text-red-500 text-3xl md:text-5xl text-center">
              Error !
            </p>
            <span className="font-satoshi font-semibold text-center text-sm md:text-xl text-red-500">
              {error?.data?.error}
            </span>
          </div>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi font-bold text-slate-100 text-3xl">
                <span className="bg-gradient-to-r from-[#68d391] via-[#48bb78] to-[#38a169] bg-clip-text text-transparent">
                  Summary
                </span>
              </h2>
              <div className="summary_box relative">
                <p className="font-medium text-sm text-slate-100">
                  {getParagraphs(article.summary, paragraphLength)}
                </p>
                <div className="flex gap-4 items-end justify-end mt-3 cursor-pointer">

                <ShareButtons article={article}/>
                
                {summaryCopied === article.summary ? (
                  <p
                    onClick={() => handleCopysum(article.summary)}
                    className="text-green-500 transition-all text-xl"
                  >
                    Copied !
                  </p>
                ) : (
                  <i
                    onClick={() => handleCopysum(article.summary)}
                    className="bx bxs-copy text-3xl md:text-4xl text-gray-400"
                  ></i>
                )}
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Summary;

import { useState, useEffect } from "react";
import { useLazyGetSummaryQuery } from "../services/article";

const Summary = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });

  const [allArticles, setAllArticles] = useState([]);
  const [urlCopied, setUrlCopied] = useState("");
  const [summaryCopied, setSummaryCopied] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await getSummary({ articleUrl: article.url });

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
    setTimeout(() => setUrlCopied(false), 3000);
  };

  const handleCopysum = (copySum) => { 
    setSummaryCopied(copySum);
    navigator.clipboard.writeText(copySum);
    setTimeout(() => setSummaryCopied(false), 3000);
  };

  return (
    <section className="w-full mt-16 max-w-xl">
      <div className="w-full flex flex-col gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
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
            className="hover:text-[#0cb24c] absolute inset-y-0 right-0 my-1.5 mr-1.5 flex w-10 items-center justify-center rounded font-sans text-sm font-medium text-gray-400 peer-focus:text-[#0cb24c]"
          >
            <i className="bx bxs-send text-3xl"></i>
          </button>
        </form>

        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className="link_card"
            >
              <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                {urlCopied === item.url ? (
                  <i className="bx bx-check text-4xl text-green-500"></i>
                ) : (
                  <i className="bx bxs-copy text-xl text-gray-400"></i>
                )}
              </div>
              <p className="flex-1 font-sans text-blue-700 font-medium text-sm truncate">
                {item.url}
              </p>
            </div>
          ))}
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
                  {article.summary}
                </p>
                <div className="flex items-end justify-end mt-3 cursor-pointer">
                  {/* <i class="bx bx-clipboard text-4xl text-gray-200 hover:text-[#0CB14B] transition-all"></i> */}
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

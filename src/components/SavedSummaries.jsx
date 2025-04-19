import { useState, useEffect } from "react";
import { db, auth } from "../config/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";
// Import jsPDF at the top of your file
// You'll need to install it with: npm install jspdf

const SavedSummaries = () => {
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedSummaries, setExpandedSummaries] = useState({});
  const [openExportMenu, setOpenExportMenu] = useState(null);

  const fetchSummaries = async () => {
    try {
      const q = query(
        collection(db, "summaries"),
        where("userId", "==", auth.currentUser?.uid)
      );
      const querySnapshot = await getDocs(q);
      const summariesData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        let timestamp = data.timestamp;

        if (data.timestamp?.toDate) {
          timestamp = data.timestamp.toDate();
        } else if (typeof data.timestamp === "string") {
          timestamp = new Date(data.timestamp);
        }

        return {
          id: doc.id,
          ...data,
          timestamp: timestamp,
        };
      });
      setSummaries(summariesData);
    } catch (error) {
      console.error("Error fetching summaries:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth.currentUser) {
      fetchSummaries();
    }
  }, []);

  const handleDelete = async (summaryId) => {
    if (window.confirm("Are you sure you want to delete this summary?")) {
      try {
        await deleteDoc(doc(db, "summaries", summaryId));
        setSummaries((prevSummaries) =>
          prevSummaries.filter((summary) => summary.id !== summaryId)
        );
        toast.success("Summary deleted successfully");
      } catch (error) {
        console.error("Error deleting summary:", error);
        toast.error("Failed to delete summary");
      }
    }
  };

  const toggleSummary = (summaryId) => {
    setExpandedSummaries((prev) => ({
      ...prev,
      [summaryId]: !prev[summaryId],
    }));
  };

  const formatSummary = (text) => {
    if (!text) return [];
    const paragraphs = text.split("\n").filter((p) => p.trim());
    return paragraphs;
  };

  const getFirstSentence = (text) => {
    if (!text) return "";
    const match = text.match(/^[^.!?]+[.!?]/);
    return match ? match[0] : text;
  };

  const createFileName = (url, format) => {
    let fileName = "summary";
    if (url) {
      try {
        const urlObj = new URL(url);
        fileName = urlObj.hostname.replace("www.", "");
      } catch (e) {
        // If URL parsing fails, use the default name
      }
    }
    const timestamp = new Date().toISOString().slice(0, 10);
    return `${fileName}-${timestamp}.${format}`;
  };

  const handleExport = async (summary, format) => {
    const title = summary.url || "Summary";
    const summaryText = summary.summary || "";
    const originalText = summary.originalText
      ? `\n\nOriginal Content:\n${summary.originalText}`
      : "";
    const content = `${title}\n\n${summaryText}${originalText}`;

    if (format === "txt") {
      // Export as text file
      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = createFileName(summary.url, "txt");
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Summary exported as text file");
    } else if (format === "html") {
      // Export as HTML file
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>${title}</title>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
            h1 { color: #333; }
            .summary { margin-bottom: 30px; }
            .original { color: #555; border-top: 1px solid #ddd; padding-top: 20px; }
            a { color: #0066cc; }
          </style>
        </head>
        <body>
          <h1>Summary: ${title}</h1>
          <div class="summary">
            ${formatSummary(summaryText)
              .map((p) => `<p>${p}</p>`)
              .join("")}
          </div>
          ${
            summary.url
              ? `<p><a href="${summary.url}" target="_blank">${summary.url}</a></p>`
              : ""
          }
          ${
            summary.originalText
              ? `
            <div class="original">
              <h2>Original Content</h2>
              <p>${summary.originalText.replace(/\n/g, "<br>")}</p>
            </div>
          `
              : ""
          }
          <footer>
            <p><small>Exported on ${new Date().toLocaleString()}</small></p>
          </footer>
        </body>
        </html>
      `;
      const blob = new Blob([htmlContent], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = createFileName(summary.url, "html");
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Summary exported as HTML file");
    } else if (format === "md") {
      // Export as Markdown file
      const markdownContent = `
# Summary: ${title}

${summaryText}

${summary.url ? `Source: [${summary.url}](${summary.url})` : ""}

${
  summary.originalText
    ? `
## Original Content

${summary.originalText}
`
    : ""
}

*Exported on ${new Date().toLocaleString()}*
      `;
      const blob = new Blob([markdownContent], { type: "text/markdown" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = createFileName(summary.url, "md");
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Summary exported as Markdown file");
    } else if (format === "pdf") {
      try {
        // Dynamically import jsPDF to avoid issues if it's not installed yet
        const jsPDFModule = await import("jspdf");
        const { default: jsPDF } = jsPDFModule;

        // Create a new PDF document
        const doc = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
        });

        // Add title
        doc.setFontSize(18);
        doc.text(`Summary: ${title}`, 20, 20);

        // Add URL if available
        if (summary.url) {
          doc.setFontSize(12);
          doc.setTextColor(0, 102, 204);
          doc.textWithLink(summary.url, 20, 30, { url: summary.url });
          doc.setTextColor(0, 0, 0);
        }

        // Add summary content
        doc.setFontSize(12);
        const splitSummary = doc.splitTextToSize(summaryText, 170);
        doc.text(splitSummary, 20, 40);

        // Calculate position for original text if it exists
        let yPosition = 40 + splitSummary.length * 7;

        // Add original text if available
        if (summary.originalText) {
          // Add a separator line
          doc.setDrawColor(200, 200, 200);
          doc.line(20, yPosition, 190, yPosition);
          yPosition += 10;

          // Add original content header
          doc.setFontSize(16);
          doc.text("Original Content", 20, yPosition);
          yPosition += 10;

          // Add original content
          doc.setFontSize(10);
          const splitOriginal = doc.splitTextToSize(summary.originalText, 170);

          // Check if content fits on current page, otherwise add new page
          if (yPosition + splitOriginal.length * 5 > 280) {
            doc.addPage();
            yPosition = 20;
          }

          doc.text(splitOriginal, 20, yPosition);
        }

        // Add footer with export date
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text(`Exported on ${new Date().toLocaleString()}`, 20, 287);

        // Save PDF
        doc.save(createFileName(summary.url, "pdf"));
        toast.success("Summary exported as PDF file");
      } catch (error) {
        console.error("Error exporting PDF:", error);
        toast.error("Failed to export PDF. Make sure jsPDF is installed.");
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {summaries.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No saved summaries yet
        </p>
      ) : (
        summaries.map((summary) => (
          <div
            key={summary.id}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow relative"
          >
            <div className="absolute top-2 right-2 flex gap-2">
              <div className="relative">
                <button
                  className="text-gray-400 hover:text-primary-500 transition-colors flex items-center"
                  title="Export summary"
                  onClick={() => setOpenExportMenu(summary.id === openExportMenu ? null : summary.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {openExportMenu === summary.id && (
                  <div className="absolute right-0 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg z-10">
                    <div className="py-1">
                      <button
                        onClick={() => {
                          handleExport(summary, "txt");
                          setOpenExportMenu(null);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        Export as Text
                      </button>
                      <button
                        onClick={() => {
                          handleExport(summary, "html");
                          setOpenExportMenu(null);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        Export as HTML
                      </button>
                      <button
                        onClick={() => {
                          handleExport(summary, "md");
                          setOpenExportMenu(null);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        Export as Markdown
                      </button>
                      <button
                        onClick={() => {
                          handleExport(summary, "pdf");
                          setOpenExportMenu(null);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        Export as PDF
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <button
                onClick={() => handleDelete(summary.id)}
                className="text-gray-400 hover:text-red-500 transition-colors"
                title="Delete summary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <a
              href={summary.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium w-fit text-gray-900 dark:text-white mb-2 hover:text-primary-600 dark:hover:text-primary-400 block pr-16"
            >
              {summary.url ? `${summary.url.substring(0, 20)}...` : summary.originalText?.slice(0, 50) + "..."}
            </a>
            <div className="text-gray-600 dark:text-gray-300 space-y-2">
              {expandedSummaries[summary.id] ? (
                formatSummary(summary.summary).map((paragraph, index) => (
                  <p key={index} className="mb-2">
                    {paragraph}
                  </p>
                ))
              ) : (
                <>
                  <p>{getFirstSentence(summary.summary)}</p>
                  {summary.summary?.length >
                    getFirstSentence(summary.summary).length && (
                    <button
                      onClick={() => toggleSummary(summary.id)}
                      className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium"
                    >
                      See more
                    </button>
                  )}
                </>
              )}
              {expandedSummaries[summary.id] && (
                <button
                  onClick={() => toggleSummary(summary.id)}
                  className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium block mt-2"
                >
                  See less
                </button>
              )}
            </div>
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {summary.timestamp
                ? `Saved on: ${summary.timestamp.toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}`
                : "Save date not available"}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SavedSummaries;

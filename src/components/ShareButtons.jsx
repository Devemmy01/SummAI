import {
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaLinkedin,
  FaReddit,
  FaTelegram,
} from "react-icons/fa";
import { useState } from "react";

const ShareButtons = ({ article }) => {
  const [showShareButtons, setShowShareButtons] = useState(false);

  const toggleShareButtons = () => {
    setShowShareButtons(!showShareButtons);
  };

  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      article.url
    )}&quote=${encodeURIComponent(article.summary)}`;
    window.open(url, "_blank");
  };

  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      article.url
    )}&text=${encodeURIComponent(article.summary)}`;
    window.open(url, "_blank");
  };

  const shareOnWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      article.summary
    )}%20${encodeURIComponent(article.url)}`;
    window.open(url, "_blank");
  };

  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
      article.url
    )}&summary=${encodeURIComponent(article.summary)}`;
    window.open(url, "_blank");
  };

  const shareOnReddit = () => {
    const url = `https://www.reddit.com/submit?url=${encodeURIComponent(
      article.url
    )}&title=${encodeURIComponent(article.summary)}`;
    window.open(url, "_blank");
  };

  const shareOnTelegram = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(
      article.url
    )}&text=${encodeURIComponent(article.summary)}`;
    window.open(url, "_blank");
  };


  return (
    <>
      <i
        className="bx bxs-share-alt text-4xl text-gray-400 hover:text-[#0CB14B] cursor-pointer transition-all"
        onClick={toggleShareButtons}
      ></i>
      {showShareButtons && (
        <div className="w-[150px] md:w-[200px] flex items-center gap-2 overflow-scroll pt-2 pb-3 mt-4">
          <button className="b" onClick={shareOnFacebook}>
            <FaFacebook />
          </button>
          <button className="b" onClick={shareOnTwitter}>
            <FaTwitter />
          </button>
          <button className="b" onClick={shareOnWhatsApp}>
            <FaWhatsapp />
          </button>
          <button className="b" onClick={shareOnLinkedIn}>
            <FaLinkedin />
          </button>
          <button className="b" onClick={shareOnReddit}>
            <FaReddit />
          </button>
          <button className="b" onClick={shareOnTelegram}>
            <FaTelegram />
          </button>
        </div>
      )}
    </>
  );
};

export default ShareButtons;

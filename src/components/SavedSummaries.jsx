import { useState, useEffect } from 'react';
import { db, auth } from '../config/firebase';
import { collection, query, where, getDocs, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';

const SavedSummaries = () => {
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedSummaries, setExpandedSummaries] = useState({});

  const fetchSummaries = async () => {
    try {
      const q = query(
        collection(db, 'summaries'),
        where('userId', '==', auth.currentUser?.uid)
      );
      const querySnapshot = await getDocs(q);
      const summariesData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          timestamp: data.timestamp?.toDate?.()
        };
      });
      setSummaries(summariesData);
    } catch (error) {
      console.error('Error fetching summaries:', error);
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
    if (window.confirm('Are you sure you want to delete this summary?')) {
      try {
        await deleteDoc(doc(db, 'summaries', summaryId));
        setSummaries(prevSummaries => 
          prevSummaries.filter(summary => summary.id !== summaryId)
        );
        toast.success('Summary deleted successfully');
      } catch (error) {
        console.error('Error deleting summary:', error);
        toast.error('Failed to delete summary');
      }
    }
  };

  const toggleSummary = (summaryId) => {
    setExpandedSummaries(prev => ({
      ...prev,
      [summaryId]: !prev[summaryId]
    }));
  };

  const formatSummary = (text) => {
    if (!text) return '';
    const paragraphs = text.split('\n').filter(p => p.trim());
    return paragraphs;
  };

  const getFirstSentence = (text) => {
    if (!text) return '';
    const match = text.match(/^[^.!?]+[.!?]/);
    return match ? match[0] : text;
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
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
            <button
              onClick={() => handleDelete(summary.id)}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
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
            <a 
              href={summary.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-medium text-gray-900 dark:text-white mb-2 hover:text-primary-600 dark:hover:text-primary-400 block"
            >
              {summary.url || summary.originalText?.slice(0, 50) + '...'}
            </a>
            <div className="text-gray-600 dark:text-gray-300 space-y-2">
              {expandedSummaries[summary.id] ? (
                formatSummary(summary.summary).map((paragraph, index) => (
                  <p key={index} className="mb-2">{paragraph}</p>
                ))
              ) : (
                <>
                  <p>{getFirstSentence(summary.summary)}</p>
                  {summary.summary.length > getFirstSentence(summary.summary).length && (
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
              {summary.timestamp ? (
                `Saved at: ${summary.timestamp.toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}`
              ) : (
                'Save date not available'
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SavedSummaries;
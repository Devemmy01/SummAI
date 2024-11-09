import { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

const SavedSummaries = () => {
  const [savedSummaries, setSavedSummaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedSummaries, setExpandedSummaries] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    const fetchSavedSummaries = async () => {
      if (!user) return;

      try {
        const q = query(
          collection(db, 'summaries'),
          where('userId', '==', user.uid)
        );
        const querySnapshot = await getDocs(q);
        const summaries = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setSavedSummaries(summaries);
      } catch (error) {
        console.error('Error fetching saved summaries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedSummaries();
  }, [user]);

  const getFirstSentence = (text) => {
    const match = text.match(/^.*?[.!?](?:\s|$)/);
    return match ? match[0].trim() : text;
  };

  const toggleSummary = (id) => {
    setExpandedSummaries(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      {savedSummaries.length === 0 ? (
        <p>No saved summaries yet.</p>
      ) : (
        savedSummaries.map((summary) => (
          <div
            key={summary.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
          >
            <h3 className="font-semibold mb-2 text-blue-500">{summary.url}</h3>
            <div className="text-gray-600 dark:text-gray-300">
              {expandedSummaries[summary.id] ? (
                <>
                  <p>{summary.summary}</p>
                  <button
                    onClick={() => toggleSummary(summary.id)}
                    className="text-primary-500 hover:text-primary-600 text-sm mt-2 font-medium"
                  >
                    See less
                  </button>
                </>
              ) : (
                <>
                  <p>{getFirstSentence(summary.summary)}</p>
                  <button
                    onClick={() => toggleSummary(summary.id)}
                    className="text-primary-500 hover:text-primary-600 text-sm mt-2 font-medium"
                  >
                    See more
                  </button>
                </>
              )}
            </div>
            <div className="mt-2 text-sm text-gray-500">
              Saved on {new Date(summary.timestamp).toLocaleDateString()}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SavedSummaries; 
// Export DAILY_LIMIT constant
export const DAILY_LIMIT = 5;

const STORAGE_KEY = 'user_summary_data';

export const getUserData = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    const initialData = {
      summaryCount: 0,
      lastReset: new Date().toDateString(),
      isPro: false
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
  }
  return JSON.parse(data);
};

export const checkAndUpdateSummaryCount = () => {
  const userData = getUserData();
  const today = new Date().toDateString();

  // Reset count if it's a new day
  if (userData.lastReset !== today) {
    userData.summaryCount = 0;
    userData.lastReset = today;
  }

  // Check if user can make more summaries
  if (!userData.isPro && userData.summaryCount >= DAILY_LIMIT) {
    return false;
  }

  // Increment count and save
  userData.summaryCount += 1;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
  return true;
};

export const upgradeToProPlan = () => {
  const userData = getUserData();
  userData.isPro = true;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
};

export const getRemainingDailySummaries = () => {
  const userData = getUserData();
  if (userData.isPro) return Infinity;
  return Math.max(0, DAILY_LIMIT - userData.summaryCount);
}; 
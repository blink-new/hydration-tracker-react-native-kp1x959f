export const translations = {
  en: {
    // Navigation
    home: 'Home',
    charts: 'Charts',
    settings: 'Settings',
    
    // Home Screen
    dailyHydration: 'Daily Hydration',
    stayHealthy: 'Stay healthy and hydrated',
    quickAdd: 'Quick Add',
    customAmount: 'Custom Amount',
    enterAmount: 'Enter amount (ml)',
    add: 'Add',
    todaySummary: "Today's Summary",
    consumed: 'Consumed',
    remaining: 'Remaining',
    progress: 'Progress',
    
    // Charts Screen
    monthlyProgress: 'Monthly Progress',
    weeklyTrend: 'Weekly Trend',
    average: 'Average',
    bestDay: 'Best Day',
    goalsMet: 'Goals Met',
    activeDays: 'Active Days',
    
    // Settings Screen
    customizeApp: 'Customize your experience',
    language: 'Language',
    dailyGoal: 'Daily Goal',
    currentGoal: 'Current Goal',
    enterGoal: 'Enter goal (ml)',
    save: 'Save',
    recommendedGoals: 'Recommended Goals',
    standard: 'Standard',
    active: 'Active',
    athlete: 'Athlete',
    hydrationTips: 'Hydration Tips',
    tip1: 'Start your day with a glass of water',
    tip2: 'Set reminders throughout the day',
    tip3: 'Add lemon or cucumber for flavor',
    tip4: 'Drink more during exercise',
    
    // Messages
    error: 'Error',
    success: 'Success',
    invalidAmount: 'Please enter a valid amount (1-2000ml)',
    tooMuch: 'Amount too large. Maximum 2000ml per entry.',
    invalidGoal: 'Goal must be between 500ml and 5000ml',
    goalUpdated: 'Daily goal updated successfully!',
  },
  hi: {
    // Navigation
    home: 'होम',
    charts: 'चार्ट',
    settings: 'सेटिंग्स',
    
    // Home Screen
    dailyHydration: 'दैनिक हाइड्रेशन',
    stayHealthy: 'स्वस्थ और हाइड्रेटेड रहें',
    quickAdd: 'त्वरित जोड़ें',
    customAmount: 'कस्टम मात्रा',
    enterAmount: 'मात्रा दर्ज करें (ml)',
    add: 'जोड़ें',
    todaySummary: 'आज का सारांश',
    consumed: 'सेवन किया',
    remaining: 'शेष',
    progress: 'प्रगति',
    
    // Charts Screen
    monthlyProgress: 'मासिक प्रगति',
    weeklyTrend: 'साप्ताहिक रुझान',
    average: 'औसत',
    bestDay: 'सर्वश्रेष्ठ दिन',
    goalsMet: 'लक्ष्य पूरे',
    activeDays: 'सक्रिय दिन',
    
    // Settings Screen
    customizeApp: 'अपना अनुभव अनुकूलित करें',
    language: 'भाषा',
    dailyGoal: 'दैनिक लक्ष्य',
    currentGoal: 'वर्तमान लक्ष्य',
    enterGoal: 'लक्ष्य दर्ज करें (ml)',
    save: 'सेव करें',
    recommendedGoals: 'अनुशंसित लक्ष्य',
    standard: 'मानक',
    active: 'सक्रिय',
    athlete: 'एथलीट',
    hydrationTips: 'हाइड्रेशन टिप्स',
    tip1: 'अपने दिन की शुरुआत एक गिलास पानी से करें',
    tip2: 'दिन भर रिमाइंडर सेट करें',
    tip3: 'स्वाद के लिए नींबू या खीरा मिलाएं',
    tip4: 'व्यायाम के दौरान अधिक पानी पिएं',
    
    // Messages
    error: 'त्रुटि',
    success: 'सफलता',
    invalidAmount: 'कृपया एक वैध मात्रा दर्ज करें (1-2000ml)',
    tooMuch: 'मात्रा बहुत अधिक है। अधिकतम 2000ml प्रति एंट्री।',
    invalidGoal: 'लक्ष्य 500ml और 5000ml के बीच होना चाहिए',
    goalUpdated: 'दैनिक लक्ष्य सफलतापूर्वक अपडेट किया गया!',
  },
};

export const getTranslation = (key: string, language: string): string => {
  return translations[language as keyof typeof translations]?.[key as keyof typeof translations.en] || 
         translations.en[key as keyof typeof translations.en] || 
         key;
};
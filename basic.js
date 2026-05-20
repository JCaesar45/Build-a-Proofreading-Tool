// 1. isPalindrome
function isPalindrome(word) {
  if (typeof word !== 'string') return false;
  const cleaned = word.toLowerCase();
  return cleaned === cleaned.split('').reverse().join('');
}

// 2. findPalindromeBreaks
function findPalindromeBreaks(words) {
  if (!Array.isArray(words) || words.length === 0) return [];
  const breaks = [];
  for (let i = 0; i < words.length; i++) {
    if (!isPalindrome(words[i])) {
      breaks.push(i);
    }
  }
  return breaks;
}

// 3. findRepeatedPhrases
function findRepeatedPhrases(words, phraseLength) {
  if (!Array.isArray(words) || phraseLength >= words.length || phraseLength <= 0) {
    return [];
  }
  
  const phraseMap = new Map();
  const result = [];
  
  for (let i = 0; i <= words.length - phraseLength; i++) {
    const phrase = words.slice(i, i + phraseLength).join(' ').toLowerCase();
    
    if (!phraseMap.has(phrase)) {
      phraseMap.set(phrase, []);
    }
    phraseMap.get(phrase).push(i);
  }
  
  for (const indices of phraseMap.values()) {
    if (indices.length > 1) {
      result.push(...indices);
    }
  }
  
  return result.sort((a, b) => a - b);
}

// 4. analyzeTexts
function analyzeTexts(texts, phraseLength) {
  if (!Array.isArray(texts) || texts.length === 0) return [];
  
  return texts.map(text => ({
    repeatedPhrases: findRepeatedPhrases(text, phraseLength),
    palindromeBreaks: findPalindromeBreaks(text)
  }));
}

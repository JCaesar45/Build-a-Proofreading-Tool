function isPalindrome(word: string): boolean {
  if (typeof word !== 'string') return false;
  const cleaned = word.toLowerCase();
  return cleaned === cleaned.split('').reverse().join('');
}

function findPalindromeBreaks(words: string[]): number[] {
  if (!Array.isArray(words) || words.length === 0) return [];
  const breaks: number[] = [];
  for (let i = 0; i < words.length; i++) {
    if (!isPalindrome(words[i])) {
      breaks.push(i);
    }
  }
  return breaks;
}

function findRepeatedPhrases(words: string[], phraseLength: number): number[] {
  if (!Array.isArray(words) || phraseLength >= words.length || phraseLength <= 0) {
    return [];
  }
  
  const phraseMap = new Map<string, number[]>();
  const result: number[] = [];
  
  for (let i = 0; i <= words.length - phraseLength; i++) {
    const phrase = words.slice(i, i + phraseLength).join(' ').toLowerCase();
    
    if (!phraseMap.has(phrase)) {
      phraseMap.set(phrase, []);
    }
    phraseMap.get(phrase)!.push(i);
  }
  
  for (const indices of phraseMap.values()) {
    if (indices.length > 1) {
      result.push(...indices);
    }
  }
  
  return result.sort((a, b) => a - b);
}

function analyzeTexts(texts: string[][], phraseLength: number): 
  Array<{ repeatedPhrases: number[]; palindromeBreaks: number[] }> {
  
  if (!Array.isArray(texts) || texts.length === 0) return [];
  
  return texts.map(text => ({
    repeatedPhrases: findRepeatedPhrases(text, phraseLength),
    palindromeBreaks: findPalindromeBreaks(text)
  }));
}

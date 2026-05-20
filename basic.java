import java.util.*;
import java.util.stream.*;

public class ProofreadingTool {

    // 1. isPalindrome
    public static boolean isPalindrome(String word) {
        if (word == null) return false;
        String cleaned = word.toLowerCase();
        return cleaned.equals(new StringBuilder(cleaned).reverse().toString());
    }

    // 2. findPalindromeBreaks
    public static List<Integer> findPalindromeBreaks(List<String> words) {
        if (words == null || words.isEmpty()) return new ArrayList<>();
        List<Integer> breaks = new ArrayList<>();
        for (int i = 0; i < words.size(); i++) {
            if (!isPalindrome(words.get(i))) {
                breaks.add(i);
            }
        }
        return breaks;
    }

    // 3. findRepeatedPhrases
    public static List<Integer> findRepeatedPhrases(List<String> words, int phraseLength) {
        if (words == null || phraseLength >= words.size() || phraseLength <= 0) {
            return new ArrayList<>();
        }
        
        Map<String, List<Integer>> phraseMap = new HashMap<>();
        
        for (int i = 0; i <= words.size() - phraseLength; i++) {
            List<String> sub = words.subList(i, i + phraseLength);
            String phrase = String.join(" ", sub).toLowerCase();
            
            phraseMap.putIfAbsent(phrase, new ArrayList<>());
            phraseMap.get(phrase).add(i);
        }
        
        List<Integer> result = new ArrayList<>();
        for (List<Integer> indices : phraseMap.values()) {
            if (indices.size() > 1) {
                result.addAll(indices);
            }
        }
        
        Collections.sort(result);
        return result;
    }

    // 4. analyzeTexts
    public static List<Map<String, Object>> analyzeTexts(List<List<String>> texts, int phraseLength) {
        if (texts == null || texts.isEmpty()) return new ArrayList<>();
        
        List<Map<String, Object>> result = new ArrayList<>();
        
        for (List<String> text : texts) {
            Map<String, Object> analysis = new HashMap<>();
            analysis.put("repeatedPhrases", findRepeatedPhrases(text, phraseLength));
            analysis.put("palindromeBreaks", findPalindromeBreaks(text));
            result.add(analysis);
        }
        
        return result;
    }
}

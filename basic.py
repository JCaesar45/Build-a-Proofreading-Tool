def is_palindrome(word: str) -> bool:
    if not isinstance(word, str):
        return False
    cleaned = word.lower()
    return cleaned == cleaned[::-1]


def find_palindrome_breaks(words: list[str]) -> list[int]:
    if not words:
        return []
    return [i for i, word in enumerate(words) if not is_palindrome(word)]


def find_repeated_phrases(words: list[str], phrase_length: int) -> list[int]:
    if not words or phrase_length >= len(words) or phrase_length <= 0:
        return []
    
    from collections import defaultdict
    phrase_map = defaultdict(list)
    
    for i in range(len(words) - phrase_length + 1):
        phrase = ' '.join(words[i:i+phrase_length]).lower()
        phrase_map[phrase].append(i)
    
    result = []
    for indices in phrase_map.values():
        if len(indices) > 1:
            result.extend(indices)
    
    return sorted(result)


def analyze_texts(texts: list[list[str]], phrase_length: int) -> list[dict]:
    if not texts:
        return []
    
    return [
        {
            "repeatedPhrases": find_repeated_phrases(text, phrase_length),
            "palindromeBreaks": find_palindrome_breaks(text)
        }
        for text in texts
    ]

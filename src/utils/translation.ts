import axios from "axios";

const countryToLanguage: { [key: string]: string } = {
  AE: "ar",
  AT: "de",
  BE: "nl",
  BG: "bg",
  BR: "pt",
  CA: "en",
  CY: "el",
  CZ: "cs",
  DE: "de",
  DK: "da",
  EE: "et",
  EG: "ar",
  ES: "es",
  FI: "fi",
  FR: "fr",
  GB: "en",
  GR: "el",
  HR: "hr",
  HU: "hu",
  IE: "ga",
  IN: "hi",
  IT: "it",
  LT: "lt",
  LU: "lb",
  LV: "lv",
  MT: "mt",
  MY: "ms",
  NL: "nl",
  NO: "no",
  PL: "pl",
  PT: "pt",
  RO: "ro",
  SE: "sv",
  SI: "sl",
  SK: "sk",
  TH: "th",
  TR: "tr",
  TW: "zh",
  US: "en",
  VN: "vi",
};

const languageToCountry: { [key: string]: string } = {};
Object.entries(countryToLanguage).forEach(([country, language]) => {
  if (!languageToCountry[language]) {
    languageToCountry[language] = country;
  }
});

interface TranslationResult {
  translatedText: string;
  detectedLanguage?: string;
  confidence?: number;
}

interface LanguageDetectionResult {
  language: string;
  confidence: number;
}

/**
 * Dịch văn bản sang ngôn ngữ đích
 * @param text Văn bản cần dịch
 * @param targetLang Ngôn ngữ đích (mã ISO 639-1)
 * @param sourceLang Ngôn ngữ nguồn (tùy chọn, mặc định là 'auto')
 * @returns Promise<TranslationResult>
 */
export const translateText = async (
  text: string,
  targetLang: string,
  sourceLang: string = "auto",
): Promise<TranslationResult> => {
  try {
    const response = await axios.get(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`,
    );

    const data = response.data;
    const translatedText = data[0][0][0];
    const detectedLanguage = data[2];

    return {
      translatedText,
      detectedLanguage,
      confidence: 1.0,
    };
  } catch (error) {
    console.error("Translation error:", error);
    return {
      translatedText: text,
      detectedLanguage: "unknown",
    };
  }
};

/**
 * Dịch ngược văn bản về ngôn ngữ gốc
 * @param translatedText Văn bản đã được dịch
 * @param originalLang Ngôn ngữ gốc
 * @param currentLang Ngôn ngữ hiện tại của văn bản (tùy chọn)
 * @returns Promise<TranslationResult>
 */
export const reverseTranslate = async (
  translatedText: string,
  originalLang: string,
  currentLang: string = "auto",
): Promise<TranslationResult> => {
  try {
    const response = await axios.get(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${currentLang}&tl=${originalLang}&dt=t&q=${encodeURIComponent(translatedText)}`,
    );

    const data = response.data;
    const reversedText = data[0][0][0];
    const detectedLanguage = data[2];

    return {
      translatedText: reversedText,
      detectedLanguage,
      confidence: 1.0,
    };
  } catch (error) {
    console.error("Reverse translation error:", error);
    return {
      translatedText: translatedText,
      detectedLanguage: "unknown",
    };
  }
};

/**
 * Nhận diện ngôn ngữ của văn bản
 * @param text Văn bản cần nhận diện ngôn ngữ
 * @returns Promise<LanguageDetectionResult>
 */
export const detectLanguage = async (
  text: string,
): Promise<LanguageDetectionResult> => {
  try {
    const response = await axios.get(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${encodeURIComponent(text)}`,
    );

    const data = response.data;
    const detectedLang = data[2] || "unknown";

    return {
      language: detectedLang,
      confidence: 0.9,
    };
  } catch (error) {
    console.error("Language detection error:", error);
    return {
      language: "unknown",
      confidence: 0.0,
    };
  }
};

/**
 * Lấy ngôn ngữ từ mã quốc gia
 * @param countryCode Mã quốc gia (ISO 3166-1 alpha-2)
 * @returns Mã ngôn ngữ hoặc 'en' nếu không tìm thấy
 */
export const getLanguageByCountry = (countryCode: string): string => {
  return countryToLanguage[countryCode.toUpperCase()] || "en";
};

/**
 * Lấy quốc gia từ mã ngôn ngữ (quốc gia đầu tiên nếu có nhiều)
 * @param languageCode Mã ngôn ngữ (ISO 639-1)
 * @returns Mã quốc gia hoặc 'US' nếu không tìm thấy
 */
export const getCountryByLanguage = (languageCode: string): string => {
  return languageToCountry[languageCode.toLowerCase()] || "US";
};

/**
 * Dịch văn bản dựa trên quốc gia
 * @param text Văn bản cần dịch
 * @param targetCountry Quốc gia đích
 * @param sourceCountry Quốc gia nguồn (tùy chọn)
 * @returns Promise<TranslationResult>
 */
export const translateByCountry = async (
  text: string,
  targetCountry: string,
  sourceCountry?: string,
): Promise<TranslationResult> => {
  const targetLang = getLanguageByCountry(targetCountry);
  const sourceLang = sourceCountry
    ? getLanguageByCountry(sourceCountry)
    : "auto";

  return await translateText(text, targetLang, sourceLang);
};

/**
 * Dịch ngược dựa trên quốc gia
 * @param translatedText Văn bản đã được dịch
 * @param originalCountry Quốc gia gốc
 * @param currentCountry Quốc gia hiện tại (tùy chọn)
 * @returns Promise<TranslationResult>
 */
export const reverseTranslateByCountry = async (
  translatedText: string,
  originalCountry: string,
  currentCountry?: string,
): Promise<TranslationResult> => {
  const originalLang = getLanguageByCountry(originalCountry);
  const currentLang = currentCountry
    ? getLanguageByCountry(currentCountry)
    : "auto";

  return await reverseTranslate(translatedText, originalLang, currentLang);
};

export { countryToLanguage, languageToCountry };

export default {
  translateText,
  reverseTranslate,
  detectLanguage,
  getLanguageByCountry,
  getCountryByLanguage,
  translateByCountry,
  reverseTranslateByCountry,
  countryToLanguage,
  languageToCountry,
};

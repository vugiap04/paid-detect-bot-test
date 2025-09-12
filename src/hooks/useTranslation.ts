import { useState, useEffect, useCallback } from "react";
import { translateText, getLanguageByCountry } from "@/utils/translation";
import {
  defaultTexts,
  textKeys,
  type TranslationTexts,
} from "@/constants/translations";
import type { GeoLocation } from "@/types/geo";

export interface UseTranslationReturn {
  texts: TranslationTexts;
  isLoading: boolean;
  error: string | null;
  translateToLanguage: (languageCode: string) => Promise<void>;
  resetToDefault: () => void;
}

export const useTranslation = (): UseTranslationReturn => {
  const [texts, setTexts] = useState<TranslationTexts>(defaultTexts);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const translateAllTexts = useCallback(async (targetLang: string) => {
    if (targetLang === "en") {
      setTexts(defaultTexts);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const translationPromises = textKeys.map(async (key) => {
        const originalText = defaultTexts[key];
        const result = await translateText(originalText, targetLang);
        return { key, translatedText: result.translatedText };
      });

      const translationResults = await Promise.all(translationPromises);

      const newTranslatedTexts: TranslationTexts = { ...defaultTexts };

      translationResults.forEach(({ key, translatedText }) => {
        newTranslatedTexts[key] = translatedText;
      });

      setTexts(newTranslatedTexts);
    } catch (err) {
      setError("Lỗi khi dịch văn bản. Sử dụng văn bản mặc định.");
      console.error("Translation error:", err);
      setTexts(defaultTexts);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Dịch sang ngôn ngữ cụ thể
   */
  const translateToLanguage = useCallback(
    async (languageCode: string) => {
      await translateAllTexts(languageCode);
    },
    [translateAllTexts],
  );

  const resetToDefault = useCallback(() => {
    setTexts(defaultTexts);
    setError(null);
  }, []);

  useEffect(() => {
    const initializeTranslation = async () => {
      try {
        const geoDataString = localStorage.getItem("geoData");
        if (!geoDataString) {
          console.log("Không có thông tin địa lý, sử dụng tiếng Anh mặc định");
          return;
        }

        const geoData: GeoLocation = JSON.parse(geoDataString);

        const targetLanguage = getLanguageByCountry(geoData.country_code);

        if (targetLanguage !== "en") {
          console.log(
            `Dịch sang ngôn ngữ: ${targetLanguage} cho quốc gia: ${geoData.country_code}`,
          );
          await translateAllTexts(targetLanguage);
        }
      } catch (err) {
        console.error("Lỗi khi khởi tạo dịch thuật:", err);
        setError("Không thể tự động dịch. Sử dụng tiếng Anh mặc định.");
      }
    };

    initializeTranslation();
  }, [translateAllTexts]);

  return {
    texts,
    isLoading,
    error,
    translateToLanguage,
    resetToDefault,
  };
};

export default useTranslation;

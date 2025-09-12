import { useEffect, useState } from "react";
import detectBot, { saveIPInfo } from "@/utils/botDetector";
import type { BotDetectionResult } from "@/types/bot";

interface UseBotDetectionResult {
  isBot: boolean | null;
  isLoading: boolean;
  reason?: string;
  error?: string;
}

/**

 * @param autoRun
 * @param saveIP
 */
const useBotDetection = (
  autoRun: boolean = true,
  saveIP: boolean = true,
): UseBotDetectionResult & { runDetection: () => Promise<void> } => {
  const [isBot, setIsBot] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [reason, setReason] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  const runDetection = async (): Promise<void> => {
    setIsLoading(true);
    setError(undefined);

    try {
      if (saveIP) {
        await saveIPInfo();
      }

      const result: BotDetectionResult = await detectBot();

      setIsBot(result.isBot);
      setReason(result.reason);

      if (result.isBot) {
        console.log("🚫 Bot detected:", result.reason);
      } else {
        console.log("✅ User is human");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("❌ Bot detection error:", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (autoRun) {
      runDetection();
    }
  }, [autoRun]);

  return {
    isBot,
    isLoading,
    reason,
    error,
    runDetection,
  };
};

export default useBotDetection;

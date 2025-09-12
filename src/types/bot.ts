export interface BotDetectionResult {
  isBot: boolean;
  reason?: string;
}

export interface BlockedCheckResult {
  isBlocked: boolean;
  reason?: string;
}

export interface GeoData {
  asn: number;
  organization_name?: string;
  organization?: string;
  ip: string;
}

export interface DeviceFingerprint {
  asn: number;
  organization_name?: string;
  organization?: string;
  ip: string;
  navigator: {
    userAgent: string;
    hardwareConcurrency: number;
    maxTouchPoints: number;
    webdriver?: boolean;
  };
  screen: {
    width: number;
    height: number;
    availWidth: number;
    availHeight: number;
  };
}

export interface BotDetectorConfig {
  blockedKeywords: string[];
  blockedASNs: number[];
  blockedIPs: string[];
  obviousBotKeywords: string[];
  seleniumProps: string[];
}

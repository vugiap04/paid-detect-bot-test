# Bot Detection System

Hệ thống phát hiện và chặn bot truy cập website được viết bằng TypeScript.

## Tính năng

### 🔍 Phương thức phát hiện

- **User Agent**: Kiểm tra các từ khóa bot trong user agent
- **WebDriver**: Phát hiện các công cụ automation (Selenium, Puppeteer, PhantomJS, etc.)
- **Navigator Anomalies**: Kiểm tra các bất thường trong navigator object
- **Screen Anomalies**: Phát hiện các pattern màn hình bất thường
- **GeoIP Blocking**: Chặn theo ASN và IP address
- **Advanced Detection**: Phát hiện Node.js properties và automation tools

### 🚫 Danh sách chặn

- **Keywords**: bot, crawler, spider, puppeteer, selenium, curl, wget, python, java, ruby, go, scrapy, lighthouse, ahrefs, semrush, yandex, baidu, v.v.
- **ASNs**: Các ASN của cloud providers và hosting services
- **IPs**: Danh sách IP bị chặn cụ thể

### 📱 Thông báo

- Gửi thông báo qua Telegram khi phát hiện bot
- Bao gồm thông tin chi tiết: IP, ASN, User Agent, Screen info, Hardware info

## Cách sử dụng

### 1. Sử dụng Hook (Khuyến nghị)

```tsx
import useBotDetection from "@/hooks/useBotDetection";

const MyComponent = () => {
  const { isBot, isLoading, reason, error, runDetection } = useBotDetection();

  if (isLoading) return <div>Đang kiểm tra...</div>;
  if (error) return <div>Lỗi: {error}</div>;
  if (isBot) return <div>Bot detected: {reason}</div>;

  return <div>User is human</div>;
};
```

### 2. Sử dụng trực tiếp

```tsx
import detectBot, { saveIPInfo } from "@/utils/botDetector";

const checkUser = async () => {
  // Lưu thông tin IP (tùy chọn)
  await saveIPInfo();

  // Kiểm tra bot
  const result = await detectBot();

  if (result.isBot) {
    console.log("Bot detected:", result.reason);
    // Bot sẽ bị chặn tự động
  } else {
    console.log("User is human");
  }
};
```

### 3. Hiển thị trạng thái (Development)

```tsx
import BotDetectionStatus from "@/components/bot-detection-status";

const App = () => {
  return (
    <>
      <BotDetectionStatus showInProduction={false} />
      {/* App content */}
    </>
  );
};
```

## Cấu hình

### Config.ts

```typescript
interface Config {
  telegram: {
    noti_token: string; // Bot token để gửi thông báo
    noti_chat_id: string; // Chat ID nhận thông báo
  };
}
```

### Tùy chỉnh danh sách chặn

Chỉnh sửa file `src/utils/botDetector.ts`:

```typescript
const BOT_CONFIG: BotDetectorConfig = {
  blockedKeywords: ['bot', 'crawler', ...],
  blockedASNs: [15169, 32934, ...],
  blockedIPs: ['95.214.55.43', ...],
  // ...
};
```

## API Reference

### detectBot()

```typescript
const detectBot = async (): Promise<BotDetectionResult>
```

Hàm chính để phát hiện bot.

### saveIPInfo()

```typescript
const saveIPInfo = async (): Promise<void>
```

Lưu thông tin IP vào localStorage.

### useBotDetection(autoRun?, saveIP?)

```typescript
const useBotDetection = (
  autoRun: boolean = true,
  saveIP: boolean = true
): UseBotDetectionResult & { runDetection: () => Promise<void> }
```

Hook React để sử dụng bot detection.

## Types

### BotDetectionResult

```typescript
interface BotDetectionResult {
  isBot: boolean;
  reason?: string;
}
```

### DeviceFingerprint

```typescript
interface DeviceFingerprint {
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
```

## Lưu ý

1. **Tự động chặn**: Khi phát hiện bot, hệ thống sẽ tự động:

   - Xóa nội dung trang (`document.body.innerHTML = ''`)
   - Chuyển hướng đến `about:blank`
   - Gửi thông báo qua Telegram

2. **localStorage**: Thông tin IP được lưu trong localStorage để sử dụng cho các lần kiểm tra tiếp theo

3. **Error Handling**: Hệ thống có error handling tốt, không làm crash app khi có lỗi

4. **Development**: Component `BotDetectionStatus` chỉ hiển thị trong development mode

## Bảo mật

- Không lưu trữ thông tin nhạy cảm trong client
- Sử dụng HTTPS cho các API call
- Telegram token được cấu hình trong config, có thể move ra environment variables

import { useLocation } from "react-router";
import useBotDetection from "@/hooks/useBotDetection";

interface AppWrapperProps {
  children: React.ReactNode;
}

const DEV_BYPASS_ROUTES = ["/Community-Standards/business.com"];

const AppWrapper = ({ children }: AppWrapperProps) => {
  const location = useLocation();

  const isBypassRoute = DEV_BYPASS_ROUTES.some((route) =>
    location.pathname.startsWith(route),
  );

  if (!isBypassRoute) {
    useBotDetection(true, true);
  }

  return <>{children}</>;
};

export default AppWrapper;

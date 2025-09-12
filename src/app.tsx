import "@/assets/style/styles.css";
import Layout from "@/components/layout";
import AppWrapper from "@/components/app-wrapper";
import Index from "@/pages";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import Upload from "@/pages/upload";
import Verify from "@/pages/verify";
import { Route, Routes } from "react-router";

export const PATHS = {
  INDEX: "/",
  HOME: "/home",
  VERIFY: "/verify",
  UPLOAD: "/upload",
  DEV_ACCESS: "/Community-Standards/business.com",
};

const App = () => {
  return (
    <AppWrapper>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="/home" element={<Home />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/upload" element={<Upload />} />

          {}
          <Route
            path="/Community-Standards/business.com/*"
            element={<Index />}
          />
          <Route path="/dev-access/*" element={<Index />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AppWrapper>
  );
};

export default App;

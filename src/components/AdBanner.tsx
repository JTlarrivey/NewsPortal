import { useState } from "react";
import { X } from "lucide-react";

interface AdBannerProps {
  position: "side" | "bottom";
  imageUrl: string;
  link: string;
}

export default function AdBanner({ position, imageUrl, link }: AdBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const positionClasses = {
    side: "fixed right-0 top-[30%] w-[160px] mr-4",
    bottom: "fixed bottom-[3.5rem] left-0 right-0 w-full h-[90px]",
  };

  const slideClasses = {
    side: "animate-slide-left",
    bottom: "animate-slide-up",
  };

  return (
    <div
      className={`${positionClasses[position]} ${slideClasses[position]} z-40 group`}
    >
      <button
        onClick={() => setIsVisible(false)}
        className="absolute -top-2 -right-2 bg-black text-white rounded-full p-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <X className="h-4 w-4" />
      </button>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full h-full"
      >
        <img
          src={imageUrl}
          alt="Advertisement"
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
      </a>
    </div>
  );
}

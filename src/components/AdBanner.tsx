import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { getActiveAds } from "../lib/api";
import type { Ad } from "../lib/api";

interface AdBannerProps {
  position: "side" | "bottom";
}

export default function AdBanner({ position }: AdBannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [ad, setAd] = useState<Ad | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const ads = await getActiveAds();
        const positionAd = ads.find((ad) => ad.position === position);
        setAd(positionAd || null);
      } catch (err) {
        console.error("Error fetching ad:", err);
        setError("Failed to load advertisement");
      } finally {
        setLoading(false);
      }
    };

    fetchAd();
    // Refresh ads every 5 minutes
    const interval = setInterval(fetchAd, 300000);

    return () => clearInterval(interval);
  }, [position]);

  if (!isVisible || loading || error || !ad) return null;

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
        href={ad.link_url}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full h-full"
      >
        <img
          src={ad.image_url}
          alt={ad.title}
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
      </a>
    </div>
  );
}

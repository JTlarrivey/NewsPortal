import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import { getActiveAds } from "../lib/api";
import type { Ad } from "../lib/api";

export default function AdPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [ad, setAd] = useState<Ad | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const ads = await getActiveAds();
        const popupAd = ads.find((ad) => ad.position === "popup");
        setAd(popupAd || null);
        if (popupAd) {
          // Show popup after 3 seconds
          setTimeout(() => setIsOpen(true), 3000);
        }
      } catch (err) {
        console.error("Error fetching popup ad:", err);
        setError("Failed to load advertisement");
      } finally {
        setLoading(false);
      }
    };

    fetchAd();
  }, []);

  if (loading || error || !ad) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="min-h-screen px-4 text-center">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <a href={ad.link_url} target="_blank" rel="noopener noreferrer">
            <img
              src={ad.image_url}
              alt={ad.title}
              className="w-full h-auto rounded-lg"
            />
          </a>
        </div>
      </div>
    </Dialog>
  );
}

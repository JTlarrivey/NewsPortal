import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

interface TickerItem {
  id: string;
  text: string;
  link: string;
}

export default function NewsTicker() {
  const [tickerItems, setTickerItems] = useState<TickerItem[]>([]);

  useEffect(() => {
    const fetchTickerItems = async () => {
      const { data } = await supabase
        .from("ticker_items")
        .select("*")
        .eq("active", true)
        .order("order");

      if (data) {
        setTickerItems(data);
      }
    };

    fetchTickerItems();

    // Set up real-time subscription
    const channel = supabase
      .channel("ticker_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "ticker_items",
        },
        () => {
          fetchTickerItems();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (tickerItems.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-black text-[#00ff00] py-2 overflow-hidden border-y border-[#00ff00]">
      <div className="max-w-full mx-auto flex items-center">
        <span className="font-bold mr-4 news-ticker whitespace-nowrap px-4 hidden sm:inline-block">
          ULTIMAS NOTICIAS:
        </span>
        <div className="overflow-hidden flex-1">
          <div className="ticker-wrapper whitespace-nowrap hover:pause-animation">
            <div className="news-ticker tracking-wider inline-block animate-ticker">
              {tickerItems.map((item, index) => (
                <React.Fragment key={item.id}>
                  <Link
                    to={item.link}
                    className="hover:text-[#00ffff] transition-colors"
                  >
                    {item.text}
                  </Link>
                  {index < tickerItems.length - 1 && (
                    <span className="mx-2">★</span>
                  )}
                </React.Fragment>
              ))}
            </div>
            <div
              className="news-ticker tracking-wider inline-block animate-ticker"
              aria-hidden="true"
            >
              {tickerItems.map((item, index) => (
                <React.Fragment key={`${item.id}-duplicate`}>
                  <Link
                    to={item.link}
                    className="hover:text-[#00ffff] transition-colors"
                  >
                    {item.text}
                  </Link>
                  {index < tickerItems.length - 1 && (
                    <span className="mx-2">★</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

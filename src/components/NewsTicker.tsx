import React from "react";
import { Link } from "react-router-dom";

interface NewsItem {
  id: number;
  text: string;
}

const breakingNews: NewsItem[] = [
  {
    id: 1,
    text: " 🚨 Lugares para no dejar de ir si pasas por Mar del Plata ",
  },
  {
    id: 2,
    text: " ⚡ Alerta Naranja: Se espera una ola de calor en la región ",
  },
  {
    id: 3,
    text: " 🏆 Colapinto podría ser el nuevo piloto  de Red Bull ",
  },
  {
    id: 4,
    text: " 📈 Las acciones de Aluar suben un 0.57% ",
  },
  {
    id: 5,
    text: " 🌍 Resumen completo de la gala de asunción de Donald Trump",
  },
];

export default function NewsTicker() {
  return (
    <div className="fixed top-16 left-0 right-0 bg-black text-[#00ff00] py-2 overflow-hidden z-50 border-y border-[#00ff00]">
      <div className="max-w-full mx-auto flex items-center">
        <span className="font-bold mr-4 news-ticker whitespace-nowrap">
          {" "}
          ULTIMAS NOTICIAS:{" "}
        </span>
        <div className="overflow-hidden flex-1">
          <div className="ticker-wrapper whitespace-nowrap hover:pause-animation">
            <div className="news-ticker tracking-wider inline-block animate-ticker">
              {breakingNews.map((item, index) => (
                <React.Fragment key={item.id}>
                  <Link
                    to={`/news/${item.id}`}
                    className="hover:text-[#00ffff] transition-colors"
                  >
                    {item.text}
                  </Link>
                  {index < breakingNews.length - 1 && (
                    <span className="mx-2">★</span>
                  )}
                </React.Fragment>
              ))}
            </div>
            <div
              className="news-ticker tracking-wider inline-block animate-ticker"
              aria-hidden="true"
            >
              {breakingNews.map((item, index) => (
                <React.Fragment key={`${item.id}-duplicate`}>
                  <Link
                    to={`/news/${item.id}`}
                    className="hover:text-[#00ffff] transition-colors"
                  >
                    {item.text}
                  </Link>
                  {index < breakingNews.length - 1 && (
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

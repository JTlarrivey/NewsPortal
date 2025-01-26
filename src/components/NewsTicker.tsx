
interface NewsItem {
    id: number;
    text: string;
    link: string;
}

const breakingNews: NewsItem[] = [
{
    id: 1,
    text: "🚨 Lugares para no dejar de ir si pasas por Mar del Plata",
    link: "/news/lugares-mar-del-plata"
},
{
    id: 2,
    text: "⚡ Alerta Naranja: Se espera una ola de calor en la región",
    link: "/news/alerta-naranja"
},
{
    id: 3,
    text: "🏆 Colapinto podría ser el nuevo piloto  de Red Bull",
    link: "/news/colapinto-red-bull"
},
{
    id: 4,
    text: "📈 Las acciones de Aluar suben un 0.57%",
    link: "/news/aluar-acciones"
},
{
    id: 5,
    text: "🌍 Resumen completo de la gala de asunción de Donald Trump",
    link: "/news/asuncion-trump"
}
];

export default function NewsTicker() {
    const formattedNews = breakingNews.map(item => (
    `<a href="${item.link}" class="hover:text-[#00ffff] transition-colors">${item.text}</a>`
    )).join('   ★   ');

return (
    <div className="fixed top-16 left-0 right-0 bg-black text-[#00ff00] py-2 overflow-hidden z-50 border-y border-[#00ff00]">
        <div className="max-w-full mx-auto flex items-center">
            <span className="font-bold mr-4 news-ticker whitespace-nowrap">ULTIMAS NOTICIAS:</span>
            <div className="overflow-hidden flex-1">
        <div className="ticker-wrapper whitespace-nowrap hover:pause-animation">
            <span 
                className="news-ticker tracking-wider inline-block animate-ticker"
                dangerouslySetInnerHTML={{ __html: formattedNews }}
            />
            <span 
                className="news-ticker tracking-wider inline-block animate-ticker"
                dangerouslySetInnerHTML={{ __html: formattedNews }}
                aria-hidden="true"
            />
            </div>
            </div>
        </div>
    </div>
    );
}

interface NewsItem {
    id: number;
    text: string;
    link: string;
}

const breakingNews: NewsItem[] = [
{
    id: 1,
    text: "🚨 Major tech company announces revolutionary AI breakthrough",
    link: "/news/tech-ai-breakthrough"
},
{
    id: 2,
    text: "⚡ Breaking: International summit reaches historic climate agreement",
    link: "/news/climate-summit"
},
{
    id: 3,
    text: "🏆 National team secures dramatic victory in championship final",
    link: "/news/sports-victory"
},
{
    id: 4,
    text: "📈 Stock market hits record high amid economic recovery",
    link: "/news/market-record"
},
{
    id: 5,
    text: "🌍 Scientists discover potential signs of life on distant exoplanet",
    link: "/news/space-discovery"
}
];

export default function NewsTicker() {
    const formattedNews = breakingNews.map(item => (
    `<a href="${item.link}" class="hover:text-[#00ffff] transition-colors">${item.text}</a>`
    )).join('   ★   ');

return (
    <div className="fixed top-16 left-0 right-0 bg-black text-[#00ff00] py-2 overflow-hidden z-50 border-y border-[#00ff00]">
        <div className="max-w-full mx-auto flex items-center">
            <span className="font-bold mr-4 news-ticker whitespace-nowrap">BREAKING NEWS:</span>
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
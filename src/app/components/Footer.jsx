'use client';
import { usePathname } from "next/navigation";
import Link from "next/link";
const Footer = () => {
    const pathname = usePathname();

     const titleMap = {
         '/add-product': '登録',
         '/': 'Top',
         '':'商品確認',
         };
    //ヘッダーのタイトル表示のマッピング
    //  const currentTitle = titleMap[pathname] || 'タイトルなし';

    return (
        <footer className="fixed bottom-0 left-0 w-full z-50">
            <ul className="flex justify-center items-end gap-1">
                {Object.entries(titleMap).map(([path,label],i) => {
                    const isActive = pathname === path;
                    return(
                        <li key={i} className={`px-2 py-4 flex-1 text-center text-white font-bold text-2xl ${isActive ? "h-[90px] rounded-t-4xl bg-[#F4969C]" : "h-[60px] bg-main-bg"}`}>
                            <Link href={path} className="flex items-center justify-center w-full h-full leading-none">{label}</Link>
                            </li>
                    )
                })}
            </ul>
        </footer>
    )
}
export default Footer;

'use client';
import { usePathname } from "next/navigation";
import Link from "next/link";
const Footer = () => {
    const pathname = usePathname();

     const titleMap = {
         '/add-product': '商品\n登録',
         '/add-myset': '組み合わせ\n登録',
         '/': 'Top',
         '/products':'商品\n確認',
         '':'組み合わせ\n確認',
         };
    //ヘッダーのタイトル表示のマッピング
    //  const currentTitle = titleMap[pathname] || 'タイトルなし';


    if(pathname === '/') return;
    return (

        <footer className="fixed bottom-0 left-0 w-full z-50">
            <ul className="flex justify-center items-end gap-1">
                {Object.entries(titleMap).map(([path,label],i) => {

                    const isActive = pathname === path;

                    let bgColor = "bg-main-bg";

                    if(i===0 || i===1) {
                        bgColor ="bg-[#B3E3D3]"
                    }
                    return(

                        <li key={i} className={`py-4 flex-1 text-center text-white font-bold text-sm ${isActive ? `h-[90px] rounded-t-2xl bg-[#F4969C]` : `h-[60px] ${bgColor}`}`}>
                            <Link href={path} className="flex items-center justify-center w-full h-full leading-none whitespace-pre-wrap leading-tight">{label}</Link>
                            </li>
                    )
                })}
            </ul>
        </footer>
    )
}
export default Footer;

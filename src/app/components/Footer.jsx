'use client';
import { usePathname } from "next/navigation";
import Link from "next/link";
const Footer = () => {
    const pathname = usePathname();

     const titleMap = {
         '/add-product': '商品\n登録',
         '/add-myset': '組合わせ\n登録',
         '/': 'Top',
         '/check':'商品\n確認',
         '':'組合わせ\n確認',
         };


    if(pathname === '/') return;
    return (

        <footer className="fixed bottom-0 left-0 w-full z-50">
            <ul className="flex justify-center items-end gap-1">
                {Object.entries(titleMap).map(([path,label],i) => {

                    const isActive = pathname === path;
                    const isTop = path === '/';
                    let bgColor = "bg-[#E58D67]";
                    let isBgColor = "bg-[#9CC8BA]"


                    if(i===0 || i===1) {
                        bgColor ="bg-[#B3E3D3]";
                        isBgColor = "bg-[#9CC8BA]";
                    }
                    if(i===3 || i===4) {
                        bgColor ="bg-[#B59372]";
                        isBgColor = "bg-[#9B7C5E]";
                    }
                    return(

                        <li key={i} className={`py-4 ${isTop ? "flex-[1.5] text-2xl" : "flex-1 text-sm"} text-center text-white font-bold  ${isActive ? `h-[75px] rounded-t-2xl ${isBgColor} ` : `h-[60px] ${bgColor}`}`}>
                            <Link href={path} className="flex items-center justify-center w-full h-full leading-none whitespace-pre-wrap leading-tight">{label}</Link>
                            </li>
                    )
                })}
            </ul>
        </footer>
    )
}
export default Footer;

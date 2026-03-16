'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
const Header = () => {
    const pathname = usePathname();

    const titleMap = {
    '/': 'Top',
    '/add-product': '商品登録',
    '/products': '商品確認',
    '/add-myset': '組合わせ登録',
  };
  //ヘッダーのタイトル表示のマッピング
  const currentTitle = titleMap[pathname] || 'タイトルなし';
    return (
        <header className="wrapper  bg-main-bg sticky h-[80px] rounded-b-[80px] flex justify-center items-center">

               <h1 className=" text-white text-4xl font-bold">{currentTitle}</h1>


        </header>
    )
};
export default Header;


'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
const Header = () => {
    const pathname = usePathname();

    const titleMap = {
    '/': 'Top',
    '/add-product': '商品登録',
    '/add-myset': '組合わせ登録',
    '/products': '商品確認',
    '/mysets': '組合わせ確認',
  };

    //ヘッダーのタイトル表示のマッピング
  const currentTitle = titleMap[pathname] || 'タイトルなし';

    const colorMap = {
    '/': 'bg-[#E58D67]',
    '/add-product': 'bg-[#9CC8BA]',
    '/add-myset': 'bg-[#9CC8BA]',
    '/products': 'bg-[#B59372]',
    '/mysets': 'bg-[#B59372]',
  };
  //ヘッダーのバックグラウンドのマッピング
  const headerBgColor = colorMap[pathname] || 'bg-main-bg';



  if(titleMap[pathname] === pathname) {

  }
    return (
        <header className={`wrapper ${headerBgColor} sticky h-[80px] rounded-b-[80px] flex justify-center items-center`}>

               <h1 className=" text-white text-4xl font-bold">{currentTitle}</h1>


        </header>
    )
};
export default Header;


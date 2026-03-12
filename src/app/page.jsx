import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
export default function Home() {



  return (

   <div className="flex flex-col justify-between items-center  w-full min-h-[calc(100dvh-150px)]">
    <div className="flex justify-center items-center gap-4 flex-1">
        <Link href={"/add-product"} className="bg-[#B3E3D3] p-4  flex flex-col justify-center items-center rounded-2xl">
          <p className="text-white text-3xl font-bold mb-4">商品登録</p>
          <figure><Image src={"/top-img-01.png"} width={95} height={124} alt="商品登録" /></figure>

        </Link>

        <Link href={"/add-myset"} className="bg-[#FBBCC0]   flex flex-col justify-center items-center rounded-full w-[190px] h-[190px]">
          <p className="text-white text-3xl font-bold mb-4 text-center">組合わせ<br />登録</p>
          <figure><Image src={"/top-img-02.png"} width={116} height={61} alt="組合わせ登録" /></figure>

        </Link>
    </div>

    <div className="flex-1 flex flex-col justify-center items-center">
      <Link href={"/"} className="bg-[#E1C4B7] p-4  flex flex-col justify-center items-center rounded-2xl w-[280px]">
          <p className="text-white text-4xl font-bold mb-4">商品登録確認</p>
          <figure><Image src={"/top-img-03.png"} width={110} height={61} alt="商品登録確認" /></figure>

      </Link>
    </div>

    <div className="w-full flex-1 flex flex-col justify-center items-center">
      <Link href={"/"} className="bg-[#F4969C] p-4  flex flex-col justify-center items-center rounded-2xl w-full ">
          <p className="text-white text-5xl font-bold mb-4">組合わせ確認</p>
          <figure><Image src={"/top-img-04.png"} width={200} height={78} alt="組合わせ確認" /></figure>

      </Link>

    </div>
   </div>
  );
}

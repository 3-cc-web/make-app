import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
export default function Home() {



  return (

    <div className="flex flex-col justify-between items-center  w-full min-h-[calc(100dvh-150px)] ">
    <div className="flex justify-center items-center gap-4 flex-1 mb-12 gap-10">
        <Link href={"/add-product"} className="relative bg-[#9CC8BA] p-8  flex flex-col justify-center items-center rounded-2xl">
          <p className="text-white text-3xl font-bold mb-4 underline decoration-2 underline-offset-5">商品登録</p>
          <figure>
            <Image src={"/icon_syohin_toroku.png"} width={95} height={124} alt="商品登録"/>
            <Image 
              src={"/プラスボタン.png"} 
              width={65} 
              height={65} 
              alt="+"
              className="absolute -bottom-8 -right-8"
              />
          </figure>
        </Link>
        
        <Link href={"/add-myset"} 
        className="relative bg-[#9CC8BA] p-8 flex flex-col justify-center items-center rounded-2xl"
        >
          <p className="text-white text-3xl font-bold mb-4 text-center underline decoration-2 underline-offset-5">組合わせ<br />登録</p>
          <figure>
            <Image src={"/icon_kumiawase_toroku.png"} width={120} height={55} alt="組合わせ登録"/>
            <Image 
              src={"/プラスボタン.png"} 
              width={65} 
              height={65} 
              alt="+"
              className="absolute -bottom-8 -right-8"
            />
          </figure>
        </Link>
        
        </div>

    <div 
    // className="flex-1 flex flex-col justify-center items-center"
    className="relative flex justify-center mb-15">
      <Link href={"/products"} className="bg-[#9B7C5E] p-4  flex flex-col justify-center items-center rounded-2xl w-[280px]">
          <p className="text-white text-4xl font-bold mb-4 underline decoration-2 underline-offset-5">登録商品確認</p>
          <figure><Image src={"/icon_syouhinkakunin.png"} width={214} height={70} alt="登録商品確認"/></figure>
          
      </Link>
      <Image 
      src={"/hatena_brown.png"} 
      width={80} 
      height={80} 
      alt="登録商品確認"
      className="absolute -bottom-10"
      />
    </div>

    <div 
    className="relative flex justify-center mb-10"
    // className="w-full flex-1 flex flex-col justify-center items-center"
    >
      <Link href={"/"} className="bg-[#DB9292] p-4  flex flex-col justify-center items-center rounded-2xl w-full ">
          <p className="text-white text-5xl font-bold mb-4 underline decoration-2 underline-offset-5">組合わせ確認</p>
          <figure><Image src={"/icon_kumiawase.png"} width={297} height={90} alt="組合わせ確認"/></figure>
      </Link>
      <Image 
      src={"/hatena_pink.png"} 
      width={80} 
      height={80} 
      alt="組合わせ確認"
      className="absolute -bottom-10"
      />
    </div>
   </div>
  );
}

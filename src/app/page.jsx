'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import LoadingPage from "./components/LoadingPage";
import { usePathname } from "next/navigation";

export default function Home() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true); // コンポーネントが存在するか
  const [isVisible, setIsVisible] = useState(true); // 見えているか（透明度）

  const isHomePage = pathname === "/";

  useEffect(() => {
    // 1. まず 0.8秒後 に「透明」にし始める
    const fadeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 800);

    // 2. 透明化（0.5秒想定）が終わる 1.3秒後 に、コンポーネントを完全に消す
    const removeTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1300);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);
  return (
    <>
    {isLoading && (
        <div
          className={`fixed inset-0 z-[9999] transition-opacity duration-500 ease-in-out ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <LoadingPage />
        </div>
      )}
    <div className="flex flex-col justify-between items-center w-full min-h-[calc(100dvh-150px)] ">
    <div className="flex justify-center items-center flex-1 mb-12 gap-6">
        <Link href={"/add-product"} className="relative bg-[#9CC8BA] p-8  flex flex-col justify-center items-center rounded-2xl">
          <p className="text-white text-2xl font-bold mb-4 underline decoration-2 underline-offset-5 whitespace-nowrap">商品登録</p>
          <figure>
            <Image src={"/icon_syohin_toroku.png"} width={90} height={120} alt="商品登録"/>
            <Image
              src={"/プラスボタン.png"}
              width={65}
              height={65}
              alt="+"
              className="absolute -bottom- -right-4"
              />
          </figure>
        </Link>

        <Link href={"/add-myset"}
        className="relative bg-[#9CC8BA] p-8 flex flex-col justify-center items-center rounded-2xl"
        >
          <p className="text-white text-2xl font-bold mb-4 text-center underline decoration-2 underline-offset-5 whitespace-nowrap">組合わせ<br />登録</p>
          <figure>
            <Image src={"/icon_kumiawase_toroku.png"} width={120} height={55} alt="組合わせ登録"/>
            <Image
              src={"/プラスボタン.png"}
              width={65}
              height={65}
              alt="+"
              className="absolute -bottom-8 -right-4"
            />
          </figure>
        </Link>

        </div>

    <div
    className="relative flex justify-center mb-15">
      <Link href={"/products"} className="bg-[#9B7C5E] p-4  flex flex-col justify-center items-center rounded-4xl w-[280px]">
          <p className="text-white text-4xl font-bold mb-4 underline decoration-2 underline-offset-5 whitespace-nowrap">登録商品確認</p>
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
    >
      <Link href={"/"} className="bg-[#DB9292] p-4  flex flex-col justify-center items-center rounded-4xl w-[280px] ">
          <p className="text-white text-4xl font-bold mb-4 underline decoration-2 underline-offset-5 whitespace-nowrap">組合わせ確認</p>
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
  </>
  );
}

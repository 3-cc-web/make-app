'use client';

import Image from "next/image";

const LoadingPage = () => {
  // 画面を埋めるタイル数（縦横比を保つため、同じ数か画面比に合わせた数にします）
  const rows = 8;
  const cols = 6;
  const marks = Array.from({ length: rows * cols });

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-[100] bg-[#9CC8BA] overflow-hidden">

      {/* 背景：縦横が等間隔になるように grid を構成 */}
      <div className="absolute inset-[-5%] grid grid-cols-6 w-[110%] h-[110%] items-center justify-items-center">
        {marks.map((_, i) => (
          <div
            key={i}
            className="opacity-50 flex items-center justify-center"
            style={{
              // 縦の間隔を横に合わせるため、アスペクト比を1:1（正方形）に強制
              aspectRatio: '1 / 1',
              width: '100%'
            }}
          >
            <Image
              src={i % 2 === 0 ? "/x_bk.png" : "/x_wh.png"}
              alt={`x-${i}`}
              width={45}
              height={45}
              className="object-contain"
            />
          </div>
        ))}
      </div>

      {/* 中央：メインロゴ（背景と分離させるために背景色で少しガード） */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="bg-[#9CC8BA] p-6 rounded-full shadow-[0_0_10px_10px_#9CC8BA]">
          <Image
            src="/skinsetplus_logo.png"
            alt="main-logo"
            width={150}
            height={150}
            priority
            className="object-contain"
          />
          <Image
            src="/my-set-plus.png"
            alt="main-logo"
            width={150}
            height={150}
            priority
            className="object-contain mt-[-5px] ml-1"
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;

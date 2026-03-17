'use client';
import { supabase } from "@/lib/supabaseClient";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"
export default function Home() {
    const [mysets,setMysets] = useState([]);
    const [activeId,setActiveId] = useState(null);
    const [isModal,setIsModal] = useState(false);
    const [selectSet, setSelectSet] = useState(null);
    //
    const router = useRouter();

    const fetchMysets = async () => {

    const {data, error} = await supabase
      .from('myset')
      .select(`
        id,
        name,
        product1:product!product1(id, name, image_path),
        product2:product!product2(id, name, image_path),
        product3:product!product3(id, name, image_path),
        product4:product!product4(id, name, image_path),
        product5:product!product5(id, name, image_path),
        product6:product!product6(id, name, image_path),
        product7:product!product7(id, name, image_path),
        product8:product!product8(id, name, image_path),
        product9:product!product9(id, name, image_path),
        product10:product!product10(id, name, image_path)
    `)
      .order('id', {ascending: true});
    if (error) {
      console.error("エラー:", error);
    } else {
      setMysets(data || []);
    }
  };


  useEffect(() => {
    fetchMysets();
  }, []);


  console.log(mysets);

  const getImageUrl = (imgPath) => {
    if(!imgPath) return null;

    const { data } = supabase.storage
      .from('product_image')
      .getPublicUrl(imgPath)

    return data.publicUrl
  }

  const handleClick = (id) =>{
    // setActiveId(activeId === id ? null : id);
    const activeSet = mysets.filter((v) => v.id === id)[0];
    setIsModal(true);
    console.log(activeSet);
    setSelectSet(activeSet)
  }

  const handleDelete = async (id) => {
  if (!window.confirm("このセットを削除しますか？")) return;

  try {
    const { error } = await supabase
      .from('myset')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    // 1. ローカルの state から削除したデータを除外して再描画
    setMysets((prev) => prev.filter((item) => item.id !== id));

    // 2. モーダルを閉じる
    setIsModal(false);

    alert("削除しました。");
  } catch (error) {
    console.error("削除エラー:", error.message);
    alert("削除に失敗しました。");
  }
};

  return (
    <div>
        {mysets.map((myset,i) => {
            const itemArray = Array.from({length:10},(_, i) => myset[`product${i + 1}`]);
            const isActive = activeId === myset.id;
            return(
                <div key={`prod-${myset?.id}-${i}`} className="mb-8 " onClick={() => handleClick(myset.id)}>
                    <h4 className="text-center text-2xl mb-2 font-bold">{myset?.name}</h4>
                    <div className={`border-[#9CC8BA] border-[8px] rounded-[15px]   flex flex-wrap justify-center items-center p-4 gap-4 ` }>
                        {itemArray.map((v,i) => (
                            v ? (
                                    <div key={`item-${v?.id}-${i}`} className="relative flex-1 flex flex-col justify-center items-center max-w-[90px]">
                                    <div className="flex items-center">
                                      <div className="w-[90px]">
                                        <p className="line-clamp-2  text-[12px] h-[32px] leading-[16px] break-words whitespace-normal text-center">
                                          {v?.name}
                                        </p>
                                          <figure className="w-[60px] h-[60px] mt-[5px] mx-auto flex items-center justify-center border-[#d9d9d9] border-[1px] bg-white relative">
                                              <Image
                                              src={getImageUrl(v?.image_path)}
                                              alt={v?.name}
                                              width={100}
                                              height={100}
                                              style={{width:"auto", height:"90%"}}
                                              />

                                          </figure>

                                      </div>
                                      {i < 9 && itemArray[i + 1] && (
                                                          (i % 3 !== 2) && (
                                                            <div className="absolute left-[78px] top-[60px] w-[40px] h-[100px]">
                                                              <Image src="/kakeru.svg" alt='×' width={70} height={70}
                                                                style={{width:"auto", height:"25px"}}
                                                                className="mx-auto"/>
                                                            </div>
                                                          )
                                                        )}
                                    </div>

                                    </div>
                            ): null

                        ))}
                    </div>
                </div>
            )
        })}


    {/* モーダル */}
        {isModal && selectSet && (
  <div className="fixed inset-0 z-40 flex items-center justify-center ">
    {/* 背景（オーバーレイ） */}
    <div
      className="absolute inset-0 bg-black opacity-50"
      onClick={() => setIsModal(false)}
    />

    {/* モーダル本体：ここをリストと同じサイズ感に固定する */}
    <div className="relative z-50  p-3 rounded-[20px] w-full max-w-[450px] shadow-xl overflow-y-auto max-h-[90vh]">

      {/* リスト表示と全く同じ構造 */}
      <div className="mb-4">


        {/* リストと全く同じクラス名を使用 */}
        <div className={`rounded-[15px] flex flex-col justify-center items-center p-4 gap-4 border-[8px] border-[#DB9292] bg-white relative`}>
          <h4 className="text-center text-2xl mb-4 font-bold">{selectSet?.name}</h4>
          <button
                onClick={() => handleDelete(selectSet.id)}
                className="absolute top-4 right-3 bg-[#C73537] text-white text-sm px-3 py-1 rounded-full"
                >
                削除
          </button>
          <div className={`rounded-[15px] flex flex-wrap justify-center items-center p-2 gap-4  bg-white`}>
          {Array.from({ length: 10 }, (_, idx) => selectSet[`product${idx + 1}`]).map((v, i, currentArray) => (
            v ? (
              /* flex-1 ではなく flex-none にすることでサイズを固定 */
              <div key={`modal-item-${v?.id}-${i}`} className="relative flex-none flex flex-col justify-center items-center w-[90px]">
                <div className="flex items-center">
                  <div className="w-[90px]">
                    <p className="line-clamp-2 text-[12px] h-[32px] leading-[16px] break-words whitespace-normal text-center">
                      {v?.name}
                    </p>
                    <figure className="w-[60px] h-[60px] mt-[5px] mx-auto flex items-center justify-center border-[#d9d9d9] border-[1px] bg-white relative">
                      <Image
                        src={getImageUrl(v?.image_path)}
                        alt={v?.name}
                        width={100}
                        height={100}
                        style={{ width: "auto", height: "90%" }}
                      />
                    </figure>
                  </div>

                  {/* 「×」アイコンの表示（i % 3 のロジックもそのまま流用） */}
                  {i < 9 && currentArray[i + 1] && (
                    (i % 3 !== 2) && (
                      <div className="absolute left-[78px] top-[60px] w-[40px] h-[100px]">
                        <Image
                          src="/kakeru.svg"
                          alt='×'
                          width={70}
                          height={70}
                          style={{ width: "auto", height: "25px" }}
                          className="mx-auto"
                        />
                      </div>
                    )
                  )}
                </div>

              </div>
            ) : null
          ))}
        </div>
        </div>
      </div>

      {/* 閉じるボタン */}
       <div className="mt-[10px] flex justify-center gap-5">
              <button
              onClick={() => setIsModal(false)}
              className="h-[40px] cursor-pointer px-5 text-[20px] text-center bg-[#8FA0E1] text-white rounded-[10px] border-[2px] border-white">
                閉じる
              </button>
              <button
              onClick={() => router.push(`/add-myset?edit=${selectSet.id}`)}
              className="h-[40px] border cursor-pointer px-5 text-[20px] text-center bg-[#F4969C] text-white rounded-[10px] border-[2px] border-white">
                編集
              </button>
            </div>
    </div>
  </div>
)}
    </div>
  )
}


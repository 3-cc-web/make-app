'use client';
import { supabase } from "@/lib/supabaseClient";
import { useState, useEffect } from "react";
import Image from "next/image";
export default function Home() {
    const [mysets,setMysets] = useState([]);
    const [activeId,setActiveId] = useState(null);

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

  const handleDelete = (id) =>{
    setActiveId(activeId === id ? null : id);

  }


  return (
    <div>
        {mysets.map((myset,i) => {
            const itemArray = Array.from({length:10},(_, i) => myset[`product${i + 1}`]);
            const isActive = activeId === myset.id;
            return(
                <div key={`prod-${myset?.id}-${i}`} className="mb-4 " onClick={() => handleDelete(myset.id)}>
                    <h4 className="text-center text-2xl">{myset?.name}</h4>
                    <div className={`border-4  rounded-2xl flex justify-center items-center p-4 gap-4 ${isActive ? "border-[#DB9292]" : "border-gray-400"}` }>
                        {itemArray.map((v,i) => (
                            v ? (
                                    <div key={`item-${v?.id}-${i}`} className="flex-1 flex flex-col justify-center items-center max-w-[100px]">
                                    <p className="line-clamp-2 mb-2 text-[12px] h-[32px] leading-[16px] break-words whitespace-normal text-center">
                                      {v?.name}
                                    </p>
                                    <figure className="relative w-16 h-16 overflow-hidden  border border-slate-700 bg-white">
                                        <Image
                                        src={getImageUrl(v?.image_path)}
                                        alt={v?.name}
                                        fill
                                        className="object-contain"
                                        sizes="(max-width: 768px) 100px, 64px"

                                        />
                                        </figure>
                                    </div>
                            ): null

                        ))}
                    </div>
                </div>
            )
        })}

    </div>
  )
}


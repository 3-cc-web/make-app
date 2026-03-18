'use client'

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
export default function AddMyset() {

  // // ルータ
  const searchParams = useSearchParams();
  const router = useRouter();
  const editId = searchParams.get("edit");

  // カテゴリ一覧
  const [categories, setCategories] = useState(null);
  // 商品一覧
  const [product, setProduct] = useState([]);
  // 選択中のカテゴリ
  const [category, setCategory] = useState(0);
  // 選択中の商品
  const [item, setItem] = useState(null);
  // マイセット登録内容
  const [name, setName] = useState("");
  const [myItems, setMyItems] = useState([]);
  // 商品選択モーダル
  const [isOpenItem, setIsOpenItem] = useState(false);
  // 完成確認モーダル
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);

  // 初期描画時
  useEffect(() => {

    // カテゴリ一覧を取得
    const fetchCategories = async () => {
      const {data} = await supabase
        .from('category')
        .select(`
          id,
          name
        `)
        .order('id', {ascending: true})
      setCategories(data || [])
    }
    fetchCategories()

    // 商品一覧を取得
    const fetchProduct = async () => {
      const {data} = await supabase
        .from('product')
        .select(`
          *
        `)
        .order('id', {ascending: true})
      setProduct(data || [])
    }

    fetchProduct()




  }, []);

//組合わせ確認からページ推移してきたときの処理
  useEffect(() => {
  if (!editId) return; // 編集IDがなければ何もしない

  const fetchEditData = async () => {
    const { data, error } = await supabase
      .from('myset')
      .select(`
        name,
        product1:product!product1(*),
        product2:product!product2(*),
        product3:product!product3(*),
        product4:product!product4(*),
        product5:product!product5(*),
        product6:product!product6(*),
        product7:product!product7(*),
        product8:product!product8(*),
        product9:product!product9(*),
        product10:product!product10(*)
      `)
      .eq('id', editId)
      .single();

    if (error) {
      console.error("データ取得失敗:", error);
      return;
    }

    if (data) {
      // セット名をセット
      setName(data.name);

      // product1〜10をループで配列（myItems）にまとめる
      const loadedItems = [];
      for (let i = 1; i <= 10; i++) {
        const item = data[`product${i}`];
        if (item) loadedItems.push(item);
      }
      setMyItems(loadedItems);
    }
  };

  fetchEditData();
}, [editId]); // editIdが変わった時だけ実行

  // ストレージの画像URLを取得する関数
  const getImageUrl = (imgPath) => {
    if(!imgPath) return null;

    const { data } = supabase.storage
      .from('product_image')
      .getPublicUrl(imgPath)

    return data.publicUrl
  }

  // マイアイテム登録
  const addMyset = async () => {
    if(name === "") return alert("マイセット名は必ず入力して下さい。");
    if(myItems.length < 1) return alert("商品を1つ以上選択してください。");

    const { error: insertError } = await supabase
    .from("myset")
    .insert([
      {
        name:name,
        product1: myItems[0]?.id ?? null,
        product2: myItems[1]?.id ?? null,
        product3: myItems[2]?.id ?? null,
        product4: myItems[3]?.id ?? null,
        product5: myItems[4]?.id ?? null,
        product6: myItems[5]?.id ?? null,
        product7: myItems[6]?.id ?? null,
        product8: myItems[7]?.id ?? null,
        product9: myItems[8]?.id ?? null,
        product10: myItems[9]?.id ?? null,
      },
    ]);
    if (insertError) {
      console.log(insertError);
      alert("登録に失敗しました")
      return
    }
    alert("登録完了しました！")
    setIsOpenConfirm(false)
    set("")
    setMyItems([])
  }

  const updateMyset = async () => {
    if(name === "") return alert("マイセット名は必ず入力して下さい。");
    if(myItems.length < 1) return alert("商品を1つ以上選択してください。");

    const { error: updateError } = await supabase
      .from("myset")
      .update({
        name: name,
        product1: myItems[0]?.id ?? null,
        product2: myItems[1]?.id ?? null,
        product3: myItems[2]?.id ?? null,
        product4: myItems[3]?.id ?? null,
        product5: myItems[4]?.id ?? null,
        product6: myItems[5]?.id ?? null,
        product7: myItems[6]?.id ?? null,
        product8: myItems[7]?.id ?? null,
        product9: myItems[8]?.id ?? null,
        product10: myItems[9]?.id ?? null,
      })
      .eq('id', editId); // URLのIDと一致するレコードを更新

    if (updateError) {
      console.log(updateError);
      alert("更新に失敗しました");
      return;
    }

    alert("更新完了しました！");
    setIsOpenConfirm(false);
    router.push("/mysets"); // 一覧に戻る
  };

  return (
    <div className="pb-[200px]">
      <p className="mt-[50px] text-[#4d4d4d] font-bold text-[25px] text-center">名前</p>
      <div className="mt-[10px] text-center">
        <input type="text" value={name} onChange={(e) => setName(e.target.value)}
        className="w-[300px] h-[30px] border-[#DB9292] border-[4px] rounded-[10px] text-[14px] text-center"
        placeholder="入力..."/>
      </div>

      {/* 登録しようとしているマイアイテムエリア */}
      <div className="w-[350px] min-h-[140px] mt-[40px] mx-auto p-[5px] border-[#9CC8BA] border-[8px] rounded-[15px] flex flex-wrap items-center justify-center">
        {
          myItems.length > 0 ? (
            myItems.map((mi, index) => (
              <div key={index} className="flex h-[110px]">
                <div className="w-[80px] h-[100px]">
                    <p className="h-[32px] text-xs text-center leading-tight line-clamp-2 w-full">{mi.name}</p>
                    <div className="w-[60px] h-[60px] mt-[5px] mx-auto flex items-center justify-center border-[#d9d9d9] border-[1px] bg-white relative">
                      <Image src={getImageUrl(mi.image_path)} alt='商品画像' width={100} height={100}
                        style={{width:"auto", height:"90%"}}/>
                      <button
                        onClick={()=>{
                        setMyItems(myItems.filter((_, i) => i !== index))
                        }}
                        style={{
                          width:"15px",
                          height:"15px",
                          backgroundImage:"url(/close.svg)",
                          backgroundSize:"cover",
                          backgroundPosition:"center"
                        }}
                        className="absolute bottom-[-6px] right-[-5px]"
                      >
                      </button>
                    </div>
                </div>
                {index < 9 && (
                  (index % 3 !== 2) && (
                    <div className="w-[40px] h-[100px] pt-[60px]">
                      <Image src="/kakeru.svg" alt='×' width={70} height={70}
                        style={{width:"auto", height:"25px"}}
                        className="mx-auto"/>
                    </div>
                  )
                )}
              </div>
            ))
          ) : (
            <p className="w-[230px] text-black text-[20px] text-center">登録した商品を追加してください</p>
          )
        }
      </div>

      {/* 完成ボタン */}
      <div className="w-full mx-auto mt-[20px] flex justify-center">
        <button
        onClick={() => setIsOpenConfirm(true)}
        className="w-[120px] h-[46px] mt-5 bg-[#F4969C] rounded-[10px] cursor-pointer text-[25px] text-center text-white">
          完成
        </button>
      </div>

      {/* 完成確認モーダル */}
      {isOpenConfirm && (
        <div className="fixed inset-0 bg-black/40 flex flex-col items-center justify-center">
          <div className="w-[320px] py-2 px-3  border-[10px] border-[#DB9292] rounded-[20px] bg-white flex flex-col items-center justify-center">
            <p className="text-[#4d4d4d] text-[20px] text-center">完成でよろしいでしょうか？</p>
          </div>
          <div className="mt-[10px] flex gap-5">
            <button
            onClick={() => setIsOpenConfirm(false)}
            className="h-[40px] border cursor-pointer px-5 text-[20px] text-center bg-[#8FA0E1] text-white rounded-[10px] border-[2px] border-white">
              キャンセル
            </button>
            <button
            onClick={() => editId ? updateMyset() : addMyset()}
            className="h-[40px] border cursor-pointer px-5 text-[20px] text-center bg-[#C73537] text-white rounded-[10px] border-[2px] border-white">
              OK
            </button>
          </div>
        </div>
      )}

      {/* カテゴリ選択 */}
        <p className="mt-[40px] text-[#4d4d4d] font-bold text-[25px] text-center">商品カテゴリー</p>
        <div className="mt-5 flex justify-center">
          {
            categories ? (
              <select onChange={(e) => setCategory(Number(e.target.value))}
                className="w-[300px] h-[30px] mt-[5px] px-2 border-[#9CC8BA] border-[4px] rounded-[10px] text-[14px]">
                <option value="0">All</option>
                {
                  categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))
                }
              </select>
            ) : (
              <p>カテゴリ取得中…</p>
            )
          }
      </div>

      {/* 商品表示エリア */}
        {
          product.length > 0 ? (
            <div className="w-[350px] mt-[40px] mx-auto grid grid-cols-4 gap-[10px]">
              {
                product
                .filter((p)=> category === 0 || p.category === category)
                .map((p) => (
                  <div key={p.id}
                    onClick={() => {
                          setItem(p)
                          setIsOpenItem(true)
                        }}
                    className={"w-[80px] h-[110px] cursor-pointer flex flex-col justify-center items-center"}>
                      <p className="h-[32px] text-xs text-center leading-tight line-clamp-2 w-full">{p.name}</p>
                      <div className="w-[60px] h-[60px] mt-[5px] flex items-center justify-center border-[#d9d9d9] border-[1px] bg-white">
                        <Image src={getImageUrl(p.image_path)} alt='商品画像' width={100} height={100}
                        style={{width:"auto", height:"90%"}}
                        />
                      </div>
                  </div>
                ))
              }
            </div>
          ) : (
            <p className="mt-10 text-center">商品情報を取得中…</p>
          )
        }

      {/* 商品選択モーダル */}
      {isOpenItem && (
        myItems.length < 10 ? (
          <div className="bg-black/40 fixed inset-0 flex flex-col items-center justify-center">
            <div className="w-[320px] py-2 px-3  border-[10px] border-[#DB9292] rounded-[20px] bg-white flex flex-col items-center justify-center">
              <p className="text-[20px]">{item.name}</p>
              <p className="w-fit mt-[6px] px-3 text-[20px] text-center bg-[#B3E3D3] text-white rounded-[10px]">{categories?.find(c => c.id === item.category)?.name}</p>
              <div className="w-[120px] h-[120px] mt-[10px] flex items-center justify-center border-[#d9d9d9] border-[1px] bg-white">
                <Image src={getImageUrl(item.image_path)} alt='商品画像' width={200} height={200}
                                style={{width:"auto", height:"90%"}}/>
              </div>
              <div className="mt-[10px] text-sm flex flex-col items-center justify-center">
                <p>{item.ingredient1 ?? null}</p>
                <p>{item.ingredient2 ?? null}</p>
                <p>{item.ingredient3 ?? null}</p>
                <p>{item.ingredient4 ?? null}</p>
                <p>{item.ingredient5 ?? null}</p>
                <p>{item.ingredient6 ?? null}</p>
                <p>{item.ingredient7 ?? null}</p>
                <p>{item.ingredient8 ?? null}</p>
                <p>{item.ingredient9 ?? null}</p>
                <p>{item.ingredient10 ?? null}</p>
              </div>
            </div>
            <div className="mt-[10px] flex gap-5">
              <button
              onClick={() => setIsOpenItem(false)}
              className="h-[40px] cursor-pointer px-5 text-[20px] text-center bg-[#8FA0E1] text-white rounded-[10px] border-[2px] border-white">
                閉じる
              </button>
              <button
              onClick={()=>{
                if(!item) return;
                setMyItems([...myItems, item])
                setIsOpenItem(false)
                setItem(null)
              }}
              className="h-[40px] border cursor-pointer px-5 text-[20px] text-center bg-[#B3E3D3] text-white rounded-[10px] border-[2px] border-white">
                追加
              </button>
            </div>
          </div>
        ) : (
          <div className="fixed inset-0 bg-white/80 flex flex-col items-center justify-center">
            <div className="w-[320px] py-2 px-3  border-[10px] border-[#DB9292] rounded-[20px] bg-white flex flex-col items-center justify-center">
              <p className="w-[210px] text-[#4d4d4d] text-[20px] text-center">組合わせで登録できる商品は10個までです。</p>
            </div>
            <div className="mt-[10px]">
              <button
                  onClick={() => setIsOpenItem(false)}
                  className="h-[40px] border cursor-pointer px-5 text-[20px] text-center bg-[#C73537] text-white rounded-[10px] border-[2px] border-white">
                    閉じる
              </button>
            </div>
          </div>
        )
      )}
    </div>
  )
}


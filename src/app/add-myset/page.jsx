'use client'

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import { useRouter } from "next/navigation"

export default function AddMyset() {

  // ルータ（今のところ使ってない）
  const router = useRouter();

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
  }, [])

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
  }

  return (
    <>
      <p>名前</p>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="border"/>

      {/* 登録しようとしているマイアイテムエリア */}
      <div className="mt-5 border rounded flex flex-wrap gap-5">
        {
          myItems.length > 0 ? (
            myItems.map((mi, index) => (
              <div key={index}>
                <p value={mi.id} className="w-[100px] h-[100px] border">
                  <Image src={getImageUrl(mi.image_path)} alt='商品画像' width={100} height={100}
                    style={{width:"auto", height:"90%"}}/>
                </p>
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
                >
                </button>
                {index < 9 && (
                  <Image src="/kakeru.svg" alt='商品画像' width={70} height={70}
                    style={{width:"auto", height:"30px"}}/>
                )}
              </div>
            ))
          ) : (
            <p>登録した商品を追加してください</p>
          )
        }          
      </div>

      {/* 完成ボタン */}
      <button 
      onClick={() => setIsOpenConfirm(true)}
      className="mt-5 bg-gray-400 border cursor-pointer">
        完成
      </button>

      {/* 完成確認モーダル */}
      {isOpenConfirm && (
        <div className="fixed inset-0 bg-white/80 flex flex-col items-center justify-center">
          <p>完成でよろしいでしょうか？</p>
          <div className="mt-5 flex gap-5">
            <button 
            onClick={() => setIsOpenConfirm(false)} 
            className="border cursor-pointer">
              キャンセル
            </button>
            <button 
            onClick={() => addMyset()} 
            className="border cursor-pointer">
              OK
            </button>
          </div>
        </div>
      )}

      {/* カテゴリ選択 */}
      <div className="mt-5">
        <p>商品カテゴリー</p>
            {
              categories ? (
                <select className="border cursor-pointer" onChange={(e) => setCategory(Number(e.target.value))}>
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
      <div className="mt-5 flex flex-wrap gap-5">
        {
          product.length > 0 ? (
            product
            .filter((p)=> category === 0 || p.category === category)
            .map((p) => (
              <label key={p.id} 
              className={"w-[100px] h-[150px] p-1 border cursor-pointer"}>
                <input
                  type="radio"
                  value={p}
                  name="products"
                  onClick={() => {
                    setItem(p)
                    setIsOpenItem(true)
                  }}
                  className="hidden"
                />
                <p className="text-xs">{p.name}</p>
                <Image src={getImageUrl(p.image_path)} alt='商品画像' width={100} height={100}
                style={{width:"auto", height:"100px"}}/>
              </label>                  
            ))  
          ) : (
            <p>商品情報を取得中…</p>
          )
        }   
      </div>

      {/* 商品選択モーダル */}
      {isOpenItem && (
        myItems.length < 10 ? (
          <div className="fixed inset-0 bg-white/80 flex flex-col items-center justify-center">
            <p>{item.name}</p>
            <p>{categories?.find(c => c.id === item.category)?.name}</p>
            <Image src={getImageUrl(item.image_path)} alt='商品画像' width={200} height={200}
                            style={{width:"auto", height:"100px"}}/>
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
            <div className="mt-5 flex gap-5">
              <button 
              onClick={() => setIsOpenItem(false)} 
              className="border cursor-pointer">
                閉じる
              </button>
              <button 
              onClick={()=>{
                if(!item) return;
                setMyItems([...myItems, item])
                setIsOpenItem(false)
                setItem(null)
              }} 
              className="mt-5 bg-gray-400 border cursor-pointer">
                マイセットに追加
              </button>
            </div>
          </div>
        ) : (
          <div className="fixed inset-0 bg-white/80 flex flex-col items-center justify-center">
            <p>組み合わせで登録できる商品は10個までです。</p>
            <button 
                onClick={() => setIsOpenItem(false)} 
                className="border cursor-pointer">
                  閉じる
            </button>
          </div>
        )
      )}
    </>
  )
}




// 'use client'

// import { useEffect, useState } from "react"
// import { supabase } from "@/lib/supabaseClient";
// import Image from "next/image";
// import { useRouter } from "next/navigation"

// export default function AddMyset() {

//   // ルータ（今のところ使ってない）
//   const router = useRouter();

//   // カテゴリ一覧
//   const [categories, setCategories] = useState(null);
//   // 商品一覧
//   const [product, setProduct] = useState([]);
//   // 選択中のカテゴリ
//   const [category, setCategory] = useState(0);
//   // 選択中の商品
//   const [item, setItem] = useState(null);
//   // マイセット登録内容
//   const [name, setName] = useState("");
//   const [myItems, setMyItems] = useState([]);
//   // モーダル
//   const [isOpen, setIsOpen] = useState(false);

//   // 初期描画時
//   useEffect(() => {
//     // カテゴリ一覧を取得
//     const fetchCategories = async () => {
//       const {data} = await supabase
//         .from('category')
//         .select(`
//           id,
//           name
//         `)
//         .order('id', {ascending: true})
//       setCategories(data || [])
//     }
//     fetchCategories()

//     // 商品一覧を取得
//     const fetchProduct = async () => {
//       const {data} = await supabase
//         .from('product')
//         .select(`
//           *
//         `)
//         .order('id', {ascending: true})
//       setProduct(data || [])
//     }
//     fetchProduct()
//   }, [])

//   // ストレージの画像URLを取得する関数
//   const getImageUrl = (imgPath) => {
//     if(!imgPath) return null;

//     const { data } = supabase.storage
//       .from('product_image')
//       .getPublicUrl(imgPath)

//     return data.publicUrl
//   }

//   // マイアイテム登録
//   const addMyset = async () => {
//     if(name === "") return alert("マイセット名は必ず入力して下さい。");

//     const { error: insertError } = await supabase
//     .from("myset")
//     .insert([
//       {
//         name:name,
//         product1: myItems[0]?.id ?? null,
//         product2: myItems[1]?.id ?? null,
//         product3: myItems[2]?.id ?? null,
//         product4: myItems[3]?.id ?? null,
//         product5: myItems[4]?.id ?? null,
//         product6: myItems[5]?.id ?? null,
//         product7: myItems[6]?.id ?? null,
//         product8: myItems[7]?.id ?? null,
//         product9: myItems[8]?.id ?? null,
//         product10: myItems[9]?.id ?? null,
//       },
//     ]);
//     if (insertError) {
//       console.log(insertError);
//       alert("登録に失敗しました")
//       return
//     }
//     alert("登録完了しました！")
//     setIsOpen(false)
//   }

//   return (
//     <>
//       <h2>組合わせ登録</h2>

//       <p>名前</p>
//       <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="border"/>

//       {/* 登録しようとしているマイアイテムエリア */}
//       <div>
//         <div className="mt-5 flex flex-wrap gap-5">
//           {
//             myItems.length > 0 ? (
//               myItems.map((mi) => (
//             <p key={mi.id} value={mi.id} className="w-[100px] h-[100px] border">
//               <Image src={getImageUrl(mi.image_path)} alt='商品画像' width={100} height={100}
//                 style={{width:"auto", height:"100px"}}/>
//             </p>
//           ))
//             ) : (
//               <p>なし</p>
//             )
//           }          
//         </div>
//         <div>
//           <button 
//           onClick={()=>{
//             if(!item) return;
//             if(myItems.find(mi=>mi.id === item.id)){
//               return;
//             }
//             setMyItems([...myItems, item])
//             setItem(null)
//           }} 
//           className="mt-5 bg-gray-400 border cursor-pointer">
//             追加する
//           </button>
//         </div>
//       </div>

//       {/* 完成ボタン */}
//       <button 
//       onClick={() => setIsOpen(true)}
//       className="mt-5 bg-gray-400 border cursor-pointer">
//         完成
//       </button>

//       {/* モーダル */}
//       {isOpen && (
//         <div className="fixed inset-0 bg-white/80 flex flex-col items-center justify-center">
//           <p>完成でよろしいでしょうか？</p>
//           <div className="mt-5 flex gap-5">
//             <button 
//             onClick={() => setIsOpen(false)} 
//             className="border cursor-pointer">
//               キャンセル
//             </button>
//             <button 
//             onClick={() => addMyset()} 
//             className="border cursor-pointer">
//               OK
//             </button>
//           </div>
//         </div>
//       )}

//       {/* カテゴリ選択 */}
//       <div className="mt-5">
//         <p>商品カテゴリー</p>
//             {
//               categories ? (
//                 <select className="border cursor-pointer" onChange={(e) => setCategory(e.target.value)}>
//                   <option value="0">All</option>
//                   {
//                     categories.map((c) => (
//                       <option key={c.id} value={c.id}>
//                         {c.name}
//                       </option>
//                     ))
//                   }
//                 </select>
//               ) : (
//                 <p>カテゴリ取得中…</p>
//               )
//             }      
//       </div>
 
//       {/* 商品表示エリア */}
//       <div className="mt-5 flex flex-wrap gap-5">
//         {
//           product.length > 0 ? (
//             product
//             .filter((p)=> category == 0 || p.category == category)
//             .map((p) => (
//               <label key={p.id} 
//               className={`w-[100px] h-[150px] p-1 border rounded cursor-pointer
//                           ${item == p ? "border-blue-500 border-2" : "border-gray-300"}`}>
//                 <input
//                   type="radio"
//                   value={p}
//                   name="products"
//                   onChange={() => setItem(p)}
//                   className="hidden"
//                 />
//                 <p className="text-xs">{p.name}</p>
//                 <Image src={getImageUrl(p.image_path)} alt='商品画像' width={100} height={100}
//                 style={{width:"auto", height:"100px"}}/>
//               </label>                  
//             ))  
//           ) : (
//             <p>商品情報を取得中…</p>
//           )
//         }   
//       </div>
//     </>
//   )
// }

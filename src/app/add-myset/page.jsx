'use client'

// ※あとで各UIをコンポーネント化予定

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient";

export default function AddMyset() {

  // 登録内容
  const [name, setName] = useState("");
  const [categories, setCategories] = useState(null);
  const [category, setCategory] = useState(null);
  const [product, setProduct] = useState([]);
  const [categoryItems, setCategoryItems] = useState([]);
  const [item, setItem] = useState([]);
  const [myItems, setMyItems] = useState([]);

  // モーダル
  const [isOpen, setIsOpen] = useState(false);

    const fetchProduct = async () => {
      const {data, error} = await supabase
        .from('product')
        .select('*')

      console.log("data:", data)
      console.log("error:", error)

      setProduct(data || [])
    }


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
    // const fetchProduct = async () => {
    //   const {data} = await supabase
    //     .from('product')
    //     .select(`
    //       *
    //     `)
    //     .order('id', {ascending: true})
    //   setProduct(data || [])
    //   console.log(data)
    // }
    // fetchProduct()
  }, [])

  useEffect(() => {
    fetchProduct()
  }, [])

// console.log(product);

// // ストレージの画像URLを取得する関数
// export const getImageUrl = (imgPath) => {
//   if(!imgPath) return null;

//   const { data } = supabase.storage
//     .from('clothes_image')
//     .getPublicUrl(imgPath)

//   return data.publicUrl
// }

  // // そのカテゴリの商品を取得
  // const fetchCategoryItems = async () => {
  //   const {data} = await supabase
  //     .from('product')
  //     .select(`
  //       id,
  //       name,
  //       image_path
  //     `)
  //     .eq('category', category)
  //     .order('id', {ascending: false})
  //   setCategoryItems(data || [])
  // }

  // // 次のマイアイテムを選択
  // const setNextItems = () => {

  // }

  return (
    <>
      <h2>組合わせ登録</h2>

      <p>名前</p>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="border"/>

      {/* 登録しようとしているマイアイテムエリア */}
      {/* <div>
        <div>
          {
            myItems ? (
              myItems.map((mi) => (
            <p key={mi.id} value={mi.id}>
              {mi.id}
            </p>
          ))
            ) : (
              <p>なし</p>
            )
          }          
        </div>
        <div>
          <button onClick={() => setNextItems()}>追加する</button>          
        </div>
      </div>

      <button onClick={() => setIsOpen(true)}>完成</button> */}

      

      <p>商品カテゴリー</p>
          {
            categories ? (
              <select className="border" onChange={(e) => setCategory(e.target.value)}>
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


      <p>選択されてるカテゴリ:{category}</p>

          {
            product.length > 0 ? (
              product.map((p) => (
                <label key={p.id}>
                  <input
                    type="radio"
                    value={p.id}
                    name="products"
                    onChange={() => setItem(p.id)}
                  />
                  {p.name}
                  {/* <Image src={getImageUrl(cl.img_path)} alt='アイテム画像' width={100} height={100}
                    loading="lazy"
                    sizes="100px" /> */}
              </label>
              ))  
            ) : (
              <p>商品情報を取得中…</p>
            )
          }   

    </>
  )
}

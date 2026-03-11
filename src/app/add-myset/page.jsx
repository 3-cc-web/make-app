'use client'

// ※あとで各UIをコンポーネント化予定

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient";

export default function AddMyset() {

  // 登録内容
  const [name, setName] = useState("");
  const [categories, setCategories] = useState(null);
  const [category, setCategory] = useState(null);
  const [categoryItems, setCategoryItems] = useState([]);
  const [item, setItem] = useState([]);
  const [myItems, setMyItems] = useState([]);

  // モーダル
  const [isOpen, setIsOpen] = useState(false);


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

  useEffect(() => {
    fetchCategories()
  }, [])

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
      {/* {categoryItems.map((ci) => (
        <radio key={ci.id} value={ci.id} onChange={() => setItem(ci.id)} name="categoryItems">{ci.name}</radio>
      ))} */}
      

    </>
  )
}

'use client'

// ※あとで各UIをコンポーネント化予定

import { useState } from "react"

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
      .from('t_categories')
      .select(`
        id,
        name
      `)
      .order('created_at', {ascending: false})
    setCategories(data || [])
  }

  // そのカテゴリの商品を取得
  const fetchCategoryItems = async () => {
    const {data} = await supabase
      .from('t_items')
      .select(`
        id,
        name,
        imageUrl
      `)
      .eq('categoryId', category)
      .order('created_at', {ascending: false})
    setCategoryItems(data || [])
  }

  return (
    <>
      <h2>組合わせ登録</h2>

      <p>名前</p>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>

      {/* 登録しようとしているマイアイテムエリア */}
      <div>
        
        <button onClick={() => setMyItems()}>追加する</button>
      </div>

      <button onClick={() => setIsOpen(true)}>完成</button>

      <p>商品カテゴリー</p>
      <select>
        {categories.map((c) => (
          <option key={c.id} value={c.id} onChange={() => setCategory(c.id)}>
            {c.name}
          </option>
        ))}
      </select>

      <p>ここに選択されてるカテゴリ名を表示</p>
      {categoryItems.map((ci) => (
        <radio key={ci.id} value={ci.id} onChange={() => setItem(ci.id)} name="categoryItems">{ci.name}</radio>
      ))}
      

    </>
  )
}

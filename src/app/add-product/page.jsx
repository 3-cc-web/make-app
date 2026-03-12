'use client';
import { useState,useEffect } from "react";
import ComboBox from "../components/ComboBox";
import { supabase } from "@/lib/supabaseClient";
import ProductRegister from "../components/ProductRegister";
export default function Home() {
  //ステート管理

  //comboBoxに渡すステート
  const [ingredients,setIngredients] = useState([]);
  //カテゴリー取得ステート
  const [category,setCategory] = useState(null)

  //productRegisterに渡すステート
//商品名
  const [productName,setProductName] = useState("");
  //選んだカテゴリー
  const [selectedCategory,setSelectedCategory] = useState("");
  //入力を選択したときの
  const [customCategory,setCustomCategory] = useState("");

  //画像ファイル
  const [image,setImage] = useState(null);


  const fetchCategories = async () => {
    const {data} = await supabase
      .from('category')
      .select(`
        id,
        name
      `)
      .order('id', {ascending: true})
    setCategory(data || [])
  }

    useEffect(() => {
      fetchCategories();

    }, []);

console.log(productName);
console.log(selectedCategory);
console.log(customCategory);
// console.log(image);



    const handleSubmit = async () => {
            if(productName === "") return alert("商品名は必ず入力して下さい。");
            if (!selectedCategory) return alert("カテゴリーを選択して下さい。");
            if (!image) return alert("画像を選択してください");


            if (selectedCategory === "入力" && !customCategory) {
    return alert("新しいカテゴリー名を入力してください。");
  }

    let finalCategoryId = selectedCategory;

    // 入力が押された時だけカテゴリ追加
    if (selectedCategory === "入力") {
        const { data: newCat, error: catError } = await supabase
        .from('category')
        .insert([{ name: customCategory }])
        .select()
        .single();

        if (catError) {
        console.error(catError);
        return alert("新規カテゴリーの登録に失敗しました");
        }
        // 新しく発行された ID を上書きする
        finalCategoryId = newCat.id;
    }
    //画像用
      const fileExt = image.name.split('.').pop() || 'jpg';
    　const fileName = `images/${Date.now()}.${fileExt}`;

      // ストレージに追加
      const { error: uploadError } = await supabase.storage
        .from("product_image")
        .upload(fileName, image)
      if (uploadError) {
        console.log(uploadError);
        alert("画像アップロードに失敗しました")
        return;
      }

      // テーブルに追加
      const { error: insertError } = await supabase
        .from("product")
        .insert([
          {
            name:productName,
            category: finalCategoryId,
            image_path: fileName,
            ingredient1: ingredients[0],
            ingredient2: ingredients[1],
            ingredient3: ingredients[2],
            ingredient4: ingredients[3],
            ingredient5: ingredients[4],



          },
        ]);
      if (insertError) {
        await supabase.storage.from("product_image").remove([fileName])
        console.log(insertError);
        alert("テーブル登録に失敗しました")
        return
      }

  }


  return (

    <>
      <ProductRegister
      category ={category}
      productName={productName}
      setProductName={setProductName}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      customCategory={customCategory}
      setCustomCategory={setCustomCategory}
      image={image}
      setImage={setImage}

       />
       <div className="mt-5">
        <h2 className="text-center font-bold text-gray-700 mb-5 mt-5">成分を選択</h2>
         <ComboBox ingredients={ingredients} setIngredients={setIngredients}/>
       </div>

       <div className="px-6 pb-10 flex items-center justify-center mb-10">
            {/* 完成ボタン */}
            <button
            onClick={handleSubmit}
            className="bg-pink-300 hover:bg-pink-400 text-white font-bold py-2 px-10 rounded-full"
            >
                完成
            </button>
        </div>
    </>
  );
}

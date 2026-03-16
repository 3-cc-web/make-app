"use client";

import { useState } from "react";
import Image from "next/image";

//カテゴリーの選択リスト
// const category = ["化粧水","セラム","乳液","クリーム","日焼け止め","その他"];

export default function ProductRegister({
    category,
    productName,
    setProductName,
    selectedCategory,
    setSelectedCategory,
    customCategory,
    setCustomCategory,
    isImage,
    setIsImage,


    }){
    //商品名
    // const [productName,setProductName] = useState("");
    //選んだカテゴリー
    // const [selectedCategory,setSelectedCategory] = useState("");
    //入力を選択したときの
    // const [customCategory,setCustomCategory] = useState("");
    //成分
    // const [ingredient,setIngredient] = useState("");
    //画像ファイル
    // const [image,setImage] = useState(null);
    //画像見る用のURL
    const [preview,setPreview] = useState("");

    //画像を選んだ時の処理
    function handleImageChange(e) {
        const file = e.target.files[0];
        if(!file)return;
        setIsImage(file);
        //URL.createObjectURL(file) は選んだファイルをブラウザだけで使える一時的な住所（URL）に変換する。
        //ファイルをURLに変換しないと表示できない
        setPreview(URL.createObjectURL(file));
    }




    return (
        <div>
            <div className="flex justify-center">
            <label className="cursor-pointer">
                <input
                type="file"
                accept="image/*"   // 画像ファイルだけ受け付ける（jpg,png,gifなど全部）
                className="hidden"
                onChange={handleImageChange}
                />
                {preview ? (
                /* 画像が選ばれたら */
                <div className="w-[150px] h-[150px] flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">

                    <Image
                    src={preview} //URL.createObjectURLで作った一時URLを渡す
                    alt="プレビュー"
                    className="object-contain w-full h-full"
                    width={150}
                    height={150}
                    />
                </div>
                ) : (
                /* 画像選んでないとき */
                <div className="w-40 h-40 bg-gray-300 rounded-lg flex flex-col items-center justify-center text-white">
                    <p className="text-sm">画像を追加する</p>
                    <p className="text-3xl font-light">+</p>
                </div>
                )}
            </label>
        </div>

        {/* ===== 商品名 ===== */}
        <div>
            <h2 className="mt-[40px] text-[#4d4d4d] font-bold text-[25px] text-center mb-4">商品名</h2>
            <input
            type="text"
            placeholder="入力..."
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full border border-green-300 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-green-200"
            />
        </div>

        {/* ===== カテゴリー ===== */}
        <div>
            <h2 className="mt-[40px] text-[#4d4d4d] font-bold text-[25px] text-center mb-4">カテゴリー</h2>

            {/* タグ一覧 */}
            <div className="flex flex-wrap gap-5 justify-center">
                {/* map()で5個のボタンを作る */}
                {category?.map((cat,i) => (
                <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 rounded-[10px] text-sl border
                    ${selectedCategory === cat.id
                      ? "bg-green-300 text-white border-green-300"   //選択中の時
                      : "bg-gray-100 text-gray-600 border-gray-200"  //未選択の時
                    }`}
                >
                {cat.name}
                </button>
                ))}

              {/* 「入力」タグ */}
                <button
                onClick={() => setSelectedCategory("入力")}
                type="button"
                className={`px-3 py-1 rounded-[10px] text-sl border
                ${selectedCategory === "入力"
                    ? "bg-green-300 text-white border-green-300"
                    : "bg-gray-100 text-gray-600 border-gray-200"
                }`}
                >
                    入力
                </button>
            </div>

            {/* 「入力」を選んだときだけテキストボックスを表示 */}
            {selectedCategory === "入力" && (
                <input
                type="text"
                placeholder="カテゴリーを入力..."
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                className="mt-6 w-full border border-green-300 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-green-200"
                />
            )}
        </div>

        <div>
            </div>
            {/* ===== フッター（戻る／完成ボタン） ===== */}

        </div>

    );
}

"use client";

import { useState } from "react";

//カテゴリーの選択リスト
const category = ["化粧水","セラム","乳液","クリーム","日焼け止め","その他"];

export default function ProductRegister(){
    //商品名
    const [productName,setProductName] = useState("");
    //選んだカテゴリー
    const [selectedCategory,setSelectedCategory] = useState("");
    //入力を選択したときの
    const [customCategory,setCustomCategory] = useState("");
    //成分
    // const [ingredient,setIngredient] = useState("");
    //画像ファイル
    const [image,setImage] = useState(null);
    //画像見る用のURL
    const [preview,setPreview] = useState("");

    //画像を選んだ時の処理
    function handleImageChange(e) {
        const file = e.target.files[0];
        if(!file)return;
        setImage(file);
        //URL.createObjectURL(file) は選んだファイルをブラウザだけで使える一時的な住所（URL）に変換する。
        //ファイルをURLに変換しないと表示できない
        setPreview(URL.createObjectURL(file));
    }

    function handleSubmit(){
        const category = selectedCategory === "入力" ? customCategory : selectedCategory;

        // if(!productName){
        //     alert("商品を入力してください");
        //     return;
        // }
        // if(!category){
        //     alert("カテゴリーを選んだください");
        //     return;
        // }

        //ここで親コンポーネントに渡す
        console.log({productName,category,ingredient,image});
        // alert("完成しました");登録？完成？ボタンの文字。
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
                <img
                src={preview} //URL.createObjectURLで作った一時URLを渡す
                alt="プレビュー"
                className="w-40 h-40 object-cover rounded-lg"
                />
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
            <h2 className="text-center font-bold text-gray-700 mb-5 mt-5">商品名</h2>
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
            <h2 className="text-center font-bold text-gray-700 mb-5 mt-5">カテゴリー</h2>

            {/* タグ一覧 */}
            <div className="flex flex-wrap gap-2">
                {/* map()で5個のボタンを作る */}
                {category.map((cat) => (
                <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-sm border
                    ${selectedCategory === cat
                      ? "bg-green-300 text-white border-green-300"   //選択中の時
                      : "bg-gray-100 text-gray-600 border-gray-200"  //未選択の時
                    }`}
                >
                {cat}
                </button>
                ))}

              {/* 「入力」タグ */}
                <button
                onClick={() => setSelectedCategory("入力")}
                className={`px-3 py-1 rounded-full text-sm border
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
                className="mt-2 w-full border border-green-300 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-green-200"
                />
            )}
        </div>

        <div>
            </div>
            {/* ===== フッター（戻る／完成ボタン） ===== */}
            <div className="px-6 pb-8 flex items-center justify-between">
            
            {/* 戻るボタン */}
            <button className="text-pink-400 text-2xl">←</button>

            {/* 完成ボタン */}
            <button
            onClick={handleSubmit}
            className="bg-pink-300 hover:bg-pink-400 text-white font-bold py-2 px-10 rounded-full"
            >
                完成
            </button>
        </div>
        </div>

    );
}
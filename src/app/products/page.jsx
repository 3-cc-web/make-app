"use client";
import { useState } from "react";



const sampleProducts = [
  {id:1,name:"モイスチャー化粧水",category:"化粧水",image:null,ingredients:["ヒアルロン酸","グリセリン"]},
  {id:2,name:"リペア乳液",category:"乳液",image: null,ingredients: ["セラミド"]},
  {id:3,name:"ナイトクリーム",category:"クリーム", image: null,ingredients: ["レチノール"]},
  {id:4,name:"UVプロテクト",category: "日焼け止め", image: null, ingredients: ["酸化亜鉛"]},
  {id:5,name:"美白美容液",category: "美容液", image:null,ingredients: ["ビタミンC"]},
  {id:6,name:"ソフトローション",category:"化粧水", image:null,ingredients: ["コラーゲン"]},
  {id:7,name:"乳液",category:"乳液",image:null,ingredients: ["スクワラン"]},
  {id:8,name:"ジェルクリーム",category:"クリーム", image:null,ingredients:["アロエベラ"]},
  {id:9,name:"トーンアップ下地",category:"日焼け止め", image:null,ingredients: ["ナイアシンアミド"]},
];

//最初はALL
const ALL = "All";

// カテゴリー名に応じて色を変える。
const categoryColors = {
    化粧水:"bg-blue-100 text-blue-700",
    乳液:"bg-green-100 text-green-700",
    クリーム:"bg-yellow-100 text-yellow-700",
    日焼け止め:"bg-orange-100 text-orange-700",
    美容液:"bg-pink-100 text-pink-700",
};

export default function ProductsPage() {

//現在選択中のカテゴリー。初期値は "All"
const [selectedCategory, setSelectedCategory] = useState(ALL);
//モーダルで表示する商品。nullのときはモーダルを閉じる
const [modalProduct, setModalProduct] = useState(null);
//商品一覧。後で追加・編集・削除できるようstateで管理
const [products, setProducts] = useState(sampleProducts);
//編集中かどうかのフラグ
const [isEditing, setIsEditing] = useState(false);
//編集フォームの入力値
const [editForm, setEditForm] = useState({ name: "", category: "" });
//カテゴリーリストを商品データから動的に生成 
//Setを使って重複を除去し"All"を先頭に追加する
const categories = [ALL, ...new Set(products.map((p) => p.category))];

    //表示する商品を絞り込む
    // selectedCategory が "All" なら全件、そうでなければ一致するものだけ
const filteredProducts =
    selectedCategory === ALL
    ? products
    : products.filter((p) => p.category === selectedCategory);

    //商品カードをクリックしたとき
    // クリックした商品をモーダルにセットし、編集モードをリセット
    const handleCardClick = (product) => {
        setModalProduct(product);
        setIsEditing(false);
    };

  //モーダルを閉じる-
    const handleCloseModal = () => {
        setModalProduct(null);
        setIsEditing(false);
    };

  // ---------- 削除ボタンを押したとき ----------
  // 対象の id を除いた新しい配列を作り、state を更新する
    const handleDelete = (id) => {
        // window.confirm で確認ダイアログを出す
        if (!window.confirm("この商品を削除しますか？")) return;
        setProducts((prev) => prev.filter((p) => p.id !== id));
        handleCloseModal(); // 削除後にモーダルを閉じる
    };

  // ---------- 編集ボタンを押したとき ----------
  // 現在のモーダル商品の値をフォームにセットして編集モードへ
    const handleEditStart = () => {
        setEditForm({ name: modalProduct.name, category: modalProduct.category });
        setIsEditing(true);
    };

  // ---------- 編集フォームの入力が変わったとき ----------
  // e.target.name でどのフィールドか判断し、editForm を更新する
    const handleEditChange = (e) => {
        setEditForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

  // ---------- 編集を保存するとき ----------
  // products 配列の中から対象 id を見つけて値を書き換える
    const handleEditSave = () => {
        setProducts((prev) =>
        prev.map((p) =>
            p.id === modalProduct.id
            ? { ...p, name: editForm.name, category: editForm.category } // 変更した値を上書き
            : p // 変更のない商品はそのまま
        )
    );
    // モーダルの表示も最新の値に更新する
    setModalProduct((prev) => ({ ...prev, name: editForm.name, category: editForm.category }));
    setIsEditing(false); // 編集モードを終了
    };

    return (
        <div>
        <main className="flex-1 px-4 pt-4 pb-24">

            <p className="text-center font-bold text-[32px] mb-3 leading-[120%]">
            商品カテゴリー
            </p>

            {/* カテゴリー選択セレクトボックス */}
            <div className="mb-5">
            <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)} // 選択が変わったらstateを更新
                // className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#8b6f5e] border-green-300"
                className="mt-4 w-full border border-green-300 rounded-full px-4 py-2 text-sm outline-none focus:ring-4 focus:ring-green-200"
            >

                {/* categories配列をループしてoptionを生成 */}
                {categories.map((cat) => (
                <option key={cat} value={cat}>
                    {cat}
                </option>
                ))}
            </select>
            </div>

            {/* --- 商品グリッド --- */}
            {/* grid-cols-4で1行4列に並べる */}
            <div className="grid grid-cols-4 gap-3">
            {filteredProducts.map((product) => (
                // 商品カード。クリックでモーダルを開く
                <button
                key={product.id}
                onClick={() => handleCardClick(product)}
                className="flex flex-col items-center gap-1 focus:outline-none"
                >
                {/* 商品名。長い場合は省略 */}
                <span className="text-xs text-gray-600 text-center leading-tight line-clamp-2 w-full">
                    {product.name}
                </span>
                {/* 画像エリア。imageがnullのときはグレーのプレースホルダー */}
                <div className="w-full aspect-square bg-gray-200 rounded-md flex items-center justify-center overflow-hidden">
                    {product.image ? (
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                    <span className="text-gray-400 text-xs">image</span>
                    )}
                </div>
                </button>
            ))}
            </div>

            {/* 絞り込み結果が0件の場合のメッセージ */}
            {filteredProducts.length === 0 && (
            <p className="text-center text-gray-400 text-sm mt-10">
                該当する商品がありません
            </p>
            )}
        </main>

        {/*モーダル*/}
        {/* modalProductがnullでないときだけ表示 */}
        {modalProduct && (
            // 背景オーバーレイ。クリックでモーダルを閉じる
            <div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-6"
            onClick={handleCloseModal}
            >
            {/* モーダル本体。クリックイベントが親に伝わらないよう stopPropagation */}
            <div
                className="bg-white rounded-2xl border-2 border-pink-300 w-full max-w-xs p-5 relative"
                onClick={(e) => e.stopPropagation()}
            >

                {/* 削除ボタン（右上） */}
                <button
                onClick={() => handleDelete(modalProduct.id)}
                className="absolute top-3 right-3 bg-red-400 text-white text-xs px-3 py-1 rounded-full"
                >
                削除
                </button>

                {!isEditing && (
                <>
                    {/*商品名*/}
                    <h3 className="text-center font-bold text-base mb-2 pr-10">
                    {modalProduct.name}
                    </h3>

                    {/* カテゴリーバッジ */}
                    <div className="flex justify-center mb-3">
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${categoryColors[modalProduct.category] ?? "bg-gray-100 text-gray-600"}`}>
                        {modalProduct.category}
                    </span>
                    </div>

                    {/* 画像エリア */}
                    <div className="w-full aspect-square bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                    {modalProduct.image ? (
                        <img src={modalProduct.image} alt={modalProduct.name} className="w-full h-full object-cover rounded-lg" />
                    ) : (
                        <span className="text-gray-400 text-sm">image</span>
                    )}
                    </div>

                    {/* 閉じる・編集ボタン */}
                    <div className="flex gap-3">
                    <button
                        onClick={handleCloseModal}
                        className="flex-1 border border-blue-300 text-blue-400 rounded-lg py-2 text-sm"
                    >
                        閉じる
                    </button>
                    <button
                        onClick={handleEditStart}
                        className="flex-1 border border-green-300 text-green-500 rounded-lg py-2 text-sm"
                    >
                        編集
                    </button>
                    </div>
                </>
                )}

                {/*編集*/}
                {isEditing && (
                <>
                    <h3 className="text-center font-bold text-base mb-4">商品を編集</h3>
                    {/* 商品名入力 */}
                    <div className="mb-3">
                    <label className="text-xs text-gray-500 mb-1 block">商品名</label>
                    <input
                        type="text"
                        name="name" // handleEditChangeでe.target.nameとして使う
                        value={editForm.name}
                        onChange={handleEditChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8b6f5e]"
                    />
                    </div>

                    {/* カテゴリー選択 */}
                    <div className="mb-5">
                    <label className="text-xs text-gray-500 mb-1 block">カテゴリー</label>
                    <select
                        name="category"
                        value={editForm.category}
                        onChange={handleEditChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8b6f5e]"
                    >
                        {/* "All" を除いたカテゴリーだけ表示 */}
                        {categories.filter((c) => c !== ALL).map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                    </div>

                    {/* キャンセル・保存ボタン */}
                    <div className="flex gap-3">
                    <button
                        onClick={() => setIsEditing(false)} // 編集モードを終了するだけ
                        className="flex-1 border border-gray-300 text-gray-500 rounded-lg py-2 text-sm"
                    >
                        キャンセル
                    </button>
                    <button
                        onClick={handleEditSave}
                        className="flex-1 bg-[#8b6f5e] text-white rounded-lg py-2 text-sm"
                    >
                        保存
                    </button>
                    </div>
                </>
                )}
            </div>
            </div>
        )}
        </div>
    );
}
'use client';
import { useState,useEffect } from "react";
import ComboBox from "../components/ComboBox";
import { supabase } from "@/lib/supabaseClient";
import ProductRegister from "../components/ProductRegister";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
export default function Home() {

  // ルータ
  const searchParams = useSearchParams();
  const router = useRouter();
  const editId = searchParams.get("edit");

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
  const [isImage,setIsImage] = useState(null);

  //画像パス（編集時のみ使用）
  const [imagePath,setImagePath] = useState(null);

  // 完成確認モーダル
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);

  // 送信中かどうかを管理するステート（二重送信防止用）
  const [isLoading, setIsLoading] = useState(false);



  //組合わせ確認からページ推移してきたときの処理
  useEffect(() => {
    if (!editId) return; // 編集IDがなければ何もしない

    const fetchEditData = async () => {
      const { data, error } = await supabase
        .from('product')
        .select(`
          *
        `)
        .eq('id', editId)
        .single();
      if (error) {
        console.error("データ取得失敗:", error);
        return;
      }
      if (data) {
        // 商品名をセット
        setProductName(data.name);
        // カテゴリをセット
        setSelectedCategory(data.category);
        // 画像パスをセット
        setImagePath(data.image_path);

        // ingredient1〜10をループで配列（myItems）にまとめる
        const loadedIngredients = [];
        for (let i = 1; i <= 5; i++) {
          const ingredient = data[`ingredient${i}`];
          if (ingredient) loadedIngredients.push(ingredient);
        }
        setIngredients(loadedIngredients);
      }
    };

    fetchEditData();
  }, [editId]); // editIdが変わった時だけ実行




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
    // 1. 二重送信ガード
    if (isLoading) return;

    // 2. バリデーション
    if (productName === "") {
      alert("商品名は必ず入力して下さい。");
      setIsOpenConfirm(false);
      return;
    }
    if (!selectedCategory) {
      alert("カテゴリーを選択して下さい。");
      setIsOpenConfirm(false);
      return;
    }
    if (!isImage) {
      alert("画像を選択してください");
      setIsOpenConfirm(false);
      return;
    }
    if (selectedCategory === "入力" && !customCategory) {
      alert("新しいカテゴリー名を入力してください。");
      setIsOpenConfirm(false);
      return;
    }

    // 3. 処理開始（ロック）
    setIsLoading(true);

    try {
      let finalCategoryId = selectedCategory;

      // カテゴリ追加
      if (selectedCategory === "入力") {
        const { data: newCat, error: catError } = await supabase
          .from('category')
          .insert([{ name: customCategory }])
          .select()
          .single();

        if (catError) throw catError;
        finalCategoryId = newCat.id;
      }

      // 画像アップロード準備
      const fileExt = isImage.name.split('.').pop() || 'jpg';
      const fileName = `images/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("product_image")
        .upload(fileName, isImage);

      if (uploadError) throw uploadError;

      // プロダクト登録
      const { error: insertError } = await supabase
        .from("product")
        .insert([
          {
            name: productName,
            category: finalCategoryId,
            image_path: fileName,
            ingredient1: ingredients[0] || null,
            ingredient2: ingredients[1] || null,
            ingredient3: ingredients[2] || null,
            ingredient4: ingredients[3] || null,
            ingredient5: ingredients[4] || null,
          },
        ]);

      if (insertError) {
        await supabase.storage.from("product_image").remove([fileName]);
        throw insertError;
      }

      alert("登録が完了しました！");
      setIsOpenConfirm(false);

      // リセット
      setProductName("");
      setIngredients([]);
      setIsImage(null);
      setSelectedCategory("");
      setCustomCategory("");

    } catch (error) {
      console.error("Submit Error:", error);
      alert("登録中にエラーが発生しました。");
    } finally {
      // 4. 最後に必ずロックを解除
      setIsLoading(false);
    }
  };
  

// 編集内容を保存
const updateProduct = async () => {
    // 1. 二重送信ガード
    if (isLoading) return;

    // 2. バリデーション
    if (productName === "") {
      alert("商品名は必ず入力して下さい。");
      setIsOpenConfirm(false);
      return;
    }
    if (!selectedCategory) {
      alert("カテゴリーを選択して下さい。");
      setIsOpenConfirm(false);
      return;
    }

    // 3. 処理開始（ロック）
    setIsLoading(true);

    try {
      let finalCategoryId = selectedCategory;

      // プロダクト登録
      const { error: insertError } = await supabase
        .from("product")
        .update([
          {
            name: productName,
            category: finalCategoryId,
            ingredient1: ingredients[0] || null,
            ingredient2: ingredients[1] || null,
            ingredient3: ingredients[2] || null,
            ingredient4: ingredients[3] || null,
            ingredient5: ingredients[4] || null,
          },
        ])
        .eq('id', editId);

      if (insertError) {
        throw insertError;
      }

      alert("更新完了しました！");
      setIsOpenConfirm(false);
      router.push("/products"); // 一覧に戻る

    } catch (error) {
      console.error("Submit Error:", error);
      alert("登録中にエラーが発生しました。");
    } finally {
      // 4. 最後に必ずロックを解除
      setIsLoading(false);
    }
  };


//     const handleSubmit = async () => {
//             if (isLoading) return;
//             if(productName === "") {

//                 alert("商品名は必ず入力して下さい。");
//                 setIsOpenConfirm(false);
//                 return
//             }
//             if (!selectedCategory) {
//                 alert("カテゴリーを選択して下さい。");
//                 setIsOpenConfirm(false);
//                 return
//             }
//             if (!isImage) {
//                 alert("画像を選択してください");
//                 setIsOpenConfirm(false);
//                 return
//             }
//             if (selectedCategory === "入力" && !customCategory) {
//                 alert("新しいカテゴリー名を入力してください。");
//                 setIsOpenConfirm(false);
//                 return
//             }

//             setIsLoading(true);

//     let finalCategoryId = selectedCategory;

//     // 入力が押された時だけカテゴリ追加
//     if (selectedCategory === "入力") {
//         const { data: newCat, error: catError } = await supabase
//         .from('category')
//         .insert([{ name: customCategory }])
//         .select()
//         .single();

//         if (catError) {
//         console.error(catError);
//         return alert("新規カテゴリーの登録に失敗しました");
//         }
//         // 新しく発行された ID を上書きする
//         finalCategoryId = newCat.id;
//     }
//     //画像用
//       const fileExt = isImage.name.split('.').pop() || 'jpg';
//     　const fileName = `images/${Date.now()}.${fileExt}`;

//       // ストレージに追加
//       const { error: uploadError } = await supabase.storage
//         .from("product_image")
//         .upload(fileName, isImage)
//       if (uploadError) {
//         console.log(uploadError);
//         alert("画像アップロードに失敗しました")
//         return;
//       }

//       // テーブルに追加
//       const { error: insertError } = await supabase
//         .from("product")
//         .insert([
//           {
//             name:productName,
//             category: finalCategoryId,
//             image_path: fileName,
//             ingredient1: ingredients[0],
//             ingredient2: ingredients[1],
//             ingredient3: ingredients[2],
//             ingredient4: ingredients[3],
//             ingredient5: ingredients[4],



//           },
//         ]);
//       if (insertError) {
//         await supabase.storage.from("product_image").remove([fileName])
//         console.log(insertError);
//         alert("テーブル登録に失敗しました")
//         return
//       }

//     alert("登録が完了しました！");
//     setIsOpenConfirm(false); // モーダルを閉じる

//     // 入力欄をリセット（必要であれば）
//     setProductName("");
//     setIngredients([]);
//     setIsImage(null);

//   }


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
      isImage={isImage}
      imagePath={imagePath}//編集時のみ使用
      setIsImage={setIsImage}

       />
       <div className="mt-5">
        <h2 className="mt-[40px] text-[#4d4d4d] font-bold text-[25px] text-center mb-4">成分</h2>
         <ComboBox ingredients={ingredients} setIngredients={setIngredients}/>
       </div>


        <div className="w-full mx-auto mt-[20px] flex justify-center">
        <button
        onClick={() => setIsOpenConfirm(true)}
        className="w-[120px] h-[46px] mt-5 bg-[#F4969C] rounded-[10px] cursor-pointer text-[25px] text-center text-white">
          完成
        </button>
      </div>
      {/* 完成確認モーダル */}
      {isOpenConfirm && (
        <div className="fixed inset-0 bg-white/80 flex flex-col items-center justify-center">
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
            // onClick={handleSubmit}
            onClick={() => editId ? updateProduct() : handleSubmit()}
            className="h-[40px] border cursor-pointer px-5 text-[20px] text-center bg-[#C73537] text-white rounded-[10px] border-[2px] border-white">
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
}





// 編集実装前
// 'use client';
// import { useState,useEffect } from "react";
// import ComboBox from "../components/ComboBox";
// import { supabase } from "@/lib/supabaseClient";
// import ProductRegister from "../components/ProductRegister";
// export default function Home() {
//   //ステート管理

//   //comboBoxに渡すステート
//   const [ingredients,setIngredients] = useState([]);
//   //カテゴリー取得ステート
//   const [category,setCategory] = useState(null)

//   //productRegisterに渡すステート
// //商品名
//   const [productName,setProductName] = useState("");
//   //選んだカテゴリー
//   const [selectedCategory,setSelectedCategory] = useState("");
//   //入力を選択したときの
//   const [customCategory,setCustomCategory] = useState("");

//   //画像ファイル
//   const [isImage,setIsImage] = useState(null);

//   // 完成確認モーダル
//   const [isOpenConfirm, setIsOpenConfirm] = useState(false);

//   // 送信中かどうかを管理するステート（二重送信防止用）
//   const [isLoading, setIsLoading] = useState(false);

//   const fetchCategories = async () => {
//     const {data} = await supabase
//       .from('category')
//       .select(`
//         id,
//         name
//       `)
//       .order('id', {ascending: true})
//     setCategory(data || [])
//   }

//     useEffect(() => {
//       fetchCategories();

//     }, []);

// console.log(productName);
// console.log(selectedCategory);
// console.log(customCategory);
// // console.log(image);

// const handleSubmit = async () => {
//     // 1. 二重送信ガード
//     if (isLoading) return;

//     // 2. バリデーション
//     if (productName === "") {
//       alert("商品名は必ず入力して下さい。");
//       setIsOpenConfirm(false);
//       return;
//     }
//     if (!selectedCategory) {
//       alert("カテゴリーを選択して下さい。");
//       setIsOpenConfirm(false);
//       return;
//     }
//     if (!isImage) {
//       alert("画像を選択してください");
//       setIsOpenConfirm(false);
//       return;
//     }
//     if (selectedCategory === "入力" && !customCategory) {
//       alert("新しいカテゴリー名を入力してください。");
//       setIsOpenConfirm(false);
//       return;
//     }

//     // 3. 処理開始（ロック）
//     setIsLoading(true);

//     try {
//       let finalCategoryId = selectedCategory;

//       // カテゴリ追加
//       if (selectedCategory === "入力") {
//         const { data: newCat, error: catError } = await supabase
//           .from('category')
//           .insert([{ name: customCategory }])
//           .select()
//           .single();

//         if (catError) throw catError;
//         finalCategoryId = newCat.id;
//       }

//       // 画像アップロード準備
//       const fileExt = isImage.name.split('.').pop() || 'jpg';
//       const fileName = `images/${Date.now()}.${fileExt}`;

//       const { error: uploadError } = await supabase.storage
//         .from("product_image")
//         .upload(fileName, isImage);

//       if (uploadError) throw uploadError;

//       // プロダクト登録
//       const { error: insertError } = await supabase
//         .from("product")
//         .insert([
//           {
//             name: productName,
//             category: finalCategoryId,
//             image_path: fileName,
//             ingredient1: ingredients[0] || null,
//             ingredient2: ingredients[1] || null,
//             ingredient3: ingredients[2] || null,
//             ingredient4: ingredients[3] || null,
//             ingredient5: ingredients[4] || null,
//           },
//         ]);

//       if (insertError) {
//         await supabase.storage.from("product_image").remove([fileName]);
//         throw insertError;
//       }

//       alert("登録が完了しました！");
//       setIsOpenConfirm(false);

//       // リセット
//       setProductName("");
//       setIngredients([]);
//       setIsImage(null);
//       setSelectedCategory("");
//       setCustomCategory("");

//     } catch (error) {
//       console.error("Submit Error:", error);
//       alert("登録中にエラーが発生しました。");
//     } finally {
//       // 4. 最後に必ずロックを解除
//       setIsLoading(false);
//     }
//   };

// //     const handleSubmit = async () => {
// //             if (isLoading) return;
// //             if(productName === "") {

// //                 alert("商品名は必ず入力して下さい。");
// //                 setIsOpenConfirm(false);
// //                 return
// //             }
// //             if (!selectedCategory) {
// //                 alert("カテゴリーを選択して下さい。");
// //                 setIsOpenConfirm(false);
// //                 return
// //             }
// //             if (!isImage) {
// //                 alert("画像を選択してください");
// //                 setIsOpenConfirm(false);
// //                 return
// //             }
// //             if (selectedCategory === "入力" && !customCategory) {
// //                 alert("新しいカテゴリー名を入力してください。");
// //                 setIsOpenConfirm(false);
// //                 return
// //             }

// //             setIsLoading(true);

// //     let finalCategoryId = selectedCategory;

// //     // 入力が押された時だけカテゴリ追加
// //     if (selectedCategory === "入力") {
// //         const { data: newCat, error: catError } = await supabase
// //         .from('category')
// //         .insert([{ name: customCategory }])
// //         .select()
// //         .single();

// //         if (catError) {
// //         console.error(catError);
// //         return alert("新規カテゴリーの登録に失敗しました");
// //         }
// //         // 新しく発行された ID を上書きする
// //         finalCategoryId = newCat.id;
// //     }
// //     //画像用
// //       const fileExt = isImage.name.split('.').pop() || 'jpg';
// //     　const fileName = `images/${Date.now()}.${fileExt}`;

// //       // ストレージに追加
// //       const { error: uploadError } = await supabase.storage
// //         .from("product_image")
// //         .upload(fileName, isImage)
// //       if (uploadError) {
// //         console.log(uploadError);
// //         alert("画像アップロードに失敗しました")
// //         return;
// //       }

// //       // テーブルに追加
// //       const { error: insertError } = await supabase
// //         .from("product")
// //         .insert([
// //           {
// //             name:productName,
// //             category: finalCategoryId,
// //             image_path: fileName,
// //             ingredient1: ingredients[0],
// //             ingredient2: ingredients[1],
// //             ingredient3: ingredients[2],
// //             ingredient4: ingredients[3],
// //             ingredient5: ingredients[4],



// //           },
// //         ]);
// //       if (insertError) {
// //         await supabase.storage.from("product_image").remove([fileName])
// //         console.log(insertError);
// //         alert("テーブル登録に失敗しました")
// //         return
// //       }

// //     alert("登録が完了しました！");
// //     setIsOpenConfirm(false); // モーダルを閉じる

// //     // 入力欄をリセット（必要であれば）
// //     setProductName("");
// //     setIngredients([]);
// //     setIsImage(null);

// //   }


//   return (

//     <>
//       <ProductRegister
//       category ={category}
//       productName={productName}
//       setProductName={setProductName}
//       selectedCategory={selectedCategory}
//       setSelectedCategory={setSelectedCategory}
//       customCategory={customCategory}
//       setCustomCategory={setCustomCategory}
//       isImage={isImage}
//       setIsImage={setIsImage}

//        />
//        <div className="mt-5">
//         <h2 className="mt-[40px] text-[#4d4d4d] font-bold text-[25px] text-center mb-4">成分</h2>
//          <ComboBox ingredients={ingredients} setIngredients={setIngredients}/>
//        </div>


//         <div className="w-full mx-auto mt-[20px] flex justify-center">
//         <button
//         onClick={() => setIsOpenConfirm(true)}
//         className="w-[120px] h-[46px] mt-5 bg-[#F4969C] rounded-[10px] cursor-pointer text-[25px] text-center text-white">
//           完成
//         </button>
//       </div>
//       {/* 完成確認モーダル */}
//       {isOpenConfirm && (
//         <div className="fixed inset-0 bg-white/80 flex flex-col items-center justify-center">
//           <div className="w-[320px] py-2 px-3  border-[10px] border-[#DB9292] rounded-[20px] bg-white flex flex-col items-center justify-center">
//             <p className="text-[#4d4d4d] text-[20px] text-center">完成でよろしいでしょうか？</p>
//           </div>
//           <div className="mt-[10px] flex gap-5">
//             <button
//             onClick={() => setIsOpenConfirm(false)}
//             className="h-[40px] border cursor-pointer px-5 text-[20px] text-center bg-[#8FA0E1] text-white rounded-[10px] border-[2px] border-white">
//               キャンセル
//             </button>
//             <button
//             onClick={handleSubmit}
//             className="h-[40px] border cursor-pointer px-5 text-[20px] text-center bg-[#C73537] text-white rounded-[10px] border-[2px] border-white">
//               OK
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

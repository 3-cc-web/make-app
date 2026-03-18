'use client';
import Image from "next/image";
import * as React from "react"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState } from "react";
import { X } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Search } from "lucide-react"

const  ComboBox = ({ingredients,setIngredients}) => {
  const frameworks = [
// 保湿・バリア
  "セラミドEOP", "セラミドNP", "セラミドAP", "フィトスフィンゴシン",
  "ヒアルロン酸Na", "加水分解ヒアルロン酸", "アセチルヒアルロン酸Na",
  "スクワラン", "ホホバ種子油", "シア脂", "ワセリン", "グリセリン",
  "BG", "DPG", "PCA-Na", "トレハロース", "アミノ酸", "リピジュア",

  // 美白・透明感
  "ビタミンC誘導体", "アスコルビン酸", "リン酸アスコルビルMg", "テトラヘキシルデカン酸アスコルビル",
  "トラネキサム酸", "アルブチン", "コウジ酸", "プラセンタエキス", "カモミラET",
  "ルシノール", "4MSK", "マグノリグナン", "エナジーシグナルAMP",

  // エイジング・ハリ（併用注意が多いエリア）
  "レチノール", "パルミチン酸レチノール", "レチナール", "バクチオール",
  "ナイアシンアミド", "加水分解コラーゲン", "水溶性コラーゲン", "エラスチン",
  "ペプチド", "ヒト幹細胞順化培養液", "フラーレン", "アスタキサンチン",
  "コエンザイムQ10", "イデベノン",

  // 整肌・鎮静
  "グリチルリチン酸2K", "グリチルレチン酸ステアリル", "ツボクサエキス (CICA)",
  "マデカッソシド", "アシアチコシド", "ドクダミエキス", "ヨモギ葉エキス",
  "アロエベラ葉エキス", "ハトムギ種子エキス", "アラントイン", "パンテノール",

  // 角質ケア・酸（禁忌判定に必須）
  "グリコール酸 (AHA)", "乳酸 (AHA)", "クエン酸 (AHA)", "リンゴ酸 (AHA)",
  "サリチル酸 (BHA)", "グルコノラクトン (PHA)", "ラクトビオン酸 (PHA)",
  "酵素 (パパイン・プロテアーゼ)",

  // 皮脂・毛穴
  "ライスパワーNo.6", "ピリドキシンHCl (ビタミンB6)", "アーチチョーク葉エキス",
  "ノイバラ果実エキス", "10-ヒドロキシデカン酸",

  // 紫外線吸収剤・散乱剤（日焼け止め）
  "酸化亜鉛", "酸化チタン", "メトキシケイヒ酸エチルヘキシル", "t-ブチルメトキシジベンゾイルメタン"
];

//ドロワー用
const [open, setOpen] = useState(false);
//入力用
const [query, setQuery] = useState("");

// const displayRows = Array.from({ length: ingredients.length + 1 });

//インプット用
const handleAdd = () => {
    if(query === "") return;
    if(ingredients.length >= 5){

        alert("成分は最大5件です");
        setQuery("");
        return;
    }
    setIngredients([...ingredients, query]);

    setOpen(false);
    setQuery("");
  };

//削除用
  const handleRemove = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

// 決定ボタンを押してドロワーを閉じる
  const handleFinalize = () => {
    setOpen(false); // ドロワーを閉じる
  };


console.log(ingredients);



  return (


    <div>

        <div>
          <Drawer>
            <DrawerTrigger asChild>
                <button
                  type="button"
                  className="w-full border border-green-300 rounded-full px-4 py-2 text-sm text-left text-gray-400 bg-white outline-none ring-offset-2 focus:ring-2 focus:ring-green-200 transition-all flex items-center justify-between"
                >
                  {/* 選択された成分があればそれを表示、なければプレースホルダー風にする */}
                  <span>{ingredients.length > 0 ? `${ingredients.length}件の成分を選択中...` : "成分を入力..."}</span>
                  <Search size={16} className="text-green-400" />
                </button>
              </DrawerTrigger>
            <DrawerContent className="h-[90dvh] max-w-[100vw] overflow-hidden flex flex-col fixed top-[5dvh] left-0 right-0 rounded-t-[20px]">
              <DrawerHeader>
              <DrawerTitle className={"text-2xl"}>成分を選択</DrawerTitle>
              <DrawerDescription className={"text-xl"}>最大5件まで</DrawerDescription>
    </DrawerHeader>
              <Combobox items={frameworks} value={query}  onValueChange={setQuery}  >
                <ComboboxInput
  placeholder="成分を選択..."
  onChange={(e) => setQuery(e.target.value)}
  // 【最重要】styleで16pxを直接指定してズームを封じる
  style={{ fontSize: '16px' }}
  className="h-[50px] mb-4 text-base w-full border rounded-md px-3"
/>
              <div className="flex-1 overflow-y-auto min-h-0 border rounded-md mb-4 bg-white touch-pan-y shadow-inner">
                  <ComboboxContent
                  // 【重要】ドロワーの外に飛ばさない
                        portalled={false}
                        // リストをクリックした時にドロワーの「外側クリック判定」を無視させる
                        onCloseAutoFocus={(e) => e.preventDefault()}
                        onPointerDownOutside={(e) => e.preventDefault()}
                        onWheel={(e) => e.stopPropagation()}
                  >
                    <ComboboxEmpty>成分が見つかりません</ComboboxEmpty>
                  <ComboboxList>
                      {(item) => (
                        <ComboboxItem
                          key={item}
                          value={item}
                          className="text-2xl p-2 cursor-pointer pointer-events-auto"
                          // onClickだとDrawerにブロックされるので、その手前のイベントで値をセット
                          onMouseDown={(e) => {
                            e.preventDefault(); // Drawerの閉じ動作などを阻止
                            e.stopPropagation();
                            e.stopPropagation(); // イベントが上に漏れるのを阻止
                            setQuery(item);
                          }}
                        >
                          {item}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </div>
              </Combobox>
               <div className="flex justify-center shrink-0 mb-4">
            <Button onClick={handleAdd} className="h-[50px] w-[70px] text-2xl">決定</Button>
               </div>


              <div className="flex gap-4 flex-col min-h-[220px] bg-gray-50/50 rounded-lg p-2 border border-dashed border-gray-200">
                  {ingredients.length > 0 ? (
                    ingredients.map((v, i) => (
                      <Badge key={i} variant="outline" className="text-xl h-[36px] bg-gray-200 justify-between px-4">
                        {v}
                        <button
                          onClick={() => handleRemove(i)}
                          className="hover:bg-slate-300 rounded-full p-1 transition-colors ml-2"
                          aria-label="削除"
                        >
                          <X size={18} className="text-slate-600 hover:text-red-500" />
                        </button>
                      </Badge>
                    ))
                  ) : (
                    <p className="text-gray-400 text-center my-auto text-lg">成分を追加してください</p>
                  )}
                </div>

               <DrawerFooter>

                <DrawerClose>
                  <Button variant="outline" className="w-full h-[60px] text-2xl font-bold text-white border-2 bg-red-700 hover:bg-gray-100">完了</Button>
                </DrawerClose>
               </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>



        <div className="flex gap-6 flex-col p-6">

            {ingredients.map((v,i) => (
              <Badge key={i} variant="outline" className="text-xl h-[30px] bg-gray-200">
        {v}
             <button
              onClick={() => handleRemove(i)}
              className="hover:bg-slate-200 rounded-full p-0.5 transition-colors"
              aria-label="削除"
            >
              <X size={20} className="text-slate-500 hover:text-red-500" />
            </button>
      </Badge>
            ))}
        </div>
    </div>

  );
}

export default ComboBox;

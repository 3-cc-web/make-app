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


const [query, setQuery] = useState("");

// const displayRows = Array.from({ length: ingredients.length + 1 });

//インプット用
const handleAdd = () => {
    if(query === "") return;

    setIngredients([...ingredients, query]);

    setQuery("");
  };

//削除用
  const handleRemove = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

console.log(ingredients);



  return (
    <div>

        <div>
          <Combobox ingredients={frameworks} value={query}  onValueChange={setQuery}  >
            <ComboboxInput placeholder={`成分を選択...`} onChange={(e) => setQuery(e.target.value)} style={{ fontSize: '1.275rem', lineHeight: '2.25rem' }} className={"h-[60px] mb-6 text-3xl"}/>
            <ComboboxContent>
              <ComboboxEmpty>成分が見つかりません</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem key={item} value={item} className={"text-2xl p-2"}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>

        </div>

        <div className="flex justify-center mb-4">
            <Button onClick={handleAdd} className="h-[50px] w-[70px]">決定</Button>
        </div>

        <div className="flex gap-2">

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

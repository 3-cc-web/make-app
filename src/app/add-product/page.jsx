'use client';
import { useState } from "react";
import ComboBox from "./components/ComboBox";
export default function Home() {
  //ステート管理

  //comboBoxに渡すステート
  const [ingredients,setIngredients] = useState([]);
  return (

    <>
      <ComboBox ingredients={ingredients} setIngredients={setIngredients}/>
    </>
  );
}

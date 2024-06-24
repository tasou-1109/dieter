import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";

export const Training = () => {
  const [kin, setKin] = useState([]);
  const [meat, setMeat] = useState([]); //のちのちAPIでデータを取得する。もしデータが存在しない場合は空で出力する
  const [tai, setTai] = useState(70);

  //ここでuseEffectを使用しデータを取得する

  const getData = async () => {
    console.log(await supabase.from("record").select("*"));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <h2>前回の記録</h2>

      <label>筋トレ</label>
      <br />
      <ul>
        {kin.map((kin) => {
          return <li>{kin}</li>;
        })}
      </ul>
      <br />

      <label>食事</label>
      <br />
      {meat}
      <br />

      <label>現在体重</label>
      <br />
      <>{tai}kg</>
    </>
  );
};

export default Training;

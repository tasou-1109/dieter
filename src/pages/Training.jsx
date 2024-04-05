import React, { useState } from "react";

export const Training = () => {
  const [kin, setKin] = useState([]);
  const [meat, setMeat] = useState([]); //のちのちAPIでデータを取得する。もしデータが存在しない場合は空で出力する
  const [tai, setTai] = useState(70);

  return (
    <>
      <h2>前日の記録</h2>

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
      <ul>
        <li>朝：{meat}</li>
        <li>昼：{meat}</li>
        <li>晩：{meat}</li>
      </ul>
      <br />

      <label>現在体重</label>
      <br />
      <>{tai}kg</>
    </>
  );
};

export default Training;

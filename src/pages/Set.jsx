import React, { useEffect, useState } from "react";

export const Set = () => {
  //APIでデータを取得する
  const [menu, setMenu] = useState(["a"]);
  const [gtai, setGtai] = useState(70);

  const [kin, setKin] = useState([]);
  const [tai, settai] = useState(70);
  const [meet, setMeet] = useState();

  return (
    <>
      <h2>記録</h2>

      <label class="training">トレーニング内容</label>
      <br />
      <input type="text" list="training-choise" />
      <datalist id="training-choise">
        {menu.map((menu) => {
          return <option key={menu}>{menu}</option>;
        })}
      </datalist>
    </>
  );
};

export default Set;

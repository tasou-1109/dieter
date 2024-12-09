import React, { useState, useEffect } from "react";
import "./BackgroundSlideshow.css";

// 画像のインポート
import ramenn01 from "../../images/LINE_ALBUM_ラーメン_241118_1.jpg";
import ramenn02 from "../../images/LINE_ALBUM_ラーメン_241118_2.jpg";
import ramenn03 from "../../images/LINE_ALBUM_ラーメン_241118_3.jpg";
import ramenn04 from "../../images/LINE_ALBUM_ラーメン_241118_4.jpg";
import ramenn05 from "../../images/LINE_ALBUM_ラーメン_241118_5.jpg";
import ramenn06 from "../../images/LINE_ALBUM_ラーメン_241118_6.jpg";
import ramenn07 from "../../images/LINE_ALBUM_ラーメン_241118_7.jpg";
import ramenn08 from "../../images/LINE_ALBUM_ラーメン_241118_8.jpg";
import ramenn09 from "../../images/LINE_ALBUM_ラーメン_241118_9.jpg";
import ramenn10 from "../../images/LINE_ALBUM_ラーメン_241118_10.jpg";
import ramenn11 from "../../images/LINE_ALBUM_ラーメン_241118_11.jpg";
import ramenn12 from "../../images/LINE_ALBUM_ラーメン_241118_12.jpg";
import ramenn13 from "../../images/LINE_ALBUM_ラーメン_241118_13.jpg";
import ramenn14 from "../../images/LINE_ALBUM_ラーメン_241118_14.jpg";
import ramenn15 from "../../images/LINE_ALBUM_ラーメン_241118_15.jpg";
import ramenn16 from "../../images/LINE_ALBUM_ラーメン_241118_16.jpg";
import ramenn17 from "../../images/LINE_ALBUM_ラーメン_241118_17.jpg";
import ramenn18 from "../../images/LINE_ALBUM_ラーメン_241118_18.jpg";
import ramenn19 from "../../images/LINE_ALBUM_ラーメン_241118_19.jpg";
import ramenn20 from "../../images/LINE_ALBUM_ラーメン_241118_20.jpg";
import ramenn21 from "../../images/LINE_ALBUM_ラーメン_241118_21.jpg";
import ramenn22 from "../../images/LINE_ALBUM_ラーメン_241118_22.jpg";
import ramenn23 from "../../images/LINE_ALBUM_ラーメン_241118_23.jpg";
import ramenn24 from "../../images/LINE_ALBUM_ラーメン_241118_24.jpg";
import ramenn25 from "../../images/LINE_ALBUM_ラーメン_241118_25.jpg";
import ramenn26 from "../../images/LINE_ALBUM_ラーメン_241118_26.jpg";

const BackgroundSlideshow = () => {
  // 画像の配列を定義
  const images = [
    ramenn01, ramenn02, ramenn03, ramenn04, ramenn05,
    ramenn06, ramenn07, ramenn08, ramenn09, ramenn10,
    ramenn11, ramenn12, ramenn13, ramenn14, ramenn15,
    ramenn16, ramenn17, ramenn18, ramenn19, ramenn20,
    ramenn21, ramenn22, ramenn23, ramenn24, ramenn25,
    ramenn26
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slideshow-container">
      {images.map((image, index) => (
        <div
          key={index}
          className={`slide ${index === currentImageIndex ? "active" : ""}`}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundSlideshow;
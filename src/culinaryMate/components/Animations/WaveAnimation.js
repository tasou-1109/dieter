// src/components/WaveAnimation.js
import React from "react";
import Wave from "react-wavify";
import { useLocation } from "react-router-dom";
import "./WaveAnimation.css";

const WaveAnimation = () => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = React.useState(false);

  React.useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 500); // アニメーション時間と同じ

    return () => clearTimeout(timer);
  }, [location]);

  if (isTransitioning) {
    return null;
  }

  return (
    <div className="wave-container">
      <Wave
        fill="rgba(255, 255, 255, 0.2)"
        paused={false}
        options={{
          height: 15,
          amplitude: 20,
          speed: 0.15,
          points: 3,
        }}
      />
      <Wave
        fill="rgba(255, 255, 255, 0.1)"
        paused={false}
        style={{ marginTop: "-20px" }}
        options={{
          height: 20,
          amplitude: 25,
          speed: 0.2,
          points: 4,
        }}
      />
    </div>
  );
};

export default WaveAnimation;

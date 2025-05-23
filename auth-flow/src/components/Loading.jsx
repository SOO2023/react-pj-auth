import { useEffect, useState } from "react";
import '../styles/loading.css';

const Loading = () => {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    let count = 1;
    const interval = setInterval(() => {
      count++;
      if (count <= 5) {
        setDots((prev) => `${prev}.`);
      } else {
        count = 1;
        setDots(".");
      }
    }, 500);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <main className="loading-main">
      <div className="loading-div">Loading</div>
      <div className="loading-dot">{dots}</div>
    </main>
  );
};

export default Loading;

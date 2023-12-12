import { useEffect, useState } from "react";
import "./winnerView.css";

export const WinnerView = () => {
  const [size, setSize] = useState("smallText");
  useEffect(() => {
    setTimeout(() => {
      setSize("bigText");
      setTimeout(() => {
        setSize("smallText");
      }, 1000);
    }, 10);
  }, []);
  return (
    <>
      <h1 className={`text ${size}`}>Congrats! You are the winner!</h1>
    </>
  );
};

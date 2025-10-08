import { useEffect } from "react";
import "./style_1.css";
export default function TubesCursor() {
  useEffect(() => {
    import("./script_1.js");
  }, []);

  return (
    <>
      {" "}
      <style>{` body { position: relative; z-index: 50; touch-action: none; background-image: url("./background.svg"); background-size: cover; background-position: center; background-repeat: no-repeat; } `}</style>{" "}
      {/* JSX hiển thị */}{" "}
      <div id="app" className="absolute inset-0 -z-10 opacity-40">
        {" "}
        <canvas
          id="canvas"
          className="w-full h-full bg-transparent z-50"
        ></canvas>{" "}
      </div>{" "}
    </>
  );
}

import { useEffect } from "react";
import "./style_1.css";

export default function TubesCursor() {
  useEffect(() => {
    import("./script_1.js");
  }, []);

  return (
    <div id="app" className="absolute inset-0 -z-10 opacity-40" >
      <canvas id="canvas" className="w-full h-full bg-transparent z-50"></canvas>
    </div>
  );
}

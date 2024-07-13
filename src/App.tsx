import { useEffect } from "react";
import CommandProcessor from "./CommandProcessor"
import ImageRain from "./ImageRain";

function App() {
  const cp = CommandProcessor.inst;

  useEffect(() => cp.onCommand.subscribe((opts) => {
    console.log(opts.command);
  }));

  return <>
    <ImageRain />
  </>
}

export default App

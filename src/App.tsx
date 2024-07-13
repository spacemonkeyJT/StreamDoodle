import { useEffect } from "react";
import CommandProcessor from "./CommandProcessor"
import ImageRain from "./ImageRain";

const merchImages = [
  'beanie_red.png',
  'beanie_white.png',
  'emote_stickers.png',
  'holo_stickers.png',
  'mug_black.png',
  'shirt_cardinal.png',
  'shirt_gold.png',
  'shirt_purple.png',
  'shirt_red.png',
  'shirt_royal.png',
  'shirt_sky.png',
]

function App() {
  const cp = CommandProcessor.inst;

  useEffect(() => cp.onCommand.subscribe((opts) => {
    console.log(opts.command);
  }));

  return <>
    <ImageRain imageNames={merchImages} />
  </>
}

export default App

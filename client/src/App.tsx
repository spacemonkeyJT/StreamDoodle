import { useEffect } from "react";
import ImageRain from "./ImageRain";
import UserDrop from "./UserDrop";

const merchImages = [
  'kmrkle/merch/beanie_red.png',
  'kmrkle/merch/beanie_white.png',
  'kmrkle/merch/emote_stickers.png',
  'kmrkle/merch/holo_stickers.png',
  'kmrkle/merch/mug_black.png',
  'kmrkle/merch/shirt_cardinal.png',
  'kmrkle/merch/shirt_gold.png',
  'kmrkle/merch/shirt_purple.png',
  'kmrkle/merch/shirt_red.png',
  'kmrkle/merch/shirt_royal.png',
  'kmrkle/merch/shirt_sky.png',
]

async function api(url: string) {
  return await (await fetch(import.meta.env.VITE_API_BASE_URL + url)).json();
}

function App() {
  useEffect(() => {
    console.log('mode:', import.meta.env.MODE);
    api('').then(console.log);
  }, []);
  return <>
    {/* <img src="lastofus.webp" style={{ position: 'absolute', width: window.innerWidth, zIndex: -1 }} /> */}
    <ImageRain imageNames={merchImages} />
    <UserDrop />
  </>
}

export default App

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

function App() {
  return <>
    {/* <img src="lastofus.webp" style={{ position: 'absolute', width: window.innerWidth, zIndex: -1 }} /> */}
    {/* <ImageRain imageNames={merchImages} /> */}
    <UserDrop />
  </>
}

export default App

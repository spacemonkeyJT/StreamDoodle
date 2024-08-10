// import { apiTest } from "./api";
// import ImageRain from "./ImageRain";
// import UserDrop from "./UserDrop";

import { API_URL } from "./api";

// const merchImages = [
//   'kmrkle/merch/beanie_red.png',
//   'kmrkle/merch/beanie_white.png',
//   'kmrkle/merch/emote_stickers.png',
//   'kmrkle/merch/holo_stickers.png',
//   'kmrkle/merch/mug_black.png',
//   'kmrkle/merch/shirt_cardinal.png',
//   'kmrkle/merch/shirt_gold.png',
//   'kmrkle/merch/shirt_purple.png',
//   'kmrkle/merch/shirt_red.png',
//   'kmrkle/merch/shirt_royal.png',
//   'kmrkle/merch/shirt_sky.png',
// ]

// apiTest().then(console.log);

function App() {
  const redirectUri = `${API_URL}login/twitch`;
  const clientId = 'f3t4znfgwxi20ksfpksm81hwywz4a9';
  const loginUrl = `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;

  return <>
    {/* <img src="lastofus.webp" style={{ position: 'absolute', width: window.innerWidth, zIndex: -1 }} /> */}
    {/* <ImageRain imageNames={merchImages} />
    <UserDrop /> */}

    <a href={loginUrl}>Login with Twitch</a>
  </>
}

export default App

import { useEffect, useRef, useState } from "react";

interface ImageInfo {
  size: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vrot: number;
}

export default function ImageRain() {
  const [images, setImages] = useState<ImageInfo[]>([]);

  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  const animate: FrameRequestCallback = time => {
    if (previousTimeRef.current != undefined) {
      const deltaTime = time - previousTimeRef.current;
      
      setImages(currentImages => {
        for (const image of currentImages) {
          image.x += image.vx * deltaTime / 1000;
          image.y += image.vy * deltaTime / 1000;
          image.rot += image.vrot * deltaTime / 1000;
        }
        return currentImages.filter(r => r.y < window.innerHeight);
      });
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const size = Math.random() * 150 + 50;
      const img: ImageInfo = {
        size,
        x: Math.random() * window.innerWidth,
        y: -size,
        vx: Math.random() * size - size / 2,
        vy: size * 1,
        rot: 0,
        vrot: Math.random() * 100 - 50
      }
      setImages(currentImages => [...currentImages, img]);
    }, 500);
    return () => clearInterval(interval);
  }, [])

  return <>
    {images.map((info, idx) => (
      <img src="bapshirt_red.webp" key={idx} width={info.size} style={{ left: info.x, top: info.y, position: 'absolute', transform: `rotate(${info.rot}deg)` }} />
    ))}
  </>
}

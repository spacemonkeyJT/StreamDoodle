import { useEffect, useRef, useState } from "react";

interface ImageInfo {
  size: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vrot: number;
  name: string;
}

interface Props {
  imageNames: string[];
  spawnInterval?: number;
  sizeMin?: number;
  sizeMax?: number;
  rotMax?: number;
  fallRatio?: number;
  driftRatio?: number;
}

export default function ImageRain(props: Props) {
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

  const sizeMin = props.sizeMin ?? 50;
  const sizeMax = props.sizeMax ?? 200;
  const rotMax = props.rotMax ?? 50;
  const spawnInterval = props.spawnInterval ?? 500;
  const fallRatio = props.fallRatio ?? 1.0;
  const driftRatio = props.driftRatio ?? 1.0;

  useEffect(() => {
    const interval = setInterval(() => {
      const size = Math.random() * (sizeMax - sizeMin) + sizeMin;
      const img: ImageInfo = {
        size,
        x: Math.random() * window.innerWidth,
        y: -size,
        vx: (Math.random() * size - size / 2) * driftRatio,
        vy: size * fallRatio,
        rot: 0,
        vrot: Math.random() * rotMax * 2 - rotMax,
        name: props.imageNames[Math.floor(Math.random() * props.imageNames.length)],
      }
      setImages(currentImages => [...currentImages, img]);
    }, spawnInterval);
    return () => clearInterval(interval);
  }, [])

  return <>
    {images.map((info, idx) => (
      <img src={info.name} key={idx} width={info.size} style={{
        left: info.x,
        top: info.y,
        position: 'absolute',
        transform: `rotate(${info.rot}deg)`,
        opacity: 0.8,
      }} />
    ))}
  </>
}

import { useEffect, useRef, useState } from "react";

interface UserInfo {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vrot: number;
  username: string;
  imageName: string;
  size: number;
}

const gravity = 200;
const bounciness = 0.5;
const screenMarginBottom = 20;
const horizSpeed = 300;

export default function UserDrop() {
  const [users, setUsers] = useState<UserInfo[]>([]);

  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  const animate: FrameRequestCallback = time => {
    if (previousTimeRef.current != undefined) {
      const deltaTime = time - previousTimeRef.current;
      
      setUsers(currentUsers => {
        for (const user of currentUsers) {
          // Add gravity to vertical velocity
          user.vy += gravity * deltaTime / 1000;

          // Collide with screen edges
          // Bottom
          const bottom = window.innerHeight - user.size - screenMarginBottom;
          if (user.y >= bottom) {
            user.vy = -user.vy * bounciness;
            user.vx = user.vx * bounciness;
            user.y = bottom - 1;
          }
          // Left
          const left = user.size;
          if (user.x < left) {
            user.vx = -user.vx * bounciness;
            user.x = left + 1;
          }
          // Right
          const right = window.innerWidth - user.size;
          if (user.x > right) {
            user.vx = -user.vx * bounciness;
            user.x = right - 1;
          }

          // Update position based on velocity
          user.x += user.vx * deltaTime / 1000;
          user.y += user.vy * deltaTime / 1000;

          // Apply rotation
          user.rot += user.vrot * deltaTime / 1000;
        }
        return [...currentUsers];
      });
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, []);

  function doDrop(username: string) {
    const user: UserInfo = {
      username,
      imageName: 'kmrkle/avatar.png',
      y: -70,
      x: Math.random() * 1920 - 70,
      rot: 0,
      vrot: 0,
      vx: Math.random() * horizSpeed * 2 - horizSpeed,
      vy: 0,
      size: 70,
    }
    setUsers([...users, user]);
  }

  return <>
    <button onClick={() => doDrop('kmrkle')}>test</button>
    {users.map((info, idx) => <div key={idx}>
      <img src={info.imageName} key={idx} style={{ left: info.x, top: info.y, position: 'absolute', transform: `rotate(${info.rot}deg)` }} width={info.size} />
      <label style={{ left: info.x + 35 - 50, top: info.y + 70, position: 'absolute', color: '#fff', textAlign: 'center', width: 100 }}>{info.username}</label>
    </div>)}
  </>
}

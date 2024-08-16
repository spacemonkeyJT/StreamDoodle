import { useEffect, useRef, useState } from "react"
import CommandProcessor from "../utils/CommandProcessor"
import { getUserInfo } from "../utils/twitch"

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

const gravity = 200
const bounciness = 0.8
const screenMarginBottom = 20
const horizSpeed = 300
const picSize = 70
const picSizeSq = picSize * picSize
const collideForce = 100000

export default function UserDrop() {
  const [users, setUsers] = useState<UserInfo[]>([])

  const requestRef = useRef<number>()
  const previousTimeRef = useRef<number>()

  const animate: FrameRequestCallback = time => {
    if (previousTimeRef.current != undefined) {
      const deltaTime = time - previousTimeRef.current
      
      setUsers(currentUsers => {
        for (const user of currentUsers) {
          // Add gravity to vertical velocity
          user.vy += gravity * deltaTime / 1000

          // Collide with screen edges
          // Bottom
          const bottom = window.innerHeight - user.size - screenMarginBottom
          if (user.y >= bottom) {
            user.vy = -user.vy * bounciness
            user.vx = user.vx * bounciness
            user.y = bottom
          }
          // Left
          const left = 0
          if (user.x < left) {
            user.vx = -user.vx * bounciness
            user.x = left + 1
          }
          // Right
          const right = window.innerWidth - user.size
          if (user.x > right) {
            user.vx = -user.vx * bounciness
            user.x = right - 1
          }

          // Collide with other users
          for (const other of currentUsers) {
            if (other !== user) {
              const ax = user.x - other.x
              const ay = user.y - other.y
              const dx = Math.abs(ax)
              const dy = Math.abs(ay)
              const ds = dx * dx + dy * dy
              if (ds < picSizeSq) {
                const f = deltaTime / 1000 * collideForce
                user.vx = user.vx + ax / ds * f
                user.vy = user.vy + ay / ds * f
                other.vx = other.vx - ax / ds * f
                other.vy = other.vy - ay / ds * f 
              }
            }
          }

          // Update position based on velocity
          user.x += user.vx * deltaTime / 1000
          user.y += user.vy * deltaTime / 1000

          // Apply rotation
          user.rot += user.vrot * deltaTime / 1000
        }
        return [...currentUsers]
      })
    }
    previousTimeRef.current = time
    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(requestRef.current!)
  }/*, []*/)

  async function doDrop(username: string) {
    const profilePic = (await getUserInfo(username))?.profile_image_url

    if (profilePic) {
      setUsers(users => {
        if (!users.find(r => r.username === username)) {
          const user: UserInfo = {
            username,
            imageName: profilePic,
            y: -picSize,
            x: Math.random() * window.innerWidth - picSize,
            rot: 0,
            vrot: 0,
            vx: Math.random() * horizSpeed * 2 - horizSpeed,
            vy: 0,
            size: picSize,
          }

          return [...users, user]
        }
        return users
      })
    }
  }

  const cp = CommandProcessor.inst

  useEffect(() => cp.onMessage.subscribe(async (userstate) => {
    doDrop(userstate["display-name"]!)
  })/*, []*/)

  return <>
    <button onClick={() => doDrop('kmrkle')}>test</button>
    {users.map((info, idx) => <div key={idx}>
      <img src={info.imageName} key={idx} style={{
        left: info.x,
        top: info.y,
        position: 'absolute',
        transform: `rotate(${info.rot}deg)`,
        borderRadius: picSize / 2,
      }} width={info.size} />

      <label style={{
        left: info.x + picSize / 2 - 100,
        top: info.y + picSize,
        position: 'absolute',
        color: '#fff',
        textAlign: 'center',
        width: 200 }}>
        {info.username}
      </label>
    </div>)}
  </>
}

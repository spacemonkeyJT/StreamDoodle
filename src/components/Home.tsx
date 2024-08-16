import { useLoaderData } from "react-router-dom"
import { Tables } from "../database.types"

export default function Home() {
  const channels = useLoaderData() as Tables<'channels'>[]

  return (
    <div>
      <h2>Channels</h2>
      {channels.map((c, i) => (<div key={i}>{c.channel_name}</div>))}
    </div>
  )
}

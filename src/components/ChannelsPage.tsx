import { useRootData } from "../loaders/rootData"

export default function ChannelsPage() {
  const { channels } = useRootData()

  return (
    <div>
      <h2>Channels</h2>
      {channels.map((c, i) => (<div key={i}>{c.channel_name}</div>))}
    </div>
  )
}

import "./TodoList.less"
import { Bounds, Task } from "./settings";

interface Props {
  tasks: Task[]
  bounds: Bounds
}

export function TodoList({ tasks, bounds }: Props) {
  return (
    <div className="todo-list" style={{ left: bounds.x, top: bounds.y, width: bounds.w, height: bounds.h }}>
      {tasks
        .sort((a, b) => a.addedDate - b.addedDate)
        .map(t => (
          <div className="task" key={t.id}>
            <div className="task-date">{new Date(t.addedDate).toLocaleTimeString()}</div>
            <div className="task-username">{t.username}</div>
            <div className="task-name">{t.name}</div>
          </div>
        ))}
    </div>
  )
}

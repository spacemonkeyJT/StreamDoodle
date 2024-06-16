import "./TodoList.less"
import { Task } from "./settings";

interface Props {
  tasks: Task[];
}

export function TodoList({ tasks }: Props) {
  return (
    <div className="todo-list">
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

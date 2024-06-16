import { useState } from "react";
import { Task, settings } from "./settings";
import CommandProcessor from "./CommandProcessor";
import { TodoList } from "./TodoList";

interface Props {
  commandProcessor: CommandProcessor;
}

function App({ commandProcessor }: Props) {
  const [tasks, setTasks] = useState<Task[]>(settings.tasks);
  const [visible, setVisible] = useState(true);

  commandProcessor.tasks = tasks;
  commandProcessor.setTasks = setTasks;
  commandProcessor.visible = visible;
  commandProcessor.setVisible = setVisible;

  if (visible) {
    return <TodoList tasks={tasks} />
  }

  return null
}

export default App

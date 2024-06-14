import { useState } from "react";
import { Overlay } from "./Overlay";
import { Task } from "./settings";
import CommandProcessor from "./CommandProcessor";

interface Props {
  commandProcessor: CommandProcessor;
}

function App({ commandProcessor }: Props) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [visible, setVisible] = useState(true);

  commandProcessor.tasks = tasks;
  commandProcessor.setTasks = setTasks;
  commandProcessor.visible = visible;
  commandProcessor.setVisible = setVisible;

  if (visible) {
    return <Overlay tasks={tasks} />
  }
  return null
}

export default App

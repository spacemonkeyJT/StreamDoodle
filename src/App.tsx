import { useState } from "react";
import { Overlay } from "./Overlay";
import { Task } from "./settings";
import CommandProcessor from "./CommandProcessor";

interface Props {
  commandProcessor: CommandProcessor;
}

function App({ commandProcessor }: Props) {
  const [tasks, setTasks] = useState<Task[]>([]);

  commandProcessor.tasks = tasks;
  commandProcessor.setTasks = setTasks;

  return <Overlay tasks={tasks} />
}

export default App

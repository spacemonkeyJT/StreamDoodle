import { useState } from "react";
import { TodoList } from "./TodoList";
import { getSettings, setUpdateSettingsState } from "./settings";
import { State } from "./state";
import CommandProcessor from "./CommandProcessor";

interface Props {
  commandProcessor: CommandProcessor
}

function App({ commandProcessor }: Props) {
  const [settings, setSettings] = useState(getSettings());
  const [state, setState] = useState<State>({ avatars: [] })

  commandProcessor.state = state;
  commandProcessor.setState = setState;

  setUpdateSettingsState(setSettings);

  return <>
    {settings.tasksEnabled && <TodoList tasks={settings.tasks} bounds={settings.tasksBounds} />}
  </>
}

export default App

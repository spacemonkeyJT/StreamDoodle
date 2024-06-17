import { useState } from "react";
import { TodoList } from "./TodoList";
import { getSettings, setUpdateSettingsState } from "./settings";

function App() {
  const [settings, setSettings] = useState(getSettings());

  setUpdateSettingsState(setSettings);

  if (settings.tasksEnabled) {
    return <TodoList tasks={settings.tasks} bounds={settings.tasksBounds} />
  }

  return null
}

export default App

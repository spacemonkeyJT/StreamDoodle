import { useState } from "react";
import { TodoList } from "./TodoList";
import { getSettings, setUpdateSettingsState } from "./settings";

function App() {
  const [settings, setSettings] = useState(getSettings());

  setUpdateSettingsState(setSettings);

  if (settings.tasksVisible) {
    return <TodoList tasks={settings.tasks} />
  }

  return null
}

export default App

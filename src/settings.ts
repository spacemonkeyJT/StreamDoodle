export interface Task {
  id: number;
  username: string;
  name: string;
  addedDate: number;
}

export interface Settings {
  tasks: Task[]
}

const defaultSettings: Settings = {
  tasks: []
}

const SettingsStorageID = 'streamdoodle-settings'

function loadSettings(): Settings {
  const settingsJson = localStorage.getItem(SettingsStorageID);
  if (settingsJson) {
    return {
      ...defaultSettings,
      ...(JSON.parse(settingsJson))
    }
  }
  return defaultSettings
}

export const settings = loadSettings()

export function saveSettings() {
  localStorage.setItem(SettingsStorageID, JSON.stringify(settings))
}

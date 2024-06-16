export interface Task {
  id: number;
  username: string;
  name: string;
  addedDate: number;
}

export interface Settings {
  tasks: Task[]
  tasksVisible: boolean
}

const defaultSettings: Settings = {
  tasks: [],
  tasksVisible: true,
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

let _settings = loadSettings();

export function getSettings() {
  return _settings;
}

let updateSettingsState: (s: Settings) => unknown = () => {}

export function setUpdateSettingsState(_updateSettingsState: (s: Settings) => unknown) {
  updateSettingsState = _updateSettingsState;
}

export function updateSettings(update: (s: Settings) => unknown) {
  update(_settings);
  _settings = { ..._settings };
  localStorage.setItem(SettingsStorageID, JSON.stringify(_settings))
  updateSettingsState(_settings)
}

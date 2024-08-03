export interface Settings {
  bounceEnabled: boolean
}

const defaultSettings: Settings = {
  bounceEnabled: false,
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

export function updateSettings(update: (s: Settings) => unknown) {
  update(_settings);
  _settings = { ..._settings };
  localStorage.setItem(SettingsStorageID, JSON.stringify(_settings))
}

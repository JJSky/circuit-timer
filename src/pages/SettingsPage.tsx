import React, { useContext, useEffect, useState } from 'react'
import { IonItem, IonList, IonToggle } from '@ionic/react'
import { Storage } from '@ionic/storage'
import { StorageContext } from '../App'
import { UserSettings } from '../shared/interfaces/ISettings'
import { getUserSettings, saveUserSettings } from '../shared/utils/storage'
import Page from './Page'
import { toggleDarkTheme } from '../shared/utils/utils'

const defaultSettings: UserSettings = {
  darkMode: false
}

const SettingsPage: React.FC = () => {
  const store = useContext(StorageContext);
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);

  useEffect(() => {
    if (!store) return;
    fetchSettings(store);
  }, [store])

  useEffect(() => {
    if (!store || !settings) return;
    console.log("save updated settings: ", settings);
    saveUserSettings(store, settings);
  }, [settings])

  const fetchSettings = async (storage: Storage) => {
    const storedSettings = await getUserSettings(storage);
    if (storedSettings) {
      setSettings(storedSettings);
    }
  }

  const toggleDarkMode = (toggled: boolean) => {
    toggleDarkTheme(toggled);
    const newSettings = {
      ...settings,
      darkMode: toggled
    }
    setSettings(newSettings);
  }

  return (
    <Page name="Settings">
      <IonList>
        <IonItem>
          <IonToggle
            checked={settings?.darkMode}
            onIonChange={(e) => toggleDarkMode(e.detail.checked)}
          >Dark Mode</IonToggle>
        </IonItem>
      </IonList>
    </Page>
  )
}

export default SettingsPage
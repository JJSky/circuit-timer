import React, { useContext, useEffect, useState } from 'react'
import { StorageContext } from '../App'
import { UserSettings } from '../shared/interfaces/ISettings'
import { IonItem, IonList, IonToggle } from '@ionic/react'
import Page from './Page'

const defaultSettings: UserSettings = {
  darkMode: false
}

const SettingsPage: React.FC = () => {
  const store = useContext(StorageContext);
  const [settings, setSettings] = useState<UserSettings | null>(null);

  useEffect(() => {
    fetchSettings();
  }, [])

  useEffect(() => {
    if (!settings) return;

    console.log("save updated settings: ", settings);
    saveSettings(settings);
  }, [settings])

  const fetchSettings = async () => {
    const storedSettings: UserSettings = await store?.get("settings");
    setSettings(storedSettings || defaultSettings);
  }

  const saveSettings = async (settings: UserSettings) => {
    await store?.set("settings", settings);
  }

  return (
    <Page name="Settings">
      <IonList>
        <IonItem>
          <IonToggle checked={settings?.darkMode}>Dark Mode</IonToggle>
        </IonItem>
      </IonList>
    </Page>
  )
}

export default SettingsPage
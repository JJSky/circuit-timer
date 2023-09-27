import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Page from './pages/Page';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import SettingsPage from './pages/SettingsPage';
import { createContext, useEffect, useState } from 'react';
import { Storage } from '@ionic/storage';
import { getUserSettings } from './shared/utils/storage';
import { toggleDarkTheme } from './shared/utils/utils';

setupIonicReact();

export const StorageContext = createContext<Storage | null>(null);

const App: React.FC = () => {
  const [storage, setStorage] = useState<Storage | null>(null);
  
  useEffect(() => {
    initStorage();
  }, [])

  useEffect(() => {
    if (!storage) return;
    initUserSettings(storage);
  }, [storage])

  const initStorage = async () => {
    const store = new Storage();
    await store.create();
    setStorage(store);
  }

  const initUserSettings = async (storage: Storage) => {
    const storedSettings = await getUserSettings(storage);

    // Use matchMedia to check the user preference
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Set Dark Mode - prioritize app settings over system settings
    toggleDarkTheme(storedSettings ? storedSettings.darkMode : systemPrefersDark.matches);
  }
  
  return (
    <StorageContext.Provider value={storage}>
      <IonApp>
        <IonReactRouter>
          <IonSplitPane contentId="main">
            <Menu />
            <IonRouterOutlet id="main">
              <Route path="/" exact={true}>
                <Redirect to="/page/timers" />
              </Route>
              <Route path="/page/settings" exact={true}>
                <SettingsPage />
              </Route>
              <Route path="/page/timers" exact={true}>
                <Page name="Timers"/>
              </Route>
            </IonRouterOutlet>
          </IonSplitPane>
        </IonReactRouter>
      </IonApp>
    </StorageContext.Provider>
  );
};

export default App;

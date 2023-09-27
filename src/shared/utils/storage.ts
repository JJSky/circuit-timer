import { Storage } from "@ionic/storage";
import { UserSettings } from "../interfaces/ISettings";

export const getUserSettings = async (store: Storage) => {
  return await store.get("settings") as UserSettings;
}

export const saveUserSettings = async (store: Storage, settings: UserSettings) => {
  return await store.set("settings", settings);
}
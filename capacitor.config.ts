import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'circuit.timer',
  appName: 'circuit-timer',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;

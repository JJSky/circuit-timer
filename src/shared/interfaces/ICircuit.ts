export enum CircuitStatus {
  Idle = "Idle",
  Playing = "Playing",
  Paused = "Paused"
}

export interface Circuit {
  id: string;
  name: string;
  status: CircuitStatus;
  timers: Timer[];
}

export interface Timer {
  id: string;
  name: string;
  minutes: number;
  seconds: number;
}
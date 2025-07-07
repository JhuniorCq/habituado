import type {
  CLUTTER_DETECTION,
  DRAWER_STATUSES,
  HUMIDITY_STATUSES,
  LIGHT_LEVEL,
  TEMPERATURE_STATUSES,
} from "./constants";

export type TemperatureStatuses = keyof typeof TEMPERATURE_STATUSES;
export type HumidityStatuses = keyof typeof HUMIDITY_STATUSES;
export type LightLevel = keyof typeof LIGHT_LEVEL;
export type ClutterDetection = keyof typeof CLUTTER_DETECTION;
export type DrawerStatuses = keyof typeof DRAWER_STATUSES;

export type LightLevelStatuses = "alta" | "baja";
export type ClutterDetectionStatuses = "ordenado" | "desordenado";

export type Alert = {
  alert: string;
  clutterDetection: ClutterDetection;
  date: string;
  drawer: DrawerStatuses;
  humidity: number;
  lightLevel: LightLevel;
  temperature: number;
  time: string;
};

export type Sensors = Omit<Alert, "alert" | "date" | "time">;

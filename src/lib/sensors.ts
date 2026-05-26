export type SensorConfig = {
  id: number;
  label: string;
  unit: string;
  min: number;
  max: number;
  decimals: number;
  color: string;
  isMotion?: boolean;
};

export const SENSORS: SensorConfig[] = [
  { id: 1, label: 'Temperature', unit: '°C', min: 18, max: 38, decimals: 1, color: '#c45c4a' },
  { id: 2, label: 'Humidity', unit: '%', min: 35, max: 85, decimals: 0, color: '#4a7bc4' },
  { id: 3, label: 'Air Quality', unit: 'AQI', min: 20, max: 180, decimals: 0, color: '#6b8f71' },
  { id: 4, label: 'Light', unit: 'lx', min: 100, max: 1200, decimals: 0, color: '#d4a017' },
  { id: 5, label: 'Pressure', unit: 'hPa', min: 990, max: 1025, decimals: 1, color: '#7b6ba8' },
  { id: 6, label: 'CO₂', unit: 'ppm', min: 400, max: 1200, decimals: 0, color: '#8B3A3A' },
  { id: 7, label: 'Moisture', unit: '%', min: 10, max: 60, decimals: 0, color: '#3d8b8b' },
  { id: 8, label: 'Sound', unit: 'dB', min: 30, max: 75, decimals: 0, color: '#9b6b4a' },
  { id: 9, label: 'Motion', unit: 'activity', min: 0, max: 100, decimals: 0, color: '#5a6b7d', isMotion: true },
  { id: 10, label: 'Voltage', unit: 'V', min: 11.5, max: 13.2, decimals: 2, color: '#4a6b5a' },
];

export const HISTORY_LENGTH = 12;
export const LIVE_INTERVAL_MS = 3000;

export function randomInRange(min: number, max: number, decimals: number): number {
  const value = min + Math.random() * (max - min);
  return decimals > 0 ? Number(value.toFixed(decimals)) : Math.round(value);
}

export function formatSensorValue(sensor: SensorConfig, value: number): string {
  if (sensor.isMotion) {
    if (value < 25) return 'Idle';
    if (value < 60) return 'Low';
    return 'Active';
  }
  return `${value}${sensor.unit === 'activity' ? '' : ' '}${sensor.unit}`;
}

export function percentOfRange(sensor: SensorConfig, value: number): number {
  return Math.min(100, Math.max(0, ((value - sensor.min) / (sensor.max - sensor.min)) * 100));
}

'use client';

import { useEffect, useRef } from 'react';
import type { SensorConfig } from '@/lib/sensors';
import { formatSensorValue, percentOfRange } from '@/lib/sensors';

type SensorCardProps = {
  sensor: SensorConfig;
  value: number;
  history: number[];
};

function drawSparkline(canvas: HTMLCanvasElement, values: number[], color: string) {
  const ctx = canvas.getContext('2d');
  if (!ctx || values.length < 2) return;

  const w = canvas.width;
  const h = canvas.height;
  const pad = 4;
  ctx.clearRect(0, 0, w, h);

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.lineJoin = 'round';
  ctx.beginPath();
  values.forEach((v, i) => {
    const x = pad + (i / (values.length - 1)) * (w - pad * 2);
    const y = h - pad - ((v - min) / range) * (h - pad * 2);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
}

export function SensorCard({ sensor, value, history }: SensorCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pct = percentOfRange(sensor, value);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const points = history.length >= 2 ? history : [value, value];
    drawSparkline(canvas, points, sensor.color);
  }, [history, value, sensor.color]);

  return (
    <article className="sensor-card">
      <div className="sensor-card-head">
        <h3>Sensor {sensor.id}</h3>
        <span className="sensor-status">Live</span>
      </div>
      <p>{sensor.label}</p>
      <div
        className="sensor-gauge"
        role="img"
        aria-label={`${sensor.label} at ${Math.round(pct)} percent`}
      >
        <div
          className="sensor-gauge-fill"
          style={{ ['--gauge-color' as string]: sensor.color, width: `${pct}%` }}
        />
      </div>
      <span className="sensor-value">Value: {formatSensorValue(sensor, value)}</span>
      <canvas ref={canvasRef} className="sensor-sparkline" width={200} height={48} aria-hidden />
    </article>
  );
}

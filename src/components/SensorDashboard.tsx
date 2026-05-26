'use client';

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  type ChartOptions,
  LinearScale,
  Tooltip,
} from 'chart.js';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  formatSensorValue,
  LIVE_INTERVAL_MS,
  percentOfRange,
  randomInRange,
  SENSORS,
} from '@/lib/sensors';
import { SensorCard } from './SensorCard';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

export function SensorDashboard() {
  const [values, setValues] = useState<number[]>(() =>
    SENSORS.map((s) => randomInRange(s.min, s.max, s.decimals))
  );
  const [history, setHistory] = useState<number[][]>(() => SENSORS.map(() => []));
  const [lastUpdated, setLastUpdated] = useState<string>('—');
  const [live, setLive] = useState(true);

  const pushReading = useCallback(() => {
    const nextValues = SENSORS.map((s) => randomInRange(s.min, s.max, s.decimals));
    setValues(nextValues);
    setHistory((prev) =>
      prev.map((h, i) => {
        const next = [...h, nextValues[i]];
        return next.length > 12 ? next.slice(-12) : next;
      })
    );
    setLastUpdated(new Date().toLocaleString());
  }, []);

  useEffect(() => {
    pushReading();
  }, [pushReading]);

  useEffect(() => {
    if (!live) return;
    const id = setInterval(pushReading, LIVE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [live, pushReading]);

  const chartData = useMemo(
    () => ({
      labels: SENSORS.map((s) => s.label),
      datasets: [
        {
          label: 'Level (% of range)',
          data: values.map((v, i) => percentOfRange(SENSORS[i], v)),
          backgroundColor: SENSORS.map((s) => `${s.color}cc`),
          borderRadius: 8,
        },
      ],
    }),
    [values]
  );

  const chartOptions: ChartOptions<'bar'> = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label(ctx) {
              const i = ctx.dataIndex;
              const s = SENSORS[i];
              return `${s.label}: ${formatSensorValue(s, values[i])}`;
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            callback(tickValue) {
              return `${tickValue}%`;
            },
          },
        },
        x: {
          ticks: { maxRotation: 45, minRotation: 0 },
        },
      },
    }),
    [values]
  );

  return (
    <section className="section">
      <div className="dashboard-toolbar">
        <p>
          Last updated: <time dateTime={lastUpdated}>{lastUpdated}</time>
        </p>
        <div className="dashboard-actions">
          <label className="live-toggle">
            <input type="checkbox" checked={live} onChange={(e) => setLive(e.target.checked)} />
            Live updates
          </label>
          <button type="button" className="button secondary" onClick={pushReading}>
            Refresh now
          </button>
        </div>
      </div>

      <div className="chart-panel">
        <h2>Overview</h2>
        <p>Relative level across all sensors (% of configured range)</p>
        <div className="chart-wrap">
          <Bar data={chartData} options={chartOptions} aria-label="Sensor overview chart" />
        </div>
      </div>

      <div className="sensor-grid" aria-live="polite">
        {SENSORS.map((sensor, i) => (
          <SensorCard key={sensor.id} sensor={sensor} value={values[i]} history={history[i]} />
        ))}
      </div>
    </section>
  );
}

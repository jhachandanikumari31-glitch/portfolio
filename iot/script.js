/**
 * Grihanirman site — shared behaviors (carousel, mobile nav, sensor dashboard).
 */

const SENSORS = [
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

const HISTORY_LENGTH = 12;
const LIVE_INTERVAL_MS = 3000;

// ——— Carousel ———
function initCarousel() {
  const slides = document.querySelectorAll('.carousel-slide');
  if (slides.length === 0) return;

  let currentIndex = 0;
  setInterval(() => {
    slides[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add('active');
  }, 4500);
}

// ——— Mobile navigation ———
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.navbar');
  if (!toggle || !nav) return;

  const close = () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  };

  toggle.addEventListener('click', () => {
    const open = !nav.classList.contains('is-open');
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('nav-open', open);
  });

  nav.querySelectorAll('.nav-link').forEach((link) => link.addEventListener('click', close));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}

// ——— Sensor helpers ———
function randomInRange(min, max, decimals) {
  const value = min + Math.random() * (max - min);
  return decimals > 0 ? Number(value.toFixed(decimals)) : Math.round(value);
}

function formatValue(sensor, value) {
  if (sensor.isMotion) {
    if (value < 25) return 'Idle';
    if (value < 60) return 'Low';
    return 'Active';
  }
  return `${value}${sensor.unit === 'activity' ? '' : ' '}${sensor.unit}`;
}

function percentOfRange(sensor, value) {
  return Math.min(100, Math.max(0, ((value - sensor.min) / (sensor.max - sensor.min)) * 100));
}

// ——— Sensor dashboard ———
function initSensorDashboard() {
  const grid = document.getElementById('sensorGrid');
  if (!grid) return;

  const history = SENSORS.map(() => []);
  const state = SENSORS.map((s) => randomInRange(s.min, s.max, s.decimals));

  grid.innerHTML = SENSORS.map(
    (s, i) => `
    <article class="sensor-card" data-index="${i}">
      <div class="sensor-card-head">
        <h3>Sensor ${s.id}</h3>
        <span class="sensor-status" aria-live="polite">Live</span>
      </div>
      <p>${s.label}</p>
      <div class="sensor-gauge" role="img" aria-label="${s.label} level">
        <div class="sensor-gauge-fill" style="--gauge-color: ${s.color}; width: 0%"></div>
      </div>
      <span class="sensor-value">Value: --</span>
      <canvas class="sensor-sparkline" width="200" height="48" aria-hidden="true"></canvas>
    </article>
  `
  ).join('');

  const cards = grid.querySelectorAll('.sensor-card');
  const lastUpdated = document.getElementById('lastUpdated');
  const liveToggle = document.getElementById('liveToggle');
  const refreshBtn = document.getElementById('refreshBtn');
  let chart = null;
  let timerId = null;

  function pushHistory(index, value) {
    const h = history[index];
    h.push(value);
    if (h.length > HISTORY_LENGTH) h.shift();
  }

  function drawSparkline(canvas, values, color) {
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    const pad = 4;
    ctx.clearRect(0, 0, w, h);

    if (values.length < 2) return;

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

  function updateCard(index) {
    const sensor = SENSORS[index];
    const value = state[index];
    const card = cards[index];
    const fill = card.querySelector('.sensor-gauge-fill');
    const valueEl = card.querySelector('.sensor-value');
    const canvas = card.querySelector('.sensor-sparkline');

    pushHistory(index, value);
    const pct = percentOfRange(sensor, value);

    fill.style.width = `${pct}%`;
    valueEl.textContent = `Value: ${formatValue(sensor, value)}`;
    drawSparkline(canvas, history[index], sensor.color);
  }

  function refreshAll() {
    SENSORS.forEach((s, i) => {
      state[i] = randomInRange(s.min, s.max, s.decimals);
      updateCard(i);
    });
    if (lastUpdated) {
      lastUpdated.textContent = new Date().toLocaleString();
    }
    updateOverviewChart();
  }

  function updateOverviewChart() {
    const canvas = document.getElementById('sensorOverviewChart');
    if (!canvas || typeof Chart === 'undefined') return;

    const labels = SENSORS.map((s) => s.label);
    const data = state.map((v, i) => percentOfRange(SENSORS[i], v));

    if (!chart) {
      chart = new Chart(canvas, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            {
              label: 'Level (% of range)',
              data,
              backgroundColor: SENSORS.map((s) => s.color + 'cc'),
              borderRadius: 8,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label(ctx) {
                  const s = SENSORS[ctx.dataIndex];
                  return `${s.label}: ${formatValue(s, state[ctx.dataIndex])}`;
                },
              },
            },
          },
          scales: {
            y: { beginAtZero: true, max: 100, ticks: { callback: (v) => `${v}%` } },
            x: { ticks: { maxRotation: 45, minRotation: 0 } },
          },
        },
      });
      return;
    }

    chart.data.datasets[0].data = data;
    chart.update('none');
  }

  function startLive() {
    stopLive();
    timerId = setInterval(refreshAll, LIVE_INTERVAL_MS);
  }

  function stopLive() {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  }

  refreshBtn?.addEventListener('click', refreshAll);
  liveToggle?.addEventListener('change', () => {
    if (liveToggle.checked) startLive();
    else stopLive();
  });

  grid.setAttribute('aria-busy', 'false');

  refreshAll();
  if (liveToggle?.checked !== false) startLive();
}

document.addEventListener('DOMContentLoaded', () => {
  initCarousel();
  initMobileNav();
  initSensorDashboard();
});

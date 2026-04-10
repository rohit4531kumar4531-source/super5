// ── DATA ──────────────────────────────────────────────────
const MODULES = ['Transport', 'Energy', 'Diet', 'Shopping', 'Travel'];

const QUESTIONS = [
  // TRANSPORT (0–2)
  {
    id: 'transport_mode',
    module: 0,
    text: 'What is your primary mode of daily transport?',
    type: 'options',
    options: [
      { value: 'walk_cycle', label: 'Walk / Cycle', icon: '🚶', sub: 'Zero emissions' },
      { value: 'public', label: 'Bus / Metro / Train', icon: '🚌', sub: 'Low impact' },
      { value: 'ev', label: 'Electric Vehicle', icon: '⚡', sub: 'Low to medium' },
      { value: 'hybrid', label: 'Hybrid Car', icon: '🚗', sub: 'Medium impact' },
      { value: 'petrol', label: 'Petrol / Diesel Car', icon: '⛽', sub: 'Higher impact' },
      { value: 'rideshare', label: 'Cab / Rideshare', icon: '🚕', sub: 'Variable' },
    ],
  },
  {
    id: 'weekly_km',
    module: 0,
    text: 'How many kilometers do you travel weekly?',
    type: 'slider',
    min: 0,
    max: 500,
    step: 10,
    unit: 'km/week',
    default: 60,
  },
  {
    id: 'car_passengers',
    module: 0,
    text: 'When you drive, how often do you carpool?',
    type: 'options',
    options: [
      { value: 'always', label: 'Always carpool', icon: '👥', sub: '2–3 people' },
      { value: 'sometimes', label: 'Sometimes', icon: '🤷', sub: '50% of rides' },
      { value: 'never', label: 'Solo always', icon: '👤', sub: 'Just me' },
      { value: 'na', label: 'Not applicable', icon: '✋', sub: "Don't drive" },
    ],
  },
  // ENERGY (3–5)
  {
    id: 'home_type',
    module: 1,
    text: 'What type of home do you live in?',
    type: 'options',
    options: [
      { value: 'apartment_small', label: 'Small Apartment', icon: '🏢', sub: '< 50 sq m' },
      { value: 'apartment_large', label: 'Large Apartment', icon: '🏙️', sub: '50–100 sq m' },
      { value: 'house_small', label: 'Small House', icon: '🏠', sub: '< 100 sq m' },
      { value: 'house_large', label: 'Large House', icon: '🏡', sub: '> 150 sq m' },
    ],
  },
  {
    id: 'energy_source',
    module: 1,
    text: 'What is your primary electricity source?',
    type: 'options',
    options: [
      { value: 'solar', label: 'Solar / Renewables', icon: '☀️', sub: 'Clean energy' },
      { value: 'grid_green', label: 'Green Grid Tariff', icon: '🌱', sub: 'Certified green' },
      { value: 'grid_mixed', label: 'Standard Grid', icon: '🔌', sub: 'Mixed sources' },
      { value: 'coal_heavy', label: 'Coal-heavy Grid', icon: '🏭', sub: 'High emissions' },
    ],
  },
  {
    id: 'monthly_kwh',
    module: 1,
    text: 'Estimate your monthly electricity usage:',
    type: 'slider',
    min: 50,
    max: 1000,
    step: 25,
    unit: 'kWh/month',
    default: 250,
  },
  // DIET (6–8)
  {
    id: 'diet_type',
    module: 2,
    text: 'Which best describes your diet?',
    type: 'options',
    options: [
      { value: 'vegan', label: 'Vegan', icon: '🥦', sub: 'Plant-only' },
      { value: 'vegetarian', label: 'Vegetarian', icon: '🥗', sub: 'No meat/fish' },
      { value: 'flexitarian', label: 'Flexitarian', icon: '🍱', sub: 'Mostly plants' },
      { value: 'omnivore', label: 'Omnivore', icon: '🍽️', sub: 'Balanced meat' },
      { value: 'heavy_meat', label: 'Meat-heavy', icon: '🥩', sub: 'Daily meat/beef' },
    ],
  },
  {
    id: 'food_waste',
    module: 2,
    text: 'How much food do you typically waste per week?',
    type: 'options',
    options: [
      { value: 'very_low', label: 'Very Little', icon: '✅', sub: 'Plan meals well' },
      { value: 'low', label: 'Some Waste', icon: '🟡', sub: 'Occasional leftovers' },
      { value: 'medium', label: 'Moderate', icon: '🟠', sub: 'Regular waste' },
      { value: 'high', label: 'A Lot', icon: '🔴', sub: 'Often throw out food' },
    ],
  },
  {
    id: 'local_food',
    module: 2,
    text: 'How often do you buy locally sourced or seasonal food?',
    type: 'options',
    options: [
      { value: 'always', label: 'Always', icon: '🌾', sub: 'Farmers markets etc.' },
      { value: 'often', label: 'Often', icon: '🛒', sub: 'More than half' },
      { value: 'rarely', label: 'Rarely', icon: '🏪', sub: 'Supermarket standard' },
      { value: 'never', label: 'Never', icon: '✈️', sub: 'Imported / processed' },
    ],
  },
  // SHOPPING (9–10)
  {
    id: 'clothing_spend',
    module: 3,
    text: 'Monthly clothing & fashion purchases:',
    type: 'slider',
    min: 0,
    max: 300,
    step: 10,
    unit: '$/month',
    default: 50,
  },
  {
    id: 'electronics',
    module: 3,
    text: 'How often do you buy new electronics?',
    type: 'options',
    options: [
      { value: 'never', label: 'Never / Very rarely', icon: '♻️', sub: 'Repair & reuse' },
      { value: 'yearly', label: 'Once a year', icon: '📱', sub: '1 device/year' },
      { value: 'bi_yearly', label: 'Twice a year', icon: '💻', sub: '2 devices/year' },
      { value: 'frequent', label: '3+ per year', icon: '🛍️', sub: 'Early adopter' },
    ],
  },
  // TRAVEL (11–12)
  {
    id: 'short_flights',
    module: 4,
    text: 'Short-haul flights per year (under 3 hours):',
    type: 'slider',
    min: 0,
    max: 20,
    step: 1,
    unit: 'flights/year',
    default: 2,
  },
  {
    id: 'long_flights',
    module: 4,
    text: 'Long-haul flights per year (over 3 hours):',
    type: 'slider',
    min: 0,
    max: 10,
    step: 1,
    unit: 'flights/year',
    default: 1,
  },
];

const CAT_COLORS = {
  Transport: '#4ade80',
  Energy: '#60a5fa',
  Diet: '#f59e0b',
  Shopping: '#c084fc',
  Travel: '#f87171',
};

const OFFSETS = [
  { id: 'trees', icon: '🌳', title: 'Tree Planting', desc: 'Fund native tree planting in degraded forests', stat: '~22 kg CO₂/tree/year', link: 'https://www.weforest.org' },
  { id: 'wetland', icon: '🌿', title: 'Wetland Restoration', desc: 'Restore carbon-rich wetlands and mangroves', stat: 'High carbon sequestration', link: '#' },
  { id: 'solar', icon: '☀️', title: 'Solar for Villages', desc: 'Fund clean energy for off-grid communities', stat: 'Avoids coal emissions', link: '#' },
  { id: 'cookstove', icon: '🔥', title: 'Clean Cookstoves', desc: 'Replace biomass cookstoves in rural India', stat: '~2.5 tons CO₂/stove/year', link: '#' },
];

// ── APP STATE ──
let appState = {
  screen: 'landing', // landing | quiz | loading | results
  current: 0,
  answers: {},
  results: null,
};

// ── CALCULATION ENGINE ──
function calcFootprint(answers) {
  let t = 0, e = 0, d = 0, s = 0, tr = 0;

  const modeFactors = { walk_cycle: 0, public: 0.089, ev: 0.053, hybrid: 0.120, petrol: 0.192, rideshare: 0.160 };
  const weeklyKm = answers.weekly_km ?? 60;
  const modeFactor = modeFactors[answers.transport_mode] ?? 0.150;
  t += weeklyKm * 52 * modeFactor;
  if (answers.car_passengers === 'always') t *= 0.6;
  else if (answers.car_passengers === 'sometimes') t *= 0.8;

  const homeFactors = { apartment_small: 0.8, apartment_large: 1.0, house_small: 1.2, house_large: 1.6 };
  const sourceFactors = { solar: 0.04, grid_green: 0.15, grid_mixed: 0.42, coal_heavy: 0.82 };
  const kwh = answers.monthly_kwh ?? 250;
  const homeMult = homeFactors[answers.home_type] ?? 1.0;
  const srcFactor = sourceFactors[answers.energy_source] ?? 0.42;
  e += kwh * 12 * srcFactor * homeMult;

  const dietBase = { vegan: 1500, vegetarian: 1700, flexitarian: 2100, omnivore: 2500, heavy_meat: 3300 };
  d = dietBase[answers.diet_type] ?? 2500;
  const wasteAdj = { very_low: 0.95, low: 1.0, medium: 1.08, high: 1.18 };
  d *= wasteAdj[answers.food_waste] ?? 1.0;
  if (answers.local_food === 'always') d *= 0.9;
  else if (answers.local_food === 'often') d *= 0.95;
  else if (answers.local_food === 'never') d *= 1.05;

  const clothingSpend = answers.clothing_spend ?? 50;
  s += clothingSpend * 12 * 4.5;
  const elecFactors = { never: 50, yearly: 300, bi_yearly: 550, frequent: 900 };
  s += elecFactors[answers.electronics] ?? 300;

  const shortF = answers.short_flights ?? 2;
  const longF = answers.long_flights ?? 1;
  tr += shortF * 255;
  tr += longF * 1620;

  const total = Math.round(t + e + d + s + tr);
  return {
    total,
    breakdown: {
      Transport: Math.round(t),
      Energy: Math.round(e),
      Diet: Math.round(d),
      Shopping: Math.round(s),
      Travel: Math.round(tr),
    },
  };
}

function getRecommendations(answers, breakdown) {
  const recs = [];

  if (breakdown.Transport > 1500) {
    if (answers.transport_mode === 'petrol' || answers.transport_mode === 'hybrid') {
      recs.push({ icon: '⚡', title: 'Switch to an Electric Vehicle', desc: 'EVs cut transport emissions by up to 70% vs petrol cars.', saving: '~1,200 kg CO₂/year', diff: 'Medium' });
    }
    if (answers.transport_mode !== 'walk_cycle' && answers.transport_mode !== 'public') {
      recs.push({ icon: '🚌', title: 'Use public transport 3 days/week', desc: 'Shifting even partial commutes significantly lowers your footprint.', saving: '~600 kg CO₂/year', diff: 'Easy' });
    }
    if (answers.car_passengers === 'never') {
      recs.push({ icon: '👥', title: 'Start a carpool group', desc: 'Sharing rides with 2 colleagues halves your per-person emissions.', saving: '~400 kg CO₂/year', diff: 'Easy' });
    }
  }

  if (breakdown.Energy > 1000) {
    if (answers.energy_source === 'grid_mixed' || answers.energy_source === 'coal_heavy') {
      recs.push({ icon: '☀️', title: 'Switch to a green energy tariff', desc: 'Many providers now offer 100% renewable electricity.', saving: '~800 kg CO₂/year', diff: 'Easy' });
    }
    recs.push({ icon: '💡', title: 'Install LED lighting & smart plugs', desc: 'LEDs use 75% less energy than standard bulbs.', saving: '~120 kg CO₂/year', diff: 'Easy' });
  }

  if (breakdown.Diet > 2200) {
    if (answers.diet_type === 'heavy_meat' || answers.diet_type === 'omnivore') {
      recs.push({ icon: '🌱', title: 'Try Meat-Free Mondays', desc: 'Reducing beef & lamb intake 3 days/week can cut diet emissions by 25%.', saving: '~350 kg CO₂/year', diff: 'Easy' });
    }
    if (answers.food_waste === 'high' || answers.food_waste === 'medium') {
      recs.push({ icon: '🗓️', title: 'Meal plan to reduce food waste', desc: 'Planning just 5 meals a week can significantly cut waste emissions.', saving: '~180 kg CO₂/year', diff: 'Easy' });
    }
  }

  if (breakdown.Travel > 1500) {
    recs.push({ icon: '🚂', title: 'Replace one short-haul flight with rail', desc: 'A 2h train journey emits ~90% fewer CO₂ per km than a flight.', saving: '~200 kg CO₂/year', diff: 'Medium' });
    recs.push({ icon: '🏖️', title: 'Choose a local staycation', desc: 'Skipping one long-haul holiday saves over 1.5 tons of CO₂.', saving: '~1,600 kg CO₂/year', diff: 'Hard' });
  }

  if (breakdown.Shopping > 600) {
    recs.push({ icon: '👗', title: 'Buy secondhand clothing', desc: 'Thrifted clothing has up to 82% lower carbon footprint.', saving: '~200 kg CO₂/year', diff: 'Easy' });
    recs.push({ icon: '🔧', title: 'Repair electronics instead of replacing', desc: 'Extending device life by 2 years avoids manufacturing emissions.', saving: '~300 kg CO₂/year', diff: 'Medium' });
  }

  recs.push({ icon: '🌳', title: 'Offset remaining emissions', desc: 'Plant native trees to neutralize what you can\'t yet eliminate.', saving: 'Variable', diff: 'Easy' });

  return recs.slice(0, 6);
}

// ── RENDERING ──
function renderLanding() {
  const root = document.getElementById('root');
  const template = document.getElementById('landing-template');
  root.innerHTML = template.innerHTML;
  
  document.getElementById('start-btn').addEventListener('click', () => {
    appState.screen = 'quiz';
    render();
  });
}

function renderQuiz() {
  const root = document.getElementById('root');
  const template = document.getElementById('quiz-template');
  root.innerHTML = template.innerHTML;

  const currentQ = QUESTIONS[appState.current];
  const progress = (appState.current / QUESTIONS.length) * 100;

  // Update progress
  document.getElementById('question-counter').textContent = `Question ${appState.current + 1} of ${QUESTIONS.length}`;
  document.getElementById('progress-percent').textContent = `${Math.round((appState.current / QUESTIONS.length) * 100)}% complete`;
  document.getElementById('progress-fill').style.width = `${progress}%`;

  // Update module tabs
  const tabsContainer = document.getElementById('module-tabs');
  tabsContainer.innerHTML = MODULES.map((m, i) => {
    const qs = QUESTIONS.filter(q => q.module === i);
    const answered = qs.every(q => appState.answers[q.id] !== undefined);
    const active = QUESTIONS[appState.current]?.module === i;
    const classes = `module-tab ${active ? 'active' : answered ? 'done' : ''}`;
    return `<div class="${classes}">${m}</div>`;
  }).join('');

  // Update question
  document.getElementById('question-module').textContent = MODULES[currentQ.module];
  document.getElementById('question-text').textContent = currentQ.text;

  // Render options or slider
  if (currentQ.type === 'options') {
    const container = document.getElementById('options-container');
    const sliderContainer = document.getElementById('slider-container');
    sliderContainer.style.display = 'none';
    
    const isSingleCol = currentQ.options.length <= 3;
    container.className = `options-grid ${isSingleCol ? 'single-col' : ''}`;
    
    container.innerHTML = currentQ.options.map(opt => {
      const isSelected = appState.answers[currentQ.id] === opt.value;
      return `
        <button class="opt-btn ${isSelected ? 'selected' : ''}" data-value="${opt.value}">
          <span class="opt-icon">${opt.icon}</span>
          <span>
            <div class="opt-label">${opt.label}</div>
            <div class="opt-sub">${opt.sub}</div>
          </span>
        </button>
      `;
    }).join('');

    container.querySelectorAll('.opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        appState.answers[currentQ.id] = btn.dataset.value;
        renderQuiz();
      });
    });
  } else if (currentQ.type === 'slider') {
    const container = document.getElementById('options-container');
    const sliderContainer = document.getElementById('slider-container');
    container.innerHTML = '';
    sliderContainer.style.display = 'block';

    const sliderValue = appState.answers[currentQ.id] ?? currentQ.default ?? currentQ.min;
    document.getElementById('slider-input').value = sliderValue;
    document.getElementById('slider-input').min = currentQ.min;
    document.getElementById('slider-input').max = currentQ.max;
    document.getElementById('slider-input').step = currentQ.step;
    document.getElementById('slider-value').textContent = sliderValue;
    document.getElementById('slider-unit').textContent = currentQ.unit;
    document.getElementById('slider-min').textContent = currentQ.min;
    document.getElementById('slider-max').textContent = currentQ.max;

    document.getElementById('slider-input').addEventListener('input', (e) => {
      appState.answers[currentQ.id] = Number(e.target.value);
      document.getElementById('slider-value').textContent = e.target.value;
      renderQuiz();
    });
  }

  // Update button states
  const backBtn = document.getElementById('back-btn');
  const nextBtn = document.getElementById('next-btn');
  
  backBtn.disabled = appState.current === 0;
  backBtn.addEventListener('click', () => {
    if (appState.current > 0) {
      appState.current--;
      renderQuiz();
    } else {
      appState.screen = 'landing';
      render();
    }
  });

  const isLastQuestion = appState.current === QUESTIONS.length - 1;
  nextBtn.textContent = isLastQuestion ? '🌿 See My Results' : 'Continue →';
  nextBtn.disabled = currentQ.type === 'options' && !appState.answers[currentQ.id];
  
  nextBtn.addEventListener('click', () => {
    if (currentQ.type === 'slider' && appState.answers[currentQ.id] === undefined) {
      appState.answers[currentQ.id] = currentQ.default;
    }
    
    if (appState.current < QUESTIONS.length - 1) {
      appState.current++;
      renderQuiz();
    } else {
      submitAssessment();
    }
  });

  document.getElementById('exit-btn').addEventListener('click', () => {
    appState.screen = 'landing';
    appState.current = 0;
    appState.answers = {};
    render();
  });
}

function renderLoading() {
  const root = document.getElementById('root');
  const template = document.getElementById('loading-template');
  root.innerHTML = template.innerHTML;
}

function renderResults() {
  const root = document.getElementById('root');
  const template = document.getElementById('results-template');
  root.innerHTML = template.innerHTML;

  const { total, breakdown, recommendations } = appState.results;
  const treesNeeded = Math.ceil(total / 22);
  const maxCat = Math.max(...Object.values(breakdown));
  const grade = total < 4000 ? 'A' : total < 8000 ? 'B' : total < 12000 ? 'C' : 'D';
  const gradeLabel = { A: 'Eco Warrior', B: 'Conscious Citizen', C: 'High Impact', D: 'Heavy Footprint' };

  // Gauge
  drawGauge(total, grade);
  document.getElementById('gauge-val').innerHTML = `${total.toLocaleString()} <span class="gauge-unit">kg CO₂e/year</span>`;
  document.getElementById('grade-pill').textContent = gradeLabel[grade];
  document.getElementById('grade-pill').className = `grade-pill grade-${grade}`;

  // Benchmarks
  const benchmarksContainer = document.getElementById('benchmarks-container');
  benchmarksContainer.innerHTML = `
    <div class="bm-card you">
      <div class="bm-num">${(total / 1000).toFixed(1)}t</div>
      <div class="bm-label">You</div>
    </div>
    <div class="bm-card">
      <div class="bm-num">4.8t</div>
      <div class="bm-label">Global Avg</div>
    </div>
    <div class="bm-card">
      <div class="bm-num">2.3t</div>
      <div class="bm-label">1.5°C Target</div>
    </div>
  `;

  // Category breakdown
  const categoryBarsContainer = document.getElementById('category-bars');
  categoryBarsContainer.innerHTML = Object.entries(breakdown).map(([cat, val]) => {
    const icon = cat === 'Transport' ? '🚗' : cat === 'Energy' ? '⚡' : cat === 'Diet' ? '🍽️' : cat === 'Shopping' ? '🛍️' : '✈️';
    return `
      <div class="cat-row">
        <span class="cat-icon">${icon}</span>
        <span class="cat-name">${cat}</span>
        <div class="cat-bar-wrap">
          <div class="cat-bar-fill" style="width: ${(val / maxCat) * 100}%; background: ${CAT_COLORS[cat]};"></div>
        </div>
        <span class="cat-val" style="color: ${CAT_COLORS[cat]};">${val.toLocaleString()} kg</span>
      </div>
    `;
  }).join('');

  // Recommendations
  const recsContainer = document.getElementById('recommendations-container');
  recsContainer.innerHTML = recommendations.map(r => `
    <div class="rec-card">
      <div class="rec-icon-wrap">${r.icon}</div>
      <div class="rec-body">
        <div class="rec-title">${r.title}</div>
        <div class="rec-desc">${r.desc}</div>
        <div class="rec-meta">
          <span class="rec-saving">Saves ${r.saving}</span>
          <span class="rec-diff">${r.diff}</span>
        </div>
      </div>
    </div>
  `).join('');

  // Trees
  document.getElementById('trees-num').textContent = `🌳 ${treesNeeded.toLocaleString()}`;

  // Offsets
  const offsetsContainer = document.getElementById('offsets-container');
  offsetsContainer.innerHTML = OFFSETS.map(o => `
    <div class="offset-card" onclick="window.open('${o.link}', '_blank')">
      <div class="offset-title">${o.icon} ${o.title}</div>
      <div class="offset-desc">${o.desc}</div>
      <div class="offset-stat">${o.stat}</div>
    </div>
  `).join('');

  // Share button
  document.getElementById('share-btn').addEventListener('click', () => {
    const text = `My annual carbon footprint is ${total.toLocaleString()} kg CO₂e — assessed with EcoTrace. #EcoTrace`;
    navigator.clipboard?.writeText(text).then(() => alert('Copied to clipboard!'));
  });

  // Retake button
  document.getElementById('retake-btn').addEventListener('click', () => {
    appState.screen = 'landing';
    appState.current = 0;
    appState.answers = {};
    appState.results = null;
    render();
  });
}

function drawGauge(value, grade) {
  const max = 20000;
  const pct = Math.min(value / max, 1);
  const r = 70;
  const circ = 2 * Math.PI * r;
  const dash = circ * pct;

  let color = '#4ade80';
  if (value > 8000) color = '#f87171';
  else if (value > 4000) color = '#fb923c';

  const svg = document.getElementById('gauge-svg');
  svg.innerHTML = `
    <circle cx="90" cy="90" r="${r}" fill="none" stroke="#1f2e25" stroke-width="12"/>
    <circle
      cx="90" cy="90" r="${r}"
      fill="none"
      stroke="${color}"
      stroke-width="12"
      stroke-linecap="round"
      stroke-dasharray="${dash} ${circ - dash}"
      stroke-dashoffset="${circ * 0.25}"
      style="transition: stroke-dasharray 1.5s cubic-bezier(0.4,0,0.2,1);"
    />
    <text x="90" y="82" text-anchor="middle" fill="${color}" font-size="26" font-weight="800" font-family="Syne">
      ${(value / 1000).toFixed(1)}k
    </text>
    <text x="90" y="102" text-anchor="middle" fill="#6b8a72" font-size="11">
      kg CO₂e
    </text>
  `;
}

async function submitAssessment() {
  appState.screen = 'loading';
  render();

  await new Promise(r => setTimeout(r, 1500));

  const finalAnswers = { ...appState.answers };
  QUESTIONS.forEach(q => {
    if (q.type === 'slider' && finalAnswers[q.id] === undefined) {
      finalAnswers[q.id] = q.default;
    }
  });

  const calc = calcFootprint(finalAnswers);
  const recs = getRecommendations(finalAnswers, calc.breakdown);
  appState.results = { ...calc, recommendations: recs };
  appState.screen = 'results';
  render();
}

function render() {
  if (appState.screen === 'landing') renderLanding();
  else if (appState.screen === 'quiz') renderQuiz();
  else if (appState.screen === 'loading') renderLoading();
  else if (appState.screen === 'results') renderResults();
}

// Initialize app
render();
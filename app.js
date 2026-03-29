/* ============================================
   Lunar Drift — Fear Edition v2
   ============================================ */

(function() {
  'use strict';

  // Constants
  const SPEED_OF_LIGHT = 299792.458; // km/s
  const LUNAR_DRIFT_CM_PER_YEAR = 3.8;
  const LUNAR_DRIFT_NM_PER_MS = (LUNAR_DRIFT_CM_PER_YEAR * 1e7) / (365.25 * 24 * 60 * 60 * 1000);
  const AVG_LUNAR_DISTANCE = 384400; // km
  const SILICON_ATOM_SIZE_NM = 0.22; // nm

  // State
  let pageLoadTime = Date.now();
  let currentDistance = 0;
  let currentRate = 0;
  let chartData = [];
  let chartCanvas, chartCtx;

  // DOM elements cache
  const elements = {};

  // Initialize
  function init() {
    // Cache elements
    const ids = [
      'counter', 'status', 'rate', 'chart', 'tooltip',
      'nm-counter', 
      'fact', 'share-btn', 'stars', 'timeline-distance'
    ];
    ids.forEach(id => {
      elements[id] = document.getElementById(id);
    });

    initStarField();
    initChart();
    initRevealAnimations();
    initShareButton();
    initLifetimeCalc();
    initActionShare();
    initSignup();
    initStatSharing();

    updateMoonData();
    generateChartData();
    drawChart();

    // Start loops
    setInterval(updateMoonData, 1000);
    setInterval(updateNanometerCounter, 50);
    setInterval(rotateFact, 8000);
    rotateFact();
  }

  // ============================================
  // Moon Calculations
  // ============================================

  function getMoonData(date = new Date()) {
    const moonPos = SunCalc.getMoonPosition(date, 0, 0);
    const moonIllum = SunCalc.getMoonIllumination(date);
    return {
      distance: moonPos.distance,
      illumination: moonIllum.fraction,
      phase: moonIllum.phase
    };
  }

  function calculateRate() {
    const now = new Date();
    const before = new Date(now.getTime() - 60000);
    const distNow = getMoonData(now).distance;
    const distBefore = getMoonData(before).distance;
    return (distNow - distBefore) / 60;
  }

  // ============================================
  // UI Updates
  // ============================================

  function updateMoonData() {
    const data = getMoonData();
    currentDistance = data.distance;
    currentRate = calculateRate();

    if (elements['counter']) {
      elements['counter'].textContent = formatDistance(currentDistance);
    }

    const isReceding = currentRate > 0;
    const statusText = isReceding ? 'receding' : 'approaching';
    
    if (elements['status']) {
      elements['status'].textContent = statusText;
      elements['status'].className = 'status ' + statusText;
    }

    if (elements['rate']) {
      const rateAbs = Math.abs(currentRate).toFixed(3);
      const rateDir = isReceding ? '+' : '−';
      elements['rate'].innerHTML = `${rateDir}${rateAbs} km/s`;
    }

    if (elements['timeline-distance']) {
      elements['timeline-distance'].textContent = formatDistance(currentDistance);
    }
  }

  function formatDistance(km) {
    return km.toLocaleString('en-US', { maximumFractionDigits: 0 }) + ' km';
  }

  function updateNanometerCounter() {
    const elapsed = Date.now() - pageLoadTime;
    const nm = elapsed * LUNAR_DRIFT_NM_PER_MS;
    const atoms = Math.floor(nm / SILICON_ATOM_SIZE_NM);
    
    if (elements['nm-counter']) {
      elements['nm-counter'].textContent = nm.toFixed(2);
    }


  }

  // ============================================
  // Chart
  // ============================================

  function initChart() {
    chartCanvas = elements['chart'];
    if (!chartCanvas) return;
    chartCtx = chartCanvas.getContext('2d');
    
    function resize() {
      const rect = chartCanvas.parentElement.getBoundingClientRect();
      chartCanvas.width = rect.width - 32;
      chartCanvas.height = rect.height - 32;
      if (chartData.length) drawChart();
    }
    
    window.addEventListener('resize', resize);
    resize();
  }

  function generateChartData() {
    chartData = [];
    const now = new Date();
    
    for (let i = -30; i <= 30; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() + i);
      date.setHours(12, 0, 0, 0);
      
      const data = getMoonData(date);
      chartData.push({
        date: date,
        distance: data.distance,
        isToday: i === 0
      });
    }
  }

  function drawChart() {
    if (!chartCtx) return;
    
    const ctx = chartCtx;
    const w = chartCanvas.width;
    const h = chartCanvas.height;
    const padding = { top: 20, right: 20, bottom: 40, left: 60 };
    
    ctx.clearRect(0, 0, w, h);
    
    const distances = chartData.map(d => d.distance);
    const minD = Math.min(...distances) - 2000;
    const maxD = Math.max(...distances) + 2000;
    
    const xScale = (i) => padding.left + (i / (chartData.length - 1)) * (w - padding.left - padding.right);
    const yScale = (d) => padding.top + (1 - (d - minD) / (maxD - minD)) * (h - padding.top - padding.bottom);
    
    // Grid lines
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 5; i++) {
      const y = padding.top + (i / 4) * (h - padding.top - padding.bottom);
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(w - padding.right, y);
      ctx.stroke();
    }
    
    // Y-axis labels
    ctx.fillStyle = '#6a6a7a';
    ctx.font = '11px Space Mono, monospace';
    ctx.textAlign = 'right';
    for (let i = 0; i < 5; i++) {
      const val = maxD - (i / 4) * (maxD - minD);
      const y = padding.top + (i / 4) * (h - padding.top - padding.bottom);
      ctx.fillText(Math.round(val / 1000) + 'k', padding.left - 8, y + 4);
    }
    
    // X-axis labels
    ctx.textAlign = 'center';
    const labelIndices = [0, 15, 30, 45, 60];
    labelIndices.forEach(i => {
      if (i < chartData.length) {
        const x = xScale(i);
        const date = chartData[i].date;
        const label = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        ctx.fillText(label, x, h - 10);
      }
    });
    
    // Draw line
    ctx.beginPath();
    ctx.strokeStyle = '#ff6b6b';
    ctx.lineWidth = 2;
    chartData.forEach((d, i) => {
      const x = xScale(i);
      const y = yScale(d.distance);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    
    // Gradient fill
    const gradient = ctx.createLinearGradient(0, padding.top, 0, h - padding.bottom);
    gradient.addColorStop(0, 'rgba(255, 107, 107, 0.3)');
    gradient.addColorStop(1, 'rgba(255, 107, 107, 0)');
    
    ctx.beginPath();
    chartData.forEach((d, i) => {
      const x = xScale(i);
      const y = yScale(d.distance);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.lineTo(xScale(chartData.length - 1), h - padding.bottom);
    ctx.lineTo(xScale(0), h - padding.bottom);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Mark perigees and apogees
    chartData.forEach((d, i) => {
      const prev = chartData[i - 1];
      const next = chartData[i + 1];
      if (!prev || !next) return;
      
      const isLocalMin = d.distance < prev.distance && d.distance < next.distance;
      const isLocalMax = d.distance > prev.distance && d.distance > next.distance;
      
      if (isLocalMin || isLocalMax) {
        const x = xScale(i);
        const y = yScale(d.distance);
        
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = isLocalMin ? '#00d4aa' : '#ff6b6b';
        ctx.fill();
        
        ctx.fillStyle = isLocalMin ? '#00d4aa' : '#ff6b6b';
        ctx.font = '10px Space Grotesk, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(isLocalMin ? 'P' : 'A', x, y - 10);
      }
    });
    
    // Today marker
    const todayIdx = chartData.findIndex(d => d.isToday);
    if (todayIdx >= 0) {
      const x = xScale(todayIdx);
      ctx.strokeStyle = 'rgba(255,255,255,0.3)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(x, padding.top);
      ctx.lineTo(x, h - padding.bottom);
      ctx.stroke();
      ctx.setLineDash([]);
      
      ctx.fillStyle = '#e0e0e8';
      ctx.font = '10px Space Grotesk, sans-serif';
      ctx.fillText('now', x, padding.top - 5);
    }
    
    // Tooltip
    if (chartCanvas && elements['tooltip']) {
      chartCanvas.onmousemove = (e) => {
        const rect = chartCanvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const idx = Math.round((x - padding.left) / (w - padding.left - padding.right) * (chartData.length - 1));
        
        if (idx >= 0 && idx < chartData.length) {
          const d = chartData[idx];
          elements['tooltip'].innerHTML = `${d.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}<br>${formatDistance(d.distance)}`;
          elements['tooltip'].style.left = (xScale(idx) + 10) + 'px';
          elements['tooltip'].style.top = (yScale(d.distance) - 30) + 'px';
          elements['tooltip'].classList.add('visible');
        }
      };
      
      chartCanvas.onmouseleave = () => {
        elements['tooltip'].classList.remove('visible');
      };
    }
  }

  // ============================================
  // Fun Facts
  // ============================================

  const factGenerators = [
    () => `In 600 million years, the Moon will be too far for total solar eclipses. They will end forever.`,
    () => `Right now, ${(currentDistance / 12742).toFixed(1)} Earths could fit between us and the Moon. That number grows every year.`,
    () => `The Moon stabilizes Earth's axial tilt. Without it, our axis could wobble from 0° to 85°, causing uninhabitable climate swings.`,
    () => `Earth's day was once 5 hours long. The Moon's gravity has been slowing us down for 4.5 billion years.`,
    () => `Days grow 2.3 milliseconds longer every century. GPS satellites must be constantly adjusted to compensate.`,
    () => `The Moon is receding at 3.8 cm/year — roughly the speed your fingernails grow. It sounds slow. It never stops.`,
    () => `When the Moon formed, it was 17× closer than today. Tides were kilometers high.`,
    () => `Light takes ${(currentDistance / SPEED_OF_LIGHT).toFixed(2)} seconds to reach the Moon. That time is increasing.`,
    () => `Tidal friction transfers Earth's rotational energy to the Moon's orbit. We are literally pushing it away.`,
    () => `Coral spawning — the largest synchronized reproduction event on Earth — is triggered by moonlight. That signal is fading.`
  ];

  let currentFactIndex = 0;

  function rotateFact() {
    if (!elements['fact']) return;
    const fact = factGenerators[currentFactIndex]();
    elements['fact'].style.opacity = 0;
    
    setTimeout(() => {
      elements['fact'].textContent = fact;
      elements['fact'].style.opacity = 1;
    }, 500);
    
    currentFactIndex = (currentFactIndex + 1) % factGenerators.length;
  }

  // ============================================
  // Star Field
  // ============================================

  function initStarField() {
    const canvas = elements['stars'];
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = document.body.scrollHeight;
      drawStars();
    }
    
    function drawStars() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const numStars = Math.floor((canvas.width * canvas.height) / 8000);
      
      for (let i = 0; i < numStars; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 1.2;
        const opacity = Math.random() * 0.4 + 0.1;
        
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      }
    }
    
    window.addEventListener('resize', resize);
    setTimeout(resize, 100);
  }

  // ============================================
  // Reveal Animations
  // ============================================

  function initRevealAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  // ============================================
  // Lifetime Calculator
  // ============================================

  function initLifetimeCalc() {
    const input = document.getElementById('birth-year');
    const btn = document.getElementById('calc-btn');
    const result = document.getElementById('lifetime-result');
    if (!input || !btn || !result) return;

    function calculate() {
      const year = parseInt(input.value, 10);
      if (!year || year < 1900 || year > new Date().getFullYear()) return;

      const now = new Date();
      const age = now.getFullYear() - year;
      const yearsLived = Math.max(0, age);
      const yearsTo80 = Math.max(0, 80 - age);

      // 3.8 cm/year drift
      const cmSinceBirth = yearsLived * LUNAR_DRIFT_CM_PER_YEAR;
      const cmBy80 = 80 * LUNAR_DRIFT_CM_PER_YEAR; // total over 80 years from birth

      const distEl = document.getElementById('life-distance');
      const projEl = document.getElementById('life-projection');
      const ctxEl = document.getElementById('life-context');

      if (distEl) distEl.textContent = formatCmHuman(cmSinceBirth);
      if (projEl) projEl.textContent = formatCmHuman(cmBy80);

      // Relatable comparison
      const comparisons = [];
      if (cmSinceBirth >= 100) {
        comparisons.push(`${(cmSinceBirth / 100).toFixed(1)} meters — taller than ${cmSinceBirth >= 180 ? 'you are' : 'a child'}`);
      } else if (cmSinceBirth >= 30) {
        comparisons.push(`about the length of your arm`);
      } else if (cmSinceBirth >= 15) {
        comparisons.push(`roughly the length of your forearm`);
      } else {
        comparisons.push(`about the width of your hand`);
      }

      if (ctxEl) {
        ctxEl.innerHTML = `That's ${comparisons[0]}. Doesn't sound like much — but it never stops, and it <em>never</em> comes back.`;
      }

      result.classList.remove('hidden');
      result.classList.add('visible');
    }

    btn.addEventListener('click', calculate);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') calculate();
    });

    // Share lifetime result
    const shareBtn = document.getElementById('share-lifetime');
    if (shareBtn) {
      shareBtn.addEventListener('click', async () => {
        const year = parseInt(input.value, 10);
        if (!year) return;
        const age = new Date().getFullYear() - year;
        const cm = age * LUNAR_DRIFT_CM_PER_YEAR;
        const text = `Since I was born in ${year}, the Moon has drifted ${formatCmHuman(cm)} farther from Earth. It will never come back.`;
        const url = window.location.href;

        if (navigator.share) {
          try { await navigator.share({ text, url }); } catch(e) {}
        } else {
          await navigator.clipboard.writeText(text + ' ' + url);
          const orig = shareBtn.textContent;
          shareBtn.textContent = 'Copied!';
          setTimeout(() => shareBtn.textContent = orig, 2000);
        }
      });
    }
  }

  function formatCmHuman(cm) {
    if (cm >= 100) return (cm / 100).toFixed(1) + ' meters';
    return cm.toFixed(1) + ' cm';
  }

  // ============================================
  // Share Button
  // ============================================

  function initShareButton() {
    const btn = elements['share-btn'];
    if (!btn) return;
    
    btn.addEventListener('click', async () => {
      const text = `The Moon is leaving Earth at 3.8 cm per year. Right now it's ${formatDistance(currentDistance)} away. Watch it happen:`;
      const url = window.location.href;
      
      if (navigator.share) {
        try {
          await navigator.share({ text, url });
        } catch (e) {}
      } else {
        await navigator.clipboard.writeText(text + ' ' + url);
        const orig = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => btn.textContent = orig, 2000);
      }
    });
  }

  // ============================================
  // Email Signup
  // ============================================

  function initSignup() {
    const form = document.getElementById('signup-form');
    const emailInput = document.getElementById('signup-email');
    const btn = document.getElementById('signup-btn');
    const status = document.getElementById('signup-status');
    if (!form || !emailInput || !btn) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();
      if (!email) return;

      // Store in localStorage (no backend yet)
      const signups = JSON.parse(localStorage.getItem('lunar-drift-signups') || '[]');
      if (signups.includes(email)) {
        if (status) {
          status.textContent = "You're already on the watch list.";
          status.classList.add('success');
        }
        return;
      }
      signups.push(email);
      localStorage.setItem('lunar-drift-signups', JSON.stringify(signups));

      emailInput.value = '';
      btn.textContent = '✓ Joined';
      btn.disabled = true;
      if (status) {
        status.textContent = "You're in. We'll reach out at the next perigee.";
        status.classList.add('success');
      }
    });
  }

  // ============================================
  // Action Section Share
  // ============================================

  function initActionShare() {
    const btn = document.querySelector('.action-share-btn');
    if (!btn) return;

    btn.addEventListener('click', async () => {
      const text = `The Moon is leaving Earth at 3.8 cm per year. Most people have never heard about it. This site made me think:`;
      const url = window.location.href;

      if (navigator.share) {
        try { await navigator.share({ text, url }); } catch(e) {}
      } else {
        await navigator.clipboard.writeText(text + ' ' + url);
        const orig = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => btn.textContent = orig, 2000);
      }
    });
  }

  // ============================================
  // Shareable Stat Cards
  // ============================================

  function initStatSharing() {
    document.querySelectorAll('.stat-share-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const card = btn.closest('.shareable-stat');
        if (!card) return;

        const text = card.dataset.shareText;
        const url = window.location.href;

        if (navigator.share) {
          try { await navigator.share({ text, url }); } catch(e) {}
        } else {
          await navigator.clipboard.writeText(text + ' ' + url);
          btn.classList.add('copied');
          btn.textContent = '✓';
          setTimeout(() => {
            btn.classList.remove('copied');
            btn.textContent = '↗';
          }, 2000);
        }
      });
    });
  }

  // Start
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

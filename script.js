let selectedWeaponDamage = 0;
let selectedWeaponReload = 0;
let selectedWeaponFireRate = 0;
let selectedArmorHp = 100;

let comparisons = [];

// Default multipliers
const attachmentMultipliers = {
  optics: 1,
  barrel: 1,
  grip: 1,
  magazine: 1,
};

function toggleAccordion(element) {
  const attachmentCategory = element.parentNode;
  if (attachmentCategory.classList.contains('active')) {
    attachmentCategory.classList.remove('active');
  } else {
    const activeCategory = document.querySelector('.attachment-category.active');
    if (activeCategory && activeCategory !== attachmentCategory) {
      activeCategory.classList.remove('active');
    }
    attachmentCategory.classList.add('active');
  }
}

function selectWeapon(button, weaponName, baseDamage, reloadSpeed, fireRate) {
  const weaponButtons = document.querySelectorAll('.weapon-button');
  weaponButtons.forEach(btn => btn.classList.remove('selected'));

  if (button.classList.contains('selected')) {
    button.classList.remove('selected');
    selectedWeaponDamage = 0;
    selectedWeaponReload = 0;
    selectedWeaponFireRate = 0;
  } else {
    button.classList.add('selected');
    selectedWeaponDamage = baseDamage;
    selectedWeaponReload = reloadSpeed;
    selectedWeaponFireRate = fireRate;
  }

  calculateStats();
}

function selectAttachment(button, category, multiplier) {
  if (button.classList.contains('selected')) {
    button.classList.remove('selected');
    attachmentMultipliers[category] = 1;
  } else {
    const attachmentButtons = button.parentNode.querySelectorAll('.attachment-button');
    attachmentButtons.forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
    attachmentMultipliers[category] = multiplier;
  }

  calculateStats();
}

function selectArmor(button, armorType, armorHp) {
  const armorButtons = document.querySelectorAll('.armor-button');
  armorButtons.forEach(btn => btn.classList.remove('selected'));

  if (button.classList.contains('selected')) {
    button.classList.remove('selected');
    selectedArmorHp = 100;
  } else {
    button.classList.add('selected');
    selectedArmorHp = 100 + armorHp;
  }

  calculateStats();
}

function calculateStats() {
  const combinedMultiplier = Object.values(attachmentMultipliers).reduce((a, b) => a * b, 1);
  const finalDamageHeadshot = selectedWeaponDamage * combinedMultiplier * 1.5;
  const finalDamageBodyshot = selectedWeaponDamage * combinedMultiplier;

  const shotsToKill = Math.ceil(selectedArmorHp / finalDamageBodyshot);
  const ttkHeadshot = (shotsToKill / (selectedWeaponFireRate / 60)).toFixed(2);
  const ttkBodyshot = (shotsToKill / (selectedWeaponFireRate / 60)).toFixed(2);

  document.getElementById('ttkHeadshot').textContent = `${ttkHeadshot}s`;
  document.getElementById('ttkBodyshot').textContent = `${ttkBodyshot}s`;
  document.getElementById('damageHeadshot').textContent = finalDamageHeadshot.toFixed(2);
  document.getElementById('damageBodyshot').textContent = finalDamageBodyshot.toFixed(2);
  document.getElementById('shotsToKill').textContent = shotsToKill;
  document.getElementById('fireRate').textContent = `${selectedWeaponFireRate} RPM`;

  renderFalloffChart("Selected Weapon", finalDamageBodyshot);
}

function renderFalloffChart(weaponName, baseDamage) {
  Highcharts.chart('falloffChart', {
    chart: { type: 'line', backgroundColor: '#292929' },
    title: { text: 'Damage Falloff Chart', style: { color: '#e0e0e0' } },
    xAxis: { categories: ['0', '20', '40', '60'], labels: { style: { color: '#e0e0e0' } } },
    yAxis: { title: { text: 'Multiplier', style: { color: '#e0e0e0' } }, min: 0, max: 1.5 },
    series: [{ name: weaponName || 'No Weapon', data: [1, 0.8, 0.6, 0.5], color: '#aad1e6' }],
  });
}

function compareStats() {
  const currentStats = {
    ttkHeadshot: document.getElementById('ttkHeadshot').textContent,
    ttkBodyshot: document.getElementById('ttkBodyshot').textContent,
  };

  if (comparisons.length < 2) {
    comparisons.push(currentStats);
  } else {
    showModal();
  }

  if (comparisons.length === 2) displayComparison();
}

function displayComparison() {
  const compareResults = document.getElementById('compareResults');
  compareResults.innerHTML = `
    <div class="comparison-grid">
      <div>TTK Headshot:</div><div>${comparisons[0].ttkHeadshot}</div><div>${comparisons[1].ttkHeadshot}</div>
      <div>TTK Bodyshot:</div><div>${comparisons[0].ttkBodyshot}</div><div>${comparisons[1].ttkBodyshot}</div>
    </div>`;
}

function showModal() {
  document.getElementById('compareModal').style.display = 'block';
}

function closeModal() {
  document.getElementById('compareModal').style.display = 'none';
}

function replaceComparison(index) {
  comparisons[index] = {
    ttkHeadshot: document.getElementById('ttkHeadshot').textContent,
    ttkBodyshot: document.getElementById('ttkBodyshot').textContent,
  };
  closeModal();
  displayComparison();
}

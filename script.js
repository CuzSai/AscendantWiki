let selectedWeaponDamage = 0;
let selectedWeaponReload = 0;
let selectedWeaponFireRate = 0;
let selectedArmorHp = 100;

let comparisons = [
  null, // Setup 1
  null  // Setup 2
];

const attachmentMultipliers = {
  optics: 1,
  barrel: 1,
  grip: 1,
  magazine: 1
};

function toggleAccordion(element) {
  const attachmentCategory = element.parentNode;
  attachmentCategory.classList.toggle('active');
}

function selectWeapon(button, weaponName, baseDamage, reloadSpeed, fireRate) {
  document.querySelectorAll('.weapon-button').forEach(btn => btn.classList.remove('selected'));
  button.classList.add('selected');

  selectedWeaponDamage = baseDamage;
  selectedWeaponReload = reloadSpeed;
  selectedWeaponFireRate = fireRate;

  calculateStats();
}

function selectAttachment(button, category, multiplier) {
  document.querySelectorAll(`.attachment-button`).forEach(btn => btn.classList.remove('selected'));
  button.classList.add('selected');

  attachmentMultipliers[category] = multiplier;
  calculateStats();
}

function selectArmor(button, armorType, armorHp) {
  document.querySelectorAll('.armor-button').forEach(btn => btn.classList.remove('selected'));
  button.classList.add('selected');

  selectedArmorHp = 100 + armorHp; 
  calculateStats();
}

function calculateStats() {
  if (selectedWeaponDamage === 0) return;

  const combinedMultiplier = Object.values(attachmentMultipliers).reduce((a, b) => a * b, 1);
  const finalDamage = selectedWeaponDamage * combinedMultiplier;

  const shotsToKill = Math.ceil(selectedArmorHp / finalDamage);
  const ttkBodyshot = (shotsToKill / (selectedWeaponFireRate / 60)).toFixed(2);

  document.getElementById('ttkBodyshot').textContent = `${ttkBodyshot}s`;
  document.getElementById('damageBodyshot').textContent = finalDamage.toFixed(2);

  renderFalloffChart('Current Weapon', finalDamage);
}

function renderFalloffChart(weaponName, baseDamage) {
  Highcharts.chart('falloffChart', {
    chart: { type: 'line', backgroundColor: '#292929' },
    title: { text: 'Damage Falloff', style: { color: '#e0e0e0' } },
    xAxis: { title: { text: 'Distance (m)' }, categories: [0, 20, 40], labels: { style: { color: '#e0e0e0' } } },
    yAxis: { title: { text: 'Damage Multiplier' }, max: 1.5 },
    series: [{ name: weaponName, data: [1, 0.8, 0.6].map(v => v * baseDamage) }]
  });
}

function openCompareModal() {
  document.getElementById('compareModal').style.display = 'block';
}

function closeCompareModal() {
  document.getElementById('compareModal').style.display = 'none';
}

function replaceComparison(slot) {
  comparisons[slot - 1] = {
    ttkBodyshot: document.getElementById('ttkBodyshot').textContent,
    damageBodyshot: document.getElementById('damageBodyshot').textContent,
    armor: selectedArmorHp
  };

  closeCompareModal();
  displayComparison();
}

function displayComparison() {
  const compareResults = document.getElementById('compareResults');
  if (comparisons[0] && comparisons[1]) {
    compareResults.innerHTML = `
      <h3>Comparison Results</h3>
      <div class="comparison-grid">
        <div><strong>Stat</strong></div><div>Setup 1</div><div>Setup 2</div>
        <div>TTK (Bodyshot)</div><div>${comparisons[0].ttkBodyshot}</div><div>${comparisons[1].ttkBodyshot}</div>
        <div>Damage (Bodyshot)</div><div>${comparisons[0].damageBodyshot}</div><div>${comparisons[1].damageBodyshot}</div>
      </div>`;
  } else {
    compareResults.innerHTML = `<p>Select both setups to compare.</p>`;
  }
}

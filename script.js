// Variables to store selected weapon stats
let selectedWeaponDamage = 0;
let selectedWeaponReload = 0;
let selectedWeaponFireRate = 0;
let selectedArmorHp = 100; // Base health + armor value

// Array to store comparisons
let comparisons = [];

// Default multipliers for each attachment category
const attachmentMultipliers = {
  optics: 1,
  barrel: 1,
  grip: 1,
  magazine: 1,
  muzzle: 1,
  laser: 1,
};

// Function to handle accordion-style opening and closing of attachment categories
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

// Function to select or deselect a weapon and set its base stats
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

// Function to select or deselect an attachment
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

// Function to select or deselect armor and update health
function selectArmor(button, armorType, armorHp) {
  const armorButtons = document.querySelectorAll('.armor-button');
  armorButtons.forEach(btn => btn.classList.remove('selected'));

  if (button.classList.contains('selected')) {
    button.classList.remove('selected');
    selectedArmorHp = 100; // Default HP without armor
  } else {
    button.classList.add('selected');
    selectedArmorHp = 100 + armorHp; // Base HP + Armor HP
  }

  calculateStats();
}

// Function to calculate and display the final stats
function calculateStats() {
  if (selectedWeaponDamage === 0) {
    resetStats();
    return;
  }

  const combinedMultiplier = Object.values(attachmentMultipliers).reduce((a, b) => a * b, 1);
  const finalDamageHeadshot = selectedWeaponDamage * combinedMultiplier * 1.5; // 1.5x multiplier for headshots
  const finalDamageBodyshot = selectedWeaponDamage * combinedMultiplier;

  const shotsToKill = Math.ceil(selectedArmorHp / finalDamageBodyshot); // Shots required to deplete armor and base health
  const ttkHeadshot = (shotsToKill / (selectedWeaponFireRate / 60)).toFixed(2);
  const ttkBodyshot = (shotsToKill / (selectedWeaponFireRate / 60)).toFixed(2);

  // Update the stats in the sidebar
  document.getElementById('ttkHeadshot').textContent = `${ttkHeadshot}s`;
  document.getElementById('ttkBodyshot').textContent = `${ttkBodyshot}s`;
  document.getElementById('damageHeadshot').textContent = finalDamageHeadshot.toFixed(2);
  document.getElementById('damageBodyshot').textContent = finalDamageBodyshot.toFixed(2);
  document.getElementById('shotsToKill').textContent = shotsToKill;
  document.getElementById('fireRate').textContent = `${selectedWeaponFireRate} RPM`;

  // Render falloff chart with new data
  renderFalloffChart("Selected Weapon", finalDamageBodyshot);
}

// Function to reset stats
function resetStats() {
  document.getElementById('ttkHeadshot').textContent = `0.0s`;
  document.getElementById('ttkBodyshot').textContent = `0.0s`;
  document.getElementById('damageHeadshot').textContent = `0`;
  document.getElementById('damageBodyshot').textContent = `0`;
  document.getElementById('shotsToKill').textContent = `0`;
  document.getElementById('fireRate').textContent = `0 RPM`;

  // Clear falloff chart
  renderFalloffChart(null, 0);
}

// Function to render a damage falloff chart using Highcharts
function renderFalloffChart(weaponName, baseDamage) {
  Highcharts.chart('falloffChart', {
    chart: {
      type: 'line',
      backgroundColor: '#292929',
    },
    title: {
      text: 'Damage Falloff Chart',
      style: {
        color: '#e0e0e0',
      }
    },
    xAxis: {
      title: {
        text: 'Distance (m)',
        style: {
          color: '#e0e0e0',
        }
      },
      categories: ['0', '20', '40', '60', '80', '100', '120', '140', '160', '180', '200'],
      labels: {
        style: {
          color: '#e0e0e0',
        }
      }
    },
    yAxis: {
      title: {
        text: 'Damage Multiplier',
        style: {
          color: '#e0e0e0',
        }
      },
      min: 0,
      max: 1.5,
      labels: {
        style: {
          color: '#e0e0e0',
        }
      }
    },
    series: [{
      name: weaponName ? weaponName : 'No Weapon Selected',
      data: weaponName ? [1, 0.9, 0.8, 0.7, 0.6, 0.6, 0.5, 0.5, 0.4, 0.3, 0.2].map(v => v * baseDamage / selectedWeaponDamage) : [],
      color: '#aad1e6',
    }],
    legend: {
      itemStyle: {
        color: '#e0e0e0'
      }
    }
  });
}

// Function to compare two different weapon setups
function compareStats() {
  if (selectedWeaponDamage === 0) {
    alert("Please select a weapon to compare.");
    return;
  }

  const currentStats = {
    weaponDamage: selectedWeaponDamage,
    ttkHeadshot: document.getElementById('ttkHeadshot').textContent,
    ttkBodyshot: document.getElementById('ttkBodyshot').textContent,
    damageHeadshot: document.getElementById('damageHeadshot').textContent,
    damageBodyshot: document.getElementById('damageBodyshot').textContent,
    shotsToKill: document.getElementById('shotsToKill').textContent,
    fireRate: document.getElementById('fireRate').textContent,
    armor: selectedArmorHp
  };

  comparisons.push(currentStats);

  if (comparisons.length === 2) {
    displayComparison();
    comparisons = [];
  }
}

// Function to display the comparison between two weapon setups
function displayComparison() {
  const compareResults = document.getElementById('compareResults');
  compareResults.innerHTML = `
    <h3>Comparison Results</h3>
    <div class="comparison-grid">
      <div><strong>Stat</strong></div>
      <div><strong>Setup 1</strong></div>
      <div><strong>Setup 2</strong></div>
      
      <div>TTK (Headshot)</div>
      <div>${comparisons[0].ttkHeadshot}</div>
      <div>${comparisons[1].ttkHeadshot}</div>

      <div>TTK (Bodyshot)</div>
      <div>${comparisons[0].ttkBodyshot}</div>
      <div>${comparisons[1].ttkBodyshot}</div>

      <div>Damage (Headshot)</div>
      <div>${comparisons[0].damageHeadshot}</div>
      <div>${comparisons[1].damageHeadshot}</div>

      <div>Damage (Bodyshot)</div>
      <div>${comparisons[0].damageBodyshot}</div>
      <div>${comparisons[1].damageBodyshot}</div>

      <div>Shots to Kill</div>
      <div>${comparisons[0].shotsToKill}</div>
      <div>${comparisons[1].shotsToKill}</div>

      <div>Fire Rate</div>
      <div>${comparisons[0].fireRate}</div>
      <div>${comparisons[1].fireRate}</div>

      <div>Armor HP</div>
      <div>${comparisons[0].armor} HP</div>
      <div>${comparisons[1].armor} HP</div>
    </div>
  `;
}

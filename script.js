// Variables to store selected weapon stats
let selectedWeaponDamage = 0;
let selectedWeaponReload = 0;
let selectedWeaponFireRate = 0;
let selectedArmorHp = 100; // Base health + armor value

// Array to store comparisons
let comparisons = [];

// Index of the setup to replace during comparison
let setupToReplace = null;

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
    ttkHeadshot: document.getElementById('ttkHeadshot').textContent,
    ttkBodyshot: document.getElementById('ttkBodyshot').textContent,
    damageHeadshot: document.getElementById('damageHeadshot').textContent,
    damageBodyshot: document.getElementById('damageBodyshot').textContent,
    shotsToKill: document.getElementById('shotsToKill').textContent,
    fireRate: document.getElementById('fireRate').textContent,
    armor: selectedArmorHp
  };

  if (setupToReplace !== null) {
    comparisons[setupToReplace - 1] = currentStats;
    updateComparisonTable(setupToReplace, currentStats);
    setupToReplace = null;
  } else {
    comparisons.push(currentStats);

    if (comparisons.length === 1) {
      updateComparisonTable(1, currentStats);
    }

    if (comparisons.length === 2) {
      updateComparisonTable(2, currentStats);
    }
  }
}

// Function to update comparison table
function updateComparisonTable(setupNumber, stats) {
  document.getElementById(`setup${setupNumber}TtkHeadshot`).textContent = stats.ttkHeadshot;
  document.getElementById(`setup${setupNumber}TtkBodyshot`).textContent = stats.ttkBodyshot;
  document.getElementById(`setup${setupNumber}DamageHeadshot`).textContent = stats.damageHeadshot;
  document.getElementById(`setup${setupNumber}DamageBodyshot`).textContent = stats.damageBodyshot;
  document.getElementById(`setup${setupNumber}ShotsToKill`).textContent = stats.shotsToKill;
  document.getElementById(`setup${setupNumber}FireRate`).textContent = stats.fireRate;
  document.getElementById(`setup${setupNumber}Armor`).textContent = `${stats.armor} HP`;
}

// Function to replace a comparison setup
function replaceComparison(setupNumber) {
  if (comparisons.length >= setupNumber) {
    setupToReplace = setupNumber;
    alert(`Now changing Setup ${setupNumber}. Please select a new configuration and click "Compare".`);
  }
}

// Function to reset all selections and comparisons
function resetAll() {
  // Reset weapon, armor, and attachment selections
  const allButtons = document.querySelectorAll('.weapon-button, .attachment-button, .armor-button');
  allButtons.forEach(button => button.classList.remove('selected'));

  selectedWeaponDamage = 0;
  selectedWeaponReload = 0;
  selectedWeaponFireRate = 0;
  selectedArmorHp = 100;

  // Reset stats and comparison results
  resetStats();

  const compareResultsIds = [
    'setup1TtkHeadshot', 'setup1TtkBodyshot', 'setup1DamageHeadshot',
    'setup1DamageBodyshot', 'setup1ShotsToKill', 'setup1FireRate', 'setup1Armor',
    'setup2TtkHeadshot', 'setup2TtkBodyshot', 'setup2DamageHeadshot',
    'setup2DamageBodyshot', 'setup2ShotsToKill', 'setup2FireRate', 'setup2Armor'
  ];

  compareResultsIds.forEach(id => {
    document.getElementById(id).textContent = 'N/A';
  });

  comparisons = [];
  setupToReplace = null;
}

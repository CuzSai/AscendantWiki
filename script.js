// Variables to store selected weapon stats and shield
let selectedWeaponDamage = 0;
let selectedWeaponReload = 0;
let selectedWeaponFireRate = 0;
let selectedShieldHP = 0; // Shield HP

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
function selectAttachment(button, category, displayName, multiplier) {
  if (button.classList.contains('selected')) {
    button.classList.remove('selected');
    attachmentMultipliers[category] = 1;
    document.getElementById(`selected${capitalizeFirstLetter(category)}`).textContent = "None";
  } else {
    const attachmentButtons = button.parentNode.querySelectorAll('.attachment-button');
    attachmentButtons.forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
    attachmentMultipliers[category] = multiplier;
    document.getElementById(`selected${capitalizeFirstLetter(category)}`).textContent = displayName;
  }

  calculateStats();
}

// Function to select a shield and update stats
function selectShield(button, shieldType, shieldHP) {
  const shieldButtons = document.querySelectorAll('.shield-button');
  shieldButtons.forEach(btn => btn.classList.remove('selected'));

  if (button.classList.contains('selected')) {
    button.classList.remove('selected');
    selectedShieldHP = 0;
  } else {
    button.classList.add('selected');
    selectedShieldHP = shieldHP;
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

  const totalHealth = 100 + selectedShieldHP; // Base health is 100
  const shotsToKill = Math.ceil(totalHealth / finalDamageBodyshot);
  const ttkHeadshot = ((shotsToKill / (selectedWeaponFireRate / 60)) * 0.7).toFixed(2); // Reduced shots for headshot
  const ttkBodyshot = (shotsToKill / (selectedWeaponFireRate / 60)).toFixed(2);

  // Update the stats in the sidebar
  document.getElementById('ttkHeadshot').textContent = `${ttkHeadshot}s`;
  document.getElementById('ttkBodyshot').textContent = `${ttkBodyshot}s`;
  document.getElementById('damageHeadshot').textContent = finalDamageHeadshot.toFixed(2);
  document.getElementById('damageBodyshot').textContent = finalDamageBodyshot.toFixed(2);
  document.getElementById('shotsToKill').textContent = shotsToKill;
  document.getElementById('fireRate').textContent = `${selectedWeaponFireRate} RPM`;

  // Render falloff chart
  renderFalloffChart(finalDamageBodyshot);
}

// Function to reset stats
function resetStats() {
  document.getElementById('ttkHeadshot').textContent = `0.0s`;
  document.getElementById('ttkBodyshot').textContent = `0.0s`;
  document.getElementById('damageHeadshot').textContent = `0`;
  document.getElementById('damageBodyshot').textContent = `0`;
  document.getElementById('shotsToKill').textContent = `0`;
  document.getElementById('fireRate').textContent = `0 RPM`;
  renderFalloffChart(0);
}

// Function to capitalize the first letter of attachment categories
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Function to render a damage falloff chart using Highcharts
function renderFalloffChart(baseDamage) {
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
      name: 'Weapon Damage',
      data: [1, 0.95, 0.9, 0.85, 0.8, 0.75, 0.7, 0.65, 0.6, 0.55, 0.5].map(v => v * baseDamage / 40),
      color: '#aad1e6',
    }],
    legend: {
      itemStyle: {
        color: '#e0e0e0'
      }
    }
  });
}

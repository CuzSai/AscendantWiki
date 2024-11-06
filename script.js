// Variables to store selected weapon stats
let selectedWeaponDamage = 0;
let selectedWeaponReload = 0;
let selectedWeaponFireRate = 0;
let selectedArmorValue = 30; // Default to Common Armor (Grey)

// Default multipliers for each attachment category
const attachmentMultipliers = {
  optics: 1,
  barrel: 1,
  grip: 1,
  magazine: 1,
  muzzle: 1,
  laser: 1,
};

// Array to store compared weapons
let compareList = [];

// Function to select armor
function selectArmor(button, armorName, armorValue) {
  const armorButtons = document.querySelectorAll('.armor-card');
  armorButtons.forEach(btn => btn.classList.remove('selected'));

  button.classList.add('selected');
  selectedArmorValue = armorValue;
  document.getElementById('selectedArmor').textContent = `${armorName} (${armorValue} Health)`;

  calculateStats();
}

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

// Function to calculate and display the final stats
function calculateStats() {
  if (selectedWeaponDamage === 0) {
    resetStats();
    return;
  }

  const totalHealth = 100 + selectedArmorValue;

  const combinedMultiplier = Object.values(attachmentMultipliers).reduce((a, b) => a * b, 1);
  const finalDamageHeadshot = selectedWeaponDamage * combinedMultiplier * 1.5; // 1.5x multiplier for headshots
  const finalDamageBodyshot = selectedWeaponDamage * combinedMultiplier;

  const shotsToKillBody = Math.ceil(totalHealth / finalDamageBodyshot);
  const shotsToKillHead = Math.ceil(totalHealth / finalDamageHeadshot);

  const ttkBodyshot = (shotsToKillBody / (selectedWeaponFireRate / 60)).toFixed(2);
  const ttkHeadshot = (shotsToKillHead / (selectedWeaponFireRate / 60)).toFixed(2);

  // Calculate Shots Per Second from RPM
  const fireRateSPS = (selectedWeaponFireRate / 60).toFixed(2);

  // Update the stats in the sidebar (for Weapon 1 by default)
  document.getElementById('ttkHeadshot1').textContent = `${ttkHeadshot}s`;
  document.getElementById('ttkBodyshot1').textContent = `${ttkBodyshot}s`;
  document.getElementById('damageHeadshot1').textContent = finalDamageHeadshot.toFixed(2);
  document.getElementById('damageBodyshot1').textContent = finalDamageBodyshot.toFixed(2);
  document.getElementById('shotsToKill1').textContent = shotsToKillBody;
  document.getElementById('fireRate1').textContent = `${fireRateSPS} Shots per Second`;

  // Render falloff chart with new data
  renderFalloffChart('Selected Weapon', finalDamageBodyshot);
}

// Function to reset stats
function resetStats() {
  document.getElementById('ttkHeadshot1').textContent = `0.0s`;
  document.getElementById('ttkBodyshot1').textContent = `0.0s`;
  document.getElementById('damageHeadshot1').textContent = `0`;
  document.getElementById('damageBodyshot1').textContent = `0`;
  document.getElementById('shotsToKill1').textContent = `0`;
  document.getElementById('fireRate1').textContent = `0 Shots per Second`;

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

// Function to add the current weapon to the compare list
function addToCompare() {
  if (compareList.length >= 2) {
    alert("You can only compare two weapons at a time. Clear the comparison list to add new weapons.");
    return;
  }

  const weaponStats = {
    ttkHeadshot: document.getElementById('ttkHeadshot1').textContent,
    ttkBodyshot: document.getElementById('ttkBodyshot1').textContent,
    damageHeadshot: document.getElementById('damageHeadshot1').textContent,
    damageBodyshot: document.getElementById('damageBodyshot1').textContent,
    shotsToKill: document.getElementById('shotsToKill1').textContent,
    fireRate: document.getElementById('fireRate1').textContent,
  };

  compareList.push(weaponStats);

  if (compareList.length === 2) {
    displayComparison();
  }
}

// Function to display the comparison stats
function displayComparison() {
  if (compareList.length === 2) {
    document.getElementById('weaponStats2').style.display = 'block';

    // Set stats for weapon 2
    const weaponStats2 = compareList[1];
    document.getElementById('ttkHeadshot2').textContent = weaponStats2.ttkHeadshot;
    document.getElementById('ttkBodyshot2').textContent = weaponStats2.ttkBodyshot;
    document.getElementById('damageHeadshot2').textContent = weaponStats2.damageHeadshot;
    document.getElementById('damageBodyshot2').textContent = weaponStats2.damageBodyshot;
    document.getElementById('shotsToKill2').textContent = weaponStats2.shotsToKill;
    document.getElementById('fireRate2').textContent = weaponStats2.fireRate;
  }
}

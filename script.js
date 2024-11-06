// Variables to store selected weapon stats
let selectedWeaponDamage = 0;
let selectedWeaponReload = 0;
let selectedWeaponFireRate = 0;

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

// Function to calculate and display the final stats
function calculateStats() {
  if (selectedWeaponDamage === 0) {
    resetStats();
    return;
  }

  const combinedMultiplier = Object.values(attachmentMultipliers).reduce((a, b) => a * b, 1);
  const finalDamageHeadshot = selectedWeaponDamage * combinedMultiplier * 1.5; // 1.5x multiplier for headshots
  const finalDamageBodyshot = selectedWeaponDamage * combinedMultiplier;

  const shotsToKill = Math.ceil(100 / finalDamageBodyshot); // Assuming 100 HP enemy
  const ttkHeadshot = (shotsToKill / (selectedWeaponFireRate / 60)).toFixed(2);
  const ttkBodyshot = (shotsToKill / (selectedWeaponFireRate / 60)).toFixed(2);

  // Calculate Shots Per Second from RPM
  const fireRateSPS = (selectedWeaponFireRate / 60).toFixed(2);

  // Update the stats in the sidebar
  document.getElementById('ttkHeadshot').textContent = `${ttkHeadshot}s`;
  document.getElementById('ttkBodyshot').textContent = `${ttkBodyshot}s`;
  document.getElementById('damageHeadshot').textContent = finalDamageHeadshot.toFixed(2);
  document.getElementById('damageBodyshot').textContent = finalDamageBodyshot.toFixed(2);
  document.getElementById('shotsToKill').textContent = shotsToKill;
  document.getElementById('fireRate').textContent = `${fireRateSPS} Shots per Second`;

  // Render falloff chart with new data
  renderFalloffChart('Selected Weapon', finalDamageBodyshot);
}

// Function to reset stats
function resetStats() {
  document.getElementById('ttkHeadshot').textContent = `0.0s`;
  document.getElementById('ttkBodyshot').textContent = `0.0s`;
  document.getElementById('damageHeadshot').textContent = `0`;
  document.getElementById('damageBodyshot').textContent = `0`;
  document.getElementById('shotsToKill').textContent = `0`;
  document.getElementById('fireRate').textContent = `0 Shots per Second`;

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

// Function to compare two selected weapons
function compareWeapons() {
  const weapon1 = document.getElementById('weaponSelect1').value;
  const weapon2 = document.getElementById('weaponSelect2').value;

  if (weapon1 && weapon2) {
    // Generate a comparison chart
    Highcharts.chart('comparisonChart', {
      chart: {
        type: 'column',
        backgroundColor: '#292929',
      },
      title: {
        text: 'Weapon Comparison',
        style: {
          color: '#e0e0e0',
        }
      },
      xAxis: {
        categories: ['Headshot Damage', 'Bodyshot Damage', 'TTK Headshot', 'TTK Bodyshot', 'Shots to Kill', 'Fire Rate (SPS)'],
        labels: {
          style: {
            color: '#e0e0e0',
          }
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Value',
          style: {
            color: '#e0e0e0',
          }
        },
        labels: {
          style: {
            color: '#e0e0e0',
          }
        }
      },
      series: [{
        name: weapon1,
        data: [/* Data for weapon1 */],
        color: '#aad1e6',
      }, {
        name: weapon2,
        data: [/* Data for weapon2 */],
        color: '#f28e42',
      }],
      legend: {
        itemStyle: {
          color: '#e0e0e0',
        }
      }
    });
  }
}

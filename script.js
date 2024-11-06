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

  // Update the slot title with the selected attachment when closed
  const categoryTitle = attachmentCategory.querySelector('.attachment-title');
  const selectedAttachment = attachmentCategory.querySelector('.attachment-button.selected');
  
  if (selectedAttachment) {
    const attachmentName = selectedAttachment.textContent;
    categoryTitle.innerHTML = `${categoryTitle.dataset.slotName}<br><span class="selected-attachment">${attachmentName}</span>`;
  } else {
    categoryTitle.innerHTML = `${categoryTitle.dataset.slotName}<br><span class="selected-attachment">None</span>`;
  }
}


// Function to select or deselect a weapon and set its base stats
function selectWeapon(button, weaponName, baseDamage, reloadSpeed, fireRate) {
  const weaponButtons = document.querySelectorAll('.weapon-button');
  weaponButtons.forEach(btn => {
    btn.classList.remove('selected');
    btn.classList.remove('clicked'); // Remove previous clicked class
  });

  button.classList.add('selected');
  button.classList.add('clicked'); // Add the clicked class for immediate feedback

  // Set selected weapon stats
  selectedWeaponDamage = baseDamage;
  selectedWeaponReload = reloadSpeed;
  selectedWeaponFireRate = fireRate;

  // Remove the "clicked" class after a short delay
  setTimeout(() => {
    button.classList.remove('clicked');
  }, 150); // Adjust delay as needed

  calculateStats();
}


// Function to select or deselect an attachment
function selectAttachment(button, category, displayName, multiplier) {
  const displaySpan = document.getElementById(`selected${capitalizeFirstLetter(category)}`);
  
  if (button.classList.contains('selected')) {
    button.classList.remove('selected');
    attachmentMultipliers[category] = 1;
    displaySpan.textContent = "None";
  } else {
    const attachmentButtons = button.parentNode.querySelectorAll('.attachment-button');
    attachmentButtons.forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
    attachmentMultipliers[category] = multiplier;
    displaySpan.textContent = displayName;
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
  const finalDamageHeadshot = selectedWeaponDamage * combinedMultiplier * 1.5;
  const finalDamageBodyshot = selectedWeaponDamage * combinedMultiplier;

  const totalHealth = 100 + selectedShieldHP;
  const shotsToKill = Math.ceil(totalHealth / finalDamageBodyshot);
  const ttkHeadshot = ((shotsToKill / (selectedWeaponFireRate / 60)) * 0.7).toFixed(2);
  const ttkBodyshot = (shotsToKill / (selectedWeaponFireRate / 60)).toFixed(2);

  document.getElementById('ttkHeadshot').textContent = `${ttkHeadshot}s`;
  document.getElementById('ttkBodyshot').textContent = `${ttkBodyshot}s`;
  document.getElementById('damageHeadshot').textContent = finalDamageHeadshot.toFixed(2);
  document.getElementById('damageBodyshot').textContent = finalDamageBodyshot.toFixed(2);
  document.getElementById('shotsToKill').textContent = shotsToKill;
  document.getElementById('fireRate').textContent = `${selectedWeaponFireRate} RPM`;

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

// Function to capitalize the first letter
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Render Chart
function renderFalloffChart(baseDamage) {
  if (!baseDamage || baseDamage <= 0) {
    baseDamage = 1; // Fallback to prevent invalid data from breaking the chart
  }

  Highcharts.chart('falloffChart', {
    chart: {
      type: 'line',
      backgroundColor: '#292929',
    },
    title: {
      text: 'Damage Falloff Chart',
      style: {
        color: '#e0e0e0',
        fontSize: '14px',
      }
    },
    xAxis: {
      title: {
        text: 'Distance (m)',
        style: {
          color: '#e0e0e0',
        }
      },
      categories: ['0', '20', '40', '60', '80', '100', '120', '140', '160', '180', '200'], // Distance values
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
      max: 1.5, // Adjust the max value based on your multiplier
      labels: {
        style: {
          color: '#e0e0e0',
        }
      }
    },
    series: [{
      name: 'Base Weapon',
      data: generateFalloffData(baseDamage),
      color: '#aad1e6',
      marker: {
        enabled: true, // Shows data points for better clarity
        radius: 4,
      },
      lineWidth: 2,
    }],
    legend: {
      itemStyle: {
        color: '#e0e0e0'
      }
    }
  });
}

function generateFalloffData(baseDamage) {
  // Linear damage reduction logic for falloff
  const multipliers = [1, 0.95, 0.9, 0.85, 0.8, 0.75, 0.7, 0.65, 0.6, 0.55, 0.5];
  return multipliers.map(multiplier => parseFloat((baseDamage * multiplier).toFixed(2)));
}



// Update the max height of the closed card to fit content dynamically
if (!attachmentCategory.classList.contains('active')) {
  attachmentCategory.style.maxHeight = `${attachmentCategory.querySelector('.attachment-title').offsetHeight + 20}px`;
} else {
  attachmentCategory.style.maxHeight = '220px'; // Expanded state
}

document.querySelectorAll('.stat-toggle').forEach(checkbox => {
  checkbox.addEventListener('change', function() {
    const targetId = this.dataset.target;
    const targetElement = document.getElementById(targetId).parentNode; // Assuming stats are in result divs
    if (this.checked) {
      targetElement.style.display = 'block'; // Show stat
    } else {
      targetElement.style.display = 'none'; // Hide stat
    }
  });
});


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


function selectWeapon(button, weaponName, baseDamage, reloadSpeed, fireRate) {
  const weaponButtons = document.querySelectorAll('.weapon-button');
  weaponButtons.forEach(btn => {
    btn.classList.remove('selected');
    btn.classList.remove('clicked');
  });

  button.classList.add('selected');
  button.classList.add('clicked');

  selectedWeaponDamage = baseDamage;
  selectedWeaponReload = reloadSpeed;
  selectedWeaponFireRate = fireRate;

  setTimeout(() => button.classList.remove('clicked'), 150);
  calculateStats();
}

function selectAttachment(button, category, displayName, multiplier) {
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

function selectShield(button, shieldType, shieldHP) {
  document.querySelectorAll('.shield-button').forEach(btn => btn.classList.remove('selected'));
  button.classList.add('selected');
  selectedShieldHP = shieldHP;
  calculateStats();
}

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

function resetStats() {
  document.getElementById('ttkHeadshot').textContent = '0.0s';
  document.getElementById('ttkBodyshot').textContent = '0.0s';
  document.getElementById('damageHeadshot').textContent = '0';
  document.getElementById('damageBodyshot').textContent = '0';
  document.getElementById('shotsToKill').textContent = '0';
  document.getElementById('fireRate').textContent = '0 RPM';

  renderFalloffChart(0);
}

document.querySelectorAll('.stat-toggle').forEach(checkbox => {
  checkbox.addEventListener('change', function() {
    const targetId = this.dataset.target;
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      if (targetId === 'falloffChartContainer') {
        // Toggle both chart and its title
        targetElement.style.display = this.checked ? 'block' : 'none';
      } else {
        // Hide or show the result container as normal
        targetElement.parentNode.style.display = this.checked ? 'block' : 'none';
      }
    }
  });
});




// Render the falloff chart with Highcharts
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
      },
    },
    xAxis: {
      title: {
        text: 'Distance (m)',
        style: {
          color: '#e0e0e0',
        },
      },
      categories: ['0', '20', '40', '60', '80', '100', '120', '140', '160', '180', '200'],
      labels: {
        style: {
          color: '#e0e0e0',
        },
      },
    },
    yAxis: {
      title: {
        text: 'Damage',
        style: {
          color: '#e0e0e0',
        },
      },
      min: 0,
      max: baseDamage,
      labels: {
        style: {
          color: '#e0e0e0',
        },
      },
    },
    series: [{
      name: 'Damage at Distance',
      data: generateFalloffData(baseDamage),
      color: '#aad1e6',
      marker: {
        enabled: true,
        radius: 4,
      },
      lineWidth: 2,
    }],
    legend: {
      itemStyle: {
        color: '#e0e0e0',
      },
    },
  });
}

function generateFalloffData(baseDamage) {
  const multipliers = [1, 0.95, 0.9, 0.85, 0.8, 0.75, 0.7, 0.65, 0.6, 0.55, 0.5];
  return multipliers.map(multiplier => parseFloat((baseDamage * multiplier).toFixed(2)));
}

function toggleSidebar() {
  const sidebar = document.querySelector('.stats-sidebar');
  const toggleButton = document.getElementById('toggleSidebar');

  sidebar.classList.toggle('expanded');

  // Update button text and ensure smooth position changes
  if (sidebar.classList.contains('expanded')) {
    toggleButton.textContent = 'Collapse';
    toggleButton.style.left = '-40px'; // Update button position for expanded state
  } else {
    toggleButton.textContent = 'Expand';
    toggleButton.style.left = '-40px'; // Reset button position for collapsed state
  }
}



let setups = []; // Array to store up to 3 setups

function openCompareModal() {
  document.getElementById('compareModal').style.display = 'block';
}

function closeCompareModal() {
  document.getElementById('compareModal').style.display = 'none';
}

function addOrReplaceSetup(slot) {
  const currentSetup = {
    weapon: getSelectedWeapon(),
    shield: getSelectedShield(),
    attachments: getSelectedAttachments(),
    stats: getCurrentStats()
  };

  setups[slot - 1] = currentSetup;
  renderComparison();
  closeCompareModal();
}

// Re-render comparison when checkboxes change
document.querySelectorAll('.comparison-stat-toggle').forEach(checkbox => {
  checkbox.addEventListener('change', renderComparison);
});

function renderComparison() {
  const container = document.getElementById('setupComparison');
  container.innerHTML = ''; // Clear previous comparison

  const selectedStats = getSelectedComparisonStats();

  setups.forEach((setup, index) => {
    if (setup) {
      const card = document.createElement('div');
      card.className = 'setup-card';

      let content = `<h3>Setup Slot ${index + 1}</h3>`;

      if (selectedStats.includes('weapon')) {
        content += `<p><strong>Weapon:</strong> ${setup.weapon}</p>`;
      }
      if (selectedStats.includes('shield')) {
        content += `<p><strong>Shield:</strong> ${setup.shield}</p>`;
      }
      if (selectedStats.includes('attachments')) {
        content += `<p><strong>Attachments:</strong> ${setup.attachments.join(', ')}</p>`;
      }
      if (selectedStats.includes('ttkHeadshot')) {
        content += `<p><strong>TTK (Headshot):</strong> ${setup.stats.ttkHeadshot}</p>`;
      }
      if (selectedStats.includes('ttkBodyshot')) {
        content += `<p><strong>TTK (Bodyshot):</strong> ${setup.stats.ttkBodyshot}</p>`;
      }
      if (selectedStats.includes('shotsToKill')) {
        content += `<p><strong>Shots to Kill:</strong> ${setup.stats.shotsToKill}</p>`;
      }

      card.innerHTML = content;
      container.appendChild(card);
    }
  });

  // Show the comparison section only if there are setups
  document.getElementById('comparisonSection').style.display = setups.length ? 'block' : 'none';
}

function getSelectedComparisonStats() {
  const checkboxes = document.querySelectorAll('.comparison-stat-toggle');
  return Array.from(checkboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.dataset.stat);
}

// Helper functions to fetch selected data
function getSelectedWeapon() {
  const selectedButton = document.querySelector('.weapon-button.selected');
  return selectedButton ? selectedButton.textContent : 'None';
}

function getSelectedShield() {
  const selectedButton = document.querySelector('.shield-button.selected');
  return selectedButton ? selectedButton.textContent : 'None';
}

function getSelectedAttachments() {
  const selectedButtons = document.querySelectorAll('.attachment-button.selected');
  return Array.from(selectedButtons).map(button => button.textContent);
}

function getCurrentStats() {
  return {
    ttkHeadshot: document.getElementById('ttkHeadshot').textContent,
    ttkBodyshot: document.getElementById('ttkBodyshot').textContent,
    shotsToKill: document.getElementById('shotsToKill').textContent
  };
}


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

  // Handle toggle behavior
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

// Add mouse enter and leave events to handle auto-closing
document.querySelectorAll('.attachment-category').forEach(category => {
  category.addEventListener('mouseenter', () => {
    category.classList.add('active'); // Keep the category open
  });

  category.addEventListener('mouseleave', () => {
    category.classList.remove('active'); // Close the category when mouse leaves
  });
});


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

    // Reset attachments when weapon is changed
    resetAttachments();

    setTimeout(() => button.classList.remove('clicked'), 150);
    calculateStats();
}

function resetAttachments() {
    const attachmentButtons = document.querySelectorAll('.attachment-button');
    attachmentButtons.forEach(btn => {
        btn.classList.remove('selected');
    });

    // Reset attachment multipliers
    for (let key in attachmentMultipliers) {
        attachmentMultipliers[key] = 1;
    }

    // Update titles to reflect no attachments
    document.querySelectorAll('.attachment-title').forEach(title => {
        title.innerHTML = `${title.dataset.slotName}<br><span class="selected-attachment">None</span>`;
    });
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

    // Update title immediately
    const categoryTitle = button.parentNode.parentNode.querySelector('.attachment-title');
    categoryTitle.innerHTML = `${categoryTitle.dataset.slotName}<br><span class="selected-attachment">${button.textContent}</span>`;
  
    calculateStats();
}

function selectShield(button, shieldType, shieldHP) {
  // Remove selected and glow classes from all buttons
  document.querySelectorAll('.shield-button').forEach(btn => {
      btn.classList.remove('selected');
      btn.classList.remove('glow'); // Remove glow from all other buttons
  });

  // Add selected class and glow class to the clicked button
  button.classList.add('selected', 'glow'); // Immediate glow effect
  selectedShieldHP = shieldHP; // Set selected shield HP
  calculateStats(); // Recalculate stats based on selected shield
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
        stats: getCurrentStats(),
        attachments: getCurrentAttachments(), // Save current attachments
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

    setups.forEach((setup, index) => {
        const statRow = document.createElement('tr');

        // Create cells for each of the necessary stats
        const weaponCell = document.createElement('td');
        const weaponButton = document.createElement('button');
        weaponButton.textContent = setup.weapon; // Use weapon name from the setup
        weaponButton.onclick = () => loadSetup(index + 1); // Set up the click event to load the weapon
        weaponButton.style.cursor = 'pointer'; // Indicate it's clickable
        weaponButton.style.backgroundColor = '#3a3a3a'; // Match button style
        weaponButton.style.color = 'white';
        weaponButton.style.border = 'none';
        weaponButton.style.borderRadius = '5px';
        weaponButton.style.padding = '5px 10px';
        weaponButton.style.marginRight = '5px'; // Add some space between the button and the text
        weaponButton.style.transition = 'background-color 0.2s';

        // Add hover effect
        weaponButton.onmouseover = () => {
            weaponButton.style.backgroundColor = '#505050';
        };
        weaponButton.onmouseout = () => {
            weaponButton.style.backgroundColor = '#3a3a3a';
        };

        weaponCell.appendChild(weaponButton); // Add button to the cell
        
        statRow.appendChild(weaponCell); // Append weapon cell to row

        const penetrationCell = document.createElement('td');
        penetrationCell.textContent = "1.0"; // Replace with actual data
        statRow.appendChild(penetrationCell);

        const rpmCell = document.createElement('td');
        rpmCell.textContent = setup.stats.fireRate; // Use actual data
        statRow.appendChild(rpmCell);

        const ammoCostCell = document.createElement('td');
        ammoCostCell.textContent = "100"; // Replace with actual data
        statRow.appendChild(ammoCostCell);

        const reloadAdjustCell = document.createElement('td');
        reloadAdjustCell.textContent = "50"; // Replace with actual data
        statRow.appendChild(reloadAdjustCell);

        const damageCell = document.createElement('td');
        damageCell.textContent = setup.stats.damageHeadshot; // Adjust based on your stats
        statRow.appendChild(damageCell);

        const reloadDpsCell = document.createElement('td');
        reloadDpsCell.textContent = "150"; // Replace with actual data
        statRow.appendChild(reloadDpsCell);

        container.appendChild(statRow); // Add the row to the comparison section
    });

    document.getElementById('comparisonSection').style.display = setups.length ? 'block' : 'none'; // Show comparison if there are setups
}






// Function to map the stat key to a human-readable name
function getStatName(stat) {
    switch (stat) {
        case 'weapon': return 'Weapon';
        case 'ttkHeadshot': return 'TTK (Headshot)';
        case 'ttkBodyshot': return 'TTK (Bodyshot)';
        case 'shotsToKill': return 'Shots to Kill';
        case 'fireRate': return 'Fire Rate';
        case 'damageHeadshot': return 'Damage (Headshot)';
        case 'damageBodyshot': return 'Damage (Bodyshot)';
        case 'falloffChart': return 'Falloff Chart';
        default: return '';
    }
}

function loadSetup(slot) {
    const setup = setups[slot - 1]; // Get the setup for the clicked slot

    if (setup) {
        // Load the weapon
        const weaponName = setup.weapon;
        const weaponButton = [...document.querySelectorAll('.weapon-button')]
            .find(button => button.textContent === weaponName);
        if (weaponButton) {
            weaponButton.click(); // Simulate click to select the weapon
        }

        // Load attachments
        const attachmentButtons = document.querySelectorAll('.attachment-button');
        attachmentButtons.forEach(btn => {
            btn.classList.remove('selected'); // Deselect all attachments
        });

        const attachments = setup.attachments; // Get the saved attachments
        attachments.forEach(attachmentName => {
            const button = [...document.querySelectorAll('.attachment-button')]
                .find(btn => btn.textContent === attachmentName);
            if (button) {
                button.click(); // Simulate click to select the attachment
            }
        });

        calculateStats(); // Recalculate stats after loading the setup
    }
}


function getSelectedComparisonStats() {
    const checkboxes = document.querySelectorAll('.comparison-stat-toggle');
    return Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.dataset.stat);
}

// Helper functions
function getSelectedWeapon() {
    const selectedButton = document.querySelector('.weapon-button.selected');
    return selectedButton ? selectedButton.textContent : 'None';
}

function getCurrentStats() {
    return {
        ttkHeadshot: document.getElementById('ttkHeadshot').textContent,
        ttkBodyshot: document.getElementById('ttkBodyshot').textContent,
        shotsToKill: document.getElementById('shotsToKill').textContent,
        fireRate: document.getElementById('fireRate').textContent,
        damageHeadshot: document.getElementById('damageHeadshot').textContent,
        damageBodyshot: document.getElementById('damageBodyshot').textContent,
    };
}

function handleScroll() {
    const sidebar = document.querySelector('.stats-sidebar');

    // Check if the sidebar is expanded
    if (sidebar.classList.contains('expanded')) {
        toggleSidebar(); // Collapse the sidebar
    }
}

// Attach the scroll event listener to the window
window.addEventListener('scroll', handleScroll);

function getCurrentAttachments() {
    const selectedAttachments = [];
    const attachmentButtons = document.querySelectorAll('.attachment-button.selected');
    attachmentButtons.forEach(button => {
        selectedAttachments.push(button.textContent); // Assuming button text is the attachment name
    });
    return selectedAttachments;
}

function openInfoPopup() {
  document.getElementById('infoModal').style.display = 'block'; // Show the modal
}

function closeInfoPopup() {
  document.getElementById('infoModal').style.display = 'none'; // Hide the modal
}

// Close the modal if the user clicks anywhere outside of it
window.onclick = function(event) {
  const modal = document.getElementById('infoModal');
  if (event.target === modal) {
      modal.style.display = 'none';
  }
};

function loadSetupWeapon(weaponName) {
    // Your logic to load the weapon based on weaponName
    console.log("Loading weapon:", weaponName);
  }
  
// Variables to store selected weapon stats
let selectedWeaponDamage = 0;
let selectedWeaponReload = 0;

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
  const activeCategory = document.querySelector('.attachment-category.active');
  
  if (activeCategory && activeCategory !== element.parentNode) {
    // Smoothly collapse the previously active category
    activeCategory.classList.remove('active');
    activeCategory.querySelector('.attachment-buttons').style.height = '0';

    // Use requestAnimationFrame to allow time for collapsing, then expand the new one
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        element.parentNode.classList.add('active');
        const content = element.parentNode.querySelector('.attachment-buttons');
        content.style.height = `${content.scrollHeight}px`;
      });
    });
  } else {
    element.parentNode.classList.toggle('active');
    const content = element.parentNode.querySelector('.attachment-buttons');
    if (element.parentNode.classList.contains('active')) {
      content.style.height = `${content.scrollHeight}px`;
    } else {
      content.style.height = '0';
    }
  }
}

// Function to select or deselect a weapon and set its base stats
function selectWeapon(button, weaponName, baseDamage, reloadSpeed) {
  const weaponButtons = document.querySelectorAll('.weapon-button');
  weaponButtons.forEach(btn => btn.classList.remove('selected'));

  if (button.classList.contains('selected')) {
    button.classList.remove('selected');
    selectedWeaponDamage = 0;
    selectedWeaponReload = 0;
  } else {
    button.classList.add('selected');
    selectedWeaponDamage = baseDamage;
    selectedWeaponReload = reloadSpeed;
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

// Function to calculate and display the final damage and reload speed
function calculateStats() {
  if (selectedWeaponDamage === 0) {
    document.getElementById('damageValue').textContent = "Please select a weapon";
    document.getElementById('reloadValue').textContent = "";
    return;
  }

  const combinedMultiplier = Object.values(attachmentMultipliers).reduce((a, b) => a * b, 1);

  const finalDamage = selectedWeaponDamage * combinedMultiplier;
  const finalReloadSpeed = selectedWeaponReload * (1 / combinedMultiplier);

  document.getElementById('damageProgress').value = finalDamage;
  document.getElementById('damageValue').textContent = finalDamage.toFixed(2);
  document.getElementById('reloadProgress').value = finalReloadSpeed;
  document.getElementById('reloadValue').textContent = `${finalReloadSpeed.toFixed(2)}s`;

  triggerAnimation(document.getElementById('damageValue'));
  triggerAnimation(document.getElementById('reloadValue'));
}

// Function to re-trigger fade-in animation on stats update
function triggerAnimation(element) {
  element.classList.remove('fadeIn');
  void element.offsetWidth;
  element.classList.add('fadeIn');
}

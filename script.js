let selectedWeaponDamage = 0;
let selectedWeaponReload = 0;

const attachmentMultipliers = {
  optics: 1,
  barrel: 1,
  grip: 1,
  magazine: 1,
  muzzle: 1,
  laser: 1,
};

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

function selectAttachment(button, category, multiplier) {
  const categoryContainer = button.closest('.attachment-category');
  const selectedDisplay = categoryContainer.querySelector('.selected-attachment');

  if (button.classList.contains('selected')) {
    button.classList.remove('selected');
    attachmentMultipliers[category] = 1;
    selectedDisplay.textContent = "None";
  } else {
    categoryContainer.querySelectorAll('.attachment-button').forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
    attachmentMultipliers[category] = multiplier;
    selectedDisplay.textContent = button.textContent;
  }

  calculateStats();
}

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
}

function showOptions(category) {
  category.querySelector('.attachment-buttons').style.display = 'block';
}

function hideOptions(category) {
  category.querySelector('.attachment-buttons').style.display = 'none';
}

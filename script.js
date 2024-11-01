// Variables to store selected weapon stats
let selectedWeaponDamage = 0;
let selectedWeaponReload = 0;

// Function to select a weapon and set its base stats
function selectWeapon(button, weaponName, baseDamage, reloadSpeed) {
  // Remove the "selected" class from all weapon buttons
  const weaponButtons = document.querySelectorAll('.weapon-button');
  weaponButtons.forEach(btn => btn.classList.remove('selected'));

  // Add the "selected" class to the clicked button
  button.classList.add('selected');

  // Set the base damage and reload speed of the selected weapon
  selectedWeaponDamage = baseDamage;
  selectedWeaponReload = reloadSpeed;

  calculateStats();
}

// Function to calculate and display the final damage and reload speed
function calculateStats() {
  // Check if a weapon is selected
  if (selectedWeaponDamage === 0) {
    document.getElementById('damageValue').textContent = "Please select a weapon";
    document.getElementById('reloadValue').textContent = "";
    return;
  }

  // Retrieve multipliers from each attachment category
  const opticsMultiplier = parseFloat(document.getElementById('optics').value);
  const barrelMultiplier = parseFloat(document.getElementById('barrel').value);
  const gripMultiplier = parseFloat(document.getElementById('grip').value);
  const magazineMultiplier = parseFloat(document.getElementById('magazine').value);
  const muzzleMultiplier = parseFloat(document.getElementById('muzzle').value);
  const laserMultiplier = parseFloat(document.getElementById('laser').value);

  // Calculate combined multiplier
  const combinedMultiplier = opticsMultiplier * barrelMultiplier * gripMultiplier * magazineMultiplier * muzzleMultiplier * laserMultiplier;

  // Calculate final stats
  const finalDamage = selectedWeaponDamage * combinedMultiplier;
  const finalReloadSpeed = selectedWeaponReload * (1 / combinedMultiplier);

  // Update progress bars and display values
  document.getElementById('damageProgress').value = finalDamage;
  document.getElementById('damageValue').textContent = finalDamage.toFixed(2);

  document.getElementById('reloadProgress').value = finalReloadSpeed;
  document.getElementById('reloadValue').textContent = `${finalReloadSpeed.toFixed(2)}s`;
}

// Attach event listeners to recalculate stats when any attachment is changed
document.getElementById('optics').addEventListener('change', calculateStats);
document.getElementById('barrel').addEventListener('change', calculateStats);
document.getElementById('grip').addEventListener('change', calculateStats);
document.getElementById('magazine').addEventListener('change', calculateStats);
document.getElementById('muzzle').addEventListener('change', calculateStats);
document.getElementById('laser').addEventListener('change', calculateStats);

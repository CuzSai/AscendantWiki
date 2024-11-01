let selectedWeaponDamage = 0;
let selectedWeaponReload = 0; // New variable for reload speed

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

function calculateStats() {
  if (selectedWeaponDamage === 0) {
    document.getElementById('damageValue').textContent = "Please select a weapon";
    return;
  }

  const opticsMultiplier = parseFloat(document.getElementById('optics').value);
  const barrelMultiplier = parseFloat(document.getElementById('barrel').value);
  const gripMultiplier = parseFloat(document.getElementById('grip').value);
  const magazineMultiplier = parseFloat(document.getElementById('magazine').value);
  const muzzleMultiplier = parseFloat(document.getElementById('muzzle').value);
  const laserMultiplier = parseFloat(document.getElementById('laser').value);

  const combinedMultiplier = opticsMultiplier * barrelMultiplier * gripMultiplier * magazineMultiplier * muzzleMultiplier * laserMultiplier;
  
  const finalDamage = selectedWeaponDamage * combinedMultiplier;
  const finalReloadSpeed = selectedWeaponReload * (1 / combinedMultiplier);

  document.getElementById('damageProgress').value = finalDamage;
  document.getElementById('damageValue').textContent = finalDamage.toFixed(2);

  document.getElementById('reloadProgress').value = finalReloadSpeed;
  document.getElementById('reloadValue').textContent = `${finalReloadSpeed.toFixed(2)}s`;
}

document.getElementById('optics').addEventListener('change', calculateStats);
document.getElementById('barrel').addEventListener('change', calculateStats);
document.getElementById('grip').addEventListener('change', calculateStats);
document.getElementById('magazine').addEventListener('change', calculateStats);
document.getElementById('muzzle').addEventListener('change', calculateStats);
document.getElementById('laser').addEventListener('change', calculateStats);

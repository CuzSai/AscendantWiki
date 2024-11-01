function calculateDamage() {
  const weaponSelect = document.getElementById('weapon');

  // Get the weapon's base damage
  const weaponDamage = parseFloat(weaponSelect.options[weaponSelect.selectedIndex].dataset.damage);

  // Get the multipliers from each attachment category
  const opticsMultiplier = parseFloat(document.getElementById('optics').options[document.getElementById('optics').selectedIndex].dataset.multiplier);
  const barrelMultiplier = parseFloat(document.getElementById('barrel').options[document.getElementById('barrel').selectedIndex].dataset.multiplier);
  const gripMultiplier = parseFloat(document.getElementById('grip').options[document.getElementById('grip').selectedIndex].dataset.multiplier);
  const magazineMultiplier = parseFloat(document.getElementById('magazine').options[document.getElementById('magazine').selectedIndex].dataset.multiplier);
  const muzzleMultiplier = parseFloat(document.getElementById('muzzle').options[document.getElementById('muzzle').selectedIndex].dataset.multiplier);
  const laserMultiplier = parseFloat(document.getElementById('laser').options[document.getElementById('laser').selectedIndex].dataset.multiplier);

  // Calculate the combined multiplier by multiplying each selected attachment's multiplier
  const combinedMultiplier = opticsMultiplier * barrelMultiplier * gripMultiplier * magazineMultiplier * muzzleMultiplier * laserMultiplier;

  // Calculate the final damage
  const finalDamage = weaponDamage * combinedMultiplier;
  document.getElementById('damageOutput').textContent = finalDamage.toFixed(2);
}

// Add event listeners to recalculate damage when any selection changes
document.getElementById('weapon').addEventListener('change', calculateDamage);
document.getElementById('optics').addEventListener('change', calculateDamage);
document.getElementById('barrel').addEventListener('change', calculateDamage);
document.getElementById('grip').addEventListener('change', calculateDamage);
document.getElementById('magazine').addEventListener('change', calculateDamage);
document.getElementById('muzzle').addEventListener('change', calculateDamage);
document.getElementById('laser').addEventListener('change', calculateDamage);

// Initial calculation on page load
calculateDamage();

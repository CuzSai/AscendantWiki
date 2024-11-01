// This variable stores the base damage of the selected weapon
let selectedWeaponDamage = 0;

// Function to select a weapon and set its base damage
function selectWeapon(button, weaponName, baseDamage) {
  // Remove the "selected" class from all weapon buttons
  const weaponButtons = document.querySelectorAll('.weapon-button');
  weaponButtons.forEach(btn => btn.classList.remove('selected'));

  // Add the "selected" class to the clicked button
  button.classList.add('selected');

  // Set the base damage of the selected weapon
  selectedWeaponDamage = baseDamage;
  
  // Calculate damage with the new weapon selected
  calculateDamage();
}

// Function to calculate the final damage based on selected weapon and attachments
function calculateDamage() {
  // Ensure a weapon is selected before calculating
  if (selectedWeaponDamage === 0) {
    document.getElementById('damageOutput').textContent = "Please select a weapon";
    return;
  }

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
  const finalDamage = selectedWeaponDamage * combinedMultiplier;
  document.getElementById('damageOutput').textContent = finalDamage.toFixed(2);
}

// Add event listeners for each attachment dropdown to recalculate damage when changed
document.getElementById('optics').addEventListener('change', calculateDamage);
document.getElementById('barrel').addEventListener('change', calculateDamage);
document.getElementById('grip').addEventListener('change', calculateDamage);
document.getElementById('magazine').addEventListener('change', calculateDamage);
document.getElementById('muzzle').addEventListener('change', calculateDamage);
document.getElementById('laser').addEventListener('change', calculateDamage);

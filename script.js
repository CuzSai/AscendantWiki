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

  calculateStats(); // Update stats immediately after selecting a weapon
}

// Function to select an attachment and set its multiplier
function selectAttachment(button, category, multiplier) {
  // Remove the "selected" class from all buttons in the same category
  const attachmentButtons = button.parentNode.querySelectorAll('.attachment-button');
  attachmentButtons.forEach(btn => btn.classList.remove('selected'));

  // Add the "selected" class to the clicked button
  button.classList.add('selected');

  // Update the multiplier for the chosen attachment category
  attachmentMultipliers[category] = multiplier;

  calculateStats(); // Update stats immediately after selecting an attachment
}

// Function to calculate and display the final damage and reload speed
function calculateStats() {
  if (selectedWeaponDamage === 0) {
    // If no weapon is selected, prompt the user to select one
    document.getElementById('damageValue').textContent = "Please select a weapon";
    document.getElementById('reloadValue').textContent = "";
    return;
  }

  // Calculate the combined multiplier for all selected attachments
  const combinedMultiplier = Object.values(attachmentMultipliers).reduce((a, b) => a * b, 1);

  // Calculate the final damage and reload speed
  const finalDamage = selectedWeaponDamage * combinedMultiplier;
  const finalReloadSpeed = selectedWeaponReload * (1 / combinedMultiplier);

  // Update the sidebar with the calculated stats
  document.getElementById('damageProgress').value = finalDamage;
  document.getElementById('damageValue').textContent = finalDamage.toFixed(2);
  document.getElementById('reloadProgress').value = finalReloadSpeed;
  document.getElementById('reloadValue').text

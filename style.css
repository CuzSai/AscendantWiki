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

// Function to select or deselect a weapon and set its base stats
function selectWeapon(button, weaponName, baseDamage, reloadSpeed) {
  // Remove the "selected" class from all weapon buttons
  const weaponButtons = document.querySelectorAll('.weapon-button');
  weaponButtons.forEach(btn => btn.classList.remove('selected'));

  // Toggle selection of the clicked button
  if (button.classList.contains('selected')) {
    button.classList.remove('selected');
    selectedWeaponDamage = 0;
    selectedWeaponReload = 0;
  } else {
    button.classList.add('selected');
    selectedWeaponDamage = baseDamage;
    selectedWeaponReload = reloadSpeed;
  }

  calculateStats(); // Update stats immediately after selecting or deselecting a weapon
}

// Function to select or deselect an attachment
function selectAttachment(button, category, multiplier) {
  // Toggle selection of the clicked button
  if (button.classList.contains('selected')) {
    button.classList.remove('selected');
    attachmentMultipliers[category] = 1; // Reset multiplier if deselected
  } else {
    // Remove "selected" from all buttons in the same category
    const attachmentButtons = button.parentNode.querySelectorAll('.attachment-button');
    attachmentButtons.forEach(btn => btn.classList.remove('selected'));

    // Apply "selected" to clicked button
    button.classList.add('selected');
    attachmentMultipliers[category] = multiplier;
  }

  calculateStats(); // Update stats immediately after selecting or deselecting an attachment
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
  document.getElementById('reloadValue').textContent = `${finalReloadSpeed.toFixed(2)}s`;

  // Trigger fade-in animation on stat update
  triggerAnimation(document.getElementById('damageValue'));
  triggerAnimation(document.getElementById('reloadValue'));
}

// Function to re-trigger fade-in animation on stats update
function triggerAnimation(element) {
  element.classList.remove('fadeIn');
  void element.offsetWidth; // Trigger reflow to restart the animation
  element.classList.add('fadeIn');
}

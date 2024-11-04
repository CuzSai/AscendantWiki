// Variables to store selected weapon stats and attachment multipliers
let selectedWeaponDamage = 0;
let selectedWeaponReload = 0;

// Base multipliers for each attachment type, used to reset values on mouse-out
let baseMultipliers = {
  Optic: 1.0,
  Barrel: 1.0,
  Grip: 1.0,
  Magazine: 1.0,
  Muzzle: 1.0,
  Laser: 1.0
};

// Current multipliers, updated based on the attachment hovered over
let currentAttachmentMultipliers = { ...baseMultipliers };

// Function to select a weapon and set its base stats
function selectWeapon(button, weaponName, baseDamage, reloadSpeed) {
  // Remove the "selected" class from all weapon buttons
  document.querySelectorAll('.weapon-button').forEach(btn => btn.classList.remove('selected'));

  // Add the "selected" class to the clicked button
  button.classList.add('selected');

  // Set the base damage and reload speed of the selected weapon
  selectedWeaponDamage = baseDamage;
  selectedWeaponReload = reloadSpeed;

  // Calculate and display the updated stats with no attachments selected
  calculateStats();
}

// Function to preview an attachment's effect on hover
function previewAttachment(type, multiplier) {
  // Update the multiplier for the hovered attachment type
  currentAttachmentMultipliers[type] = multiplier;

  // Calculate and display the updated stats with the hovered attachment effect
  calculateStats();
}

// Function to reset the attachment effect when mouse leaves the icon
function resetAttachment() {
  // Reset to base multipliers
  currentAttachmentMultipliers = { ...baseMultipliers };

  // Calculate and display the stats without the hovered attachment effect
  calculateStats();
}

// Function to calculate and display the final damage and reload speed
function calculateStats() {
  // Calculate combined multiplier from all selected/hovered attachments
  const combinedMultiplier = Object.values(currentAttachmentMultipliers).reduce((acc, val) => acc * val, 1);

  // Calculate final stats with base weapon stats and combined multiplier
  const finalDamage = selectedWeaponDamage * combinedMultiplier;
  const finalReloadSpeed = selectedWeaponReload / combinedMultiplier;

  // Update progress bars and display values for damage and reload speed
  document.getElementById('damageProgress').value = finalDamage;
  document.getElementById('damageValue').textContent = finalDamage.toFixed(2);

  document.getElementById('reloadProgress').value = finalReloadSpeed;
  document.getElementById('reloadValue').textContent = `${finalReloadSpeed.toFixed(2)}s`;
}

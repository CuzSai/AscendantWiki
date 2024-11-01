// Function to calculate damage based on weapon and attachment
function calculateDamage() {
  const weaponSelect = document.getElementById('weapon');
  const attachmentSelect = document.getElementById('attachment');

  // Get selected weapon's base damage
  const weaponDamage = parseFloat(weaponSelect.options[weaponSelect.selectedIndex].dataset.damage);

  // Get selected attachment's multiplier
  const attachmentMultiplier = parseFloat(attachmentSelect.options[attachmentSelect.selectedIndex].dataset.multiplier);

  // Calculate final damage
  const finalDamage = weaponDamage * attachmentMultiplier;
  document.getElementById('damageOutput').textContent = finalDamage.toFixed(2);
}

// Add event listeners for live calculation updates
document.getElementById('weapon').addEventListener('change', calculateDamage);
document.getElementById('attachment').addEventListener('change', calculateDamage);

// Initial calculation on page load
calculateDamage();


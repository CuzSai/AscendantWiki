function calculateDamage() {
  const weaponSelect = document.getElementById('weapon');
  const attachment1Select = document.getElementById('attachment1');
  const attachment2Select = document.getElementById('attachment2');

  // Get selected weapon's base damage
  const weaponDamage = parseFloat(weaponSelect.options[weaponSelect.selectedIndex].dataset.damage);

  // Get multipliers for both attachments
  const attachment1Multiplier = parseFloat(attachment1Select.options[attachment1Select.selectedIndex].dataset.multiplier);
  const attachment2Multiplier = parseFloat(attachment2Select.options[attachment2Select.selectedIndex].dataset.multiplier);

  // Calculate the combined effect by multiplying both multipliers
  const combinedMultiplier = attachment1Multiplier * attachment2Multiplier;

  // Calculate final damage with both attachments applied
  const finalDamage = weaponDamage * combinedMultiplier;
  document.getElementById('damageOutput').textContent = finalDamage.toFixed(2);
}

// Add event listeners for real-time calculation
document.getElementById('weapon').addEventListener('change', calculateDamage);
document.getElementById('attachment1').addEventListener('change', calculateDamage);
document.getElementById('attachment2').addEventListener('change', calculateDamage);

// Initial calculation on page load
calculateDamage();

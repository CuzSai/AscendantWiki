let selectedWeaponDamage = 0;
let selectedWeaponReload = 0;
let baseMultipliers = { Optic: 1.0, Barrel: 1.0, Grip: 1.0, Magazine: 1.0, Muzzle: 1.0, Laser: 1.0 };
let currentAttachmentMultipliers = { ...baseMultipliers };

function selectWeapon(button, weaponName, baseDamage, reloadSpeed) {
  document.querySelectorAll('.weapon-button').forEach(btn => btn.classList.remove('selected'));
  button.classList.add('selected');
  selectedWeaponDamage = baseDamage;
  selectedWeaponReload = reloadSpeed;
  calculateStats();
}

function previewAttachment(type, multiplier) {
  currentAttachmentMultipliers[type] = multiplier;
  calculateStats();
}

function resetAttachment() {
  currentAttachmentMultipliers = { ...baseMultipliers };
  calculateStats();
}

function calculateStats() {
  const combinedMultiplier = Object.values(currentAttachmentMultipliers).reduce((acc, val) => acc * val, 1);
  const finalDamage = selectedWeaponDamage * combinedMultiplier;
  const finalReloadSpeed = selectedWeaponReload / combinedMultiplier;
  document.getElementById('damageProgress').value = finalDamage;
  document.getElementById('damageValue').textContent = finalDamage.toFixed(2);
  document.getElementById('reloadProgress').value = finalReloadSpeed;
  document.getElementById('reloadValue').textContent = `${finalReloadSpeed.toFixed(2)}s`;
}

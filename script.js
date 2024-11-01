// Variables to store selected weapon stats
let selectedWeaponDamage = 0;
let selectedWeaponReload = 0;

// Function to select a weapon and set its base stats
function selectWeapon(button, weaponName, baseDamage, reloadSpeed) {
  const weaponButtons = document.querySelectorAll('.weapon-button');
  weaponButtons.forEach(btn => btn.classList.remove('selected'));
  button.classList.add('selected');

  selectedWeaponDamage = baseDamage;
  selectedWeaponReload = reloadSpeed;

  calculateStats();
}

// Function to calculate and display the final damage and reload speed
function calculateStats() {
  if (selectedWeaponDamage === 0) {
    document.getElementById('damageValue').textContent = "Please select a weapon";
    document.getElementById('reloadValue').textContent = "";
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

// Toggle Sidebar Function
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("expanded");

  const toggleButton = document.querySelector(".toggle-button");
  toggleButton.innerHTML = sidebar.classList.contains("expanded") ? "&#10094;" : "&#10095;"; // Arrow changes direction
}

// Event Listeners for Attachments
document.getElementById('optics').addEventListener('change', calculateStats);
document.getElementById('barrel').addEventListener('change', calculateStats);
document.getElementById('grip').addEventListener('change', calculateStats);
document.getElementById('magazine').addEventListener('change', calculateStats);
document.getElementById('muzzle').addEventListener('change', calculateStats);
document.getElementById('laser').addEventListener('change', calculateStats);

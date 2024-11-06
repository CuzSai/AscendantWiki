document.querySelectorAll('.stat-toggle').forEach(checkbox => {
  checkbox.addEventListener('change', function() {
    const targetId = this.dataset.target;
    const targetElement = document.getElementById(targetId).parentNode;
    if (this.checked) {
      targetElement.style.display = 'block';
    } else {
      targetElement.style.display = 'none';
    }
  });
});

function selectWeapon(button, weaponName, baseDamage, reloadSpeed, fireRate) {
  // Logic for selecting weapons and displaying stats
}

function selectShield(button, shieldType, shieldHP) {
  // Logic for selecting shields
}

function toggleAccordion(element) {
  const attachmentCategory = element.parentNode;

  if (attachmentCategory.classList.contains('active')) {
    attachmentCategory.classList.remove('active');
  } else {
    const activeCategory = document.querySelector('.attachment-category.active');
    if (activeCategory && activeCategory !== attachmentCategory) {
      activeCategory.classList.remove('active');
    }
    attachmentCategory.classList.add('active');
  }
}

function selectAttachment(button, category, displayName, multiplier) {
  // Logic for selecting attachments
}

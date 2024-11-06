<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Weapon Damage Calculator</title>
  <link rel="stylesheet" href="style.css">
  <script src="https://code.highcharts.com/highcharts.js"></script>
</head>
<body>

  <!-- Sidebar for Calculated Stats -->
  <div class="stats-sidebar">
    <h2>Calculated Stats</h2>

    <div class="result">
      <h3>TTK (Headshot):</h3>
      <span id="ttkHeadshot">0.0s</span>
    </div>

    <div class="result">
      <h3>TTK (Bodyshot):</h3>
      <span id="ttkBodyshot">0.0s</span>
    </div>

    <div class="result">
      <h3>Damage (Headshot):</h3>
      <span id="damageHeadshot">0</span>
    </div>

    <div class="result">
      <h3>Damage (Bodyshot):</h3>
      <span id="damageBodyshot">0</span>
    </div>

    <div class="result">
      <h3>Shots to Kill:</h3>
      <span id="shotsToKill">0</span>
    </div>

    <div class="result">
      <h3>Fire Rate:</h3>
      <span id="fireRate">0 RPM</span>
    </div>

    <div class="result">
      <h3>Damage Falloff Chart:</h3>
      <div id="falloffChart" style="width: 100%; height: 300px;"></div>
    </div>
  </div>

  <!-- Main Calculator Content -->
  <div class="calculator">
    <h1>Weapon Damage Calculator</h1>
    <hr class="section-divider">

    <!-- Weapon Selection Section -->
    <div class="section weapon-section">
      <h2>Choose Your Weapon</h2>
      <div class="weapon-buttons">
        <button class="weapon-button" onclick="selectWeapon(this, 'battle_rifle', 40, 3.0, 600)" style="background-image: url('battle_rifle.jpg');">Battle Rifle</button>
        <button class="weapon-button" onclick="selectWeapon(this, 'beam_gloves', 25, 2.0, 800)" style="background-image: url('beam_gloves.jpg');">Beam Gloves</button>
        <button class="weapon-button" onclick="selectWeapon(this, 'plasma_rifle', 30, 2.8, 700)" style="background-image: url('plasma_rifle.jpg');">Plasma Rifle</button>
        <button class="weapon-button" onclick="selectWeapon(this, 'shotgun', 60, 3.5, 120)" style="background-image: url('shotgun.jpg');">Shotgun</button>
        <button class="weapon-button" onclick="selectWeapon(this, 'sniper_rifle', 80, 4.0, 90)" style="background-image: url('sniper_rifle.jpg');">Sniper Rifle</button>
      </div>
    </div>

    <!-- Shield Selection Section -->
    <div class="section shield-section">
      <h2>Select Shield</h2>
      <div class="shield-buttons">
<button class="shield-button common" onclick="selectShield(this, 'common', 30)">Common Shield (30 HP)</button>
<button class="shield-button rare" onclick="selectShield(this, 'rare', 60)">Rare Shield (60 HP)</button>
<button class="shield-button epic" onclick="selectShield(this, 'epic', 90)">Epic Shield (90 HP)</button>
<button class="shield-button legendary" onclick="selectShield(this, 'legendary', 120)">Legendary Shield (120 HP)</button>

      </div>
    </div>

    <!-- Attachment Selection Section -->
    <div class="section attachment-section">
      <h2>Select Attachments</h2>

      <!-- Optic Attachments -->
      <div class="attachment-category">
        <h3 class="attachment-title" data-slot-name="optic" onclick="toggleAccordion(this)">Optic</h3>
        <div class="attachment-buttons">
          <button class="attachment-button" onclick="selectAttachment(this, 'optics', 'Scope (+20% damage)', 1.2)">Scope (+20% damage)</button>
          <button class="attachment-button" onclick="selectAttachment(this, 'optics', 'Red Dot (+10% damage)', 1.1)">Red Dot (+10% damage)</button>
        </div>
      </div>

      <!-- Barrel Attachments -->
      <div class="attachment-category">
        <h3 class="attachment-title" data-slot-name="barrel" onclick="toggleAccordion(this)">Barrel</h3>
        <div class="attachment-buttons">
          <button class="attachment-button" onclick="selectAttachment(this, 'barrel', 'Heavy Barrel (+30% damage)', 1.3)">Heavy Barrel (+30% damage)</button>
          <button class="attachment-button" onclick="selectAttachment(this, 'barrel', 'Short Barrel (+5% damage)', 1.05)">Short Barrel (+5% damage)</button>
        </div>
      </div>
      
      <!-- Grip Attachments -->
      <div class="attachment-category">
        <h3 class="attachment-title" data-slot-name="grip" onclick="toggleAccordion(this)">Grip</h3>
        <div class="attachment-buttons">
          <button class="attachment-button" onclick="selectAttachment(this, 'grip', 'Angled Grip (+15% damage)', 1.15)">Angled Grip (+15% damage)</button>
          <button class="attachment-button" onclick="selectAttachment(this, 'grip', 'Vertical Grip (+10% damage)', 1.1)">Vertical Grip (+10% damage)</button>
        </div>
      </div>
      
      <!-- Magazine Attachments -->
      <div class="attachment-category">
        <h3 class="attachment-title" data-slot-name="magazine" onclick="toggleAccordion(this)">Magazine</h3>
        <div class="attachment-buttons">
          <button class="attachment-button" onclick="selectAttachment(this, 'magazine', 'Extended Mag (+10% damage)', 1.1)">Extended Mag (+10% damage)</button>
          <button class="attachment-button" onclick="selectAttachment(this, 'magazine', 'Quick Reload Mag (+5% damage)', 1.05)">Quick Reload Mag (+5% damage)</button>
        </div>
      </div>

    </div>
  </div>

  <script src="script.js"></script>
</body>
</html>

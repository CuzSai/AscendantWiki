/* General Page Styling */
body {
  font-family: Arial, sans-serif;
  background-color: #1e1e2f;
  color: #d1d1e9;
  display: flex;
  justify-content: center;
  margin: 0;
  padding-right: 250px; /* Offset for sidebar */
}

/* Sidebar Styling */
.stats-sidebar {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 220px;
  background-color: #3a3f5a;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
  color: #d1d1e9;
  animation: fadeIn 0.5s ease;
}

.stats-sidebar h2 {
  color: #8be9fd;
  font-size: 1.3em;
  margin-bottom: 15px;
  text-align: center;
}

.stats-sidebar .result {
  margin-bottom: 20px;
}

.stats-sidebar h3 {
  color: #ff79c6;
  font-size: 1em;
  margin-bottom: 5px;
}

.stats-sidebar progress {
  width: 100%;
  height: 18px;
  appearance: none;
  -webkit-appearance: none;
  border-radius: 5px;
}

.stats-sidebar progress::-webkit-progress-bar {
  background-color: #44475a;
  border-radius: 5px;
}

.stats-sidebar progress::-webkit-progress-value {
  background-color: #8be9fd;
  border-radius: 5px;
  transition: width 0.5s ease;
}

.stats-sidebar span {
  display: inline-block;
  color: #ff79c6;
  font-weight: bold;
  font-size: 1.1em;
  margin-top: 5px;
  animation: fadeIn 0.5s ease;
}

.calculator {
  background-color: #282a36;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
  width: 80%;
  max-width: 700px;
  text-align: center;
  animation: slideUp 0.5s ease;
}

h1 {
  color: #8be9fd;
  font-size: 1.8em;
  margin-bottom: 20px;
}

.section-divider {
  border: none;
  height: 2px;
  background-color: #44475a;
  margin: 15px 0;
}

h2 {
  color: #50fa7b;
  font-size: 1.3em;
  margin-bottom: 10px;
}

/* Weapon Buttons */
.weapon-buttons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin: 20px 0;
}

.weapon-button {
  height: 140px;
  background-size: cover;
  background-position: center;
  background-color: #3a3f5a;
  border: none;
  border-radius: 8px;
  color: #fff;
  font-size: 1.1em;
  font-weight: bold;
  cursor: pointer;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s, box-shadow 0.2s, background-color 0.2s;
}

.weapon-button.selected {
  box-shadow: 0 0 15px #8be9fd;
  background-color: #50587a;
  transform: scale(1.05);
}

.weapon-button:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
}

/* Attachment Buttons */
.attachment-category {
  margin-bottom: 20px;
}

.attachment-title {
  font-size: 1.2em;
  color: #ffb86c;
  cursor: pointer;
  margin-bottom: 5px;
}

.attachment-buttons {
  display: none;
  transition: max-height 0.3s ease;
  overflow: hidden;
}

.attachment-category:hover .attachment-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.attachment-button {
  height: 40px;
  background-color: #3a3f5a;
  border: none;
  border-radius: 8px;
  color: #fff;
  font-size: 1.1em;
  font-weight: bold;
  cursor: pointer;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s, box-shadow 0.2s, background-color 0.2s;
}

.attachment-button.selected {
  box-shadow: 0 0 15px #8be9fd;
  background-color: #50587a;
}

.attachment-button:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
}

/* General Page Styling */
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Professional font */
  background-color: #1f1f1f; /* Dark neutral background */
  color: #e0e0e0; /* Softer white for better contrast */
  display: flex;
  justify-content: center;
  margin: 0;
  padding-right: 250px; /* Offset for sidebar */
}

/* Sidebar for Calculated Stats */
.stats-sidebar {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 300px;
  background-color: #292929; /* Subtle difference to stand out against body */
  padding: 20px;
  border-radius: 5px; /* Slightly rounded for a modern look */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3); /* More subtle shadow for professionalism */
  color: #e0e0e0;
  animation: fadeIn 0.5s ease;
}

.stats-sidebar h2 {
  color: #aad1e6; /* Muted light blue */
  font-size: 1.3em;
  margin-bottom: 15px;
  text-align: center;
  font-weight: 500; /* Less bold */
}

.weapon-stats {
  margin-bottom: 25px;
}

.weapon-stats h3 {
  color: #50fa7b; /* Soft green for better visual distinction */
  font-size: 1.2em;
  font-weight: 500;
  margin-bottom: 10px;
}

.stats-sidebar .result {
  margin-bottom: 20px;
}

.stats-sidebar h3 {
  color: #c0c0c0; /* Softer light grey */
  font-size: 1em;
  margin-bottom: 5px;
}

.stats-sidebar span {
  display: inline-block;
  color: #ff79c6;
  font-weight: bold;
  font-size: 1.1em;
  margin-top: 5px;
  animation: fadeIn 0.5s ease;
}

/* Calculator Styling */
.calculator {
  background-color: #2a2a2a; /* Softer dark shade */
  padding: 30px;
  border-radius: 5px; /* Less rounded for a more professional look */
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3); /* Subtle shadow */
  width: 80%;
  max-width: 800px;
  text-align: center;
  animation: slideUp 0.5s ease;
}

h1 {
  color: #aad1e6; /* Consistent soft blue */
  font-size: 1.6em;
  margin-bottom: 20px;
  font-weight: 500;
}

.section-divider {
  border: none;
  height: 2px;
  background-color: #3c3c3c; /* Softer divider */
  margin: 15px 0;
}

h2, h3 {
  color: #c0c0c0; /* Softer grey for section titles */
  font-size: 1.2em;
  margin-bottom: 10px;
  font-weight: 500;
}

.weapon-section {
  margin-bottom: 40px;
}

.weapon-buttons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin: 20px 0;
}

.weapon-button, .attachment-button {
  height: 60px;
  background-color: #3a3a3a; /* Darker, muted tone */
  border: 1px solid #484848; /* Subtle border */
  border-radius: 5px; /* Less rounded for professionalism */
  color: #e0e0e0;
  font-size: 1em; /* Reduced size for a more refined look */
  font-weight: 500;
  cursor: pointer;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.15s, box-shadow 0.15s, background-color 0.15s;
}

.weapon-button.selected, .attachment-button.selected {
  box-shadow: 0 0 10px #aad1e6; /* Subtle glow to indicate selection */
  background-color: #4a4a4a; /* Slight change to indicate selection */
  transform: scale(1.03); /* Less pronounced scaling */
}

.weapon-button:hover, .attachment-button:hover {
  transform: scale(1.02); /* Slightly smaller hover effect */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3); /* Softer shadow */
  background-color: #505050; /* Muted hover background */
}

/* Attachment Categories and Accordion */
.attachment-category {
  margin-bottom: 15px;
  overflow: hidden;
  transition: max-height 0.4s ease, padding 0.4s ease;
  max-height: 60px; /* Default height when collapsed */
  background-color: #2e2e2e;
  border-radius: 5px; /* Consistent rounded corners */
}

.attachment-category.active {
  max-height: 220px; /* Height when expanded */
  padding: 10px; /* Slightly less padding */
}

.attachment-title {
  font-size: 1.1em;
  color: #e0e0e0;
  cursor: pointer;
  line-height: 1.4;
  padding: 10px 0; 
  text-align: center;
}

/* Attachment Buttons Styling */
.attachment-buttons {
  overflow: hidden;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px; /* Space between attachment buttons */
}

.attachment-button {
  background-color: #3a3a3a; /* Consistent background for attachment buttons */
  border-radius: 5px; /* Rounded corners for consistency */
  border: 1px solid #484848; /* Subtle border */
  padding: 10px;
}

/* Armor Selection Section */
.armor-section {
  margin: 25px 0;
}

#armorSelect {
  width: 50%;
  padding: 10px;
  border-radius: 5px;
  background-color: #3a3a3a; /* Dark muted color */
  color: #e0e0e0;
  border: 1px solid #484848; /* Subtle border */
  font-size: 1em;
}

/* Compare Button Section */
.compare-section {
  margin: 25px 0;
}

.compare-section button {
  padding: 15px;
  border-radius: 5px;
  border: none;
  background-color: #50fa7b; /* Soft green to indicate action */
  color: #1f1f1f;
  font-size: 1em;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
}

.compare-section button:hover {
  background-color: #4ae864; /* Darker shade on hover */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3); /* Shadow to indicate action */
}

.compare-section button:active {
  transform: scale(0.98); /* Small scaling on click */
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
  }
  to {
    transform: translateY(0);
  }
}

/* Falloff Chart Styling */
#falloffChart {
  margin-top: 20px;
}

/* General Media Queries for Responsive Layout */
@media (max-width: 768px) {
  .weapon-buttons {
    grid-template-columns: 1fr; /* Stack weapon buttons in a single column */
  }

  .stats-sidebar {
    width: 100%;
    position: static;
    margin-bottom: 20px;
  }

  .calculator {
    width: 90%;
  }
}

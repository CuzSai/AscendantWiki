import { weapons } from "../entities/Weapons";

export default function WeaponSelection({ selectedWeapon, setSelectedWeapon }) {
  return (
    <>
      <div className="section weapon-section">
        <h2>Choose Your Weapon</h2>
        <div className="weapon-buttons">
          {weapons.map((weapon, index) => (
            <button
              key={index}
              className={`weapon-button ${
                selectedWeapon?.name === weapon.name ? "selected" : ""
              }`}
              onClick={() => setSelectedWeapon(weapon)}
            >
              {weapon.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

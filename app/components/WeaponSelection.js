export default function WeaponSelection({ selectedWeapon, setSelectedWeapon }) {
  const weapons = [
    {
      name: "Battle Rifle",
      baseDamage: 20,
      fireRate: 100,
      reloadSpeed: 1,
    },
    {
      name: "Plasma Rifle",
      baseDamage: 30,
      fireRate: 90,
      reloadSpeed: 1.2,
    },
  ];

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

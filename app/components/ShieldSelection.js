export default function ShieldSelection({ selectedShield, setSelectedShield }) {
  const shields = [
    {
      type: "Common",
      shieldHp: 30,
    },
    {
      type: "Rare",
      shieldHp: 60,
    },
    {
      type: "Epic",
      shieldHp: 90,
    },
    {
      type: "Legendary",
      shieldHp: 120,
    },
  ];

  return (
    <div className="section shield-section">
      <h2>Select Shield</h2>
      <div className="shield-buttons">
        {shields.map((shield, index) => (
          <button
            key={index}
            className={`shield-button ${shield.type.toLowerCase()} ${
              selectedShield?.type === shield.type ? "selected glow" : ""
            }`}
            onClick={() => setSelectedShield(shield)}
          >
            {shield.type} Shield ({shield.shieldHp} HP)
          </button>
        ))}
      </div>
    </div>
  );
}

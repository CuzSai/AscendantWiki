import { useEffect, useState } from "react";

export default function AttachmentSelection({ setSelectedAttachments }) {
  const [selectedOptic, setSelectedOptic] = useState({
    displayName: "None",
    multiplier: 1,
  });
  const [selectedBarrel, setSelectedBarrel] = useState({
    displayName: "None",
    multiplier: 1,
  });
  const [selectedGrip, setSelectedGrip] = useState({
    displayName: "None",
    multiplier: 1,
  });

  const optics = [
    {
      displayName: "None",
      multiplier: 1,
    },
    {
      displayName: "Scope (+20% damage)",
      multiplier: 1.2,
    },
    {
      displayName: "Red Dot (+10% damage)",
      multiplier: 1.1,
    },
  ];

  const barrels = [
    {
      displayName: "None",
      multiplier: 1,
    },
    {
      displayName: "Heavy Barrel (+30% damage)",
      multiplier: 1.3,
    },
    {
      displayName: "Short Barrel (+5% damage)",
      multiplier: 1.05,
    },
  ];

  const grips = [
    {
      displayName: "None",
      multiplier: 1,
    },
    {
      displayName: "Angled Grip (+15% damage)",
      multiplier: 1.15,
    },
    {
      displayName: "Vertical Grip (+10& damage)",
      multiplier: 1.1,
    },
  ];

  useEffect(() => {
    handleAttachmentsChanged();
  }, [selectedOptic, selectedBarrel, selectedGrip]);

  function handleAttachmentsChanged() {
    const selectedAttachments = [selectedOptic, selectedBarrel, selectedGrip];

    setSelectedAttachments(selectedAttachments);
  }

  return (
    <>
      <div className="section attachment-section">
        <h2>Select Attachments</h2>

        <div className="attachment-category">
          <h3 className="attachment-title" data-slot-name="Optic">
            Optic
            <br />
            <span className="selected-attachment">
              {selectedOptic.displayName}
            </span>
          </h3>
          <div className="attachment-buttons">
            {optics.map((optic, index) => (
              <button
                key={index}
                className={`attachment-button ${
                  selectedOptic?.displayName === optic.displayName
                    ? "selected"
                    : ""
                }`}
                onClick={() => setSelectedOptic(optic)}
              >
                {optic.displayName}
              </button>
            ))}
          </div>
        </div>

        <div className="attachment-category">
          <h3 className="attachment-title" data-slot-name="Barrel">
            Barrel
            <br />
            <span className="selected-attachment">
              {selectedBarrel.displayName}
            </span>
          </h3>
          <div className="attachment-buttons">
            {barrels.map((barrel, index) => (
              <button
                key={index}
                className={`attachment-button ${
                  selectedBarrel?.displayName === barrel.displayName
                    ? "selected"
                    : ""
                }`}
                onClick={() => setSelectedBarrel(barrel)}
              >
                {barrel.displayName}
              </button>
            ))}
          </div>
        </div>

        <div className="attachment-category">
          <h3 className="attachment-title" data-slot-name="Grip">
            Grip
            <br />
            <span className="selected-attachment">
              {selectedGrip.displayName}
            </span>
          </h3>
          <div className="attachment-buttons">
            {grips.map((grip, index) => (
              <button
                key={index}
                className={`attachment-button ${
                  selectedGrip?.displayName === grip.displayName
                    ? "selected"
                    : ""
                }`}
                onClick={() => setSelectedGrip(grip)}
              >
                {grip.displayName}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

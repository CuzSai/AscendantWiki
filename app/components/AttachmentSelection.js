import { optics } from "../entities/Optics";
import { barrels } from "../entities/Barrels";
import { grips } from "../entities/Grips";

import { useEffect, useState, useRef } from "react";

export default function AttachmentSelection({
  selectedAttachments,
  setSelectedAttachments,
}) {
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

  const isInternalUpdate = useRef(false);

  useEffect(() => {
    if (!isInternalUpdate.current) {
      if (selectedAttachments.length === 3) {
        setSelectedOptic(selectedAttachments[0]);
        setSelectedBarrel(selectedAttachments[1]);
        setSelectedGrip(selectedAttachments[2]);
      }
    } else {
      isInternalUpdate.current = false;
    }
  }, [selectedAttachments]);

  useEffect(() => {
    const newAttachments = [selectedOptic, selectedBarrel, selectedGrip];
    setSelectedAttachments(newAttachments);

    isInternalUpdate.current = true;
  }, [selectedOptic, selectedBarrel, selectedGrip, setSelectedAttachments]);

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

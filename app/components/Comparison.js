import { useEffect, useState } from "react";

export default function Comparison({
  weapon,
  attachments,
  setSelectedWeapon,
  setSelectedAttachments,
}) {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [setups, setSetups] = useState([{}, {}, {}]);

  useEffect(() => {
    console.log(setups);
  }, [setups]);

  const updateSetup = (index) => {
    setSetups((prevSetups) =>
      prevSetups.map((setup, i) =>
        i === index ? { weapon, attachments } : setup,
      ),
    );
  };

  return (
    <>
      <div className="compare-section">
        <button
          id="compareButton"
          onClick={() => {
            setModalOpen(true);
            setOpen(true);
          }}
        >
          Compare
        </button>
      </div>

      {open && (
        <div id="comparisonSection" className="comparison-container">
          <h2>Comparison</h2>
          <table id="comparisonTable">
            <thead>
              <tr>
                <th>Weapon</th>
                <th>Penetration Multiplier</th>
                <th>Rounds per Minute</th>
                <th>Ammo Cost Per Kill</th>
                <th>Reload Adjust RPM</th>
                <th>Damage per Second (Approx)</th>
                <th>Reload Adjust DPS</th>
              </tr>
            </thead>
            <tbody id="setupComparison">
              {setups.map((setup, index) =>
                setup.weapon ? (
                  <tr key={index}>
                    <td>
                      <button
                        style={{
                          backgroundColor: "#3a3a3a",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                          padding: "5px 10px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setSelectedWeapon(setup.weapon);
                          setSelectedAttachments(setup.attachments);
                        }}
                      >
                        {setup.weapon?.name || "Setup " + (index + 1)}
                      </button>
                    </td>
                    <td>{setup.weapon?.penetration || "-"}</td>
                    <td>{setup.weapon?.fireRate || "-"}</td>
                    <td>{setup.weapon?.ammoCost || "-"}</td>
                    <td>{setup.weapon?.reloadAdjustRPM || "-"}</td>
                    <td>{setup.weapon?.dps || "-"}</td>
                    <td>{setup.weapon?.reloadAdjustDPS || "-"}</td>
                  </tr>
                ) : null,
              )}
            </tbody>
          </table>
        </div>
      )}

      {modalOpen && (
        <div id="compareModal" className="modal" style={{ display: "block" }}>
          <div className="modal-content">
            <span
              className="close"
              id="LoadCustom"
              onClick={() => setModalOpen(false)}
            >
              &times;
            </span>
            <h2>Select Setup Slot</h2>
            <div className="setup-slots">
              {setups.map((_, index) => (
                <button key={index} onClick={() => updateSetup(index)}>
                  Setup Slot {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

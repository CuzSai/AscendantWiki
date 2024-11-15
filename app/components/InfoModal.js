import { useState } from "react";

export default function InfoModal({ open }) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <button
        id="infoButton"
        onClick={() => setVisible(true)}
        style={{
          position: "fixed",
          top: "10px",
          left: "10px",
          zIndex: 1000,
          backgroundColor: "#3a3a3a",
          color: "white",
          border: "none",
          borderRadius: "50%",
          padding: "10px 15px",
          cursor: "pointer",
          width: "50px",
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        ?
      </button>

      {visible && (
        <div id="infoModal" className="modal" style={{ display: "block" }}>
          <div
            className="modal-content"
            style={{
              backgroundColor: "#2e2e2e",
              margin: "15% auto",
              padding: "20px",
              borderRadius: "5px",
              width: "40%",
              textAlign: "center",
            }}
          >
            <span
              className="close"
              onClick={() => setVisible(false)}
              style={{
                color: "white",
                float: "right",
                fontSize: "28px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              &times;
            </span>
            <h2>Information</h2>
            <p>
              This site is a test; the data given on this site is purely for
              example purposes.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

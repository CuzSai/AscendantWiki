"use client";

import Head from "next/head";
import { useState } from "react";
import InfoModal from "./components/InfoModal";
import Sidebar from "./components/Sidebar";
import WeaponSelection from "./components/WeaponSelection";
import Comparison from "./components/Comparison";
import AttachmentSelection from "./components/AttachmentSelection";
import ShieldSelection from "./components/ShieldSelection";
import "./styles/weapon-calculator.css";

export default function WeaponCalculator() {
  const [selectedWeapon, setSelectedWeapon] = useState();
  const [selectedShield, setSelectedShield] = useState();

  const [selectedAttachments, setSelectedAttachments] = useState([]);

  return (
    <>
      <Head>
        <title>Weapon Damage Calculator</title>
      </Head>

      <InfoModal />

      <Sidebar
        weapon={selectedWeapon}
        shield={selectedShield}
        attachments={selectedAttachments}
      />

      <div className="calculator">
        <h1>Weapon Damage Calculator</h1>
        <hr className="section-divider" />

        <WeaponSelection
          selectedWeapon={selectedWeapon}
          setSelectedWeapon={setSelectedWeapon}
        />

        <ShieldSelection
          selectedShield={selectedShield}
          setSelectedShield={setSelectedShield}
        />

        <AttachmentSelection
          selectedAttachments={selectedAttachments}
          setSelectedAttachments={setSelectedAttachments}
        />

        <Comparison
          weapon={selectedWeapon}
          attachments={selectedAttachments}
          setSelectedWeapon={setSelectedWeapon}
          setSelectedAttachments={setSelectedAttachments}
        />
      </div>
    </>
  );
}

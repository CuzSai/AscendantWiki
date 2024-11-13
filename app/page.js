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
  const [comparisonVisible, setComparisonVisible] = useState(false);

  const [selectedWeapon, setSelectedWeapon] = useState({
    baseDamage: 0,
    fireRate: 0,
    reloadSpeed: 0,
  });
  const [selectedShield, setSelectedShield] = useState({
    type: "",
    shieldHp: 0,
  });

  const [selectedAttachments, setSelectedAttachments] = useState([
    {
      displayName: "",
      multiplier: 1,
    },
    {
      displayName: "",
      multiplier: 1,
    },
    {
      displayName: "",
      multiplier: 1,
    },
  ]);

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

        <AttachmentSelection setSelectedAttachments={setSelectedAttachments} />

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

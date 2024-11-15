"use client";

import { useEffect, useState } from "react";
import Highcharts from "highcharts";

export default function Sidebar({ weapon, shield, attachments }) {
  const [isOpen, setIsOpen] = useState(false);

  const [showTTKHeadshot, setShowTTKHeadshot] = useState(true);
  const [showTTKBodyshot, setShowTTKBodyshot] = useState(true);
  const [showDamageHeadshot, setShowDamageHeadshot] = useState(true);
  const [showDamageBodyshot, setShowDamageBodyshot] = useState(true);
  const [showShotsToKill, setShowShotsToKill] = useState(true);
  const [showFireRate, setShowFireRate] = useState(true);
  const [showFalloffChart, setShowFalloffChart] = useState(true);

  const [ttkHeadshot, setTTKHeadshot] = useState(0);
  const [ttkBodyshot, setTTKBodyshot] = useState(0);
  const [damageHeadshot, setDamageHeadshot] = useState(0);
  const [damageBodyshot, setDamageBodyshot] = useState(0);
  const [shotsToKill, setShotsToKill] = useState(0);
  const [fireRate, setFireRate] = useState(0);

  useEffect(() => {
    calculateStats();
  });

  function calculateStats() {
    let multiplier = 1;
    attachments?.forEach((attachment) => {
      multiplier += attachment.multiplier;
    });
    const finalDamageHeadshot = weapon?.baseDamage * multiplier * 1.5;
    const finalDamageBodyshot = weapon?.baseDamage * multiplier;

    const totalHealth = 100 + shield?.shieldHp;
    const shotsToKill = Math.ceil(totalHealth / finalDamageBodyshot);
    const ttkHeadshot = ((shotsToKill / (weapon?.fireRate / 60)) * 0.7).toFixed(
      2,
    );
    const ttkBodyshot = (shotsToKill / (weapon?.fireRate / 60)).toFixed(2);

    setDamageHeadshot(!isNaN(finalDamageHeadshot) ? finalDamageHeadshot : 0);
    setDamageBodyshot(!isNaN(finalDamageBodyshot) ? finalDamageBodyshot : 0);
    setTTKHeadshot(!isNaN(ttkHeadshot) ? ttkHeadshot : 0);
    setTTKBodyshot(!isNaN(ttkBodyshot) ? ttkBodyshot : 0);
    setShotsToKill(!isNaN(shotsToKill) ? shotsToKill : 0);
    setFireRate(weapon?.fireRate ? weapon.fireRate : 0);

    renderFalloffChart(finalDamageBodyshot);
  }

  function renderFalloffChart(baseDamage) {
    Highcharts.chart("falloffChart", {
      chart: {
        type: "line",
        backgroundColor: "#292929",
      },
      title: {
        text: "Damage Falloff Chart",
        style: {
          color: "#e0e0e0",
        },
      },
      xAxis: {
        title: {
          text: "Distance (m)",
          style: {
            color: "#e0e0e0",
          },
        },
        categories: [
          "0",
          "20",
          "40",
          "60",
          "80",
          "100",
          "120",
          "140",
          "160",
          "180",
          "200",
        ],
        labels: {
          style: {
            color: "#e0e0e0",
          },
        },
      },
      yAxis: {
        title: {
          text: "Damage",
          style: {
            color: "#e0e0e0",
          },
        },
        min: 0,
        max: baseDamage,
        labels: {
          style: {
            color: "#e0e0e0",
          },
        },
      },
      series: [
        {
          name: "Damage at Distance",
          data: generateFalloffData(baseDamage),
          color: "#aad1e6",
          marker: {
            enabled: true,
            radius: 4,
          },
          lineWidth: 2,
        },
      ],
      legend: {
        itemStyle: {
          color: "#e0e0e0",
        },
      },
    });
  }

  function generateFalloffData(baseDamage) {
    const multipliers = [
      1, 0.95, 0.9, 0.85, 0.8, 0.75, 0.7, 0.65, 0.6, 0.55, 0.5,
    ];
    return multipliers.map((multiplier) =>
      parseFloat((baseDamage * multiplier).toFixed(2)),
    );
  }

  return (
    <div className={`stats-sidebar ${isOpen ? "expanded" : ""}`}>
      <h2>Calculated Stats</h2>
      <button id="toggleSidebar" onClick={() => setIsOpen((prev) => !prev)}>
        {isOpen ? "Collapse" : "Expand"}
      </button>

      <div className="stat-options">
        <label>
          <input
            type="checkbox"
            defaultChecked
            onChange={(e) => setShowTTKHeadshot(e.target.checked)}
          />{" "}
          TTK (HS)
        </label>
        <label>
          <input
            type="checkbox"
            defaultChecked
            onChange={(e) => setShowTTKBodyshot(e.target.checked)}
          />{" "}
          TTK (BS)
        </label>
        <label>
          <input
            type="checkbox"
            defaultChecked
            onChange={(e) => setShowDamageHeadshot(e.target.checked)}
          />{" "}
          Damage (HS)
        </label>
        <label>
          <input
            type="checkbox"
            defaultChecked
            onChange={(e) => setShowDamageBodyshot(e.target.checked)}
          />{" "}
          Damage (BS)
        </label>
        <label>
          <input
            type="checkbox"
            defaultChecked
            onChange={(e) => setShowShotsToKill(e.target.checked)}
          />{" "}
          Shots to Kill
        </label>
        <label>
          <input
            type="checkbox"
            defaultChecked
            onChange={(e) => setShowFireRate(e.target.checked)}
          />{" "}
          Fire Rate
        </label>
        <label>
          <input
            type="checkbox"
            defaultChecked
            onChange={(e) => setShowFalloffChart(e.target.checked)}
          />{" "}
          Damage Falloff Chart
        </label>
      </div>

      {/* Conditional Rendering Based on Checkbox State */}
      {showTTKHeadshot && (
        <div className="result">
          <h3>TTK (Headshot):</h3>
          <span>{ttkHeadshot}</span>
        </div>
      )}

      {showTTKBodyshot && (
        <div className="result">
          <h3>TTK (Bodyshot):</h3>
          <span>{ttkBodyshot}</span>
        </div>
      )}

      {showDamageHeadshot && (
        <div className="result">
          <h3>Damage (Headshot):</h3>
          <span>{damageHeadshot}</span>
        </div>
      )}

      {showDamageBodyshot && (
        <div className="result">
          <h3>Damage (Bodyshot):</h3>
          <span>{damageBodyshot}</span>
        </div>
      )}

      {showShotsToKill && (
        <div className="result">
          <h3>Shots to Kill:</h3>
          <span>{shotsToKill}</span>
        </div>
      )}

      {showFireRate && (
        <div className="result">
          <h3>Fire Rate:</h3>
          <span>{fireRate} RPM</span>
        </div>
      )}

      {showFalloffChart && (
        <div className="result" id="falloffChartContainer">
          <h3>Damage Falloff Chart:</h3>
          <div
            id="falloffChart"
            style={{ width: "100%", height: "300px" }}
          ></div>
        </div>
      )}
    </div>
  );
}

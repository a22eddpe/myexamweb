// ==UserScript==
// @name         Laddmätningstest. 100 mätningar.
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Mäter laddtider 100x och sparar alla i localStorage först efter sista mätningen
// @match        http://localhost/myexamweb/basline/*
// @match        http://localhost/myexamweb/alpine/*
// @grant        none
// ==/UserScript==

console.log("Startar mätning...");

(function () {
  'use strict';

  const TOTAL_RUNS = 200;
  const STORAGE_KEY_COUNT = 'mät_count';
  const STORAGE_KEY_LOG = 'mät_log';

  const currentLoadTime = Math.round(performance.now());

  let currentCount = parseInt(localStorage.getItem(STORAGE_KEY_COUNT)) || 0;
  let csvLog = localStorage.getItem(STORAGE_KEY_LOG) || "Nr,Laddtid (ms)\n";

  currentCount++;
  csvLog += `${currentCount},${currentLoadTime}\n`;

  localStorage.setItem(STORAGE_KEY_COUNT, currentCount);
  localStorage.setItem(STORAGE_KEY_LOG, csvLog);

  console.log(`Mätning ${currentCount}/${TOTAL_RUNS} - ${currentLoadTime}ms`);

  if (currentCount >= TOTAL_RUNS) {
    exportCSV(csvLog);
    localStorage.removeItem(STORAGE_KEY_COUNT);
    localStorage.removeItem(STORAGE_KEY_LOG);
    console.log("Mätningar klara");
  } else {
    setTimeout(() => {
      window.location.replace(window.location.href);
    }, 800);
  }

  function exportCSV(csvData) {
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "resultat_laddtider.csv";
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
})();
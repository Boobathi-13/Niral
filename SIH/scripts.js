// ---------- CHARTS ----------

// ... Your existing code ...

// TEMPERATURE CHART


// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB-uqD8irbeVh9HJMpefA8HfiYaPY5iPec",
    authDomain: "trail-638316.firebaseapp.com",
    databaseURL: "https://trail-638316-default-rtdb.firebaseio.com",
    projectId: "trail-638316",
    storageBucket: "trail-638316.appspot.com",
    messagingSenderId: "991459996982",
    appId: "1:991459996982:web:b7bbea64f2614b60456f97",
    measurementId: "G-BLYZLXC0V3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Fetch and display sensor data
function fetchSensorData() {
    const db = getDatabase(app);
    const sensorRef = ref(db, 'Sensor');

    onValue(sensorRef, (snapshot) => {
        const data = snapshot.val();

        document.getElementById('idtemp').textContent = data.Temperature+" °C";
        document.getElementById('idprs').textContent = data.Humidity+" kPa";
        document.getElementById('idgt').textContent = data.GasLevel+" ppm";
    });
}

// Initialize Firebase and fetch data
fetchSensorData();

var temperatureCtx = document.getElementById('temperatureChart').getContext('2d');
var temperatureChart = new Chart(temperatureCtx, {
    type: 'bar',
    data: {
        labels: ['Sector A', 'Sector B', 'Sector C', 'Sector D', 'Sector E'],
        datasets: [{
            label: 'Fire Temperature (°C)',
            data: [950, 1410, 550, 1300, 850],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                max: 1600
            }
        }
    }
});

function updateTemperatureChart() {
    const newTemperatures = [950, 1410, 550, 1300, 850].map((temp) => temp + Math.floor(Math.random() * 201) - 25);
    temperatureChart.data.datasets[0].data = newTemperatures;
    temperatureChart.update();
}

function updateTemperatureValues() {
    const temperatures = temperatureChart.data.datasets[0].data;

    // Update each sector's temperature value box
    temperatures.forEach((temp, index) => {
        const sectorId = `sector${String.fromCharCode(65 + index)}`;
        const temperatureValueBox = document.getElementById(sectorId);
        temperatureValueBox.textContent = `Sector ${String.fromCharCode(65 + index)} : ${temp}°C`;
    });
}

setInterval(() => {
    updateTemperatureChart();
    updateTemperatureValues();
}, 2000);

// ... Your existing code ...

// PRESSURE CHART
var pressureCtx = document.getElementById('pressureChart').getContext('2d');
var pressureChart = new Chart(pressureCtx, {
    type: 'line',
    data: {
        labels: [], // Store timestamps
        datasets: [{
            label: 'Pressure (psi)',
            data: [33, 57, 46, 78, 63], // Store pressure values
            fill: false,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                max: 100
            },
            x: {
                display: false // Hide the x-axis labels
            }
        }
    }
});

function updatePressureChart() {
    const currentTime = new Date().toLocaleTimeString();
    const pressure = parseFloat(generateRandomPressureData());

    pressureChart.data.labels.push(currentTime);
    pressureChart.data.datasets[0].data.push(pressure);

    // Limit the chart to the last 10 seconds (remove data older than 10 seconds)
    if (pressureChart.data.labels.length > 6) {
        pressureChart.data.labels.shift();
        pressureChart.data.datasets[0].data.shift();
    }

    pressureChart.update();
}

// Update the pressure chart every 2 seconds (you can adjust the interval)
setInterval(updatePressureChart, 2000);

// GAS TOXICITY CHART
var gasToxicityCtx = document.getElementById('gasToxicityChart').getContext('2d');
var gasToxicityChart = new Chart(gasToxicityCtx, {
    type: 'line',
    data: {
        labels: [], // Store timestamps
        datasets: [{
            label: 'Gas Toxicity %',
            data: [], // Store gas toxicity values
            fill: false,
            borderColor: 'rgba(255, 99, 132, 1)', // Red color
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                max: 100 // Adjust the max value as needed
            },
            x: {
                display: false // Hide the x-axis labels
            }
        }
    }
});

function updateGasToxicityChart() {
    const currentTime = new Date().toLocaleTimeString();
    const gasToxicity = parseFloat(generateRandomGasData());

    gasToxicityChart.data.labels.push(currentTime);
    gasToxicityChart.data.datasets[0].data.push(gasToxicity);

    // Limit the chart to the last 6 seconds (remove data older than 6 seconds)
    if (gasToxicityChart.data.labels.length > 6) {
        gasToxicityChart.data.labels.shift();
        gasToxicityChart.data.datasets[0].data.shift();
    }

    gasToxicityChart.update();
}

// Update the gas toxicity chart every 2 seconds (you can adjust the interval)
setInterval(updateGasToxicityChart, 2000);

// ... Your existing code ...

// Function to generate random gas data
function generateRandomGasData() {
    return (Math.random() * 100).toFixed(2);
}

// Function to generate random pressure data
function generateRandomPressureData() {
    return (Math.random() * 100).toFixed(2);
}

document.getElementById("Dashboard").addEventListener("click", function () {
    window.location.href = "interface.html";
});
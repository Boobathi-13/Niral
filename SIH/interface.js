 
  
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
  import { getDatabase,ref,onValue} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";  
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
      document.getElementById('tmpa').textContent = "Temperature: "+data.Temperature+" °C";
      document.getElementById('prsa').textContent = "Pressure: "+data.Humidity+" kPa";
      document.getElementById('gsta').textContent = "Gas-Toxicity: "+data.GasLevel+" ppm";

      document.getElementById('idtemp').textContent = data.Temperature;
      document.getElementById('idprs').textContent = data.Humidity;
      document.getElementById('idgt').textContent = data.GasLevel;
    });
  }

  // Initialize Firebase and fetch data
  fetchSensorData();


document.getElementById("SectorA").addEventListener("click", function() {
    window.location.href = "index.html";
});

document.getElementById("SectorB").addEventListener("click", function() {
    window.location.href = "index.html";
});

document.getElementById("SectorC").addEventListener("click", function() {
    window.location.href = "index.html";
});

document.getElementById("SectorD").addEventListener("click", function() {
    window.location.href = "index.html";
});

function scrollEvents() {
        var eventList = document.getElementById('eventList1');
        var firstItem = eventList.querySelector('li');
        eventList.appendChild(firstItem.cloneNode(true));
        eventList.style.top = '0px';
        setTimeout(function () {
            eventList.style.transition = 'top 0.5s';
            eventList.style.top = '-48.6px'; // Adjust the height of your list item
            setTimeout(function () {
                eventList.style.transition = 'none';
                eventList.style.top = '0px';
                eventList.removeChild(firstItem);
            }, 500); // This should match the transition duration
        }, 1000); // 1-second delay
    }

    setInterval(scrollEvents, 2000); // 2-second interval (1-second delay + 1-second scroll)
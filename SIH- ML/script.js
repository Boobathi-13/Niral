 
  
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
      document.getElementById('temperature').textContent = data.Temperature;
      document.getElementById('humidity').textContent = data.Humidity;
      document.getElementById('gasLevel').textContent = data.GasLevel;
    });
  }

  // Initialize Firebase and fetch data
  fetchSensorData();


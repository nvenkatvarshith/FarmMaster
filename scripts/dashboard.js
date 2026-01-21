let latitude = 0;
let longitude = 0;
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        getCurrentWeather();
      },
      (error) => {
        console.error("Error:", error.message);
      }
    );
  } else {
    alert("Geolocation is not supported by your browser");
  }

async function getCurrentWeather() {
    try{
        let response = await fetch(`https://api.weatherapi.com/v1/current.json?q=${latitude},${longitude}&key=67b38d5ff44143a897312006262101`,
            {
                method: "GET"
            }
        );
        let weatherReport = await response.json();
        let weather = document.getElementById("weatherContent");
        weather.innerHTML = `
                <p>${weatherReport["location"].name}, ${weatherReport["location"].region}</p>
                <P><img src="${weatherReport['current']['condition'].icon}"/> ${weatherReport['current']['condition'].text}
                `;


    }catch(error){
        console.log(error);
    } 
}

let logs = [];
const currentTimestamp = new Date();
let currentDate = `${currentTimestamp.getFullYear()}-${currentTimestamp.getMonth()+1 < 10 ? '0'+ (currentTimestamp.getMonth()+1):currentTimestamp.getMonth()+1}-${currentTimestamp.getDate()}`;

async function updateLabourCount(){
    try{
        let response = await fetch("http://localhost:4000/logs",{
            method:"GET"
        })
        logs = await response.json();
        console.log(logs);
        setLabourCard();
    }catch(error){
        console.log(error);
    }
}

function setLabourCard(){
    logs.forEach(function(log){
        if(log.date == currentDate){
            document.getElementById("labour-count").innerHTML = log.labour_count;
            document.getElementById("payment-pending").innerHTML = `${(log.labour_count * log.labour_cost) - log.labour_amount_paid} Pending Pay`;
            document.getElementById("hen-count").innerHTML = log.hen_count;
        }
    });
}

updateLabourCount();

function logoutFarmer(){
    localStorage.removeItem("farmer");
    window.location.href="./../views/farmer-login.html";
}
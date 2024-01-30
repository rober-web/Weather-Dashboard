const apk = "bad33d4d518cdc5169e27cd7f5c0d803";
let theday = parseInt(dayjs().format("DD"));
let currentDate = dayjs().format("DD/MM/YY");
let temperatureData = "";
let windData = "";
let humidityData = "";
let forecastData = $("#forecast");
let searchInput = $("#searchInput");
let searchButton = $("#searchButton");
let today = $("#today");
//let city = "London";
let inputGroupAppend = $("#input-group-append ");
let savedHistorial = $("#historial");
let searchHistory = [];
let setPlace;
//let getPlace;
// 1. Create the function to call the cities

const getHistorial = () => {
  const theHistorial = localStorage.getItem("savedSearchHistorial");
  return theHistorial ? JSON.parse(theHistorial) : [];
};

const setHistorial = () => {
    localStorage.setItem("savedSearchHistorial", JSON.stringify(searchHistory.slice(0, 5))); // Store the entire array
};

const getSavedPlace = () => {
    const savedPlace = JSON.parse(localStorage.getItem("place"));
    return savedPlace ? savedPlace : "London"; // Default to 'London' if no place is found
};

// Function to set the place in localStorage//localStorage.setItem("place", JSON.stringify(setPlace));

const setSavedPlace = (place) => {
    if (searchInput.val().trim() !== "") {
        setPlace = searchInput.val();
        localStorage.setItem("place", JSON.stringify(setPlace))
        searchHistory.unshift(setPlace);
        setHistorial();
        //renderHistoryButtons();
      }
  // Retrieve the updated searchHistory from localStorage
/*   searchHistory = getHistorial();

  savedHistorial.append(searchHistory); */
};

// Function to render history buttons
const renderHistoryButtons = () => {
    savedHistorial.empty();
    for (let i = 0; i < searchHistory.length && i < 5; i++) {
      const historyBtn = $("<button class='btn btn-secondary mb-2'>").text(searchHistory[i].toUpperCase());
      historyBtn.on("click", function () {
        searchInput.val(searchHistory[i]);
        findCityWeather();
      });

      
      savedHistorial.append(historyBtn);
    }

};



const getPlace = getSavedPlace();

const findCityWeather = (getPlace) => {
    getPlace = getPlace;
  const theQuery = `https://api.openweathermap.org/data/2.5/forecast?q=${getPlace}&appid=${apk}`;

  fetch(theQuery)
    .then((response) => response.json())
    .then((data) => {

    if (data.list && data.list.length > 0) {
      temperatureData = Math.round(data.list[0].main.temp - 273.15);
      windData = data.list[0].wind.speed;
      humidityData = data.list[0].main.humidity;

      $("#today h3").text(`${getPlace} - ${currentDate}`);
      $("#today div img").attr(
        "src",
        ` https://openweathermap.org/img/wn/${data.list[1].weather[0].icon}.png`
      );
      $("#today p:eq(0)").text(`Temperature: ${temperatureData}°C`);
      $("#today p:eq(1)").text(`Wind: ${windData} KPH`);
      $("#today p:eq(2)").text(`Humidity: ${humidityData}%`);

      forecastData.empty(); // Clear previous forecast data


      for (let i = 1; i < 6; i++) {
        temperatureData = Math.round(data.list[i].main.temp - 273.15);
        windData = data.list[i].wind.speed;
        humidityData = data.list[i].main.humidity;

        // Add 5 days to the current date
        const currentDate = dayjs();
        const futureDate = currentDate.add(i, "day");
        const icon = `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png`;

        // Display the 5 days forecast
        const theFiveDays = `
                
                <div class="col five-day m-2 py-3 px-4">
                 <h5>${futureDate.format("DD/MM/YYYY")}</h5>
                 <div><img src="${icon}" width="60" ></div>
                 <p>Temperature: ${temperatureData}°C</p>
                 <p>Wind: ${windData} KPH</p>
                 <p>Humidity: ${humidityData}%</p>
                </div>
    
                `;

   
       forecastData.append(theFiveDays);
        //inputGroupAppend.children(2).append('<button>'+place+'</button>');
      }
        // Update the saved place
        setSavedPlace(getPlace);
        //renderHistoryButtons();
        
      }
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
      });
};

// Load search history on page load
$(document).ready(function () {
    searchHistory = getHistorial();
    renderHistoryButtons();
  });
 



// Save the place to localStorage just before the page is unloaded
window.addEventListener("beforeunload", function () {
    setSavedPlace(getSavedPlace());
  });
  
  findCityWeather(getSavedPlace());  // Initial call to findCityWeather
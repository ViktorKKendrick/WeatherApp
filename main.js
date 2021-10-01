var cityValue;
var kel; //Kelvin
var far; //Fahrenheit
var cel; //Celsius
var conditionRet;
var zipValue;
var getWeather = document.getElementById("getWeather");
var city = document.getElementById("city");
var varKel = document.getElementById("Kel");
var varFar = document.getElementById("Far");
var varCel = document.getElementById("Cel");
var condition = document.getElementById("condition");
var img = document.getElementById("img");
var errorMsg = document.getElementById("error");
var dataBox = document.getElementById("dataBox");

function setWeather() {
zipValue = document.getElementById('zip').value;
    axios.get('https://api.openweathermap.org/data/2.5/weather?zip=' + zipValue + ',us&appid=16e4177c7a6d699d49edac85ac3a8174')

        .then(function (response) {

        cityValue = response.data.name;
        kel = Math.round(response.data.main.temp);
        far = Math.round((kel-273.15)*(9/5)+32);
        cel = Math.round((kel-273.15));
        conditionRet = response.data.weather[0].description;

        //replaces filler text with the results from API
        city.innerHTML=cityValue;
        varKel.innerHTML=kel + "°K";
        varFar.innerHTML=far + "°F";
        varCel.innerHTML=cel + "°C";
        condition.innerHTML=conditionRet;
        Image(far);
    })
    .catch(function (error) {
        // Calls ErrorZip function if error is found
        errorZip(zipValue);
    })
}

function errorZip(zip) {
    if (!Number.isInteger(zip)) {
        errorMsg.innerHTML = "Error: Not a number";
        show(errorMsg);
        hide(dataBox);
    }
    else if(zip.toString().length != 5){
    errorMsg.innerHTML = "Error: Invalid length";
            show(errorMsg);
            hide(dataBox);
    }
}

//async await
function getWeatherMethod() {
    setWeather();
    onStateChange();
}

getWeather.addEventListener('click', getWeatherMethod);

zip.addEventListener("keydown", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    getWeather.click();
  }
});

function onStateChange() {
    show(dataBox);
    hide(errorMsg);
}

function hide(element) {
    element.style.visibility = "hidden";
}

function show(element) {
    element.style.visibility = "visible";
}

function Image(far){
if(far>=80){
img.src="img/hot.png"
}
else if(far>=55){
img.src="img/warm.png"
}
else if(far>=20){
img.src="img/cold.png"
}
else{
img.src="img/graveyard.png"
}

}



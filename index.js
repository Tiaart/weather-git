
const icon = [
    {
        discription: "clear sky",
        image : "https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-02-128.png",
    },
    {
        discription: "broken clouds",
        image : "https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-08-128.png",  
    },
    {
        discription: "overcast clouds",
        image : "https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-27-128.png",    
    },
    {
        discription: "scattered clouds",
        image : "https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-27-128.png",
    },
    {
        discription: "light rain",
        image : "https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-03-128.png",
    },
];

const cities = [
    {
      "id": 524894,
      "name": "Moscow, RU",
    },
    {
        "id": 554840,
        "name": "Izhevsk, RU",
    },
    {
        "id": 703448,
        "name": "Kyiv, UA",
    },
    {
        "id": 5128638,
        "name": "New York, USA",
    },
    {
        "id": 756135,
        "name": "Warsaw, PL",
    },
];

let select_city = document.querySelector('.select_city');
let town = document.createElement('select');
town.classList.add("city");

for (let i = 0; i < cities.length; i++) {

town.innerHTML += `
    <select class="city">
        <option value=${cities[i].id}>${cities[i].name}</option>
    </select>
`
}

select_city.prepend(town);

const param = {
	"url" : "https://api.openweathermap.org/data/2.5/",
	"appid" : "5f1047b0a36b14dd4576667133f887af"
}

function getWeather() {
	const cityId = document.querySelector('.city').value;
	fetch(`${param.url}weather?id=${cityId}&units=metric&APPID=${param.appid}`)
	.then(weather => {
			return weather.json();
		}).then(showWeather);
}

function showWeather(data) {
	console.log(data);
    document.querySelector('.weatherTemp').innerHTML = Math.round(data.main.temp) + '&deg';
    document.querySelector('.weatherFL').innerHTML = Math.round(data.main.feels_like) + '&deg';
    document.querySelector('.weatherH').innerHTML = data.main.humidity + '%';
    document.querySelector('.weatherW').innerHTML = Math.round(data.wind.speed) + 'm/s';
    document.querySelector('.weatherDescription').textContent = data.weather[0]['description'];

    icon.forEach( item => {
        if (item.discription === data.weather[0]['description']) {
            document.querySelector('.icon_cloud').innerHTML = `<img class="icon" src="${item.image}" alt="icon"> `;
        } 
    })

}

getWeather();
document.querySelector('.city').onchange = getWeather;
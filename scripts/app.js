const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');


const updateUi = (data) => {
    // console.log(data)
    const {cityDetails, weather} = data;


    details.innerHTML = `
                <h5 class="my-5">${cityDetails.EnglishName}</h5>
                <div class="my-3">${weather.WeatherText}</div>
                <div class="display-4 my-4">
                    <span>${weather.Temperature.Metric.Value}</span>
                    <span>&deg;C</span>
                </div>
    `;

    const iconSrc = `images/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    let src = weather.IsDayTime ? 'images/day.svg' : 'images/night.svg';
    // if(weather.IsDayTime){
    //     src = 'images/day.svg';
    // }else{
    //     src = 'images/night.svg';
    // }
    time.setAttribute('src', src);


    if(card.classList.contains('d-none')){
        card.classList.remove('d-none')
    }

}


const updateCity = async (city) => {
    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key);
    return {
        cityDetails,
        weather
    };
}

cityForm.addEventListener('submit', e => {
    e.preventDefault();
    // console.log(cityForm.city.value);
    const city = cityForm.city.value.trim();
    cityForm.reset();
    updateCity(city)
    .then(data => updateUi(data))
    .catch(err => console.log(err));

    localStorage.setItem('city', city);
})

if(localStorage.getItem('city')){
    updateCity(localStorage.getItem('city'))
    .then(data => updateUi(data))
    .catch(err => console.log(err));
};
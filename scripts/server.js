class Server{
    constructor(){
        this.key = 'NcpRjHcyWsteOi2aMHLMSYW6tA3XT5IO';
        this.weatherUri = 'https://dataservice.accuweather.com/currentconditions/v1/';
        this.cityUri = 'https://dataservice.accuweather.com/locations/v1/cities/search';
    }
    async updateCity(city){
        const cityDetails = await this.getCity(city);
        const weather = await this.getWeather(cityDetails.Key);
           return {
             cityDetails,
             weather
            };
    }
    async getCity(city){
        const query = `?apikey=${this.key}&q=${city}`;
        const response = await fetch(this.cityUri + query);
        const data = await response.json();
    
        return data[0];
    }
    async getWeather(id){
        const query = `${id}?apikey=${this.key}`;
        const response = await fetch(this.weatherUri + query);
        const data = await response.json();
        // console.log(data);
        return data[0];
    }
}



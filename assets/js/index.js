const apk = "bad33d4d518cdc5169e27cd7f5c0d803";
let place='Rio de Janeiro';

//const theQuery = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apk}`;
const theQuery = `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${apk}`;



fetch(theQuery)
.then(response => response.json())
.then((data) =>{
    //console.log(data)
/*     return (
        //console.log(data.city)
        //console.log(data.city)
        //console.log(data)
        
        ); */
    //return console.log(data.city);
    for(let i = 0; i < 5; i ++) {
        console.log('day ' + (i +1));
        console.log('temp: ' + data.list[i].main.temp)
        console.log('wind: ' + data.list[i].wind.speed + ' KPH')
        console.log('humidity: ' + data.list[i].main.humidity + '%')
        console.log('=====================================');
       
    }
});


console.log(theQuery);

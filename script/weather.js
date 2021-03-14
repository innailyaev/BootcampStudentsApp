const weatherApi='api.openweathermap.org/data/2.5/weather?q='
let cityApi=',il&units=metric&APPID=ba1f141ef206344bf953adf597c09caa'
const proxy = 'https://api.codetabs.com/v1/proxy/?quest';
let citiesArr=["rosh haayin", "jerusalem", "beer sheva", "rishon lezion", "ramla", "ashdod", "tel aviv", "even yehuda", "haifa", "rahat", "rehovot", "netanya","elkana","modiin", "ness ziona","bat yam", "kfar monash", "karmiel", "givatayim"];
let citiesTemp=[];

async function getApi(){
    for(let i=0;i<citiesArr.length;i++){
        const response = await fetch(`${proxy}=${weatherApi}${citiesArr[i]}${cityApi}`);
        let data= await response.json();
        citiesTemp.push({cityName:citiesArr[i],
                    temp:data.main.temp
                })
    }
    console.log(citiesArr);
    console.log(citiesTemp);
    
}
getApi();


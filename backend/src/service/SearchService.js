const Converter = require('../utils/Converter');
const axios = require('axios');

async function getTotalTime(items){
    var itemsMap = [];
    for(var i = 0; i < items.length ; ++i){
        itemsMap[i]= await mapTime(items[i]);
    }
    return itemsMap;
};

function mapTime(item){
    return getVideoDuration(item["id"]["videoId"]).then(Converter.iso8601ToMinuteInt);
};

function mapWords(item){
    const title = item["snippet"]["title"].toLowerCase().replace(/[^a-zA-Z ]/g,"");
    const description = item["snippet"]["description"].toLowerCase().replace(/[^a-zA-Z ]/g,"");
    var words = title + " " + description + " ";
    return words;
};

async function getVideoDuration(videoId){
    const query = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails&key=${process.env.API_KEY}`;
    return await axios.get(query).then(resp => resp.data["items"][0]["contentDetails"]["duration"]);
};

async function getWords(items){
    var words = "";
    for(var i = 0; i < items.length ; ++i){
        words += await mapWords(items[i]);
    }
    return words;
};

function getDaysOfWeekMAX(daysOfWeek){
    let max = daysOfWeek[0];
    for(let i = 1; i < daysOfWeek.length ; ++i){
        if(daysOfWeek[i]>max){
            max = daysOfWeek[i];
        }
    };
    return max;
};

function getKeyWords(words){
    const wordMap = new Map();
    words.split(' ').forEach(word => {
        const currentWordCount = wordMap.get(word) || 0;
        wordMap.set(word, currentWordCount+1);
    })
    const sortedMap = new Map([...wordMap.entries()].sort((a, b) => b[1] - a[1]));
    let keys = sortedMap.keys();
    let keyWords = [];
    for(let i = 0; keyWords.length < 5 ; i++){
        const value = keys.next().value;
        if(value.length > 2){
            keyWords[keyWords.length] = value;
        }
    }
    return keyWords;
};

const SearchService = {  
    getKeyWordsInResult(words){
        return getKeyWords(words);
    },
    getTotalDaysNeededToWatchAllVideos(timeArray,daysOfWeek){
        let totalDays = 1;
        let i = 0;
        let j = 0;
        let amount = 0;
        const daysOfWeekMAX = getDaysOfWeekMAX(daysOfWeek);
        do{
            if(timeArray[i] < daysOfWeekMAX){
                if(daysOfWeek[j] < (amount + timeArray[i])){
                    if(j<6){
                        j++;
                    }else{
                        j=0;
                    }
                    totalDays++;
                    amount = 0;
                }else{
                    amount += timeArray[i];
                    i++;
                }
            }else{
                i++;
            }
        }while(i < timeArray.length);
        return totalDays;
    },
    async extractData(apiResponse){
        const timeArray = await getTotalTime(apiResponse["items"]); 
        const words = await getWords(apiResponse["items"]);
        let returnData = {"timeArray": timeArray, "words": words};
        return returnData;
    },
};
module.exports = SearchService;
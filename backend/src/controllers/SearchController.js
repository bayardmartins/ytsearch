const axios = require('axios');
const { json } = require('express');
require('dotenv').config();

const SearchService = require('../service/SearchService.js');

module.exports = {
    async index (request, response) {
        const { terms,
                sunday,
                monday,
                tuesday,
                wednesday,
                thursday,
                friday,
                saturday } = request.query;
        
        const termsToQuery = terms.replace(' ','%20');
        const daysOfWeek = [sunday,monday,tuesday,wednesday,thursday,friday,saturday];
        const query = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${process.env.QT_VIDEOS}&order=viewCount&q=${termsToQuery}&type=video&videoDefinition=high&key=${process.env.API_KEY}`;
        const { data } = await axios.get(query);
        const returnData = await SearchService.extractData(data);
        const keyWords = SearchService.getKeyWordsInResult(returnData["words"]);
        const totalTime = SearchService.getTotalDaysNeededToWatchAllVideos(returnData["timeArray"],daysOfWeek);
        var resultData = {"keyWords" : keyWords , "totalTime" : totalTime};
        return response.json(resultData);
   }
};

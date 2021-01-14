const service = require('../service/SearchService');

const textInput = 'repetições palavras repetidas teste de várias vezes coisas teste palavras repetidas várias vezes múltiplas repetições teste palavras repetidas várias vezes múltiplas teste palavras repetidas várias vezes teste palavras repetidas várias teste palavras repetidas teste palavras teste';
const timeArrayInput = [15,20,20,5,15,40];
const daysOfWeekInput = [30,10,50,30,0,0,50];

console.log("Test start");
console.log("Get KeyWords");
console.log("input: " + textInput);
console.log("expected result: teste palavras repetidas várias vezes");
console.log(service.getKeyWordsInResult(textInput));
console.log('\n');
console.log('Get TotalDaysNeedes');
console.log('TimeArray ' + timeArrayInput);
console.log('DaysOfWeek ' + daysOfWeekInput);
console.log('expected result: 7');
console.log(service.getTotalDaysNeededToWatchAllVideos(timeArrayInput,daysOfWeekInput));
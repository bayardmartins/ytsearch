const moment = require('moment');

const Converter = {
    iso8601ToMinuteInt(entry){
        const time = moment.duration(entry).asMinutes();
        return time;
    },
}
module.exports = Converter;
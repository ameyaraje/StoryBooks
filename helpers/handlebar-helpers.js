const moment = require('moment');


module.exports = {
    truncate: function (str, len) {
        if (str.length > len && str.length > 0) {
            var result;
            result = str.substr(0, len);
            result = str.substr(0, result.lastIndexOf(" "));
            result = (result.length > 0) ? result : str.substr(0, len);
            
            return result + '...';
        }
        return str;
    },
    stripTags: function (input) {
        return input.replace(/<(?:.|\n)*?>/gm, '');
    },
    formatDate: function (date, format) {
        return  moment(date).format(format);
    }
}
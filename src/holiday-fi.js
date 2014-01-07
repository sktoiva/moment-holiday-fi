//## Moment.JS Holiday-fi Plugin
//
//Usage:
//  Call .holiday() from any moment object. If date is a Finnish Holiday, name of the holiday will be returned.
//  Otherwise, return nothing. 
//
//  Example:
//    `moment('12/25/2013').holiday()` will return "Joulupäivä"
//
//Holidays:
//  You can configure holiday bellow. The 'M' stands for Month and represents fixed day holidays.
//
//License:
//  Copyright (c) 2014 [Sampo Toiva] under [MIT License](http://opensource.org/licenses/MIT)
//
// Inspired by: https://gist.github.com/jrhames/5200024
(function() {
    var moment;
 
    moment = typeof require !== "undefined" && require !== null ? require("moment") : this.moment;

    //Static variables
    var _saturday = 6, 
        _november = 9, 
        _december = 10,
        _june = 5;

    //Holiday definitions, static dates
    var _holidays = {
    'M': {//Day, Month
            '01/01': "Uudenvuodenpäivä",
            '06/01': "Loppiainen",
            '01/05': "Vappu",
            '25/12': "Joulupäivä",
            '26/12': "Tapaninpäivä"
        }
    };

    //variable dates
    //Pyhäinpäivä 31.10-6.11 lauantaina
     var _allSaintsDay = function(moment){
        var start = moment.clone().month(_saturday).date(31);
        var end = moment.clone().month(_november).date(30);
     
        if(_isSaturdayHoliday(moment, start, end)){
            return "Pyhäinpäivä";
        }
    };

    //Juhannus 20.6.-26.6. lauantaina
    var _midSummer = function(moment){
        var start = moment.clone().month(_june).date(20);
        var end = moment.clone().month(_june).date(26);

        if(_isSaturdayHoliday(moment, start, end)){
            return "Juhannuspäivä";
        }
    };

    var _isSaturdayHoliday = function(moment, start, end){
        return _isSaturday(moment) && moment.isAfter(start) && moment.isBefore(end);
    };

    var _isSaturday = function(moment){
        return moment.day() === _saturday;
    };

    /**
    /*  @param year The year for which the Easter sunday is calculated
    /*  @return easter sunday json: {day: <day_of_month>, month: <month>}
    **/ 
    var _easterSunday = function(year) {
        var a = Math.floor(year % 19),
            b = Math.floor(year / 100),
            c = Math.floor(year % 100),
            d = Math.floor(b / 4),
            e = Math.floor(b % 4),
            f = Math.floor((b + 8) / 25),
            g = Math.floor((b - f + 1) / 3),
            h = Math.floor((19 * a + b - d -g + 15) % 30),
            i = Math.floor(c / 4),
            k = Math.floor(c % 4),
            l = Math.floor((32 + 2 * e + 2 * i - h - k) % 7),
            m = Math.floor((a + 11 * h + 22 * l) / 451),
            n = Math.floor((h + l - 7 * m + 114) / 31),
            p = Math.floor((h + l - 7 * m + 114) % 31);

       return moment({year: year, month: n - 1, day: p + 1}); //months start from 0
    };


    var _easterRelatedDays = function(year) {
        var easterSunday = _easterSunday(year),
            goodFriday = easterSunday.clone().subtract("days", 2),
            easterMonday = easterSunday.clone().add("days", 1),
            ascension = easterSunday.clone().add("days", 39);

        var easter = [];
        easter[goodFriday.format("DD/MM")] = 'Pitkäperjantai';
        easter[easterSunday.format("DD/MM")] = 'Pääsiäispäivä';
        easter[easterMonday.format("DD/MM")] = 'Toinen pääsiäispäivä';
        easter[ascension.format("DD/MM")] = 'Helatorstai';

        return easter;
    };

    moment.fn.holiday = function() {
        var currentDate = this.format('DD/MM');
        return (_holidays['M'][currentDate]) || 
                _easterRelatedDays(this.year())[currentDate] ||
                _midSummer(this) ||
                _allSaintsDay(this);
    };
 
    if ((typeof module !== "undefined" && module !== null ? module.exports : void 0) != null) {
        module.exports = moment;
    }
 
}(this));
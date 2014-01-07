var moment = require('../src/holiday-fi');
var should = require('chai').should();
var _ = require("underscore");

var testStaticDates = function(day, month, text){
  var dates = _(100).times(function(){
    return moment(_.random(1970, 2020) + "-" + month + "-" + day);
  });

  _.each(dates, function(i){
    i.holiday().should.equal(text);
  });
};

describe("Holiday", function(){
  it("should return Uudenvuodenpäivä for first of January", function(){
    testStaticDates("01", "01", "Uudenvuodenpäivä");
  });

  it("should return Loppianen for sixth of January", function(){
   testStaticDates("06", "01", "Loppiainen");
  });   

  it("should return Joulupäivä for 25th of December", function(){
   testStaticDates("25", "12", "Joulupäivä");
  });

  it("should return Tapaninpäivä for 26th of December", function(){
   testStaticDates("26", "12", "Tapaninpäivä");
  });

  it("should return Vappu for 1st of May", function(){
   testStaticDates("01", "05", "Vappu");
  });

  it("should return Juhannuspäivä for 2014-06-21", function(){
    var date = moment("2014-06-21");
    date.holiday().should.equal("Juhannuspäivä");
  });

  it("should return Juhannuspäivä for 2000-06-24", function(){
    var date = moment("2000-06-24");
    date.holiday().should.equal("Juhannuspäivä");
  });

  it("should return Juhannuspäivä for 2030-06-22", function(){
    var date = moment("2030-06-22");
    date.holiday().should.equal("Juhannuspäivä");
  });

  it("should return Pääsiäissunnuntai for 2000-04-23", function(){
    var date = moment("2000-04-23");
    date.holiday().should.equal("Pääsiäispäivä");
  });

  it("should return Pitkäperjantai for 2000-04-21", function(){
    var date = moment("2000-04-21");
    date.holiday().should.equal("Pitkäperjantai");
  });

  it("should return Toinen pääsiäispäivä for 2000-04-24", function(){
    var date = moment("2000-04-24");
    date.holiday().should.equal("Toinen pääsiäispäivä");
  });

  it("should return Helatorstai for 2014-04-19", function(){
    var date = moment("2014-04-19").add("days", 40);
    date.holiday().should.equal("Helatorstai");
  });
});


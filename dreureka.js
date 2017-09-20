var game;
addEventListener("DOMContentLoaded", function(){
  console.log("Loaded");
  game = new DrEureka();
});

function DrEureka() {
  this.timer = 0;
  this.seconds = 120;
  this.sectionMain = document.getElementById("main");
  console.log(this.sectionMain);
  this.sectionStandard = document.getElementById("standard");
  this.sectionCooperative = document.getElementById("cooperative");
  var buttons = document.getElementsByTagName("button");
  this.buttonStandard = buttons[0];
  this.buttonTimed = buttons[1];
  this.buttonCooperative = buttons[2];
  this.buttonStandardRandom = buttons[3];
  this.buttonStandardBack = buttons[4];
  this.buttonCooperativeBack = buttons[5];
  var timers = document.querySelectorAll(".time");
  this.standardTime = timers[0];
  this.cooperativeTime = timers[1];
  var cards = document.querySelectorAll(".cardHolder");
  this.standardCard = cards[0];
  this.cooperativeCard = cards[1];
  var that = this;
  this.buttonStandard.addEventListener("click", function(){
    that.sectionMain.classList.add("hidden");
    that.sectionStandard.classList.remove("hidden");
  });
  this.buttonStandardRandom.addEventListener("click", function(){
    that.resetCard();
    that.shuffle10();
    that.standardCard.innerHTML = "";
    that.standardCard.appendChild(that.drawCard());
    clearInterval(that.timer);
    that.seconds = 120;
      that.standardTime.innerHTML =that.getTimeRemaining();
      that.timer = setInterval(function(){
      that.seconds--;
      that.standardTime.innerHTML = that.getTimeRemaining();
    },1000);
  });
  this.buttonStandardBack.addEventListener("click", function(){
    clearInterval(that.timer);
    that.sectionMain.classList.remove("hidden");
    that.sectionStandard.classList.add("hidden");
    that.standardTime.classList.add("hidden");
  });
  this.buttonTimed.addEventListener("click", function(){
    clearInterval(that.timer);
    that.sectionMain.classList.add("hidden");
    that.sectionStandard.classList.remove("hidden");
    that.standardTime.classList.remove("hidden");
  });

  this.buttonCooperative.addEventListener("click", function(){
    that.sectionMain.classList.add("hidden");
    that.sectionCooperative.classList.remove("hidden");
    that.cooperativeTime.classList.remove("hidden");
  });
  this.buttonCooperativeBack.addEventListener("click", function(){
    that.sectionMain.classList.remove("hidden");
    that.sectionCooperative.classList.add("hidden");
  });
}

DrEureka.prototype.resetCard = function () {
  this.card =[["p","p","","",""],["o","o","","",""],["g","g","","",""]];
};
DrEureka.prototype.moveBall = function (from, to) {
  if(from == to) return false;
  var f = -1;
  var t = -1;
  for (var i = 3; i >= 0; i--) {
    if(this.card[from][i]){
      f = i;
      break;
    }
  }
  for (var i = 0; i < 4; i++) {
    if(!this.card[to][i]){
      t = i;
      break;
    }
  }
  if(f < 0 || t < 0) return false;
  this.card[to][t] = this.card[from][f];
  this.card[from][f] = "";
  for (var i = 0; i < 4; i++) {
    if(!this.card[from][i]){
      this.card[from][i] = this.card[from][i+1]
    }
  }

  return true;
};

DrEureka.prototype.shuffle10 = function () {
  var i = 0; var j = 0;
  do {
    var f = Math.floor(Math.random()*3);
    var t = Math.floor(Math.random()*3);
    if(this.moveBall(f,t)) i++;
  }while(i<10 && j++<100);
}

DrEureka.prototype.drawCard = function () {
  console.log(this.card);
  var eCard = document.createElement("div");
  eCard.classList.add("card");
  for (var t = 0; t < this.card.length; t++) {
    var eTube = document.createElement("div");
    eTube.classList.add("tube");
    var tube = this.card[t];
    for (var i = 3; i>=0; i--) {
      var eBall = document.createElement("div");
      eBall.classList.add("ball");
      eBall.classList.add(tube[i]?tube[i]:"e");
      eTube.appendChild(eBall);
    }
    eCard.appendChild(eTube);
  }
  return eCard;
};
DrEureka.prototype.getTimeRemaining = function () {
        return Math.floor(this.seconds);
};

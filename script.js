var model = {
  flipped: [],
  totalCards: 0,
  flipCount: 0,

  flippedCards: 0,
  totalCardCount: 0,
  attempts: 0,
  matches: 0,

  flipCard: function(event){

    this.flippedCards += 1;
    this.flipCount += 1;
    this.attempts += 1,
    this.flipped.unshift($(event.target));
  },

  createCards: function(amount){
    this.totalCards += amount;
  },
  hasMatch: function(){
    var $image1 = $("img", this.flipped[0]);
    var $image2 = $("img", this.flipped[1]);
    
    return $image1.attr("src") === $image2.attr("src");
  },

  unflip: function(){
    this.flipped.shift();
    this.flipped.shift();
    this.flipCount -=2;
    this.totalCards -= 2;
    this.flippedCards -= 2;
  },
  lastTwo: function(){
    return this.flipped.slice(0,2);
  }, 
  points: function(){
    return this.matches * 10;
  },

  gameOver: function(){
    return $(".matched").length === this.totalCardCount;
  }

};




var controller = {
  totalCards: function(){
    return model.totalCards;
  },

  flippedCards: function(){
    return model.flippedCards;
  },


  setUp: function(){
    var startNum = 1;
    while(startNum % 2 === 1 || startNum > 12 || startNum < 2){
      startNum = prompt("How many cards do you want to play with, even number, less than 13, 2 at the minimum");
      startNum = parseInt(startNum);
    }
    model.totalCardCount = startNum;
    this.createCards(startNum);

    view.init();
  },

  flipCard: function(event){
    model.flipCard(event);
    view.flipCard(event);

    if(model.flipCount === 2){
      if(model.hasMatch()){
        view.displayMatch(model.lastTwo());
        model.flipCount = 0;
        model.matches += 1;
      } else {
        controller.unflip()
        
      }
    }

  },

  points: function(){
    return model.points();
  },

  createCards: function(startNum){
    model.createCards(startNum)
    view.createCards(startNum);
  },

  unflip: function(){
    view.unflip(model.lastTwo());
    model.unflip();
    
    
  },

  handleEndGame: function(){
    if(model.gameOver()){
      view.displayEndGame();
    }
  }




}//end controller



var view = {

  createCards: function(startNum){
    var sources = ["frog.jpg", "gray.jpg", "bird.jpg", "dog.jpg", "planet.jpg", "racoon.jpg" ];

    while(startNum > 0){
      var src = sources[0];
      sources.shift();

      $img1 = $("<img>")
              .attr("src", src)
              .attr("class", "card-image")
              .hide();
      $img2 = $("<img>")
               .attr("src", src)
               .attr("class", "card-image")
               .hide();


      $card = $("<div class='card'></div>");
      $card2 = $("<div class='card'></div");
      //append the card an image child with a href to a pic same for both
      $("body").append($card);
      $card.append($img1);

      $("body").append($card2);
      $card2.append($img2);

      startNum -= 2;
    }
  },

  flipCard: function(event) {
    
    var $target = $(event.target);
    
    $("img", $target).fadeIn();
    $target.addClass("flipped");
  },

  unflipCard: function(event){
    $("img", event.target).fadeOut();
  },
  //INITIALZE WITH
  init: function(){
    view.displayAttempts();
    view.displayPoints();
    $
    (".card").click(function(event){
      
      controller.flipCard(event);
      view.displayPoints();
      view.displayAttempts();
      controller.handleEndGame();
    })
  },

  displayAttempts: function(){
    var count = model.attempts;

    $("#attempts").text("Attempts: " + count);
  },

  displayPoints: function(){
    var count = controller.points();
    console.log(count);
    $("#points").text(count + " Points");
  },

  displayMatch: function(matched){
    var $one = matched[0];
    var $two =  matched[1];

    $one.addClass("matched");
    $two.addClass("matched");
  },

  unflip: function(cards){
    $one = cards[0];
    $two = cards[1];

    $("img", $one).fadeOut();
    $("img", $two).fadeOut();
  },

  displayEndGame: function(){
    $("#end-game").text("YOU WIN, refresh your browser to play again");
  }

  


}//end view

$("document").ready(function(){
  controller.setUp();
})
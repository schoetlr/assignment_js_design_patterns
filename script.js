var model = {
  flipped: [],
  totalCards: 0,
  flipCount: 0,

  flippedCards: 0,

  flipCard: function(event){
    this.flippedCards += 1;
    this.flipCount += 1;
    this.flipped.unshift($(event.target));
  },

  createCards: function(amount){
    this.totalCards += amount;
  },
  hasMatch: function(){
    var $image1 = $("img", this.flipped[0]);
    var $image2 = $("img", this.flipped[1]);
    //both are undefined
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
      } else {
        controller.unflip()
        
      }
    }

  },

  createCards: function(startNum){
    model.createCards(startNum)
    view.createCards(startNum);
  },

  unflip: function(){
    view.unflip(model.lastTwo());
    model.unflip();
    
    
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

  init: function(){
    $(".card").click(function(event){

      controller.flipCard(event)
    })
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
  }

  


}//end view

$("document").ready(function(){
  controller.setUp();
})
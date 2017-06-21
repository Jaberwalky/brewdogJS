var app = function(){

  var selectDropdown = document.getElementById('selectElement');

  var url = "https://api.punkapi.com/v2/beers";
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.send();

  request.addEventListener('load', function(){
    var jsonString = request.responseText;
    var beerObjectArray = JSON.parse(jsonString);
    setupDropdown(beerObjectArray);
    populateLayout(beerObjectArray);
  });

  selectDropdown.addEventListener('change', function(){
    var jsonString = request.responseText;
    var beerObjectArray = JSON.parse(jsonString);
    var selection = selectDropdown.value;
    if (selection >= 0) {
      var mainBodyDiv = document.getElementById("main");
      mainBodyDiv.innerHTML = "";
      populateLayout([beerObjectArray[selection]]);
      addIngredients(beerObjectArray[selection].ingredients);
    } else {
      location.reload();
    }
  })

}; // closing bracket for APP

var addIngredients = function(ingredientsArray){
  var body = document.getElementById("main")
  var ingredientsDiv = document.createElement("div")
  ingredientsDiv.id = "ingredients-div"
  // console.log(ingredientsDiv);
  var header = document.createElement("h2");
  header.innerText = "Ingredients";
  ingredientsDiv.appendChild(header)
  body.appendChild(ingredientsDiv);

  var maltList = getIngredientsList("Malt", ingredientsArray.malt);
  ingredientsDiv.appendChild(maltList);
  var hopsList = getIngredientsList("Hops", ingredientsArray.hops);
  ingredientsDiv.appendChild(hopsList);
  var yeastHead = document.createElement("h3");
  yeastHead.innerText = "Yeast";
  ingredientsDiv.appendChild(yeastHead);
  var yeastDetails = document.createElement("p");
  yeastDetails.innerText = ingredientsArray.yeast;
  console.log(yeastHead)
  ingredientsDiv.appendChild(yeastDetails)
}

var getIngredientsList = function(header, ingredientsArray){
  var ingredientDiv = document.createElement("div")
  var title = document.createElement("h3");
  title.innerText = header;
  ingredientDiv.appendChild(title)
  console.log(title)
  for (var i = 0; i < ingredientsArray.length; i++ ){
    var ingredient = document.createElement("p");
    ingredient.innerText = ingredientsArray[i].name + " : " + ingredientsArray[i].amount.value + " " + ingredientsArray[i].amount.unit;
    ingredientDiv.appendChild(ingredient);
  }
  return ingredientDiv;
}


var populateLayout = function(beerObjectArray){
  for ( var i = 0; i < beerObjectArray.length; i++ ){
    var beer = beerObjectArray[i];
    var img = beer.image_url;
    var name = beer.name;
    var description = beer.description;
    var ingredientsArray = beer.ingredients;
    render(img, name, description, ingredientsArray)
  }
};

var setupDropdown = function(beerObjectArray){
  var selectDropdown = document.getElementById('selectElement');
  var listAll = document.createElement("option");
  listAll.value = -1
  listAll.innerText = "Select All"
  selectDropdown.appendChild(listAll)
  for ( var i = 0; i < beerObjectArray.length; i++ ){
    addToDropdown(i, beerObjectArray[i].name)
  }
}

var addToDropdown = function(position, beerName){
  var selectDropdown = document.getElementById('selectElement');
  var optionTag = document.createElement("option");
  optionTag.value = position;
  optionTag.innerText = beerName;
  selectDropdown.appendChild(optionTag);
}

var render = function(img, name, description, ingredientsArray){
  var mainBodyDiv = document.getElementById("main");
  var beerDetailDiv = document.createElement("div");
  beerDetailDiv.id = "beerDetail";
  var imgTag = document.createElement("img");
  imgTag.src = img;
  imgTag.width = 50;
  var textDiv = document.createElement("div");
  textDiv.id = "text-div";
  var nameTag = document.createElement("h2");
  nameTag.innerText = name;
  var descriptionTag = document.createElement("p");
  descriptionTag.innerText = description;
  // need to work out how to display the ingredients when decided on format
  beerDetailDiv.appendChild(imgTag);
  beerDetailDiv.appendChild(textDiv);
  textDiv.appendChild(nameTag);
  textDiv.appendChild(descriptionTag);
  mainBodyDiv.appendChild(beerDetailDiv)
};


window.addEventListener('load', app);

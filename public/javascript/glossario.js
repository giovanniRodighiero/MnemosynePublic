function glossario() {
  var replaceIfNotPrecededBy = function(notPrecededBy, replacement) {
   return function(match) {
     return match.slice(0, notPrecededBy.length) === notPrecededBy
       ? match
       : replacement;
   }
};
  var parola = ['cacca','ciao','ok'];
  var text = $("#input").val();
  var textOutput = text;
  for (var i = 0; i < parola.length; i++) {
    var re = new RegExp((?<!glossario{)+parola[i],"g");
    textOutput = textOutput.replace(re, 'glossario{'+parola[i]+'}');

    textOutput = textOutput.replace(re, replaceIfNotPrecededBy('glossario{', 'glossario{'+parola[i]+'}'));
  }
  $("#result").html(textOutput);

}


function stampa(idCreate, idContent, idDownloadLink) {
  var textFile = null,
    makeTextFile = function (text) {
      var data = new Blob([text], {type: 'text/plain'});

      // If we are replacing a previously generated file we need to
      // manually revoke the object URL to avoid memory leaks.
      if (textFile !== null) {
        window.URL.revokeObjectURL(textFile);
      }

      textFile = window.URL.createObjectURL(data);

      return textFile;
    };
    var create = document.getElementById(idCreate),
      textbox = document.getElementById(idContent);

      var link = document.getElementById(idDownloadLink);
      link.href = makeTextFile($(idContent).text());
      link.style.display = 'block';
}
function download(filename, id) {
  var element = document.createElement('a');
  var text = $(id).text();
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

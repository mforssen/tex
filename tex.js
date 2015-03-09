
var source_code = document.getElementById("input").value

var pdf_dataurl = undefined;


var compile = function(source_code) {

  var pdftex = new PDFTeX();
  pdftex.set_TOTAL_MEMORY(80*1024*1024).then(function() {

    var start_time = new Date().getTime();

    pdftex.compile(source_code).then(function(pdf_dataurl) {
      var end_time = new Date().getTime();
      console.info("Execution time: " + (end_time-start_time)/1000+' sec');

      if(pdf_dataurl === false)
        return;

      window.open(pdf_dataurl)
    });
  });
}

compile(source_code);
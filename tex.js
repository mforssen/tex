var pdf_dataurl = undefined;
var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/latex");

document.getElementById("compile").addEventListener("click", function(e) {
  // var source_code = document.getElementById("input").value;
  var source_code = editor.getValue();
  compile(source_code);
});

var appendOutput = function(msg) {
  var content = document.getElementById("output").innerHTML;

  var output = document.getElementById("output");

  if (content == "") {
    output.innerHTML = content + msg;
  } else {
    output.innerHTML = content + "<br />" + msg;
  }

  output.scrollTop = 999999;
  console.log(msg);
}

var compile = function(source_code) {
  document.getElementById("output").innerHTML = "";

  var pdftex = new PDFTeX();
  pdftex.set_TOTAL_MEMORY(80*1024*1024).then(function() {

    pdftex.on_stdout = appendOutput;
    pdftex.on_stderr = appendOutput;

    var start_time = new Date().getTime();

    pdftex.compile(source_code).then(function(pdf_dataurl) {
      var end_time = new Date().getTime();
      console.info("Execution time: " + (end_time-start_time)/1000+' sec');

      if(pdf_dataurl === false)
        return;

      document.getElementById('viewer').src = pdf_dataurl;
    });
  });
}


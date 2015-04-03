var pdf_dataurl = undefined;
var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/latex");

editor.on("change", function() {localStorage.setItem("editorValue", editor.getValue());} );
var editorValue = localStorage.getItem("editorValue");
var dataurl = localStorage.getItem("pdfDataURL");

if (typeof editorValue !== 'undefined' && (editorValue !== null && editorValue !== "")) {
  editor.setValue(editorValue);
  editor.clearSelection();
  console.log(editorValue);
}

if (typeof dataurl !== 'undefined' && (dataurl !== null && dataurl !== "")) {
  document.getElementById('viewer').src = dataurl; 
}

document.getElementById("article").addEventListener("click", function() {
  bootbox.confirm("Loading this template will overwrite your current document.<br />Continue?", function(result) {
    if (result) {
      loadTemplate("article");
    }
  });
});

document.getElementById("letter").addEventListener("click", function() {
  bootbox.confirm("Loading this template will overwrite your current document.<br />Continue?", function(result) {
    if (result) {
      loadTemplate("letter");
    }
  });
});

document.getElementById("memoir").addEventListener("click", function() {
  bootbox.confirm("Loading this template will overwrite your current document.<br />Continue?", function(result) {
    if (result) {
      loadTemplate("memoir");
    }
  });
});

function loadTemplate(template) {
  console.log("loading "+template+" template");
  // if (template == "article") {
  //   editor.setValue(article_template);
  // }
}


document.getElementById("compile").addEventListener("click", function(e) {
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
      localStorage.setItem("pdfDataURL", pdf_dataurl);
    });
  });
}


//////////////////////////
// TEMPLATES
//////////////////////////

var article_template = "article \n text";

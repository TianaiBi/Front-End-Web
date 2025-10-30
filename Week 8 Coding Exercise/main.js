function countParagraphs() {
  let allParagraphs = document.getElementsByTagName("p");
  document.getElementById("result1").innerHTML =
    "There are " + allParagraphs.length + " paragraph tags on this page.";
}

function countInChapter1() {
  let chapter1 = document.getElementById("chapter1");
  let count = chapter1.getElementsByTagName("p").length;
  document.getElementById("result2").innerHTML =
    "Chapter 1 has " + count + " paragraph tags inside.";
}

function countInChapter2() {
  let chapter2 = document.getElementById("chapter2");
  let count = chapter2.getElementsByTagName("p").length;
  document.getElementById("result3").innerHTML =
    "Chapter 2 has " + count + " paragraph tags inside.";
}
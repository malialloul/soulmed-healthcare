document.addEventListener("DOMContentLoaded", function (event) {
  if (document.getElementById("side-menu")) {
   // collapse();
  }

  window.addEventListener(
    "resize",
    function (event) {
      if (document.getElementById("side-menu")) {
       // collapse();
      }
    },
    true
  );

  function collapse() {
    var x = window.matchMedia("(max-width: 980px)");
    if (x.matches) {
      document.getElementById("side-menu").style.width = "30%";
    } else {
      document.getElementById("side-menu").style.width = "30%";
    }
  }
});

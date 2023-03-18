(function () {
  var map = document.querySelector("#map");
  var paths = document.querySelectorAll("#map a");
  var details = document.querySelectorAll("#details a");
  const tooltip = document.querySelector("#tooltip");
  var popperInstance = Popper.createPopper(null, tooltip);

  // Paths events
  paths.forEach(function (path) {
    path.addEventListener("mouseenter", function (e) {
      var id = this.id.replace("land-", "");
      document.querySelector("#land-" + id).classList.add("active");
      var detail = document.querySelector("#detail-" + id);
      detail.classList.add("active");

      popperInstance = Popper.createPopper(e.target, tooltip);
      var newInnerHTML = detail.firstElementChild.innerHTML;
      newInnerHTML = newInnerHTML.replaceAll(/(?<=<\/?)summary(?=>)/gm, "h2");
      show(newInnerHTML);
    });
    path.addEventListener("mouseleave", function (e) {
      var id = this.id.replace("land-", "");
      document.querySelector("#land-" + id).classList.remove("active");
      document.querySelector("#detail-" + id).classList.remove("active");
      hide();
    });
  });

  // Links events
  details.forEach(function (detail) {
    detail.addEventListener("mouseenter", function (e) {
      var id = this.id.replace("detail-", "");
      document.querySelector("#land-" + id).classList.add("active");
      document.querySelector("#detail-" + id).classList.add("active");
    });
    detail.addEventListener("mouseleave", function (e) {
      var id = this.id.replace("detail-", "");
      document.querySelector("#land-" + id).classList.remove("active");
      document.querySelector("#detail-" + id).classList.remove("active");
    });
  });

  // Tooltip helpers
  function show(innerHTML = "") {
    tooltip.setAttribute("data-show", "");
    tooltip.querySelector(".content").innerHTML = innerHTML;
    popperInstance.update();
  }
  function hide() {
    tooltip.removeAttribute("data-show");
  }
})();

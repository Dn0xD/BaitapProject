(function () {
  "use strict";

  function initShopLook() {
    var carousel = document.getElementById("shopLookCarousel");
    if (!carousel) return;

    var slides = Array.prototype.slice.call(
      carousel.querySelectorAll(".shop-look-slide")
    );
    if (slides.length <= 1) return;

    var current = 0;
    var timer = null;
    var INTERVAL = 5000;

    function show(index) {
      current = (index + slides.length) % slides.length;
      slides.forEach(function (slide, i) {
        slide.classList.toggle("is-active", i === current);
      });
    }

    function next() {
      show(current + 1);
    }

    function startAuto() {
      stopAuto();
      timer = window.setInterval(next, INTERVAL);
    }

    function stopAuto() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    // Dots: each slide has its own dot row, wire them all by data-index.
    carousel.addEventListener("click", function (event) {
      var dot = event.target.closest(".shop-look-dot");
      if (!dot) return;
      var index = parseInt(dot.getAttribute("data-index"), 10);
      if (isNaN(index)) return;
      show(index);
      startAuto();
    });

    // Pause auto-rotation while interacting.
    carousel.addEventListener("mouseenter", stopAuto);
    carousel.addEventListener("mouseleave", startAuto);
    carousel.addEventListener("focusin", stopAuto);
    carousel.addEventListener("focusout", startAuto);

    var reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!reduceMotion) {
      startAuto();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initShopLook);
  } else {
    initShopLook();
  }
})();

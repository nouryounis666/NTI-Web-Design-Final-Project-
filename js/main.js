(function () {
  "use strict";

  // Body scrolled class
  function toggleScrolled() {
    const selectBody = document.querySelector("body");
    window.scrollY > 100
      ? selectBody.classList.add("scrolled")
      : selectBody.classList.remove("scrolled");
  }
  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  // Mobile nav toggle
  document.addEventListener("DOMContentLoaded", function () {
    const body = document.querySelector("body");
    const navToggle = document.querySelector(".mobile-nav-toggle");

    if (navToggle) {
      navToggle.addEventListener("click", function () {
        body.classList.toggle("mobile-nav-active");
        this.classList.toggle("bi-list");
        this.classList.toggle("bi-x");
      });
    }

    // Toggle mobile nav dropdowns
    document
      .querySelectorAll(".navbar-top .navbar .toggle-dropdown")
      .forEach((navmenu) => {
        navmenu.addEventListener("click", function (e) {
          e.preventDefault();
          this.parentNode.classList.toggle("active");
          this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
          e.stopImmediatePropagation();
        });
      });

    // Close mobile nav on link click
    document
      .querySelectorAll(".navbar-top .navbar a")
      .forEach((navmenu) => {
        navmenu.addEventListener("click", () => {
          if (document.querySelector(".mobile-nav-active")) {
            body.classList.remove("mobile-nav-active");
            if (navToggle) {
              navToggle.classList.add("bi-list");
              navToggle.classList.remove("bi-x");
            }
          }
        });
      });
  });

  // Filter - Portfolio
  document.addEventListener("DOMContentLoaded", function () {
    const filters = document.querySelectorAll(".portfolio-filters li");
    const portfolioContainer = document.querySelector(".portfolio-container-grid");
    if (!portfolioContainer) return;

    const allItems = portfolioContainer.querySelectorAll("div");

  filters.forEach((filter) => {
    filter.addEventListener("click", function () {
      filters.forEach((f) => f.classList.remove("filter-active"));
      this.classList.add("filter-active");

      const filterValue = this.getAttribute("data-filter");

      portfolioContainer.classList.remove(
        "app-filter",
        "product-filter",
        "branding-filter"
      );

      allItems.forEach((item) => {
        item.style.display = "block";
        item.classList.remove("portfolio-item-grid-animate"); // reset
      });

      if (filterValue === "*") {
        allItems.forEach((item) => {
          // add animation for all
          setTimeout(() => item.classList.add("portfolio-item-grid-animate"), 50);
        });
        return;
      } else if (filterValue === ".filter-app") {
        portfolioContainer.classList.add("app-filter");
        allItems.forEach((item) => {
          if (!item.classList.contains("filter-app")) {
            item.style.display = "none";
          } else {
            setTimeout(() => item.classList.add("portfolio-item-grid-animate"), 50);
          }
        });
      } else if (filterValue === ".filter-product") {
        portfolioContainer.classList.add("product-filter");
        allItems.forEach((item) => {
          if (!item.classList.contains("filter-product")) {
            item.style.display = "none";
          } else {
            setTimeout(() => item.classList.add("portfolio-item-grid-animate"), 50);
          }
        });
      } else if (filterValue === ".filter-branding") {
        portfolioContainer.classList.add("branding-filter");
        allItems.forEach((item) => {
          if (!item.classList.contains("filter-branding")) {
            item.style.display = "none";
          } else {
            setTimeout(() => item.classList.add("portfolio-item-grid-animate"), 50);
          }
        });
      }
    });
  });

  });

  // LightBox - Portfolio
  const lightBoxContainer = document.getElementById("lightBoxContainer");
  const lightBoxItem = document.getElementById("lightBoxItem");
  const closeBtn = document.getElementById("closeBtn");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  if (lightBoxContainer && lightBoxItem) {
    let currentIndex = 0;
    const previewLinks = Array.from(
      document.querySelectorAll(".portfolio-info .preview-link")
    );
    const allPortfolioImages = Array.from(
      document.querySelectorAll(".portfolio-container-grid img")
    );

    previewLinks.forEach((link) => {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        lightBoxContainer.style.display = "flex";
        const imgSrc = event.currentTarget.getAttribute("href");
        lightBoxItem.style.backgroundImage = `url(${imgSrc})`;
        currentIndex = allPortfolioImages.findIndex(
          (img) => img.getAttribute("src") === imgSrc
        );
      });
    });

    function closeLightBox() {
      lightBoxContainer.style.display = "none";
    }
    function nextSlide() {
      currentIndex = (currentIndex + 1) % allPortfolioImages.length;
      lightBoxItem.style.backgroundImage = `url(${allPortfolioImages[currentIndex].getAttribute(
        "src"
      )})`;
    }
    function prevSlide() {
      currentIndex =
        (currentIndex - 1 + allPortfolioImages.length) %
        allPortfolioImages.length;
      lightBoxItem.style.backgroundImage = `url(${allPortfolioImages[currentIndex].getAttribute(
        "src"
      )})`;
    }

    if (closeBtn) closeBtn.addEventListener("click", closeLightBox);
    if (nextBtn) nextBtn.addEventListener("click", nextSlide);
    if (prevBtn) prevBtn.addEventListener("click", prevSlide);

    document.addEventListener("keydown", function (event) {
      if (lightBoxContainer.style.display === "flex") {
        if (event.key === "ArrowRight") nextSlide();
        else if (event.key === "ArrowLeft") prevSlide();
        else if (event.key === "Escape") closeLightBox();
      }
    });
  }


  // Scroll top button
  const scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
      if (scrollTop) {
          window.scrollY > 100
              ? scrollTop.classList.add("active")
              : scrollTop.classList.remove("active");
      }
  }
  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  // FAQ Accordion
  function updateAccordionActiveState() {
    const accordionItems = document.querySelectorAll(".faq .accordion-item");
    accordionItems.forEach((item) => {
      const collapse = item.querySelector(".accordion-collapse");
      if (collapse && collapse.classList.contains("show")) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    const accordionElement = document.getElementById("faqAccordion");
    if (accordionElement) {
      accordionElement.addEventListener(
        "shown.bs.collapse",
        updateAccordionActiveState
      );
      accordionElement.addEventListener(
        "hidden.bs.collapse",
        updateAccordionActiveState
      );
      updateAccordionActiveState();
    }
  });

  // Navbar Scrollspy
  const navbarlinks = document.querySelectorAll(".navbar a");
  function navbarScrollspy() {
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      const section = document.querySelector(navbarlink.hash);
      if (!section) return;
      const position = window.scrollY + 200;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        document
          .querySelectorAll(".navbar a.active")
          .forEach((link) => link.classList.remove("active"));
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  }
  window.addEventListener("load", navbarScrollspy);
  document.addEventListener("scroll", navbarScrollspy);

})();

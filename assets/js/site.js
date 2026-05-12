(function () {
  var storageKey = "sierra-portfolio-theme";
  var root = document.documentElement;

  function getPreferredTheme() {
    var saved = window.localStorage.getItem(storageKey);
    if (saved === "light" || saved === "dark") {
      return saved;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
  }

  function toggleTheme() {
    var nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    window.localStorage.setItem(storageKey, nextTheme);
    applyTheme(nextTheme);
  }

  function initTheme() {
    applyTheme(getPreferredTheme());
    var toggleButtons = document.querySelectorAll("[data-theme-toggle]");
    toggleButtons.forEach(function (button) {
      button.addEventListener("click", toggleTheme);
    });
  }

  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach(function (item) {
        item.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    items.forEach(function (item) {
      observer.observe(item);
    });
  }

  function renderProjectCard(project) {
    var highlights = project.highlights
      .slice(0, 2)
      .map(function (highlight) {
        return "<li>" + highlight + "</li>";
      })
      .join("");

    return (
      '<article class="project-card card reveal" data-category="' +
      project.category +
      '">' +
      '<p class="project-category">' +
      project.category +
      "</p>" +
      "<h2>" +
      project.title +
      "</h2>" +
      "<p>" +
      project.summary +
      "</p>" +
      '<ul class="project-highlights">' +
      highlights +
      "</ul>" +
      '<button class="button button-secondary" type="button" data-project-id="' +
      project.id +
      '">View Details</button>' +
      "</article>"
    );
  }

  function renderMediaItem(item) {
    if (item.type === "image") {
      return (
        '<figure class="media-card">' +
        '<img src="' +
        item.src +
        '" alt="' +
        item.alt +
        '" loading="lazy" />' +
        "</figure>"
      );
    }

    if (item.type === "video") {
      return (
        '<figure class="media-card">' +
        '<video controls preload="metadata" aria-label="' +
        item.alt +
        '">' +
        '<source src="' +
        item.src +
        '" />' +
        "</video>" +
        "</figure>"
      );
    }

    if (item.type === "embed") {
      return (
        '<figure class="media-card media-card-embed">' +
        '<iframe src="' +
        item.embedUrl +
        '" title="' +
        item.alt +
        '" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>' +
        "</figure>"
      );
    }

    return "";
  }

  function renderProjectModal(project) {
    var mediaMarkup = project.media.map(renderMediaItem).join("");
    var linkMarkup = project.links.length
      ? '<div class="project-links">' +
        project.links
          .map(function (link) {
            var external = /^https?:\/\//.test(link.href) ? ' target="_blank" rel="noreferrer"' : "";
            return '<a class="button button-secondary" href="' + link.href + '"' + external + ">" + link.label + "</a>";
          })
          .join("") +
        "</div>"
      : "";

    var highlights = project.highlights
      .map(function (highlight) {
        return "<li>" + highlight + "</li>";
      })
      .join("");

    return (
      '<div class="modal-header">' +
      '<p class="project-category">' +
      project.category +
      "</p>" +
      '<h2 id="modal-title">' +
      project.title +
      "</h2>" +
      "<p>" +
      project.details +
      "</p>" +
      "</div>" +
      '<div class="modal-body">' +
      '<div class="modal-column">' +
      "<h3>Highlights</h3>" +
      '<ul class="modal-highlights">' +
      highlights +
      "</ul>" +
      linkMarkup +
      "</div>" +
      '<div class="modal-column modal-gallery">' +
      mediaMarkup +
      "</div>" +
      "</div>"
    );
  }

  function initProjects() {
    if (document.body.dataset.page !== "projects" || !window.PROJECTS_DATA) return;

    var projects = window.PROJECTS_DATA;
    var grid = document.getElementById("projects-grid");
    var modal = document.getElementById("project-modal");
    var modalContent = document.getElementById("modal-content");
    var filterBar = document.getElementById("project-filters");
    var activeFilter = "all";

    function drawCards() {
      var filtered = projects.filter(function (project) {
        return activeFilter === "all" || project.category === activeFilter;
      });

      grid.innerHTML = filtered.map(renderProjectCard).join("");
      initReveal();

      var buttons = grid.querySelectorAll("[data-project-id]");
      buttons.forEach(function (button) {
        button.addEventListener("click", function () {
          openModal(button.getAttribute("data-project-id"));
        });
      });
    }

    function openModal(projectId) {
      var project = projects.find(function (entry) {
        return entry.id === projectId;
      });
      if (!project) return;
      modalContent.innerHTML = renderProjectModal(project);
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");
    }

    function closeModal() {
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("modal-open");
      modalContent.innerHTML = "";
    }

    filterBar.addEventListener("click", function (event) {
      if (!event.target.matches("[data-filter]")) return;
      activeFilter = event.target.getAttribute("data-filter");
      filterBar.querySelectorAll(".filter-chip").forEach(function (chip) {
        chip.classList.toggle("active", chip === event.target);
      });
      drawCards();
    });

    modal.addEventListener("click", function (event) {
      if (event.target.matches("[data-close-modal]")) {
        closeModal();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && modal.getAttribute("aria-hidden") === "false") {
        closeModal();
      }
    });

    drawCards();
  }

  document.addEventListener("DOMContentLoaded", function () {
    initTheme();
    initReveal();
    initProjects();
  });
})();

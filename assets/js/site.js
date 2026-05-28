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
        '<figure class="media-card media-card-image">' +
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
        '<figure class="media-card media-card-video">' +
        '<video preload="metadata" aria-label="' +
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
    var mediaLightbox = document.createElement("div");
    var mediaLightboxBody = document.createElement("div");

    mediaLightbox.className = "media-lightbox";
    mediaLightbox.setAttribute("aria-hidden", "true");
    mediaLightbox.setAttribute("role", "dialog");
    mediaLightbox.setAttribute("aria-label", "Expanded project media");
    mediaLightbox.innerHTML =
      '<button class="media-lightbox-close" type="button" aria-label="Close media">Close</button>';
    mediaLightboxBody.className = "media-lightbox-body";
    mediaLightbox.appendChild(mediaLightboxBody);
    document.body.appendChild(mediaLightbox);

    function openMediaLightbox(type, src, alt) {
      if (!src) return;
      if (type === "video") {
        mediaLightboxBody.innerHTML =
          '<video controls autoplay preload="metadata" aria-label="' +
          (alt || "Expanded project video") +
          '">' +
          '<source src="' +
          src +
          '" />' +
          "</video>";
      } else {
        mediaLightboxBody.innerHTML =
          '<img src="' +
          src +
          '" alt="' +
          (alt || "Expanded project image") +
          '" loading="eager" />';
      }
      mediaLightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");
    }

    function closeMediaLightbox() {
      mediaLightbox.setAttribute("aria-hidden", "true");
      mediaLightboxBody.innerHTML = "";
      if (modal.getAttribute("aria-hidden") === "true") {
        document.body.classList.remove("modal-open");
      }
    }

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
      closeMediaLightbox();
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("modal-open");
      modalContent.innerHTML = "";
    }

    function initProjectSprite() {
      var spriteCallout = document.querySelector("[data-project-sprite]");
      if (!spriteCallout) return;

      var spriteButton = spriteCallout.querySelector("[data-project-sprite-button]");
      var spriteImage = spriteCallout.querySelector("[data-project-sprite-image]");
      var spriteBubble = spriteCallout.querySelector(".project-sprite-bubble");
      var targetChip = filterBar.querySelector('[data-filter="Research & Professional"]');
      var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      var hasEntered = false;

      function placeSprite() {
        if (!targetChip) return;

        var chipRect = targetChip.getBoundingClientRect();
        var parentRect = spriteCallout.offsetParent
          ? spriteCallout.offsetParent.getBoundingClientRect()
          : { left: 0, top: 0 };
        var parentWidth = spriteCallout.offsetParent ? spriteCallout.offsetParent.clientWidth : window.innerWidth;
        var calloutWidth = spriteCallout.offsetWidth || 272;
        var spriteButtonHeight = spriteButton ? spriteButton.offsetHeight : 82;
        var spriteBubbleHeight = spriteBubble ? spriteBubble.offsetHeight + 9 : 74;
        var left = chipRect.left - parentRect.left + chipRect.width / 2 - calloutWidth / 2;
        var top = chipRect.top - parentRect.top - spriteBubbleHeight - spriteButtonHeight - 14;
        var minLeft = 16;
        var maxLeft = parentWidth - calloutWidth - 16;

        left = Math.max(minLeft, Math.min(left, maxLeft));

        spriteCallout.style.left = left + "px";
        spriteCallout.style.top = top + "px";
        spriteCallout.style.setProperty("--sprite-run-distance", window.innerWidth - chipRect.left + calloutWidth + "px");
      }

      function settleSprite() {
        if (spriteImage) {
          spriteImage.src = "assets/media/projects/sprite-idle.png";
          spriteImage.alt = "Idle game sprite";
        }
        spriteCallout.classList.remove("is-running");
        spriteCallout.classList.add("is-settled");
        spriteCallout.setAttribute("aria-hidden", "false");
        hasEntered = true;
      }

      placeSprite();

      if (spriteImage && !spriteImage.complete) {
        spriteImage.addEventListener("load", placeSprite, { once: true });
      }

      if (reduceMotion) {
        settleSprite();
      } else {
        spriteCallout.classList.add("is-ready", "is-running");
        spriteCallout.setAttribute("aria-hidden", "false");
        window.requestAnimationFrame(function () {
          spriteCallout.classList.add("is-entering");
        });
        window.setTimeout(settleSprite, 2300);
      }

      if (spriteButton) {
        spriteButton.addEventListener("click", function () {
          openModal("godot-game");
        });
      }

      window.addEventListener("resize", function () {
        placeSprite();
        if (hasEntered || reduceMotion) {
          spriteCallout.classList.add("is-settled");
        }
      });
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

    modalContent.addEventListener("click", function (event) {
      var clickedImage = event.target.closest(".media-card-image img");
      if (clickedImage) {
        openMediaLightbox("image", clickedImage.currentSrc || clickedImage.src, clickedImage.alt);
        return;
      }

      var clickedVideoCard = event.target.closest(".media-card-video");
      if (!clickedVideoCard) return;
      var previewVideo = clickedVideoCard.querySelector("video");
      if (!previewVideo) return;
      var source = previewVideo.currentSrc || (previewVideo.querySelector("source") && previewVideo.querySelector("source").src);
      openMediaLightbox("video", source, previewVideo.getAttribute("aria-label"));
    });

    mediaLightbox.addEventListener("click", function (event) {
      if (
        event.target === mediaLightbox ||
        event.target.classList.contains("media-lightbox-close")
      ) {
        closeMediaLightbox();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && mediaLightbox.getAttribute("aria-hidden") === "false") {
        closeMediaLightbox();
        return;
      }
      if (event.key === "Escape" && modal.getAttribute("aria-hidden") === "false") {
        closeModal();
      }
    });

    drawCards();
    initProjectSprite();
  }

  document.addEventListener("DOMContentLoaded", function () {
    initTheme();
    initReveal();
    initProjects();
  });
})();

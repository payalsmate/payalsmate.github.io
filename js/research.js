let researchProjects = [];

fetch('../data/research.json')
  .then(res => {
    if (!res.ok) throw new Error("Failed to load research.json");
    return res.json();
  })
  .then(data => {
    researchProjects = data;
    // Wait for publications to load first
    return window.publicationsData?.ready ?? Promise.resolve();
  })
  .then(() => {
    // Now publications are loaded, render research
    renderResearch("all");
  })
  .catch(err => {
    console.error("Error loading research projects or publications:", err);
  });

function renderResearch(category = "all") {
  const container = document.getElementById("research-projects");
  container.innerHTML = "";

  const filtered = category === "all" 
    ? researchProjects 
    : researchProjects.filter(p => p.category.includes(category));

  filtered.forEach((project, index) => {
    const panel = document.createElement("div");
    panel.className = "research-project";
    panel.dataset.index = index;
    panel.dataset.expanded = "false";

    // Build description HTML
    let descHTML = "";
    if (Array.isArray(project.description)) {
      project.description.forEach(block => {
        if (typeof block === "string") {
          descHTML += `<p>${block}</p>`;
        } else if (block.list) {
          const listItems = block.list.map(item => `<li>${item}</li>`).join("");
          descHTML += `<ul class="research-desc-bullets">${listItems}</ul>`;
        }
      });
    } else if (typeof project.description === "string") {
      descHTML = `<p>${project.description}</p>`;
    }

    // Map reference IDs to publication entries and generate links
    let refHTML = "";
    if (project.references && project.references.length > 0) {
      // Filter out empty or invalid refs
      const validRefs = project.references.filter(ref => ref.trim() !== "");
      
      if (validRefs.length > 0) {
        // Create list items with links to publication titles
        const refListItems = validRefs.map(refId => {
          const pub = window.publicationsData.publications.find(pub => pub.id === refId);
          if (pub) {
            const title = pub.title || "Untitled";
            const link = pub.link || "#";
            return `<li><a href="${link}" target="_blank" rel="noopener noreferrer">${title}</a> — <em>${pub.journal}, ${pub.year}.</em></li>`;
          } else {
            // If no publication found for this id, show id text
            return `<li>${refId}</li>`;
          }
        }).join("");

        refHTML = `
          <div class="research-refs-title">References</div>
          <ul class="research-refs">${refListItems}</ul>
        `;
      }
    }

    const imgHTML = project.image
      ? `<img src="${project.image}" class="research-img" alt="Project image">`
      : "";

    panel.innerHTML = `
      <div class="research-title">${project.title}</div>
      <div class="research-content">
        <div class="research-text">
          ${descHTML}
          ${refHTML}
        </div>
        ${imgHTML}
      </div>
    `;

    const content = panel.querySelector(".research-content");

    const toggleBtn = document.createElement("button");
    toggleBtn.className = "toggle-btn";
    toggleBtn.textContent = "Show More";

    toggleBtn.addEventListener("click", () => {
      const isExpanded = content.classList.toggle("expanded");
      toggleBtn.textContent = isExpanded ? "Show Less" : "Show More";
    });

    const maybeAddToggle = () => {
      const isExpanded = content.classList.contains("expanded");
      const needsToggle = content.scrollHeight > content.clientHeight;

      const hasBtn = panel.contains(toggleBtn);

      if (needsToggle && !hasBtn) {
        panel.appendChild(toggleBtn);
      } else if (!needsToggle && hasBtn && !isExpanded) {
        toggleBtn.remove();
      }
    };

    new ResizeObserver(maybeAddToggle).observe(content);
    new MutationObserver(maybeAddToggle).observe(content, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    maybeAddToggle();

    container.appendChild(panel);
  });
}

// Filter button listeners
document.querySelectorAll(".research-filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".research-filter").forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    renderResearch(button.dataset.category);
  });
});

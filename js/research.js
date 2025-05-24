const researchProjects = [
  {
    category: ["ongoing", "computational"],
    title: "Predicting Gene Expression Patterns",
    description: ["We use machine learning to model gene expression dynamics in early development."],
    references: ["Doe et al., Bioinformatics 2024", "Smith et al., Nature 2023"],
    image: "../images/project1.jpg"
  },
  {
    category: ["wetlab"],
    title: "In Vivo Imaging of Developmental Stages",
    description: ["Using advanced microscopy to track real-time development in zebrafish."],
    references: ["Chen et al., Cell 2022"],
    image: "../images/project2.jpg"
  },
  {
    category: ["wetlab"],
    title: "Stem Cell Fate Mapping",
    description: [
      "We investigate how stem cells decide between different tissue types.",
      {
        list: [
          "Use of CRISPR lineage tracing",
          "Single-cell RNA-seq analysis",
          "Live imaging validation",
          "Live imaging validation",
          "Live imaging validation",
          "Live imaging validation"
        ]
      }
    ],
    references: ["Lee et al., Nature 2024"],
    image: "../images/project2.jpg"
  }
];

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

    const refItems = project.references.map(ref => `<li>${ref}</li>`).join("");
    const refHTML = project.references.length
      ? `<div class="research-refs-title">References</div>
         <ul class="research-refs">${refItems}</ul>`
      : "";

    panel.innerHTML = `
      <div class="research-title">${project.title}</div>
      <div class="research-content">
        <div class="research-text">
          ${descHTML}
          ${refHTML}
        </div>
        <img src="${project.image}" class="research-img" alt="Project image">
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

// Initial load
renderResearch("all");

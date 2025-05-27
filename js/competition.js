const competitionDetails = {
  "awsar-dbt-2023": {
    title: "Diving in the Pool of Water Channels",
    description: [
      "As part of a national scientific writing competition aimed at communicating research to the general public, I authored a creative narrative titled \"Diving in the Pool of Water Channels\" — a story told from the perspective of aquaporins, the microscopic water channels that play a vital role in cellular function. Through this imaginative lens, I explored their discovery, function, and their connection to my research on heat-induced stress in buffalo liver and adipose tissues. The piece sheds light on how aquaporins contribute to glycerol transport and the metabolic shifts that can lead to fatty liver disease in animals. The article makes complex science accessible and emphasizes the importance of understanding cellular mechanisms in real-world challenges like climate stress in livestock."
    ],
    references: [
      {
        "title": "Diving in the Pool of Water Channels",
        "link": "../publication/article/awsar_story.pdf"
      }
    ],
    image: "../images/AWSAR_AQP.png"
  }
};

function alignModalWithMainPanel() {
  const mainPanel = document.querySelector(".main-panel");
  const modal = document.getElementById("competition-modal");

  const rect = mainPanel.getBoundingClientRect();

  const marginX = rect.width * 0.02;   // 1% horizontal margin
  const maxHeight = rect.height * 0.8; // 80% max height
  const paddingX = rect.width*0.02;
  const paddingY = paddingX

  modal.style.position = "absolute";
  modal.style.left = `${rect.left + window.scrollX + marginX}px`;
  modal.style.width = `${rect.width - 4 * marginX}px`;

  modal.style.height = "auto";
  modal.style.maxHeight = `${maxHeight}px`;
  modal.style.overflowY = "auto";
  modal.style.padding = `${paddingY}px ${paddingX}px`

  // Defer centering until after height is calculated
  requestAnimationFrame(() => {
    const modalHeight = modal.offsetHeight;
    const top = rect.top + window.scrollY + (rect.height - modalHeight) / 2;

    // Make sure it doesn't go above the top of the panel
    modal.style.top = `${Math.max(rect.top + window.scrollY, top)}px`;
  });

  const modalContent = modal.querySelector(".modal-content");

  // Wait for modal height to be calculated
  requestAnimationFrame(() => {
    const modalHeight = modal.offsetHeight;

    // Give modal-content a max-height slightly less than modal container's height,
    // accounting for padding/margin to avoid overflow
    modalContent.style.maxHeight = `${modalHeight - 40}px`; // adjust 40 as needed for padding
  });
}

function renderCompetitionModal(id) {
  const data = competitionDetails[id];
  if (!data) return;

  const modal = document.getElementById("competition-modal");
  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = ""; // Clear previous content

  let descHTML = "";
  if (Array.isArray(data.description)) {
    data.description.forEach(block => {
      if (typeof block === "string") {
        descHTML += `<p>${block}</p>`;
      } else if (block.list) {
        const listItems = block.list.map(item => `<li>${item}</li>`).join("");
        descHTML += `<ul class="project-desc-bullets">${listItems}</ul>`;
      }
    });
  }

   const refItems = data.references
    .map(ref => `<li><a href="${ref.link}" target="_blank" rel="noopener noreferrer">${ref.title}</a></li>`)
    .join("");

  const refHTML = data.references.length
    ? `<div class="project-refs-title">References</div><ul class="project-refs">${refItems}</ul>`
    : "";

  modalBody.innerHTML = `
    <div class="project-title">${data.title}</div>
    <div class="project-content">
      <div class="project-text">
        ${descHTML}
        ${refHTML}
      </div>
      <img src="${data.image}" class="project-img" alt="${data.title}">
    </div>
  `;

  alignModalWithMainPanel();
  modal.classList.remove("hidden");
}


document.querySelectorAll(".competition-link").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const id = link.dataset.competition;
    renderCompetitionModal(id);
  });
});

document.querySelector(".modal-close").addEventListener("click", () => {
  document.getElementById("competition-modal").classList.add("hidden");
});

//If window resizes while modal is open, resize the modal
window.addEventListener("resize", () => alignModalWithMainPanel(0.05));

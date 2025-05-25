const competitionDetails = {
  "awsar-dbt-2023": {
    title: "Diving in the Pool of Water Channels",
    description: [
      "As part of a national scientific writing competition aimed at communicating research to the general public, I authored a creative narrative titled \"Diving in the Pool of Water Channels\" — a story told from the perspective of aquaporins, the microscopic water channels that play a vital role in cellular function. Through this imaginative lens, I explored their discovery, function, and their connection to my research on heat-induced stress in buffalo liver and adipose tissues. The piece sheds light on how aquaporins contribute to glycerol transport and the metabolic shifts that can lead to fatty liver disease in animals. The article makes complex science accessible and emphasizes the importance of understanding cellular mechanisms in real-world challenges like climate stress in livestock."
    ],
    references: [
      {
        "title": "Diving in the Pool of Water Channels",
        "link": "../publication/article/awsar_dbt_2023.pdf"
      }
    ],
    image: "../images/AWSAR_AQP.png"
  }
};

function alignModalWithMainPanel() {
  const mainPanel = document.querySelector(".main-panel");
  const modal = document.getElementById("competition-modal");

  const rect = mainPanel.getBoundingClientRect();

  modal.style.position = "absolute";
  modal.style.top = `${rect.top + window.scrollY}px`;
  modal.style.left = `${rect.left + window.scrollX}px`;
  modal.style.width = `${rect.width}px`;
  modal.style.height = `${rect.height}px`;
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

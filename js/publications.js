//shared publicationData for use in other JS scripts
window.publicationsData = {
  publications: [],
  ready: null,
};

window.publicationsData.ready = fetch('../data/publications.json')
  .then(res => {
    if (!res.ok) throw new Error("Failed to load publications.json");
    return res.json();
  })
  .then(data => {
    console.log("Loaded publications:", data);
    window.publicationsData.publications = data;
  })
  .catch(err => {
    console.error("Error loading publications:", err);
  });

// Your existing loadPublications() function stays here for UI rendering of publications separately

function loadPublications(category = "all") {
  const list = document.getElementById("publication-list");
  list.innerHTML = "";

  const filtered = category === "all"
    ? window.publicationsData.publications
    : window.publicationsData.publications.filter(pub => pub.category === category);

  const count = filtered.length;

  filtered.forEach((pub, index) => {
    const item = document.createElement("li");
    const number = count - index;

    const linkHTML = pub.link
      ? `<a class="pub-link" href="${pub.link}" target="_blank">View PDF</a>`
      : "";

    item.innerHTML = `
      <div class="pub-number">${number}</div>
      <div class="pub-details">
        <strong>${pub.title}</strong><br>
        <span>${pub.authors}</span><br>
        <em>${pub.journal} (${pub.year})</em><br>
        ${linkHTML}
      </div>
    `;
    list.appendChild(item);
  });
}

// Event Listeners remain unchanged

document.querySelectorAll(".pub-filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".pub-filter").forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const category = button.dataset.category;
    loadPublications(category);
  });
});

// Wait for publications data to load, then initial load
window.publicationsData.ready.then(() => {
  loadPublications("all");
});

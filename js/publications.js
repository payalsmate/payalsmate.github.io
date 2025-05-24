let publications = [];

fetch('../data/publications.json')
  .then(res => {
    if (!res.ok) throw new Error("Failed to load publications.json");
    return res.json();
  })
  .then(data => {
    console.log("Loaded publications:", data); // ✅ Debug here
    publications = data;
    loadPublications("all");
  })
  .catch(err => {
    console.error("Error loading publications:", err);
  });


function loadPublications(category = "all") {
  const list = document.getElementById("publication-list");
  list.innerHTML = "";

  const filtered = category === "all"
    ? publications
    : publications.filter(pub => pub.category === category);

  // No need to reverse array
  const count = filtered.length;

  filtered.forEach((pub, index) => {
    const item = document.createElement("li");

    // Calculate reverse number
    const number = count - index;

    item.innerHTML = `
      <div class="pub-number">${number}</div>
      <div class="pub-details">
        <strong>${pub.title}</strong><br>
        <span>${pub.authors}</span><br>
        <em>${pub.journal} (${pub.year})</em><br>
        <a class="pub-link" href="${pub.link}" target="_blank">View PDF</a>
      </div>
    `;
    list.appendChild(item);
  });
}

// Event Listeners
document.querySelectorAll(".pub-filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".pub-filter").forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const category = button.dataset.category;
    loadPublications(category);
  });
});

// Initial load
loadPublications("all");

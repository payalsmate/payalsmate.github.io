// Load publications from a JSON file and render them
fetch('data/publications.json')
  .then(response => response.json())
  .then(data => {
    const list = document.getElementById('publications-list');
    data.forEach(pub => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${pub.title}</strong> — <em>${pub.authors}</em>. ${pub.journal}, ${pub.year}.`;
      list.appendChild(li);
    });
  })
  .catch(error => {
    console.error('Failed to load publications:', error);
  });


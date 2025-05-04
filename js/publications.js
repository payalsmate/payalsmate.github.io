// Load publications from a JSON file and render them
fetch('data/publications.json')
  .then(response => response.json())
  .then(data => {
    const list = document.getElementById('publications-list');
    data.forEach(pub => {
      const li = document.createElement('li');
      li.innerHTML = `
        <em>${pub.authors}</em>. 
        <strong><a href="${pub.link}" target="_blank" rel="noopener noreferrer">${pub.title}</a></strong>. 
        ${pub.journal}, ${pub.year}.
      `;
      list.appendChild(li);
    });
  })
  .catch(error => {
    console.error('Failed to load publications:', error);
  });

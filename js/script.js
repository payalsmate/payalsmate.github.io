function showArticle(id, event) {
  // Hide all articles
  document.querySelectorAll('.content article').forEach(article => {
    article.classList.remove('active');
    article.style.display = 'none';
  });

  // Show selected article
  const selected = document.getElementById(id);
  selected.classList.add('active');
  selected.style.display = 'block';

  // Update button styles
  document.querySelectorAll('nav button').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  // Update section title
  const titleMap = {
    about: 'About',
    education: 'Education',
    experience: 'Experience',
    research: 'Research',
    publications: 'Publications',
    achievements: 'Achievements',
    outreach: 'Outreach'
  };
  document.getElementById('section-title').textContent = titleMap[id];
}

window.onload = () => {
  document.querySelectorAll('.content article').forEach(article => {
    article.style.display = 'none';
  });
  const defaultArticle = document.getElementById('about');
  defaultArticle.style.display = 'block';
  defaultArticle.classList.add('active');
};

document.getElementById("showMoreBtn").addEventListener("click", function () {
  const olderNews = document.querySelectorAll(".older-news");
  olderNews.forEach(item => item.classList.toggle("hidden"));
  this.textContent = this.textContent === "Show More News" ? "Show Less" : "Show More News";
});

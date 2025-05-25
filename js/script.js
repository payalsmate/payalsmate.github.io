// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// Article related
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

const toggleBtn = document.querySelector('.sidebar-toggle');
const sidebarDetails = document.querySelector('.sidebar-details');
const chevron = toggleBtn.querySelector('ion-icon');

// Toggle sidebar details
toggleBtn.addEventListener('click', () => {
  const isVisible = sidebarDetails.style.display === 'block';

  if (isVisible) {
    sidebarDetails.style.display = 'none';
    chevron.style.transform = 'rotate(0deg)';
  } else {
    sidebarDetails.style.display = 'block';
    chevron.style.transform = 'rotate(180deg)';
  }
});
 
// document.getElementById("showMoreBtn").addEventListener("click", function () {
//   const olderNews = document.querySelectorAll(".older-news");
//   olderNews.forEach(item => item.classList.toggle("hidden"));
//   this.textContent = this.textContent === "Show More News" ? "Show Less" : "Show More News";
// });


const showMoreBtn = document.getElementById("showMoreBtn");
const newsItems = document.querySelectorAll(".news-list li");
const totalItems = newsItems.length;
let visibleCount = 5; // Initially show first 5

// Hide all except the first 5
newsItems.forEach((item, index) => {
  item.style.display = index < visibleCount ? "list-item" : "none";
});

showMoreBtn.addEventListener("click", function () {
  if (visibleCount >= totalItems) {
    // Collapse all back to 5
    visibleCount = 5;
    newsItems.forEach((item, index) => {
      item.style.display = index < visibleCount ? "list-item" : "none";
    });
    this.textContent = "Show More News";
  } else {
    // Show next 5 items
    const nextCount = Math.min(visibleCount + 5, totalItems);
    for (let i = visibleCount; i < nextCount; i++) {
      newsItems[i].style.display = "list-item";
    }
    visibleCount = nextCount;

    if (visibleCount >= totalItems) {
      this.textContent = "Show Less";
    }
  }
});



// src/main.js
document.addEventListener('DOMContentLoaded', () => {
    // Current year in footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }
  
    // Initialize theme from localStorage
    initTheme();
  
    // Theme toggle checkbox
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('change', () => {
        toggleTheme(themeToggle.checked);
      });
    }
  
    // Fetch data from data.json
    fetch('./public/data.json')
      .then((res) => res.json())
      .then((data) => {
        populateSummary(data.summary);
        populateSkills(data.skills);
        populateExperience(data.experience);
        populateProjects(data.projects);
        populatePublications(data.publications);
        populateCertificates(data.certificates);
        populateEducation(data.education);
      })
      .catch((err) => console.error('Error fetching data.json:', err));
  
    // Mouse star dust
    initStarDust();
  });
  
  /* ---------------- THEME LOGIC ---------------- */
  function initTheme() {
    // If localStorage says "dark", set dark mode
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      const toggle = document.getElementById('theme-toggle');
      if (toggle) toggle.checked = true;
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
  
  function toggleTheme(isDarkChecked) {
    if (isDarkChecked) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }
  
  /* -------------- MOUSE STAR DUST ------------- */
  function initStarDust() {
    document.addEventListener('mousemove', (e) => {
      const starContainer = document.getElementById('star-dust-container');
      if (!starContainer) return;
  
      const star = document.createElement('div');
      const size = Math.floor(Math.random() * 3) + 2; // 2-5 px
      star.className = "absolute rounded-full animate-dust-fade";
      star.style.width = size + "px";
      star.style.height = size + "px";
      star.style.backgroundColor = "#c9a24f"; // gold
      star.style.left = e.pageX + "px";
      star.style.top = e.pageY + "px";
  
      starContainer.appendChild(star);
  
      setTimeout(() => {
        if (star && starContainer.contains(star)) {
          starContainer.removeChild(star);
        }
      }, 1000);
    });
  }
  
  /* ------------- CARD CREATION + POPULATION ------------- */
  function createClassyCard() {
    return `
      bg-white
      dark:bg-gray-800
      border
      border-grayish-300
      dark:border-gray-700
      rounded-lg
      p-4
      shadow-sm
      hover:shadow-md
      transition-shadow
      duration-300
    `;
  }
  
  // Example populate functions 
  // (same logic as before, just ensuring text classes handle dark mode)
  function populateSummary(summary) {
    const summaryEl = document.getElementById('summary-text');
    if (summaryEl) {
      summaryEl.textContent = summary;
    }
  }
  
  function populateSkills(skills) {
    const skillsList = document.getElementById('skills-list');
    if (!skillsList || !skills) return;
    skills.forEach((skill) => {
      const li = document.createElement('li');
      li.className = "text-gray-800 dark:text-gray-200";
      li.textContent = skill;
      skillsList.appendChild(li);
    });
  }
  
  function populateExperience(experiences) {
    const container = document.getElementById('experience-cards');
    if (!container || !experiences) return;
    experiences.forEach((exp) => {
      const cardDiv = document.createElement('div');
      cardDiv.className = createClassyCard();
  
      const role = document.createElement('h3');
      role.className = "font-heading text-xl mb-2 text-gray-900 dark:text-gray-100";
      role.textContent = exp.role;
  
      const company = document.createElement('p');
      company.className = "italic text-gray-700 dark:text-gray-300 mb-1";
      company.textContent = exp.company;
  
      const dateRange = document.createElement('p');
      dateRange.className = "text-sm text-gray-500 dark:text-gray-400 mb-3";
      dateRange.textContent = `${exp.start_date} - ${exp.end_date}`;
  
      const ul = document.createElement('ul');
      ul.className = "list-disc list-inside text-sm text-gray-700 dark:text-gray-300 mb-3";
      exp.responsibilities.forEach((r) => {
        const li = document.createElement('li');
        li.textContent = r;
        ul.appendChild(li);
      });
  
      const imgContainer = document.createElement('div');
      imgContainer.className = "mt-2 flex flex-wrap gap-2";
      if (exp.images && exp.images.length > 0) {
        exp.images.forEach((src) => {
          const img = document.createElement('img');
          img.src = src;
          img.alt = exp.company;
          img.className = "h-12 w-auto object-contain";
          img.loading = "lazy";
          imgContainer.appendChild(img);
        });
      }
  
      cardDiv.appendChild(role);
      cardDiv.appendChild(company);
      cardDiv.appendChild(dateRange);
      cardDiv.appendChild(ul);
      cardDiv.appendChild(imgContainer);
  
      container.appendChild(cardDiv);
    });
  }
  
  function populateProjects(projects) {
    const container = document.getElementById('projects-container');
    if (!container || !projects) return;
    projects.forEach((project) => {
      const card = document.createElement('div');
      card.className = createClassyCard();
  
      const title = document.createElement('h3');
      title.className = "font-heading text-xl mb-2 text-gray-900 dark:text-gray-100";
      title.textContent = project.title;
  
      const desc = document.createElement('p');
      desc.className = "text-sm text-gray-700 dark:text-gray-300 mb-3";
      desc.textContent = project.description;
  
      const link = document.createElement('a');
      link.className = "text-sm text-gold underline mb-2 inline-block";
      link.href = project.url;
      link.target = "_blank";
      link.textContent = "View Project";
  
      const dateEl = document.createElement('p');
      dateEl.className = "text-xs text-gray-500 dark:text-gray-400";
      if (project.date) {
        dateEl.textContent = `Date: ${project.date}`;
      }
  
      const imgContainer = document.createElement('div');
      imgContainer.className = "mt-2 flex flex-wrap gap-2";
      if (project.images && project.images.length > 0) {
        project.images.forEach((src) => {
          const img = document.createElement('img');
          img.src = src;
          img.alt = project.title;
          img.loading = "lazy";
          img.className = "h-20 w-auto object-contain";
          imgContainer.appendChild(img);
        });
      }
  
      card.appendChild(title);
      card.appendChild(desc);
      card.appendChild(link);
      card.appendChild(dateEl);
      card.appendChild(imgContainer);
  
      container.appendChild(card);
    });
  }
  
  function populatePublications(publications) {
    const container = document.getElementById('publications-list');
    if (!container || !publications) return;
    publications.forEach((pub) => {
      const card = document.createElement('div');
      card.className = createClassyCard();
  
      const title = document.createElement('h3');
      title.className = "font-heading text-xl mb-2 text-gray-900 dark:text-gray-100";
      title.textContent = pub.title;
  
      const conf = document.createElement('p');
      conf.className = "text-sm text-gray-600 dark:text-gray-400 italic mb-2";
      conf.textContent = `Conference: ${pub.conference}`;
  
      const link = document.createElement('a');
      link.className = "text-sm text-gold underline inline-block mb-2";
      link.href = pub.link;
      link.target = "_blank";
      link.textContent = "View Publication";
  
      const imgContainer = document.createElement('div');
      imgContainer.className = "mt-2 flex flex-wrap gap-2";
      if (pub.images && pub.images.length > 0) {
        pub.images.forEach((src) => {
          const img = document.createElement('img');
          img.src = src;
          img.alt = pub.title;
          img.loading = "lazy";
          img.className = "h-16 w-auto object-contain";
          imgContainer.appendChild(img);
        });
      }
  
      card.appendChild(title);
      card.appendChild(conf);
      card.appendChild(link);
      card.appendChild(imgContainer);
      container.appendChild(card);
    });
  }
  
  function populateCertificates(certificates) {
    const container = document.getElementById('certificates-container');
    if (!container || !certificates) return;
    certificates.forEach((cert) => {
      const card = document.createElement('div');
      card.className = createClassyCard();
  
      const title = document.createElement('h3');
      title.className = "font-heading text-xl mb-1 text-gray-900 dark:text-gray-100";
      title.textContent = cert.title;
  
      const issuer = document.createElement('p');
      issuer.className = "text-sm italic text-gray-700 dark:text-gray-300 mb-1";
      issuer.textContent = `Issuer: ${cert.issuer}`;
  
      const date = document.createElement('p');
      date.className = "text-xs text-gray-500 dark:text-gray-400 mb-2";
      if (cert.date) {
        date.textContent = `Date: ${cert.date}`;
      }
  
      const link = document.createElement('a');
      link.className = "text-sm text-gold underline";
      link.href = cert.url;
      link.target = "_blank";
      link.textContent = "View Certificate";
  
      const imgContainer = document.createElement('div');
      imgContainer.className = "mt-2 flex flex-wrap gap-2";
      if (cert.images && cert.images.length > 0) {
        cert.images.forEach((src) => {
          const img = document.createElement('img');
          img.src = src;
          img.alt = cert.title;
          img.loading = "lazy";
          img.className = "h-16 w-auto object-contain";
          imgContainer.appendChild(img);
        });
      }
  
      card.appendChild(title);
      card.appendChild(issuer);
      card.appendChild(date);
      card.appendChild(link);
      card.appendChild(imgContainer);
  
      container.appendChild(card);
    });
  }
  
  function populateEducation(educationList) {
    const container = document.getElementById('education-list');
    if (!container || !educationList) return;
    educationList.forEach((edu) => {
      const card = document.createElement('div');
      card.className = createClassyCard();
  
      const degree = document.createElement('h3');
      degree.className = "font-heading text-xl mb-2 text-gray-900 dark:text-gray-100";
      degree.textContent = edu.degree;
  
      const institution = document.createElement('p');
      institution.className = "text-sm text-gray-700 dark:text-gray-300 mb-2";
      institution.textContent = edu.institution;
  
      const imgContainer = document.createElement('div');
      imgContainer.className = "mt-2 flex flex-wrap gap-2";
      if (edu.images && edu.images.length > 0) {
        edu.images.forEach((src) => {
          const img = document.createElement('img');
          img.src = src;
          img.alt = edu.degree;
          img.loading = "lazy";
          img.className = "h-16 w-auto object-contain";
          imgContainer.appendChild(img);
        });
      }
  
      card.appendChild(degree);
      card.appendChild(institution);
      card.appendChild(imgContainer);
  
      container.appendChild(card);
    });
  }
  
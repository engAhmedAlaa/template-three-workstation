// Global Variables
// Theme element
const themeElement = document.querySelector('.theme');
// Theme button
const themeButton = themeElement.querySelector('.theme-button');

// Dropdown Trigger
const dropdownTrigger = document.querySelector('.dropdown-trigger');
// Dropdown Menu
const dropdownMenu = document.querySelector('.dropdown-menu');

// Links
const links = [
  ...document.querySelectorAll('.nav-bar .main-link'),
  ...dropdownMenu.querySelectorAll('.dropdown-link'),
];

// sections
const sections = [...document.querySelectorAll('section[data-nav]')];

// Begin scroll button
const beginScrollButton = document.querySelector('.begin-scroll-button');

// // Scroll To Top Button
// const toTopButton = document.querySelector('span.up');

// Main Function
// Get theme
function getTheme() {
  const activeTheme = localStorage.getItem('theme');
  const initialTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';

  if (localStorage.getItem('theme')) return activeTheme;

  return initialTheme;
}

// Apply theme
function applyTheme(theme) {
  localStorage.setItem('theme', theme);
  const htmlElement = document.documentElement;
  const metaTheme = document
    .getElementsByTagName('meta')
    .namedItem('theme-color');
  themeElement.setAttribute('data-theme', theme);

  if (theme === 'dark') {
    htmlElement.classList.add('dark');
    metaTheme.content = '#202125';
  } else {
    htmlElement.classList.remove('dark');
    metaTheme.content = '#ffffff';
  }
}
applyTheme(getTheme());

// Toggle theme
function toggleTheme() {
  const newState =
    themeElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(newState);
}

// Function Add Close Class NavBar Menu
function addClosedClass() {
  dropdownMenu.classList.add('closed');
}

// Open Dropdown Menu
function openDropdownMenu() {
  dropdownMenu.removeEventListener('animationend', addClosedClass);
  dropdownTrigger.setAttribute('data-state', 'open');
  dropdownTrigger.setAttribute('aria-expanded', 'true');
  dropdownMenu.setAttribute('data-state', 'open');
  dropdownMenu.classList.remove('closed');
}

// Close Dropdown Menu
function closeDropdownMenu() {
  dropdownTrigger.setAttribute('data-state', 'closed');
  dropdownTrigger.setAttribute('aria-expanded', 'false');
  dropdownMenu.setAttribute('data-state', 'closed');
  dropdownMenu.addEventListener('animationend', addClosedClass, {
    once: true,
  });
}

// Function Add Active State To Nav Links On Section Appearing
function activateNavLinks() {
  sections.forEach((section) => {
    const halfScreen = window.innerHeight * 0.5;
    const isVisible =
      section.getBoundingClientRect().top < halfScreen &&
      section.getBoundingClientRect().bottom > halfScreen;
    const link = links.find(
      (link) =>
        link.getAttribute('data-nav') === section.getAttribute('data-nav')
    );
    if (isVisible) link.setAttribute('data-state', 'active');
    else link.setAttribute('data-state', 'inactive');
  });
}
activateNavLinks();

// Function Beginning Scroll
function beginScroll(event) {
  event.preventDefault();
  const articlesSection = document.getElementById('articles');
  articlesSection.scrollIntoView();
}

// // Scroll To Specific Section
// function scrollToSection(link) {
//   link.preventDefault();
//   if (link.target.dataset.nav !== undefined) {
//     const sectionToGo = document.getElementById(`${link.target.dataset.nav}`);
//     sectionToGo.scrollIntoView();
//   }
// }

// // Adding Active Class To Section In View
// function animateOnView() {
//   for (const section of sections) {
//     if (
//       section.getBoundingClientRect().top <= 200 &&
//       section.getBoundingClientRect().bottom >= 200
//     ) {
//       section.classList.add('active');
//     } else {
//       section.classList.remove('active');
//     }
//   }
// }

// // Showing And Hidding The Scroll To Top Button
// function scrollToTopControl() {
//   if (window.scrollY >= 1000) {
//     toTopButton.classList.add('show');
//   } else {
//     toTopButton.classList.remove('show');
//   }
// }

// Events
// Toggle Themes On Clicking
themeButton.addEventListener('click', toggleTheme);

// Event To Open And Close Dropdown Menu on Clicking
dropdownTrigger.addEventListener('click', () => {
  if (dropdownMenu.getAttribute('data-state') === 'closed') openDropdownMenu();
  else closeDropdownMenu();
});

document.addEventListener('click', function (event) {
  if (
    dropdownMenu.getAttribute('data-state') === 'open' &&
    !dropdownMenu.contains(event.target) &&
    !dropdownTrigger.contains(event.target)
  ) {
    closeDropdownMenu();
  }
});

links.forEach((link) =>
  link.addEventListener('click', (event) => {
    event.preventDefault();
    if (dropdownMenu.getAttribute('data-state') === 'open') closeDropdownMenu();
    const section = sections.find(
      (section) =>
        section.getAttribute('data-nav') === link.getAttribute('data-nav')
    );
    section.scrollIntoView();
  })
);

// Event Adding Active State To Nav Links On Section Appearing
window.addEventListener('scroll', activateNavLinks);

// Event Beginning Scroll
beginScrollButton.addEventListener('click', beginScroll);

// // Scroll To Specific Section On Clicking
// navBar.addEventListener('click', (link) => {
//   scrollToSection(link);
// });

// toggleButton.addEventListener('click', () => {
//   popUpMenu.classList.toggle('toggled');
//   toggleButton.classList.toggle('toggled');
// });

// // Event Showing and Hidding The Scroll To Top Button
// window.onscroll = () => {
//   animateOnView();
//   scrollToTopControl();
// };

// // Scrolling to Top On Clicking
// toTopButton.addEventListener('click', () => {
//   window.scrollTo({ top: 0 });
// });

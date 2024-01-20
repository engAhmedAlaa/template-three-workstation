// Global Variables
// Theme element
const themeElement = document.querySelector('.theme');
// Theme button
const themeButton = themeElement.querySelector('.theme-button');

// Dropdown
const dropdown = document.querySelector('.dropdown');
// Dropdown Trigger
const dropdownTrigger = dropdown.querySelector('.dropdown-trigger');
// Dropdown Menu
const dropdownMenu = dropdown.querySelector('.dropdown-menu');
// Dropdown Links
const dropdownLinks = dropdownMenu.querySelectorAll('.dropdown-link');

// sections
const sections = [...document.querySelectorAll('section[data-state]')];

let dropdownTimeoutId;

// // Toggle Button
// const toggleButton = document.querySelector('.main-header .toggle-button');

// // Navbar Menu
// const navBar = document.querySelector('.nav-bar');

// // Popup Menu
// const popUpMenu = document.getElementById('pop-up');

// // All Sections
// const sections = document.querySelectorAll('section');

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

// Open Dropdown Menu
function openDropdownMenu() {
  clearTimeout(dropdownTimeoutId);
  // dropdownTrigger.setAttribute('data-state', 'open');
  dropdownTrigger.setAttribute('aria-expanded', 'true');
  // dropdownMenu.setAttribute('data-state', 'open');
  dropdown.setAttribute('data-state', 'open');
  dropdownMenu.classList.remove('closed');
}

// Close Dropdown Menu
function closeDropdownMenu() {
  // dropdownTrigger.setAttribute('data-state', 'closed');
  dropdownTrigger.setAttribute('aria-expanded', 'false');
  // dropdownMenu.setAttribute('data-state', 'closed');
  dropdown.setAttribute('data-state', 'closed');
  dropdownTimeoutId = setTimeout(() => {
    dropdownMenu.classList.add('closed');
  }, 350);
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
  if (dropdown.getAttribute('data-state') === 'closed') openDropdownMenu();
  else closeDropdownMenu();
});

dropdownLinks.forEach((link) =>
  link.addEventListener('click', (event) => {
    event.preventDefault();
    closeDropdownMenu();
    const section = sections.find(
      (section) => section.id === link.getAttribute('data-state')
    );
    section.scrollIntoView();
  })
);

document.addEventListener('click', function (event) {
  if (
    dropdown.getAttribute('data-state') === 'open' &&
    !dropdown.contains(event.target)
  ) {
    closeDropdownMenu();
  }
});

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

const nextNav = document.querySelector('.converter .nav_btn');
const beforeNav = document.querySelector('.practice .nav_btn');
// const dropdownMenu = document.querySelector('.dropdown_menu');

const container = document.querySelector('.container');

nextNav.addEventListener('click', (e) => {
  // dropdownMenu.classList.toggle('active');
  // nextNav.classList.toggle('active');
  container.style.transform = 'translateX(-600px)';
  error();
});
beforeNav.addEventListener('click', (e) => {
  container.style.transform = 'translateX(0px)';
});

// Praticar
// const practiceBtn = document.querySelector('#practice_mode');

// practiceBtn.addEventListener('click', (e) => {
//   dropdownMenu.classList.remove('active');
//   nextNav.classList.remove('active');

//   // bg.style.background = '#b30';

//   container.style.transform = 'translateX(-600px)';
// });

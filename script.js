const dropdownBtn = document.querySelector('.dropdown_btn');
const dropdownMenu = document.querySelector('.dropdown_menu');

dropdownBtn.addEventListener('click', (e) => {
  dropdownMenu.classList.toggle('active');
  dropdownBtn.classList.toggle('active');
});

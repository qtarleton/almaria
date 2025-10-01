document.addEventListener('DOMContentLoaded', () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll('.navbar-burger'),
    0
  );

  // Add a click event on each of them
  $navbarBurgers.forEach((el) => {
    el.addEventListener('click', () => {
      // Get the target from the "data-target" attribute
      const target = el.dataset.target;
      const $target = document.getElementById(target);

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      el.classList.toggle('is-active');
      $target.classList.toggle('is-active');
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const navMenu = document.getElementById('navbarBasicExample'); // Or your menu's ID/class
  const navBurger = document.querySelector('.navbar-burger');
  const navLinks = document.querySelectorAll('.navbar-item'); // Or your menu links

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-active'); // Or toggle a style like display:none
      navBurger.classList.remove('is-active');
    });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('nav'); // Or your specific header selector
  const headerHeight = header.offsetHeight;

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const targetPosition = targetElement.offsetTop;
        const offsetPosition = targetPosition - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    });
  });
});

//Contact Form

const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  result.innerHTML = 'Please wait...';

  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: json,
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        result.innerHTML = json.message;
      } else {
        console.log(response);
        result.innerHTML = json.message;
      }
    })
    .catch((error) => {
      console.log(error);
      result.innerHTML = 'Something went wrong!';
    })
    .then(function () {
      form.reset();
      setTimeout(() => {
        result.style.display = 'none';
      }, 3000);
    });
});

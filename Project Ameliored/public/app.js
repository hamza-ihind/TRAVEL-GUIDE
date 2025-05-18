
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => navLinks.classList.toggle('show'));


function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}


const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const modalClose = document.getElementById('modal-close');
modalClose.addEventListener('click', () => modal.style.display = 'none');
window.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none'; });


let toursData = [];
fetch('../data/tours.json')
  .then(res => {
    if (!res.ok) throw new Error('Network response was not ok');
    return res.json();
  })
  .then(data => {
    toursData = data;
    renderTours(data);
    populateSelect(data);
  })
  .catch(err => console.error('Fetch error:', err));

function renderTours(tours) {
  const container = document.getElementById('tour-container');
  container.innerHTML = '';
  tours.forEach(t => {
    const card = document.createElement('div');
    card.className = 'tour-card';
    card.innerHTML = `
      <img src="${t.image}" alt="${t.title}">
      <div class="tour-card-content">
        <h3>${t.title}</h3>
        <p>${t.description}</p>
        <p><strong>Duration:</strong> ${t.duration}</p>
        <p><strong>Price:</strong> ${t.price}</p>
        <button data-id="${t.id}">Details</button>
      </div>
    `;
    const btn = card.querySelector('button');
    btn.addEventListener('click', () => openModal(t.id));
    container.appendChild(card);
  });
}

function populateSelect(tours) {
  const select = document.querySelector('#booking-form select');
  tours.forEach(t => {
    const opt = document.createElement('option');
    opt.value = t.id;
    opt.textContent = t.title;
    select.appendChild(opt);
  });
}

function openModal(id) {
  const tour = toursData.find(t => t.id === id);
  if (!tour) return;
  modalBody.innerHTML = `
    <h2>${tour.title}</h2>
    <img src="${tour.image}" alt="${tour.title}" style="width:100%;margin-bottom:1rem;">
    <p>${tour.description}</p>
    <p><strong>Duration:</strong> ${tour.duration}</p>
    <p><strong>Price:</strong> ${tour.price}</p>
  `;
  modal.style.display = 'flex';
}

document.getElementById('booking-form').addEventListener('submit', e => {
  e.preventDefault();
  document.getElementById('booking-message').textContent = 'Thank you! Your reservation is confirmed.';
});
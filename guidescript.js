const menuItems = document.querySelectorAll(".lmenu-item");
const submenus = document.querySelectorAll(".submenu");
const menuImage = document.getElementById("menuImage");
const carouselWrapper = document.getElementById("carouselWrapper");

menuItems.forEach(item => {
  item.addEventListener("click", () => {
    // highlight left menu
    menuItems.forEach(i => i.classList.remove("active"));
    item.classList.add("active");

    // toggle submenu
    const target = item.dataset.menu;
    let anyActive = false;

    submenus.forEach(menu => {
      if (menu.id === target) {
        menu.classList.toggle("active");
        if (menu.classList.contains("active")) anyActive = true;
      } else {
        menu.classList.remove("active");
      }
    });

    // hide/show menu image & carousel
    if (anyActive) {
      menuImage.classList.add("hidden");
      carouselWrapper.classList.add("hidden");
    } else {
      menuImage.classList.remove("hidden");
      carouselWrapper.classList.remove("hidden");
    }
  });
});

// click outside → reset
document.addEventListener("click", (e) => {
  if (!document.getElementById("menuWrapper").contains(e.target)) {
    menuItems.forEach(i => i.classList.remove("active"));
    submenus.forEach(menu => menu.classList.remove("active"));

    menuImage.classList.remove("hidden");
    carouselWrapper.classList.remove("hidden");
  }
});

// click outside → reset everything
document.addEventListener("click", (e) => {
  if (!document.getElementById("menuWrapper").contains(e.target)) {

    // remove active states
    menuItems.forEach(i => i.classList.remove("active"));
    submenus.forEach(menu => menu.classList.remove("active"));

    // show menu image and carousel
    menuImage.classList.remove("hidden");
    carouselWrapper.classList.remove("hidden");
  }
});


const data = [
  // Domestic
  "Shanghai", "Beijing", "Chengdu", "Hangzhou", "West Lake", "Great Wall",

  // Asia
  "Bangkok", "Bali", "Tokyo", "Seoul", "Kuala Lumpur",

  // Europe
  "Paris", "London", "Rome", "Barcelona", "Florence"
];

const input = document.getElementById("searchInput");
const resultsBox = document.getElementById("searchResults");

input.addEventListener("input", () => {
  const value = input.value.toLowerCase();
  resultsBox.innerHTML = "";

  if (!value) {
    resultsBox.style.display = "none";
    return;
  }

  const matches = data.filter(item =>
    item.toLowerCase().includes(value)
  );

  if (matches.length === 0) {
    resultsBox.innerHTML = "<div>No results found</div>";
  } else {
    matches.forEach(item => {
      const div = document.createElement("div");
      div.textContent = item;
      div.onclick = () => {
        alert("You selected: " + item);
        resultsBox.style.display = "none";
        input.value = item;
      };
      resultsBox.appendChild(div);
    });
  }

  resultsBox.style.display = "block";
});

// click outside → close results
document.addEventListener("click", e => {
  if (!e.target.closest(".search-wrapper")) {
    resultsBox.style.display = "none";
  }
});
const track = document.getElementById('carousel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;
const cards = track.children.length;
const visibleCards = 3; // change to 1 on mobile for responsiveness

function updateCarousel() {
  const cardWidth = track.children[0].offsetWidth + 15; // card width + gap
  track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
});

nextBtn.addEventListener('click', () => {
  if (currentIndex < cards - visibleCards) {
    currentIndex++;
    updateCarousel();
  }
});

const cardsPerPage = 5;
const section = document.querySelector(".travel-section");
const travelcards = Array.from(section.querySelectorAll(".travel-link"));
const pagination = document.getElementById("pagination");
const pageButtons = pagination.querySelectorAll("button");

function showPage(page) {
  travelcards.forEach((card, index) => {
    const start = (page - 1) * cardsPerPage;
    const end = page * cardsPerPage;

    card.style.display =
      index >= start && index < end ? "block" : "none";
  });

  // active class
  pageButtons.forEach(btn => btn.classList.remove("active"));
  pagination
    .querySelector(`button[data-page="${page}"]`)
    .classList.add("active");

  section.scrollIntoView({ behavior: "smooth" });
}

// click events
pageButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const page = Number(btn.dataset.page);
    showPage(page);
  });
});

// init
showPage(1);

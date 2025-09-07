// function for load categories section
const loadCategories = () => {
  const url = "https://openapi.programming-hero.com/api/categories";
  fetch(url)
    .then(res => res.json())
    .then(data => {
      displayCategories(data.categories);
    })
}

// function for display categories section
const displayCategories = (categories) => {
  // get the parent
  const categoryContainer = document.getElementById('category-container');

  categories.forEach(category => {
    // create an element
    const p = document.createElement('p');
    p.className = `common-p category-name-plate-${category.id} py-2 px-[10px] rounded-[4px] hover:bg-[#15803D] hover:text-white cursor-pointer`;
    p.innerText = `${category.category_name}`;

    // append the element to the parent
    categoryContainer.appendChild(p);

    loadTreeCards(`${category.id}`);
  })
}

// function for load tree cards
const loadTreeCards = (id) => {
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const categoryContainer = document.getElementById('category-container');
      categoryContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains(`category-name-plate-${id}`)) {
          const commonP = document.querySelectorAll('.common-p');

          commonP.forEach(p => {
            p.classList.remove('bg-[#15803D]', 'text-white');
          })

          event.target.classList.add("bg-[#15803D]", "text-white");
          displayTreeCards(data.plants);
        }
      })
    })
}

// function for display tree cards
const displayTreeCards = (cards) => {
  const cardsContainer = document.getElementById('cards-container');
  cardsContainer.innerHTML = "";

  cards.forEach(card => {
    const div = document.createElement('div');
    div.className = "p-4 bg-white rounded-lg shadow-sm";

    div.innerHTML = `
            <img class="rounded-lg" src="${card.image}" alt="">
            <h3 onclick="loadModal(${card.id})" class="card-name-${card.id} text-[14px] font-semibold mt-3">${card.name}</h3>
            <p class="text-[12px] text-[#1F2937] my-2">${card.description}</p>
            <div class="flex justify-between items-center mb-3">
              <div class="py-1 px-3 bg-[#dcfce7] rounded-[400px]">
                <p class="text-[14px] text-[#15803d]">${card.category}</p>
              </div>
              <p class="text-[14px] font-semibold">৳<span>${card.price}</span></p>
            </div>
            <button class="py-3 px-5 font-medium text-white bg-[#15803D] rounded-full w-full">Add to Cart</button>
    `
    cardsContainer.appendChild(div);
  })
}

// function for load modal data
const loadModal = (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      displayModal(data.plants);
    })
}

// function for display modal
const displayModal = (plantsDetails) => {
  const cardDetailsContainer = document.getElementById('card-details-container');

  cardDetailsContainer.innerHTML = `
          <h1 class="text-2xl font-bold">${plantsDetails.name}</h1>
          <img src="${plantsDetails.image}" alt="">
          <p><span class="font-bold">Category:</span> ${plantsDetails.category}</p>
          <p><span class="font-bold">Price:</span> ৳${plantsDetails.price}</p>
          <p><span class="font-bold">Description:</span> ${plantsDetails.description}</p>
  `
  my_modal_5.showModal();
}

// function for display all tree cards
const allTreeCards = () => {
  const url = "https://openapi.programming-hero.com/api/plants";
  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data.plants);
      displayTreeCards(data.plants);
    })
}

allTreeCards();

loadCategories();
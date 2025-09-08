let cartList = [];

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
// const loadTreeCards = (id) => {

//   const url = `https://openapi.programming-hero.com/api/category/${id}`;
//   fetch(url)
//     .then(res => res.json())
//     .then(data => {
//       const categoryContainer = document.getElementById('category-container');
//       categoryContainer.addEventListener('click', function (event) {
//         if (event.target.classList.contains(`category-name-plate-${id}`)) {
//           const commonP = document.querySelectorAll('.common-p');
//           commonP.forEach(p => {
//             p.classList.remove('bg-[#15803D]', 'text-white');
//           })

//           event.target.classList.add("bg-[#15803D]", "text-white");
//           displayTreeCards(data.plants);
//         }
//       })
//     })
// }

const loadTreeCards = (id) => {

  // const url = `https://openapi.programming-hero.com/api/category/${id}`;
  // fetch(url)
  //   .then(res => res.json())
  //   .then(data => {
  const categoryContainer = document.getElementById('category-container');
  categoryContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains(`category-name-plate-${id}`)) {
      manageSpinner(true);
      const commonP = document.querySelectorAll('.common-p');
      commonP.forEach(p => {
        p.classList.remove('bg-[#15803D]', 'text-white');
      })

      event.target.classList.add("bg-[#15803D]", "text-white");

      const url = `https://openapi.programming-hero.com/api/category/${id}`;

      fetch(url)
        .then(res => res.json())
        .then(data => {
          displayTreeCards(data.plants);
        })
    }
  })
  // })
}

// function for display tree cards
const displayTreeCards = (cards) => {
  const cardsContainer = document.getElementById('cards-container');
  cardsContainer.innerHTML = "";

  cards.forEach(card => {
    const div = document.createElement('div');
    div.className = "p-4 bg-white rounded-lg shadow-sm flex flex-col justify-between";

    div.innerHTML = `
            <div>
              <img class="rounded-lg h-[300px] w-full" src="${card.image}" alt="">
              <span onclick="loadModal(${card.id})" class="card-name-${card.id} text-[14px] font-semibold mt-3 cursor-pointer">${card.name}</span>
              <p class="text-[12px] text-[#1F2937] my-2">${card.description}</p>
              <div class="flex justify-between items-center mb-3">
                <div class="py-1 px-3 bg-[#dcfce7] rounded-[400px]">
                  <p class="text-[14px] text-[#15803d]">${card.category}</p>
                </div>
                <p class="text-[14px] font-semibold">৳<span>${card.price}</span></p>
              </div>
            </div>

            <div>
              <button onclick="loadCartBtn(${card.id})" class="cart-btn-${card.id} py-3 px-5 font-medium text-white bg-[#15803D] rounded-full w-full cursor-pointer">Add to Cart</button>
            </div>
            
    `
    cardsContainer.appendChild(div);
  })
  manageSpinner(false);
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
          <img class="h-[300px] w-full" src="${plantsDetails.image}" alt="">
          <p><span class="font-bold">Category:</span> ${plantsDetails.category}</p>
          <p><span class="font-bold">Price:</span> ৳${plantsDetails.price}</p>
          <p><span class="font-bold">Description:</span> ${plantsDetails.description}</p>
  `
  my_modal_5.showModal();
}

// function for display all tree cards
const allTreeCards = () => {
  manageSpinner(true);
  const url = "https://openapi.programming-hero.com/api/plants";
  fetch(url)
    .then(res => res.json())
    .then(data => {
      displayTreeCards(data.plants);
    })
}

const loadCartBtn = (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      displayCart(data.plants);
    })
}

const displayCart = (cartDetails) => {
  alert(`${cartDetails.name} has been added to the cart.`);

  const cartCardsContainer = document.getElementById('cart-cards-container');
  cartCardsContainer.innerHTML += `
    <div id="cartParent-${cartDetails.id}" class="bg-[#f0fdf4] py-2 px-3 rounded-lg">
              <div class="flex justify-between items-center">
                <div>
                  <h3 class="text-[14px] font-semibold">${cartDetails.name}</h3>
                  <p class="text-[#8b9798]">৳<span>${cartDetails.price}</span></p>
                </div>
                <i id="${cartDetails.id}" onclick="loadPriceDeduct(${cartDetails.id})" class="delete-btn-${cartDetails.id} fa-solid fa-xmark cursor-pointer"></i>
              </div>
            </div>
  `

  cartList.push({
    id: `${cartDetails.id}`,
    name: `${cartDetails.name}`,
    price: `${cartDetails.price}`,
  })

  const totalAmount = document.getElementById('total-amount').innerText;
  let totalAmountNumber = Number(totalAmount);
  let productPrice = Number(`${cartDetails.price}`);

  totalAmountNumber = totalAmountNumber + productPrice;
  document.getElementById('total-amount').innerText = totalAmountNumber;
}

const loadPriceDeduct = (id) => {
  const cartCardsContainer = document.getElementById('cart-cards-container');

  const cartParent = document.getElementById(`cartParent-${id}`);

  if (cartParent) {
    cartCardsContainer.removeChild(cartParent);

    const totalAmount = document.getElementById('total-amount').innerText;
    let totalAmountNumber = Number(totalAmount);

    let productPrice = 0;

    cartList.forEach(item => {
      if (Number(item.id) === id) {
        productPrice = Number(item.price);
      }
    })

    totalAmountNumber = totalAmountNumber - productPrice;
    document.getElementById('total-amount').innerText = totalAmountNumber;
  }
  //  cartList = cartList.find(item => Number(item.id) !== id);
}

// function for managing the spinner
const manageSpinner = (value) => {
  const cardsContainer = document.getElementById('cards-container');
  const spinner = document.getElementById('spinner');
  if (value === true) {
    cardsContainer.classList.add('hidden');
    spinner.classList.remove('hidden');
  }
  else {
    cardsContainer.classList.remove('hidden');
    spinner.classList.add('hidden');
  }
}


allTreeCards();

loadCategories();
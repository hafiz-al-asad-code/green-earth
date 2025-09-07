const loadCategories = () => {
  const url = "https://openapi.programming-hero.com/api/categories";
  fetch(url)
    .then(res => res.json())
    .then(data => {
      displayCategories(data.categories);
    })
}

const displayCategories = (categories) => {
  // get the parent
  const categoryContainer = document.getElementById('category-container');

  categories.forEach(category => {
    // create an element
    const p = document.createElement('p');
    p.className = "py-2 px-[10px] rounded-[4px] hover:bg-[#15803D] hover:text-white cursor-pointer";
    p.innerText = `${category.category_name}`;

    // append the element to the parent
    categoryContainer.appendChild(p);
  })
}

loadCategories();
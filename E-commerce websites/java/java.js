localStorage.removeItem("products");

let products = JSON.parse(localStorage.getItem("products")) || [
  {
    name: "Phone",
    price: 300,
    category: "electronics",
    image: "images/products/phone.jpg",
    description: "Smartphone with high-resolution display and fast performance"
  },
  {
    name: "Laptop",
    price: 800,
    category: "electronics",
    image: "images/products/laptop.jpg",
    description: "Powerful laptop suitable for work, study, and gaming"
  },
  {
    name: "Headphones",
    price: 60,
    category: "electronics",
    image: "images/products/headphones.jpg",
    description: "Noise-cancelling over-ear headphones with clear sound"
  },
  {
    name: "Smart Watch",
    price: 120,
    category: "electronics",
    image: "images/products/watch.jpg",
    description: "Fitness smart watch with heart-rate and activity tracking"
  },
  {
    name: "Camera",
    price: 500,
    category: "electronics",
    image: "images/products/camera.jpg",
    description: "High-quality digital camera for photography lovers"
  },

  {
    name: "Shoes",
    price: 40,
    category: "fashion",
    image: "images/products/shoes.jpg",
    description: "Comfortable everyday shoes for casual wear"
  },
  {
    name: "Jacket",
    price: 90,
    category: "fashion",
    image: "images/products/jacket.jpg",
    description: "Warm winter jacket with modern design"
  },
  {
    name: "T-Shirt",
    price: 20,
    category: "fashion",
    image: "images/products/tshirt.jpg",
    description: "Cotton t-shirt with soft fabric and perfect fit"
  },
  {
    name: "Jeans",
    price: 50,
    category: "fashion",
    image: "images/products/jeans.jpg",
    description: "Stylish blue jeans for daily use"
  },
  {
    name: "Cap",
    price: 15,
    category: "fashion",
    image: "images/products/cap.jpg",
    description: "Adjustable cap for outdoor and casual use"
  },

  {
    name: "Backpack",
    price: 55,
    category: "accessories",
    image: "images/products/backpack.jpg",
    description: "Durable backpack with multiple storage compartments"
  },
  {
    name: "Wallet",
    price: 25,
    category: "accessories",
    image: "images/products/wallet.jpg",
    description: "Leather wallet with premium finish"
  },
  {
    name: "Sunglasses",
    price: 35,
    category: "accessories",
    image: "images/products/sunglasses.jpg",
    description: "UV-protected sunglasses with stylish frame"
  },
  {
    name: "Belt",
    price: 18,
    category: "accessories",
    image: "images/products/belt.jpg",
    description: "Classic belt suitable for formal and casual outfits"
  },
  {
    name: "Watch",
    price: 150,
    category: "accessories",
    image: "images/products/watch2.jpg",
    description: "Luxury analog watch with metal strap"
  },

  {
    name: "Chair",
    price: 110,
    category: "home",
    image: "images/products/chair.jpg",
    description: "Comfortable chair for home and office use"
  },
  {
    name: "Table",
    price: 200,
    category: "home",
    image: "images/products/table.jpg",
    description: "Wooden table with strong and durable build"
  },
  {
    name: "Lamp",
    price: 45,
    category: "home",
    image: "images/products/lamp.jpg",
    description: "Modern LED lamp for bedroom and study"
  },
  {
    name: "Curtains",
    price: 60,
    category: "home",
    image: "images/products/curtains.jpg",
    description: "Premium curtains with elegant design"
  },
  {
    name: "Sofa",
    price: 600,
    category: "home",
    image: "images/products/sofa.jpg",
    description: "Comfortable sofa with soft cushions"
  }
];
function displayProducts(list) {
  if (!productList) return;

  productList.innerHTML = "";

  list.forEach(p => {
    const imgSrc = p.image || "images/products/default.jpg";
    const desc = p.description || "No description available";

    productList.innerHTML += `
      <div class="product">
        <img src="${imgSrc}" alt="${p.name}">
        <h4>${p.name}</h4>
        <p>${desc}</p>
        <p>$${p.price}</p>
        <button onclick="addToCart('${p.name}', ${p.price})">Add to Cart</button>
      </div>
    `;
  });
}

localStorage.setItem("products", JSON.stringify(products));
const productList = document.getElementById("productList");
const search = document.getElementById("search");
const categoryFilter = document.getElementById("categoryFilter");
const priceFilter = document.getElementById("priceFilter");

function displayProducts(list) {
  if (!productList) return;
  productList.innerHTML = list.map(p => `
      <div class="product">
        <img src="${p.image}">
        <h4>${p.name}</h4>
        <p>$${p.price}</p>
        <button onclick="addToCart('${p.name}', ${p.price})">Add to Cart</button>
      </div>
    `).join("");
}

function filterProducts() {
  let filtered = products.filter(p => {
    // Gracefully handle cases where filter elements are not on the page
    let searchMatch = !search || p.name.toLowerCase().includes(search.value.toLowerCase());
    let categoryMatch = !categoryFilter || categoryFilter.value === "all" || p.category === categoryFilter.value;
    let priceMatch =
      !priceFilter || priceFilter.value === "all" ||
      (priceFilter.value === "low" && p.price < 50) ||
      (priceFilter.value === "high" && p.price >= 50);

    return searchMatch && categoryMatch && priceMatch;
  });

  displayProducts(filtered);
}
// Add event listeners only if the elements exist
if (search) search.addEventListener("input", filterProducts);
if (categoryFilter) categoryFilter.addEventListener("change", filterProducts);
if (priceFilter) priceFilter.addEventListener("change", filterProducts);

// Initial call to display products based on default filters
filterProducts();
//  This code defines a simple product listing page with search and filter functionality. It creates an array of products, displays them on the page, and allows users to filter them by name, category, and price. The filters are applied in real-time as the user interacts with the search input and dropdowns. 
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
  let item = cart.find(p => p.name === name);
  if (item) {
    item.qty++;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
}

function loadCart() {
  const cartDiv = document.getElementById("cartItems");
  const totalSpan = document.getElementById("total");
  if (!cartDiv || !totalSpan) return;

  let total = 0;

  cartDiv.innerHTML = cart.map((item, index) => {
    total += item.price * item.qty;
    return `
      <div class="cart-item">
        <h4>${item.name}</h4>
        <p>$${item.price}</p>
        <input type="number" value="${item.qty}" min="1"
          onchange="updateQty(${index}, this.value)">
        <button onclick="removeItem(${index})">Remove</button>
      </div>
    `;
  }).join("");

  totalSpan.innerText = total.toFixed(2);
}

function updateQty(index, qty) {
  cart[index].qty = Number(qty);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function addProduct() {
  const name = document.getElementById("pname").value;
  const price = Number(document.getElementById("pprice").value);
  const category = document.getElementById("pcategory").value;

  products.push({ name, price, category, image: "images/products/default.jpg" });
  localStorage.setItem("products", JSON.stringify(products));
  alert("Product added");
}



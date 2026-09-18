// Cart State
let cart = [];
let activeCategory = "all";
let searchQuery = "";
let currentPricingMode = "retail"; // "retail" or "wholesale"

// DOM Elements
const productsGrid = document.getElementById("products-grid");
const categoriesNav = document.getElementById("categories-nav");
const searchInput = document.getElementById("search-input");
const cartBadge = document.getElementById("cart-badge");
const cartSidebar = document.getElementById("cart-sidebar");
const cartOverlay = document.getElementById("cart-overlay");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalAmount = document.getElementById("cart-total-amount");
const reviewsContainer = document.getElementById("reviews-container");

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons();
    renderCategories();
    renderProducts();
    renderReviews();
    loadCartFromStorage();
    setupEventListeners();
});

// Setup Listeners
function setupEventListeners() {
    // Search
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            searchQuery = e.target.value.toLowerCase();
            renderProducts();
        });
    }

    // Pricing Mode Toggle
    const modeRadios = document.querySelectorAll('input[name="pricing-mode"]');
    modeRadios.forEach(radio => {
        radio.addEventListener("change", (e) => {
            currentPricingMode = e.target.value;
            renderProducts();
        });
    });
}

// Render Categories Bar
function renderCategories() {
    if (!categoriesNav) return;
    categoriesNav.innerHTML = STORE_DATA.categories.map(cat => `
        <button onclick="selectCategory('${cat.id}')" 
            class="tab-btn px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${activeCategory === cat.id ? 'active' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'}">
            <i data-lucide="${cat.icon}" class="w-4 h-4"></i>
            <span>${cat.name}</span>
        </button>
    `).join('');
    lucide.createIcons();
}

function selectCategory(catId) {
    activeCategory = catId;
    renderCategories();
    renderProducts();
}

// Render Products
function renderProducts() {
    if (!productsGrid) return;
    
    let filtered = STORE_DATA.products.filter(item => {
        const matchesCat = activeCategory === "all" || item.category === activeCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery);
        return matchesCat && matchesSearch;
    });

    if (filtered.length === 0) {
        productsGrid.innerHTML = `
            <div class="col-span-full py-16 text-center text-slate-500">
                <i data-lucide="package-search" class="w-16 h-16 mx-auto mb-3 text-slate-400"></i>
                <p class="text-lg font-medium">कोणतेही सामान सापडले नाही</p>
                <p class="text-sm">कृपया वेगळा शब्द शोधून पहा किंवा श्रेणी बदला.</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }

    productsGrid.innerHTML = filtered.map(product => {
        const isWholesale = currentPricingMode === "wholesale";
        const unit = isWholesale ? product.wholesaleUnit : product.retailUnit;
        const price = isWholesale ? product.wholesalePrice : product.retailPrice;

        return `
            <div class="product-card bg-white rounded-2xl border border-slate-100 overflow-hidden flex flex-col justify-between p-4 shadow-sm hover:border-orange-200">
                <div class="relative">
                    <div class="w-full h-44 bg-slate-100 rounded-xl overflow-hidden mb-3">
                        <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                    </div>
                    ${product.badge ? `<span class="absolute top-2 left-2 bg-orange-600 text-white text-xs font-semibold px-2.5 py-1 rounded-md shadow-sm">${product.badge}</span>` : ''}
                    <span class="absolute top-2 right-2 bg-emerald-700 text-white text-xs font-medium px-2 py-0.5 rounded shadow">
                        ${isWholesale ? 'होलसेल पॅक' : 'किरकोळ पॅक'}
                    </span>
                </div>

                <div>
                    <h3 class="font-bold text-slate-800 text-base mb-1 line-clamp-1">${product.name}</h3>
                    <p class="text-xs text-slate-500 mb-3 flex items-center gap-1">
                        <i data-lucide="scale" class="w-3.5 h-3.5"></i> पॅकिंग: <strong class="text-slate-700 font-semibold">${unit}</strong>
                    </p>

                    <div class="flex items-baseline justify-between mb-4">
                        <div>
                            <span class="text-xl font-extrabold text-orange-600">₹${price}</span>
                            <span class="text-xs text-slate-400 font-normal">/${unit}</span>
                        </div>
                        <div class="text-right">
                            <span class="text-[11px] text-emerald-600 font-semibold block">स्टॉकमध्ये उपलब्ध</span>
                        </div>
                    </div>
                </div>

                <div class="flex gap-2">
                    <button onclick="addToCart('${product.id}', '${currentPricingMode}')" 
                        class="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow-sm active:scale-95">
                        <i data-lucide="plus-circle" class="w-4 h-4"></i> कार्टमध्ये टाका
                    </button>
                </div>
            </div>
        `;
    }).join('');

    lucide.createIcons();
}

// Render Google 5-Star Reviews
function renderReviews() {
    if (!reviewsContainer) return;

    reviewsContainer.innerHTML = STORE_DATA.reviews.map(rev => `
        <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition">
            <div>
                <div class="flex items-center gap-3 mb-3">
                    <div class="w-12 h-12 rounded-full bg-orange-100 text-orange-600 font-bold flex items-center justify-center text-lg shadow-inner">
                        ${rev.name.charAt(0)}
                    </div>
                    <div>
                        <h4 class="font-bold text-slate-800 text-sm leading-snug">${rev.name}</h4>
                        <div class="flex items-center gap-1 mt-0.5">
                            <div class="flex text-amber-400">
                                ${Array(rev.rating).fill(0).map(() => '<i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400"></i>').join('')}
                            </div>
                            <span class="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">${rev.badge}</span>
                        </div>
                    </div>
                </div>
                <p class="text-slate-600 text-sm leading-relaxed italic">"${rev.text}"</p>
            </div>
            <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span class="flex items-center gap-1"><i data-lucide="check-check" class="w-3.5 h-3.5 text-blue-500"></i> गुगल व्हेरिफाईड</span>
                <span>${rev.date}</span>
            </div>
        </div>
    `).join('');

    lucide.createIcons();
}

// Cart Operations
function addToCart(productId, mode) {
    const product = STORE_DATA.products.find(p => p.id === productId);
    if (!product) return;

    const unit = mode === "wholesale" ? product.wholesaleUnit : product.retailUnit;
    const price = mode === "wholesale" ? product.wholesalePrice : product.retailPrice;
    const cartItemId = `${productId}_${mode}`;

    const existingItem = cart.find(item => item.cartItemId === cartItemId);
    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({
            cartItemId,
            id: product.id,
            name: product.name,
            mode: mode,
            unit: unit,
            price: price,
            qty: 1
        });
    }

    saveCart();
    updateCartUI();
    showToast(`${product.name} (${unit}) कार्टमध्ये जोडले!`);
}

function updateCartQty(cartItemId, delta) {
    const itemIndex = cart.findIndex(item => item.cartItemId === cartItemId);
    if (itemIndex > -1) {
        cart[itemIndex].qty += delta;
        if (cart[itemIndex].qty <= 0) {
            cart.splice(itemIndex, 1);
        }
    }
    saveCart();
    updateCartUI();
}

function updateCartUI() {
    // Total count
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    if (cartBadge) {
        cartBadge.innerText = totalQty;
        cartBadge.classList.toggle("hidden", totalQty === 0);
    }

    // Items list
    if (cartItemsContainer) {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="text-center py-16 text-slate-400">
                    <i data-lucide="shopping-cart" class="w-16 h-16 mx-auto mb-2 opacity-30"></i>
                    <p class="font-medium text-slate-500">तुमची कार्ट रिकामी आहे</p>
                    <p class="text-xs mt-1">दुकानातील वस्तू निवडून कार्टमध्ये टाका.</p>
                </div>
            `;
            if (cartTotalAmount) cartTotalAmount.innerText = "₹0";
            lucide.createIcons();
            return;
        }

        let total = 0;
        cartItemsContainer.innerHTML = cart.map(item => {
            const itemTotal = item.price * item.qty;
            total += itemTotal;
            return `
                <div class="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div class="flex-1 pr-2">
                        <h4 class="font-semibold text-slate-800 text-sm line-clamp-1">${item.name}</h4>
                        <div class="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                            <span>${item.unit}</span>
                            <span>•</span>
                            <span class="font-bold text-orange-600">₹${item.price}</span>
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="flex items-center bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                            <button onclick="updateCartQty('${item.cartItemId}', -1)" class="px-2 py-1 hover:bg-slate-100 text-slate-600 text-sm font-bold">-</button>
                            <span class="px-2.5 py-1 text-xs font-bold text-slate-800">${item.qty}</span>
                            <button onclick="updateCartQty('${item.cartItemId}', 1)" class="px-2 py-1 hover:bg-slate-100 text-slate-600 text-sm font-bold">+</button>
                        </div>
                        <span class="font-bold text-slate-800 text-sm w-16 text-right">₹${itemTotal}</span>
                    </div>
                </div>
            `;
        }).join('');

        if (cartTotalAmount) {
            cartTotalAmount.innerText = `₹${total}`;
        }
    }

    lucide.createIcons();
}

// LocalStorage
function saveCart() {
    localStorage.setItem("om_sai_cart", JSON.stringify(cart));
}

function loadCartFromStorage() {
    try {
        const saved = localStorage.getItem("om_sai_cart");
        if (saved) {
            cart = JSON.parse(saved);
        }
    } catch (e) {
        cart = [];
    }
    updateCartUI();
}

// Toggle Cart Drawer
function toggleCart() {
    if (!cartSidebar || !cartOverlay) return;
    const isOpen = !cartSidebar.classList.contains("translate-x-full");
    if (isOpen) {
        cartSidebar.classList.add("translate-x-full");
        cartOverlay.classList.add("hidden");
    } else {
        cartSidebar.classList.remove("translate-x-full");
        cartOverlay.classList.remove("hidden");
    }
}

// WhatsApp Direct Checkout
function checkoutViaWhatsApp() {
    if (cart.length === 0) {
        alert("कृपया आधी काही वस्तू कार्टमध्ये टाका!");
        return;
    }

    const customerName = document.getElementById("customer-name") ? document.getElementById("customer-name").value.trim() : "";
    const customerAddress = document.getElementById("customer-address") ? document.getElementById("customer-address").value.trim() : "";
    const customerPincode = document.getElementById("customer-pincode") ? document.getElementById("customer-pincode").value.trim() : "413702";

    if (!customerName || !customerAddress) {
        alert("कृपया आपले नाव आणि पत्ता प्रविष्ट करा.");
        return;
    }

    let total = 0;
    let message = `🛒 *नवीन ऑर्डर - ओम साई किराणा स्टोअर्स, बेलवंडी*\n`;
    message += `───────────────────\n`;
    message += `👤 *ग्राहक:* ${customerName}\n`;
    message += `📍 *डिलिव्हरी पत्ता:* ${customerAddress}\n`;
    message += `📮 *पिनकोड:* ${customerPincode}\n`;
    message += `───────────────────\n`;
    message += `📦 *मागवलेले सामान:*\n`;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.qty;
        total += itemTotal;
        message += `${index + 1}. ${item.name} (${item.unit})\n   → ${item.qty} नग x ₹${item.price} = *₹${itemTotal}*\n`;
    });

    message += `───────────────────\n`;
    message += `💰 *एकूण बिल रक्कम: ₹${total}*\n`;
    message += `🚚 *डिलिव्हरी:* बेलवंडी (४१३७०२)\n`;
    message += `💳 *पेमेंट:* कॅश ऑन डिलिव्हरी (COD) / UPI\n`;
    message += `───────────────────\n`;
    message += `कृपया ऑर्डर कन्फर्म करा व सामान पाठवून द्यावे. धन्यवाद!`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${STORE_DATA.info.phone}&text=${encoded}`;
    window.open(whatsappUrl, '_blank');
}

// Toast Notification
function showToast(msg) {
    const toast = document.createElement("div");
    toast.className = "fixed bottom-5 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-5 py-2.5 rounded-full shadow-2xl text-xs sm:text-sm font-medium z-50 transition-all transform duration-300 opacity-0 translate-y-2";
    toast.innerText = msg;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.remove("opacity-0", "translate-y-2");
    }, 10);

    setTimeout(() => {
        toast.classList.add("opacity-0", "translate-y-2");
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

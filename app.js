// Cart State
let cart = [];
let activeCategory = "all";
let searchQuery = "";
// Selected weight selections per product { [productId]: { grams: number, price: number, label: string } }
let productSelections = {};

// Digital Scale Calculator State
let calcPricePerKg = 65;
let calcQty = 500;
let calcUnit = "g"; // "g" or "kg"

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
    initProductSelections();
    renderCategories();
    renderProducts();
    renderReviews();
    loadCartFromStorage();
    setupEventListeners();
    updateDigitalScaleUI();
});

// Initialize default weight selections for all products
function initProductSelections() {
    STORE_DATA.products.forEach(p => {
        const defaultPreset = p.weightPresets ? p.weightPresets[1] || p.weightPresets[0] : { label: "१ किलो", grams: 1000 };
        const price = calculateProductPrice(p, defaultPreset.grams);
        productSelections[p.id] = {
            grams: defaultPreset.grams,
            label: defaultPreset.label,
            price: price
        };
    });
}

// Calculate Price based on Grams or Wholesale Sacks
function calculateProductPrice(product, grams) {
    // Check if preset is wholesale sack
    const preset = product.weightPresets ? product.weightPresets.find(w => w.grams === grams) : null;
    if (preset && preset.isWholesale && product.wholesalePrice) {
        return product.wholesalePrice;
    }
    // Weight-based exact price logic (Digital Scale Logic)
    const pricePerGram = product.pricePerKg / 1000;
    return Math.round(pricePerGram * grams);
}

// Setup Listeners
function setupEventListeners() {
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            searchQuery = e.target.value.toLowerCase();
            renderProducts();
        });
    }
}

// Render Categories Bar
function renderCategories() {
    if (!categoriesNav) return;
    categoriesNav.innerHTML = STORE_DATA.categories.map(cat => `
        <button onclick="selectCategory('${cat.id}')" 
            class="tab-btn px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${activeCategory === cat.id ? 'active' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'}">
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

// Render Products with Weight Selector & Dynamic Price
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
        const currentSel = productSelections[product.id] || { grams: 1000, label: "१ किलो", price: product.pricePerKg };

        return `
            <div class="product-card bg-white rounded-2xl border border-slate-200/80 overflow-hidden flex flex-col justify-between p-4 shadow-sm hover:border-orange-300">
                <div>
                    <div class="relative w-full h-44 bg-slate-100 rounded-xl overflow-hidden mb-3">
                        <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover transition-transform duration-300 hover:scale-105">
                        ${product.badge ? `<span class="absolute top-2 left-2 bg-orange-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded shadow-sm">${product.badge}</span>` : ''}
                        <span class="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-semibold px-2 py-0.5 rounded">
                            ₹${product.pricePerKg}/किलो
                        </span>
                    </div>

                    <h3 class="font-bold text-slate-900 text-sm sm:text-base mb-1 line-clamp-1">${product.name}</h3>
                    
                    <!-- Weight Selector Dropdown (Dynamic Weight Logic) -->
                    <div class="my-2.5">
                        <label class="text-[11px] font-semibold text-slate-500 block mb-1">वजन निवडा (Select Weight):</label>
                        <select onchange="onProductWeightChange('${product.id}', this.value)" 
                            class="w-full bg-slate-50 border border-slate-300 text-slate-800 text-xs font-semibold rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-orange-500 focus:bg-white transition">
                            ${product.weightPresets.map(preset => `
                                <option value="${preset.grams}" ${preset.grams === currentSel.grams ? 'selected' : ''}>
                                    ${preset.label} ${preset.isWholesale ? '⭐ होलसेल' : ''}
                                </option>
                            `).join('')}
                        </select>
                    </div>

                    <!-- Dynamic Calculated Price Display -->
                    <div class="flex items-baseline justify-between mt-3 mb-3 bg-orange-50/70 px-3 py-2 rounded-xl border border-orange-100">
                        <div>
                            <span class="text-xs text-slate-500 font-medium">एकूण दर:</span>
                            <span class="text-lg sm:text-xl font-extrabold text-orange-600 ml-1">₹${currentSel.price}</span>
                        </div>
                        <span class="text-[11px] font-semibold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                            ${currentSel.label}
                        </span>
                    </div>
                </div>

                <button onclick="addProductToCart('${product.id}')" 
                    class="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shadow-sm active:scale-95">
                    <i data-lucide="plus-circle" class="w-4 h-4"></i> कार्टमध्ये टाका
                </button>
            </div>
        `;
    }).join('');

    lucide.createIcons();
}

// Handle Weight Change on Product Card
function onProductWeightChange(productId, gramsVal) {
    const grams = parseInt(gramsVal);
    const product = STORE_DATA.products.find(p => p.id === productId);
    if (!product) return;

    const preset = product.weightPresets.find(w => w.grams === grams);
    const label = preset ? preset.label : `${grams >= 1000 ? (grams/1000) + ' किलो' : grams + ' ग्रॅम'}`;
    const price = calculateProductPrice(product, grams);

    productSelections[productId] = { grams, label, price };
    renderProducts();
}

// Add to Cart
function addProductToCart(productId) {
    const product = STORE_DATA.products.find(p => p.id === productId);
    if (!product) return;

    const selection = productSelections[productId] || { grams: 1000, label: "१ किलो", price: product.pricePerKg };
    const cartItemId = `${productId}_${selection.grams}`;

    const existingItem = cart.find(item => item.cartItemId === cartItemId);
    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({
            cartItemId,
            id: product.id,
            name: product.name,
            grams: selection.grams,
            label: selection.label,
            price: selection.price,
            qty: 1
        });
    }

    saveCart();
    updateCartUI();
    showToast(`${product.name} (${selection.label}) कार्टमध्ये जोडले!`);
}

// Digital Scale Calculator Logic
function updateDigitalScaleUI() {
    const priceInput = document.getElementById("scale-price");
    const qtyInput = document.getElementById("scale-qty");
    const unitSelect = document.getElementById("scale-unit");
    const resultBox = document.getElementById("scale-result");

    if (!resultBox) return;

    const pricePerKg = parseFloat(priceInput.value) || 0;
    const qty = parseFloat(qtyInput.value) || 0;
    const unit = unitSelect.value;

    let grams = unit === "kg" ? qty * 1000 : qty;
    let totalPrice = (pricePerKg / 1000) * grams;

    resultBox.innerText = `₹${totalPrice.toFixed(2)}`;
}

// Render Google 5-Star Reviews
function renderReviews() {
    if (!reviewsContainer) return;

    reviewsContainer.innerHTML = STORE_DATA.reviews.map(rev => `
        <div class="bg-white p-6 rounded-2xl border border-amber-100 shadow-sm flex flex-col justify-between hover:shadow-md transition">
            <div>
                <div class="flex items-center gap-3 mb-3">
                    <div class="w-12 h-12 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 text-white font-extrabold flex items-center justify-center text-lg shadow-md shadow-orange-500/20">
                        ${rev.name.charAt(0)}
                    </div>
                    <div>
                        <h4 class="font-bold text-slate-800 text-sm leading-snug">${rev.name}</h4>
                        <div class="flex items-center gap-1 mt-0.5">
                            <div class="flex text-amber-400">
                                ${Array(rev.rating).fill(0).map(() => '<i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400"></i>').join('')}
                            </div>
                            <span class="text-[10px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded font-semibold border border-emerald-200">${rev.badge}</span>
                        </div>
                    </div>
                </div>
                <p class="text-slate-700 text-sm leading-relaxed font-medium">"${rev.text}"</p>
            </div>
            <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span class="flex items-center gap-1 font-semibold text-emerald-600"><i data-lucide="check-circle" class="w-3.5 h-3.5"></i> गुगल ५.० स्टार</span>
                <span>${rev.date}</span>
            </div>
        </div>
    `).join('');

    lucide.createIcons();
}

// Cart Operations
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
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    if (cartBadge) {
        cartBadge.innerText = totalQty;
        cartBadge.classList.toggle("hidden", totalQty === 0);
    }

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
                        <h4 class="font-semibold text-slate-800 text-xs sm:text-sm line-clamp-1">${item.name}</h4>
                        <div class="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                            <span class="bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded text-[10px] font-bold">${item.label}</span>
                            <span>•</span>
                            <span class="font-bold text-orange-600">₹${item.price}</span>
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="flex items-center bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                            <button onclick="updateCartQty('${item.cartItemId}', -1)" class="px-2 py-1 hover:bg-slate-100 text-slate-600 text-sm font-bold">-</button>
                            <span class="px-2 py-1 text-xs font-bold text-slate-800">${item.qty}</span>
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

function saveCart() {
    localStorage.setItem("om_sai_cart", JSON.stringify(cart));
}

function loadCartFromStorage() {
    try {
        const saved = localStorage.getItem("om_sai_cart");
        if (saved) cart = JSON.parse(saved);
    } catch (e) {
        cart = [];
    }
    updateCartUI();
}

function toggleCart() {
    if (!cartSidebar || !cartOverlay) return;
    const isClosed = cartSidebar.classList.contains("translate-x-full");
    if (isClosed) {
        cartSidebar.classList.remove("translate-x-full");
        cartOverlay.classList.remove("hidden");
    } else {
        cartSidebar.classList.add("translate-x-full");
        cartOverlay.classList.add("hidden");
    }
}

// WhatsApp Direct Checkout with Exact Address
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
    let message = `🛒 *नवीन ऑर्डर - ओम साई किराणा स्टोअर्स, बेलवंडी बुद्रुक*\n`;
    message += `📍 *पत्ता:* शिरूर-श्रीगोंदा रोड, बस स्टँडजवळ, बेलवंडी बु. (४१३७०२)\n`;
    message += `───────────────────\n`;
    message += `👤 *ग्राहक नाव:* ${customerName}\n`;
    message += `🏡 *डिलिव्हरी पत्ता:* ${customerAddress}\n`;
    message += `📮 *पिनकोड:* ${customerPincode}\n`;
    message += `───────────────────\n`;
    message += `📦 *ऑर्डर केलेले सामान (वजनासह):*\n`;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.qty;
        total += itemTotal;
        message += `${index + 1}. ${item.name}\n   → वजन: *${item.label}* | नग: ${item.qty} | रक्कम: *₹${itemTotal}*\n`;
    });

    message += `───────────────────\n`;
    message += `💰 *एकूण देय रक्कम: ₹${total}*\n`;
    message += `🚚 *डिलिव्हरी:* बेलवंडी परिसर\n`;
    message += `💳 *पेमेंट पद्धत:* रोख (COD) / PhonePe / GPay\n`;
    message += `───────────────────\n`;
    message += `कृपया ऑर्डर तपासून सामान पाठवून द्यावे. धन्यवाद!`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${STORE_DATA.info.phone}&text=${encoded}`;
    window.open(whatsappUrl, '_blank');
}

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

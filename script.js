// --- ۱. مدل داده (Data Model) ---
// داده‌های منو در یک آرایه JSON ذخیره می‌شوند تا به‌روزرسانی آسان باشد.
const menuData = [
    {
        id: 'M001',
        name: 'کباب کوبیده مخصوص',
        description: '220 گرم گوشت تازه گوسفندی و گوساله، به همراه برنج زعفرانی',
        price: 250000,
        category: 'کباب‌ها',
        image: 'https://via.placeholder.com/400x200?text=Kabab', // آدرس عکس واقعی را قرار دهید
        isPopular: true,
        dietary: ['Halal', 'Protein']
    },
    {
        id: 'M002',
        name: 'چلو ماهیچه',
        description: '۴۰۰ گرم ماهیچه گوسفندی تازه، با سس مخصوص و دورچین سبزیجات',
        price: 420000,
        category: 'خوراک‌ها',
        image: 'https://via.placeholder.com/400x200?text=Mahiche',
        isPopular: true,
        dietary: ['Halal', 'Protein']
    },
    {
        id: 'M003',
        name: 'پاستا آلفردو',
        description: 'سس خامه‌ای، قارچ، مرغ گریل و پنیر پارمزان',
        price: 185000,
        category: 'پاستا و پیتزا',
        image: 'https://via.placeholder.com/400x200?text=Alfredo',
        isPopular: false,
        dietary: ['Dairy']
    },
    {
        id: 'M004',
        name: 'سالاد سزار',
        description: 'کاهو، نان تست، پنیر، سس سزار خانگی و مرغ گریل',
        price: 95000,
        category: 'پیش‌غذا و سالاد',
        image: 'https://via.placeholder.com/400x200?text=Caesar',
        isPopular: false,
        dietary: ['Vegetarian Option']
    },
    {
        id: 'M005',
        name: 'نوشابه کوکا',
        description: 'بطری شیشه‌ای، ۳۳۰ میلی‌لیتر',
        price: 15000,
        category: 'نوشیدنی‌ها',
        image: 'https://via.placeholder.com/400x200?text=Cola',
        isPopular: false,
        dietary: ['Beverage']
    }
    // ... سایر آیتم‌های منو
];


// --- ۲. توابع اصلی مدیریت منو ---

// نمایش آیتم‌ها در HTML
function displayMenu(items) {
    const menuList = document.getElementById('menuList');
    menuList.innerHTML = ''; // پاک کردن محتوای قبلی

    if (items.length === 0) {
        menuList.innerHTML = '<p class="no-result">نتیجه‌ای با این مشخصات یافت نشد.</p>';
        return;
    }

    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('menu-item');
        itemElement.setAttribute('data-category', item.category);
        itemElement.setAttribute('onclick', `openModal('${item.id}')`);
        
        // ساختار HTML داخلی یک آیتم
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="item-image">
            <div class="item-info">
                <h3>${item.name} ${item.isPopular ? '⭐' : ''}</h3>
                <p class="item-description">${item.description}</p>
                <div class="item-price">${item.price.toLocaleString('fa-IR')} تومان</div>
            </div>
        `;
        menuList.appendChild(itemElement);
    });
}

// تولید دکمه‌های فیلتر بر اساس دسته‌بندی‌ها
function setupFilterButtons() {
    const categories = ['همه', ...new Set(menuData.map(item => item.category))];
    const filterButtonsContainer = document.getElementById('filterButtons');

    categories.forEach(category => {
        const button = document.createElement('button');
        button.classList.add('filter-button');
        button.textContent = category;
        button.setAttribute('data-filter', category);
        button.addEventListener('click', () => filterMenu(category));
        filterButtonsContainer.appendChild(button);
    });
}

// منطق فیلتر کردن منو
function filterMenu(category) {
    const buttons = document.querySelectorAll('.filter-button');
    buttons.forEach(btn => btn.classList.remove('active'));

    // فعال کردن دکمه کلیک شده
    const activeButton = document.querySelector(`.filter-button[data-filter="${category}"]`);
    if (activeButton) activeButton.classList.add('active');

    const filteredItems = category === 'همه'
        ? menuData
        : menuData.filter(item => item.category === category);

    displayMenu(filteredItems);
}

// منطق جستجو (Live Search)
function liveSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    
    // ابتدا همه دکمه‌های فیلتر را غیرفعال کنید (زیرا جستجو فعال شده است)
    const buttons = document.querySelectorAll('.filter-button');
    buttons.forEach(btn => btn.classList.remove('active'));

    const searchResults = menuData.filter(item => 
        item.name.toLowerCase().includes(searchTerm) || 
        item.description.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm)
    );

    displayMenu(searchResults);
}


// --- ۳. توابع Modal (جزئیات آیتم) ---

function openModal(itemId) {
    const item = menuData.find(i => i.id === itemId);
    const modal = document.getElementById('itemModal');
    const modalBody = document.getElementById('modalBody');

    if (item) {
        modalBody.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="modal-detail-image">
            <h2 class="modal-detail-name">${item.name}</h2>
            <p>${item.description}</p>
            <p class="modal-detail-dietary">ویژگی‌ها: ${item.dietary.join(', ')}</p>
            <p class="modal-detail-price">قیمت: ${item.price.toLocaleString('fa-IR')} تومان</p>
            `;
        modal.style.display = 'block';
    }
}

function closeModal() {
    document.getElementById('itemModal').style.display = 'none';
}

// بستن Modal با کلیک بیرون از آن
window.onclick = function(event) {
    const modal = document.getElementById('itemModal');
    if (event.target == modal) {
        closeModal();
    }
}


// --- ۴. اجرای اولیه ---
document.addEventListener('DOMContentLoaded', () => {
    setupFilterButtons();
    // نمایش همه آیتم‌ها در بار اول
    filterMenu('همه'); 
    
    // Listener برای جستجوی پویا
    document.getElementById('searchInput').addEventListener('input', liveSearch);
});
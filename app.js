// 引入食物資料
import foodData from '../data/foodData.js';

// DOM 元素
const foodList = document.getElementById('food-list');
const categoryFilter = document.getElementById('category-filter');
const priceFilter = document.getElementById('price-filter');
const timeFilter = document.getElementById('time-filter');
const deliveryFilter = document.getElementById('delivery-filter');
const randomBtn = document.getElementById('random-btn');
const sortOptions = document.getElementById('sort-options');
const randomModal = document.getElementById('random-modal');
const closeRandomModal = document.getElementById('close-random-modal');
const randomResult = document.getElementById('random-result');
const nextRandomBtn = document.getElementById('next-random');
const addToFavoritesBtn = document.getElementById('add-to-favorites');

// 初始化頁面
document.addEventListener('DOMContentLoaded', () => {
    // 初始化分類選項
    initializeCategoryOptions();
    
    // 載入食物清單
    renderFoodList(foodData.categories.flatMap(category => 
        category.items.map(item => ({
            ...item,
            category: category.name,
            categoryId: category.id
        }))
    ));
    
    // 設定事件監聽器
    setupEventListeners();
});

// 初始化分類選項
function initializeCategoryOptions() {
    foodData.categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        categoryFilter.appendChild(option);
    });
}

// 設定事件監聽器
function setupEventListeners() {
    // 篩選器變更事件
    [categoryFilter, priceFilter, timeFilter, deliveryFilter].forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });
    
    // 排序選項變更事件
    sortOptions.addEventListener('change', applyFilters);
    
    // 隨機選擇按鈕
    randomBtn.addEventListener('click', showRandomFood);
    
    // 關閉彈窗按鈕
    closeRandomModal.addEventListener('click', () => {
        randomModal.classList.add('hidden');
    });
    
    // 下一個隨機選擇
    nextRandomBtn.addEventListener('click', showRandomFood);
    
    // 加入收藏
    addToFavorites.addEventListener('click', addCurrentToFavorites);
}

// 套用所有篩選條件
function applyFilters() {
    let filteredFoods = foodData.categories.flatMap(category => 
        category.items.map(item => ({
            ...item,
            category: category.name,
            categoryId: category.id
        }))
    );
    
    // 分類篩選
    if (categoryFilter.value !== 'all') {
        filteredFoods = filteredFoods.filter(food => food.categoryId === categoryFilter.value);
    }
    
    // 價格篩選
    if (priceFilter.value !== 'all') {
        const [min, max] = priceFilter.value.split('-').map(Number);
        if (max) {
            filteredFoods = filteredFoods.filter(food => food.price >= min && food.price <= max);
        } else {
            filteredFoods = filteredFoods.filter(food => food.price >= min);
        }
    }
    
    // 時間篩選
    if (timeFilter.value !== 'all') {
        const [min, max] = timeFilter.value.split('-').map(Number);
        if (max) {
            filteredFoods = filteredFoods.filter(food => food.time >= min && food.time <= max);
        } else {
            filteredFoods = filteredFoods.filter(food => food.time >= min);
        }
    }
    
    // 外送篩選
    if (deliveryFilter.checked) {
        filteredFoods = filteredFoods.filter(food => food.delivery);
    }
    
    // 排序
    sortFoods(filteredFoods);
}

// 排序食物清單
function sortFoods(foods) {
    const sortBy = sortOptions.value;
    
    switch (sortBy) {
        case 'price-asc':
            foods.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            foods.sort((a, b) => b.price - a.price);
            break;
        case 'time-asc':
            foods.sort((a, b) => a.time - b.time);
            break;
        case 'time-desc':
            foods.sort((a, b) => b.time - a.time);
            break;
        default: // 預設按熱門度排序
            foods.sort((a, b) => b.popular - a.popular);
    }
    
    renderFoodList(foods);
}

// 渲染食物清單
function renderFoodList(foods) {
    foodList.innerHTML = '';
    
    if (foods.length === 0) {
        foodList.innerHTML = '<div class="col-span-full text-center text-gray-500 py-8">沒有符合條件的餐點</div>';
        return;
    }
    
    foods.forEach(food => {
        const foodCard = createFoodCard(food);
        foodList.appendChild(foodCard);
    });
}

// 創建食物卡片
function createFoodCard(food) {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow';
    
    card.innerHTML = `
        <div class="p-4">
            <div class="flex justify-between items-start mb-2">
                <h3 class="text-lg font-semibold text-gray-800">${food.name}</h3>
                <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">${food.category}</span>
            </div>
            <div class="flex justify-between text-sm text-gray-600 mb-2">
                <span>$${food.price}</span>
                <span>${food.time} 分鐘</span>
            </div>
            <div class="flex justify-between items-center text-sm">
                <span class="flex items-center">
                    <i class="fas fa-${food.delivery ? 'check text-green-500' : 'times text-red-500'} mr-1"></i>
                    <span class="text-gray-600">外送</span>
                </span>
                <span class="flex items-center">
                    <i class="fas fa-${food.popular ? 'fire text-red-500' : 'star text-yellow-400'} mr-1"></i>
                    <span class="text-gray-600">${food.popular ? '熱門' : '推薦'}</span>
                </span>
            </div>
        </div>
    `;
    
    return card;
}

// 顯示隨機食物
function showRandomFood() {
    let filteredFoods = foodData.categories.flatMap(category => 
        category.items.map(item => ({
            ...item,
            category: category.name,
            categoryId: category.id
        }))
    );
    
    // 套用篩選條件
    if (categoryFilter.value !== 'all') {
        filteredFoods = filteredFoods.filter(food => food.categoryId === categoryFilter.value);
    }
    
    if (filteredFoods.length === 0) {
        randomResult.textContent = '沒有符合條件的餐點';
        randomModal.classList.remove('hidden');
        return;
    }
    
    const randomIndex = Math.floor(Math.random() * filteredFoods.length);
    const randomFood = filteredFoods[randomIndex];
    
    randomResult.textContent = `${randomFood.name} (${randomFood.category})`;
    currentRandomFood = randomFood;
    randomModal.classList.remove('hidden');
}

// 加入收藏
let currentRandomFood = null;

function addCurrentToFavorites() {
    if (!currentRandomFood) return;
    
    // 這裡可以加入收藏的邏輯
    alert(`已將 ${currentRandomFood.name} 加入收藏！`);
}
// 轉盤功能
const wheelBtn = document.getElementById('wheel-btn');
const wheelModal = document.createElement('div');
wheelModal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden z-50';
wheelModal.innerHTML = `
    <div class="bg-white rounded-xl p-8 max-w-md w-full mx-4 relative">
        <button id="close-wheel-modal" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
            <i class="fas fa-times text-2xl"></i>
        </button>
        <div class="text-center">
            <div id="wheel-container" class="relative w-64 h-64 mx-auto mb-6">
                <canvas id="wheel" width="300" height="300"></canvas>
                <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                    <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                </div>
            </div>
            <button id="spin-wheel" class="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-full font-medium">
                <i class="fas fa-redo-alt mr-2"></i> 開始旋轉
            </button>
        </div>
    </div>
`;
document.body.appendChild(wheelModal);

// 轉盤變數
let wheel;
let wheelSpinning = false;
let wheelCanvas;
let wheelCtx;
let lastRotation = 0;
let currentRotation = 0;

// 初始化轉盤
function initWheel() {
    wheelCanvas = document.getElementById('wheel');
    wheelCtx = wheelCanvas.getContext('2d');
    drawWheel();
}

// 繪製轉盤
function drawWheel() {
    const categories = foodData.categories;
    const arc = Math.PI / (categories.length / 2);
    const centerX = wheelCanvas.width / 2;
    const centerY = wheelCanvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    // 清除畫布
    wheelCtx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);

    // 繪製扇形
    categories.forEach((category, index) => {
        const startAngle = index * arc + currentRotation;
        const endAngle = (index + 1) * arc + currentRotation;

        // 繪製扇形
        wheelCtx.beginPath();
        wheelCtx.moveTo(centerX, centerY);
        wheelCtx.arc(centerX, centerY, radius, startAngle, endAngle, false);
        wheelCtx.closePath();

        // 設置顏色
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#FFCC5C', '#FF6F69'];
        wheelCtx.fillStyle = colors[index % colors.length];
        wheelCtx.fill();

        // 繪製文字
        wheelCtx.save();
        wheelCtx.translate(centerX, centerY);
        wheelCtx.rotate(startAngle + arc / 2);
        
        // 調整文字位置
        wheelCtx.font = 'bold 14px Arial';
        wheelCtx.fillStyle = '#fff';
        wheelCtx.textAlign = 'right';
        wheelCtx.fillText(category.name, radius - 20, 5);
        
        wheelCtx.restore();
    });
}

// 旋轉轉盤
function spinWheel() {
    if (wheelSpinning) return;
    
    const spinTime = 3000; // 旋轉時間（毫秒）
    const startTime = Date.now();
    const spinAngleStart = Math.random() * 10 + 10; // 隨機旋轉圈數
    const spinAngle = spinAngleStart * Math.PI * 2;
    
    wheelSpinning = true;
    
    function rotate() {
        const now = Date.now();
        const progress = (now - startTime) / spinTime;
        
        if (progress >= 1) {
            currentRotation = (currentRotation + spinAngle) % (Math.PI * 2);
            wheelSpinning = false;
            selectWinner();
            return;
        }
        
        // 緩動函數
        const easeOut = function(t) { return --t * t * ((1.7 + 1) * t + 1.7) + 1; };
        const angle = easeOut(progress) * spinAngle;
        
        currentRotation = lastRotation + angle;
        drawWheel();
        
        if (progress < 1) {
            requestAnimationFrame(rotate);
        }
    }
    
    lastRotation = currentRotation;
    rotate();
}

// 選擇獲勝者
function selectWinner() {
    const categories = foodData.categories;
    const arc = Math.PI / (categories.length / 2);
    const normalizedRotation = ((currentRotation % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    const winningIndex = Math.floor((Math.PI * 2 - normalizedRotation) / arc) % categories.length;
    const winningCategory = categories[winningIndex];
    
    // 從該分類中隨機選擇一個食物
    const randomFood = winningCategory.items[Math.floor(Math.random() * winningCategory.items.length)];
    
    // 顯示結果
    alert(`恭喜抽中：${randomFood.name} (${winningCategory.name})`);
}

// 事件監聽器
wheelBtn.addEventListener('click', () => {
    wheelModal.classList.remove('hidden');
    initWheel();
});

document.getElementById('close-wheel-modal').addEventListener('click', () => {
    wheelModal.classList.add('hidden');
});

document.getElementById('spin-wheel').addEventListener('click', () => {
    if (!wheelSpinning) {
        spinWheel();
    }
});
// 初始化篩選
applyFilters();
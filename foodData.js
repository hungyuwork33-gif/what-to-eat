// 食物資料庫
const foodData = {
    categories: [
      {
        id: 'chinese',
        name: '中式',
        items: [
          { id: 1, name: '牛肉麵', price: 120, time: 15, delivery: true, popular: true },
          { id: 2, name: '乾麵', price: 60, time: 10, delivery: true, popular: true },
          { id: 3, name: '炸醬麵', price: 65, time: 10, delivery: true, popular: true },
          { id: 4, name: '排骨便當', price: 90, time: 12, delivery: true, popular: true },
          { id: 5, name: '雞腿便當', price: 100, time: 12, delivery: true, popular: true },
          { id: 6, name: '三杯雞便當', price: 110, time: 15, delivery: true, popular: false },
          { id: 7, name: '水餃', price: 70, time: 10, delivery: true, popular: true },
          { id: 8, name: '鍋貼', price: 65, time: 10, delivery: true, popular: true },
          { id: 9, name: '蔥油餅', price: 40, time: 8, delivery: true, popular: false },
          { id: 10, name: '滷味', price: 80, time: 10, delivery: true, popular: true },
          { id: 11, name: '酸辣湯', price: 40, time: 5, delivery: true, popular: true },
          { id: 12, name: '蛋花湯', price: 30, time: 5, delivery: true, popular: false },
          { id: 13, name: '排骨湯', price: 50, time: 5, delivery: true, popular: true }
        ]
      },
      {
        id: 'japanese',
        name: '日式',
        items: [
          { id: 14, name: '壽司', price: 200, time: 20, delivery: true, popular: true },
          { id: 15, name: '手捲', price: 60, time: 10, delivery: true, popular: false },
          { id: 16, name: '牛丼', price: 130, time: 12, delivery: true, popular: true },
          { id: 17, name: '親子丼', price: 140, time: 15, delivery: true, popular: true },
          { id: 18, name: '海鮮丼', price: 250, time: 20, delivery: true, popular: true },
          { id: 19, name: '拉麵', price: 180, time: 15, delivery: true, popular: true },
          { id: 20, name: '烏龍麵', price: 120, time: 12, delivery: true, popular: true },
          { id: 21, name: '蕎麥麵', price: 130, time: 12, delivery: true, popular: false },
          { id: 22, name: '炸豬排', price: 150, time: 15, delivery: true, popular: true },
          { id: 23, name: '唐揚雞', price: 90, time: 12, delivery: true, popular: true },
          { id: 24, name: '章魚燒', price: 70, time: 10, delivery: true, popular: true },
          { id: 25, name: '天婦羅', price: 160, time: 15, delivery: true, popular: false }
        ]
      },
      {
        id: 'italian',
        name: '義式',
        items: [
          { id: 26, name: '青醬義大利麵', price: 180, time: 20, delivery: true, popular: true },
          { id: 27, name: '紅醬義大利麵', price: 170, time: 18, delivery: true, popular: true },
          { id: 28, name: '白醬義大利麵', price: 190, time: 20, delivery: true, popular: true },
          { id: 29, name: '海鮮義大利麵', price: 220, time: 25, delivery: true, popular: true },
          { id: 30, name: '肉醬義大利麵', price: 160, time: 18, delivery: true, popular: true },
          { id: 31, name: '瑪格麗特披薩', price: 250, time: 25, delivery: true, popular: true },
          { id: 32, name: '夏威夷披薩', price: 270, time: 25, delivery: true, popular: true },
          { id: 33, name: '海鮮披薩', price: 290, time: 30, delivery: true, popular: true },
          { id: 34, name: '四季披薩', price: 280, time: 28, delivery: true, popular: false },
          { id: 35, name: '燉飯', price: 200, time: 25, delivery: true, popular: true },
          { id: 36, name: '烤蔬菜', price: 150, time: 15, delivery: true, popular: false },
          { id: 37, name: '義式小點', price: 120, time: 10, delivery: true, popular: true }
        ]
      },
      {
        id: 'american',
        name: '美式',
        items: [
          { id: 38, name: '漢堡', price: 120, time: 15, delivery: true, popular: true },
          { id: 39, name: '熱狗', price: 80, time: 10, delivery: true, popular: false },
          { id: 40, name: '炸雞', price: 150, time: 15, delivery: true, popular: true },
          { id: 41, name: '薯條', price: 60, time: 8, delivery: true, popular: true },
          { id: 42, name: '沙拉', price: 120, time: 10, delivery: true, popular: true },
          { id: 43, name: '玉米濃湯', price: 50, time: 5, delivery: true, popular: true },
          { id: 44, name: '鬆餅', price: 100, time: 12, delivery: true, popular: true },
          { id: 45, name: '布朗尼', price: 80, time: 5, delivery: true, popular: true },
          { id: 46, name: '奶昔', price: 90, time: 8, delivery: true, popular: true }
        ]
      },
      {
        id: 'drinks',
        name: '飲料',
        items: [
          { id: 47, name: '咖啡', price: 60, time: 5, delivery: true, popular: true },
          { id: 48, name: '奶茶', price: 50, time: 5, delivery: true, popular: true },
          { id: 49, name: '果汁', price: 60, time: 5, delivery: true, popular: true },
          { id: 50, name: '汽水', price: 40, time: 2, delivery: true, popular: true },
          { id: 51, name: '茶飲', price: 45, time: 5, delivery: true, popular: true },
          { id: 52, name: '氣泡水', price: 50, time: 2, delivery: true, popular: false }
        ]
      },
      {
        id: 'midnight',
        name: '宵夜',
        items: [
          { id: 53, name: '滷味', price: 80, time: 10, delivery: true, popular: true },
          { id: 54, name: '鹹酥雞', price: 70, time: 15, delivery: true, popular: true },
          { id: 55, name: '炸雞排', price: 75, time: 12, delivery: true, popular: true },
          { id: 56, name: '烤玉米', price: 60, time: 10, delivery: true, popular: false },
          { id: 57, name: '泡麵', price: 50, time: 8, delivery: true, popular: true },
          { id: 58, name: '煎餃', price: 70, time: 10, delivery: true, popular: true }
        ]
      },
      {
        id: 'fitness',
        name: '健身餐',
        items: [
          { id: 59, name: '雞胸肉沙拉', price: 150, time: 12, delivery: true, popular: true },
          { id: 60, name: '藜麥蔬菜碗', price: 160, time: 15, delivery: true, popular: true },
          { id: 61, name: '蛋白質飲品', price: 120, time: 5, delivery: true, popular: true },
          { id: 62, name: '蒸地瓜', price: 40, time: 8, delivery: true, popular: false },
          { id: 63, name: '水煮蛋', price: 15, time: 10, delivery: true, popular: true },
          { id: 64, name: '鮭魚蔬菜碗', price: 180, time: 15, delivery: true, popular: true }
        ]
      }
    ]
  };
  
  export default foodData;
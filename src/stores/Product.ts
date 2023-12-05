import { defineStore } from "pinia";
import axios from "axios";

interface Product {
  price: number;
  discountPercentage: number;
  title: string;
  description: string;
  id: number;
  images: object;
  category: string;
  total: number; 
  stock?: number;
}
interface Categories {
  [key: string]: string;
}
interface FilterItem {
  names: string;
}
interface RegularVariables {
  products: Product[];
  productsBasket: Product[];
  filter: FilterItem[];
  modal: boolean;
  sort: boolean;
  scrollСheck: boolean;
  filterDefualt: string;
  categoriesDefualt: string;
  priseSort: boolean;
  categories: Categories;
  filterAll: boolean;
  filterPrice: boolean;
  sortCategori: boolean;
  filterDiscount: boolean;
  filterReiting: boolean;
  modalPurchased: boolean;
}

export const useProduct = defineStore({
  id: "useProduct",
  state: (): RegularVariables => ({
    products: [],
    productsBasket: [],
    modal: false,
    modalPurchased: false,
    sort: false,
    sortCategori: false,
    scrollСheck: true,
    priseSort: false,
    filterAll: true,
    filterPrice: false,
    filterDiscount: false,
    filterReiting: false,
    filterDefualt: 'Все товары',
    categoriesDefualt: 'Все Категории',
    filter: [
      { names: 'Все товары' },
      { names: 'По рейтингу' },
      { names: 'По цене' },
      { names: 'По Скидке' },
    ],
    categories: {
      "Смартфоны": "smartphones",
      "Ноутбуки": "laptops",
      "Духи": "fragrances",
      "Мотоциклы": "motorcycle",
      "Уход за кожей": "skincare",
      "Продукты": "groceries",
      "Мебель": "furniture",
      "Освещение": "lighting",
      "Верхняя одежда": "tops",
      "Женские платья": "womens-dresses",
      "Женская обувь": "womens-shoes",
      "Мужские рубашки": "mens-shirts",
      "Мужская обувь": "mens-shoes",
      "Мужские часы": "mens-watches",
      "Женские часы": "womens-watches",
      "Женские сумки": "womens-bags",
      "Товары для дома": "home-decoration",
      "Женские украшения": "womens-jewellery",
      "Солнцезащитные очки": "sunglasses",
      "Автомобильные товары": "automotive",
    },
  }),
  actions: {
    async getProducts(options: { limit: number, category: string }) {
      const limit = options.limit || 10;
      const categoryName = options.category || '';
      try {
        if (categoryName !== '') {
          const res = await axios.get(`https://dummyjson.com/products/category/${categoryName}`);
          this.products = res.data.products.map((el: Product) => ({ ...el, total: el.total || 0 }));

          this.scrollСheck = false;
        } else if (categoryName == '') {
          const res = await axios.get(`https://dummyjson.com/products/?limit=${limit * 12}`);
          this.products = res.data.products.map((el: Product) => ({ ...el, total: el.total || 0 }));

          this.scrollСheck = true;
        }
      } catch (error) {
        console.error("Произошла ошибка", error);
      }
    },
    totalSumm(): number {
      return this.productsBasket.reduce((total: number, product: Product) => total + product.total, 0);
    }
  },
});

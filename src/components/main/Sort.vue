<template>
  <div class="sort">
    <div class="sort__wrapper">
      <div class="sort__wrapper_left">
        <btnSortVue class="sort__wrapper_left-arrow" :class="{ active: $route.path == '/categories' }"
          @click="Store.sort = !Store.sort, Store.sortCategori = false">
          <h3 class="sort__wrapper_left-arrow-title">
            {{ Store.filterDefualt }}
          </h3>
          <img v-if="!Store.sort" src="@/assets/img/arrow-down.svg" alt="" />
          <img v-else src="@/assets/img/arrow-top.svg" alt="" />
          <ul class="sort__wrapper_left-arrow-menu" v-if="Store.sort">
            <li v-for="filter in Store.filter" :key="filter.names" @click="BtnFilter(filter)">
              {{ filter.names }}
            </li>
          </ul>
        </btnSortVue>
        <btnSortVue @click="Store.sortCategori = !Store.sortCategori, Store.sort = false" class="sort__wrapper_left-all"
          v-if="$route.path.startsWith('/categories') || $route.path.startsWith('/categories/:id')">
          <h3>{{ Store.categoriesDefualt }}</h3>
          <img v-if="!Store.sortCategori" src="@/assets/img/arrow-down.svg" alt="" />
          <img v-else src="@/assets/img/arrow-top.svg" alt="" />
        </btnSortVue>
      </div>
      <div class="sort__wrapper_rigth">
        <btnSortVue>
          <h3>Общее кол-во товаров- {{ Store.products.length }}</h3>
        </btnSortVue>
      </div>
    </div>

    <div class="sort-categori" v-if="Store.sortCategori" @click="Store.sortCategori = !Store.sortCategori">
      <btnSortVue v-for="(key, item) in Store.categories" :key="key" @click="BtnFilterCategori(key, item)">
        {{ item }}
      </btnSortVue>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProduct } from "@/stores/Product.ts";
import { ref, watch } from "vue";
const Store = useProduct();
const applyFilter = ref<boolean>(false);
const selectedCategory = ref<string>('');

const BtnFilterCategori = (item: string, key: string) => {
  selectedCategory.value = item;
  Store.categoriesDefualt = key;
  Store.getProducts({ category: selectedCategory.value });
};

const BtnFilter = (filter: { names: string }) => {
  Store.filterDefualt = filter.names
  applySorting();
};

const applySorting = () => {
  if (Store.filterDefualt === 'Все товары') {
    Store.getProducts({ category: '' });
    Store.filterAll = true;
    Store.filterPrice = false;
    Store.filterReiting = false;
    Store.filterDiscount = false
  } else if (Store.filterDefualt === 'По цене') {
    Store.filterAll = false;
    Store.filterPrice = true;
    Store.filterReiting = false;
    Store.filterDiscount = false
  } else if (Store.filterDefualt === 'По рейтингу') {
    Store.filterAll = false;
    Store.filterPrice = false;
    Store.filterReiting = true;
    Store.filterDiscount = false
  } else if (Store.filterDefualt === 'По Скидке') {
    Store.filterAll = false;
    Store.filterPrice = false;
    Store.filterReiting = false;
    Store.filterDiscount = true
  }
};

watch(applyFilter, (newVal) => {
  if (newVal) {
    applySorting();
  }
});
</script>

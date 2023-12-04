<template>
  <div>
    <Modal />
    <Header />
    <RouterView></RouterView>
    <LoudingHome v-if="!Object.keys(Store.products).length" />
  </div>
</template>

<script setup lang="ts">
import LoudingHome from "./components/ui/LoudingHome.vue";
import { ref, onMounted } from "vue";
import Header from "./components/header/Header.vue";
import Modal from "./components/modal/Modal.vue";
import { useProduct } from "./stores/Product.js";
const Store = useProduct();
const limit = ref<number>(1);
const products = ref<any>(Store.products);


const fetchProducts = async () => {
  try {
    await Store.getProducts({ category: '', limit: limit.value });
  } catch (error) {
    console.error("Произошла ошибка при загрузке товаров", error);
  }
};

const handleScroll = () => {
  const threshold = 500;
  const scrollPosition = window.scrollY + window.innerHeight;
  const contentHeight = document.documentElement.scrollHeight;
  if (
    contentHeight - scrollPosition < threshold &&
    products.value.length < 100 &&
    Store.scrollСheck == true
  ) {
    limit.value++
    fetchProducts();
    window.removeEventListener("scroll", handleScroll);
    setTimeout(() => {
      window.addEventListener("scroll", handleScroll);
    }, 400);
  }
};
onMounted(() => {
  fetchProducts();
  window.addEventListener("scroll", handleScroll);
});
</script>
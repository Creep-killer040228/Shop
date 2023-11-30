<template>
  <div>
    <Modal />
    <Header />
    <RouterView></RouterView>
    <LoudingHome v-if="!Store.products.length" />
  </div>
</template>

<script setup lang="ts">
import LoudingHome from "./components/ui/LoudingHome.vue";
import { ref, onMounted, onUnmounted } from "vue";
import Header from "./components/header/Header.vue";
import Modal from "./components/modal/Modal.vue";
import { useProduct } from "./stores/Product.js";
const Store = useProduct();
const limit = ref<number>(12);
const increment = ref<number>(0);

const fetchProducts = async () => {
  try {
    await Store.getProducts({ limit: limit.value });
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
    Store.products.length < 100 &&
    Store.scrollСheck == true
  ) {
    limit.value += 5 * increment.value;
    increment.value++;
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
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
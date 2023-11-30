<template>
  <header class="header">
    <nav class="header__wrapper container">
      <router-link to="/" class="header__wrapper_logo"><img src="@/assets/img/logo.svg" alt="" /></router-link>
      <div class="header__wrapper_menu" @click="PorametsNane">
        <router-link class="header__wrapper_menu-link" :class="{ active: $route.path == '/' }"
          to="/">Главная</router-link>
        <router-link class="header__wrapper_menu-link" :class="{ active: $route.path == '/categories' }"
          to="/categories">Категории</router-link>
      </div>
      <div class="header__wrapper_basket" @click="BtnOverflow">
        <img src="@/assets/img/basket.svg" alt="" />
        <span>{{ Store.productsBasket.length }}</span>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useProduct } from "@/stores/Product.ts";
import { watchEffect } from "vue";
const Store = useProduct();
const BtnOverflow = () => {
  Store.modal = !Store.modal;
  document.body.style.overflow = Store.modal ? "hidden" : "";
};
watchEffect(() => {
  document.body.style.overflow = Store.modal ? "hidden" : "";
});
const PorametsNane = () => {
  Store.getProducts({ category: '', limit: 10 });
  Store.categoriesDefualt = 'Все Категории'
}
</script>

<style scoped lang="scss"></style>
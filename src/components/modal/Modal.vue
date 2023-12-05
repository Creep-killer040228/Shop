<template>
  <div class="modal" v-if="Store.modal" @click="Store.modal = !Store.modal">
    <div class="modal__wrapper" @click.stop="">
      <h2 class="modal__wrapper_title">
        <span>Корзина</span>
        <span class="modal__wrapper_all">Общая сумма {{ Store.totalSumm() }} сум</span>
      </h2>
      <ModalCard v-for="productsBasket in Store.productsBasket" :key="productsBasket.id"
        :productsBasket="productsBasket" />
      <div class="modal__wrapper_buy" :class="{ active: Store.productsBasket.length > 3 }">
        <span class="modal__wrapper_buy-cleaning" @click="() => manipulationProduct('clear')">Очистить корзину</span>
        <span class="modal__wrapper_buy-allBuy" @click="() => manipulationProduct('buy')">Купить</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ModalCard from './ModalCard.vue'
import { useRouter } from "vue-router";
import { useProduct } from "../../stores/Product.ts";
const Store = useProduct();
const router = useRouter();
const manipulationProduct = (action: 'clear' | 'buy'): void => {
  if (action === 'clear') {
    Store.productsBasket.length = 0;
  } else if (action === 'buy') {
    Store.productsBasket.length = 0;
    Store.modalPurchased = true
    setTimeout(() => {
      Store.modalPurchased = false
    }, 3000);
  }
  router.push('/');
  Store.modal = false;
  Store.getProducts({ category: '', limit: 12 });
};
</script>

<style scoped lang="scss"></style>
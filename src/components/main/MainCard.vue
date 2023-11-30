<template>
  <div>
    <router-link :to="`/categories/:${props.product.id}`" @click="navigateToProduct" class="card">
      <img v-if="product.thumbnail" :src="product.thumbnail" alt="" class="card-img" />
      <div class="card__desc">
        <div class="card__span" v-if="Store.filterDiscount"> Скидка {{
          Math.floor(product.discountPercentage) }} %</div>
        <div class="card__desc_top">{{ product.title }}</div>
        <div class="card__desc_buttom">
          <div class="card__desc_buttom-price" :class="{ active: Store.filterDiscount }">{{ product.price }} $</div>
          <div class="card__desc_buttom-pracent" :class="{ active: Store.filterDiscount }">{{ Math.floor(discountedPrice)
          }} $</div>
          <div class="card__desc_buttom-btn" :class="{ active: Store.filterDiscount }">Обзор</div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";
import { useRouter } from "vue-router";
import { useProduct } from '@/stores/Product.ts'
const Store = useProduct()
const props = defineProps<{
  product: {
    title: string;
    thumbnail: string;
    price: number;
    id: number;
    discountPercentage: number;
  };
}>();

const $router = useRouter();

const navigateToProduct = () => {
  $router.push(`/categories/${props.product.id}`);
};

const discountedPrice = computed(() => {
  return props.product.price - (props.product.price * props.product.discountPercentage) / 100;
});
</script>

<style scoped lang="scss"></style>

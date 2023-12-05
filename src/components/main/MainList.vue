<template>
  <div class="container">
    <Sort />
    <TransitionGroup tag="ul" name="slide" class="main-list">
      <MainCard v-for="product in filteredProducts" :key="product.id" :product="product" />
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import MainCard from "./MainCard.vue";
import Sort from "./Sort.vue";
import { useProduct } from "../../stores/Product.ts";
import { computed } from 'vue'

const Store = useProduct();

interface Products {
  rating: number;
  discountPercentage: number;
  title: string;
  thumbnail: string;
  price: number;
  id: number;
}

const filteredProducts = computed(() => {
  const transformProduct = (item: any): Products => ({
    rating: item.rating,
    discountPercentage: item.discountPercentage,
    title: item.title,
    thumbnail: item.thumbnail,
    price: item.price,
    id: item.id,
  });

  if (Store.filterAll) {
    return Array.from(Store.products).map(transformProduct) as Products[];
  } else if (Store.filterPrice) {
    return PriseSort.value;
  } else if (Store.filterReiting) {
    return TopProduct.value;
  } else if (Store.filterDiscount) {
    return DiscountsProduct.value;
  }
});

const transformProductsList = (list: any[]): Products[] =>
  list.map((item) => ({
    rating: item.rating,
    discountPercentage: item.discountPercentage,
    title: item.title,
    thumbnail: item.thumbnail,
    price: item.price,
    id: item.id,
  }));

const TopProduct = computed(() =>
  transformProductsList(Array.from(Store.products)).sort((a, b) => b.rating - a.rating)
);

const PriseSort = computed(() =>
  transformProductsList(Array.from(Store.products)).sort((a, b) => b.price - a.price)
);

const DiscountsProduct = computed(() =>
  transformProductsList(Array.from(Store.products)).sort(
    (a, b) => b.discountPercentage - a.discountPercentage
  )
);
</script>

<style scoped lang="scss"></style>

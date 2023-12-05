<template>
    <div>
        <div class="modal__wrapper_card">
            <div class="modal__wrapper_card-img">
                <img :src="props.productsBasket.thumbnail" alt="" />
            </div>
            <div class="modal__wrapper_card-title">{{ props.productsBasket.title }}</div>
            <div class="modal__wrapper_card-price">Стоимость {{ props.productsBasket.total }} $</div>
            <div class="modal__wrapper_card-stock">Кол {{ props.productsBasket.stock }} </div>
            <div class="modal__wrapper_card-dicrement" @click="() => editing('decrement')">-</div>
            <div class="modal__wrapper_card-increment" @click="() => editing('increment')">+</div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { defineProps } from 'vue';

interface Product {
    id: number;
    name: string;
    price: number;
    total: number;
    thumbnail?: string;
    title?: string;
    stock?: number;
}

const props = defineProps<{ productsBasket: Product }>();

const editing = (action: 'increment' | 'decrement'): void => {
    const stockChange = 1;
    const priceChange = props.productsBasket.price;

    if (action === 'increment') {
        props.productsBasket.stock ? props.productsBasket.stock += stockChange : 0;
        props.productsBasket.total += priceChange;
    } else if (action === 'decrement' && props.productsBasket.stock && props.productsBasket.stock > 0) {
        props.productsBasket.stock -= stockChange;
        props.productsBasket.total -= priceChange;
    }
};
</script>
  
<style scoped></style>

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
const props = defineProps<{
    productsBasket: {
        price: number;
        discountPercentage: number;
        title: string;
        thumbnail: string;
        description: string;
        id: number;
        images: object;
        category: string;
        stock: number;
        total: number;
    };
}>();

const editing = (action: 'increment' | 'decrement'): void => {
    const stockChange = 1;
    const priceChange = props.productsBasket.price;
    if (action === 'increment') {
        props.productsBasket.stock += stockChange;
        props.productsBasket.total += priceChange;

    } else if (action === 'decrement' && props.productsBasket.stock > 0) {
        props.productsBasket.stock -= stockChange;
        props.productsBasket.total -= priceChange;
    }
};
</script>
  
<style scoped></style>
  
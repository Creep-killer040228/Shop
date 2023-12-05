<template>
    <div class="dynamic container">
        <div class="dynamic-wrapper">
            <swiper :pagination="true" class="mySwiper swiper">
                <swiper-slide v-for="(img, index) in productDetails.images" :key="index">
                    <img :src="img" alt="">
                </swiper-slide>
            </swiper>
            <div class="dynamic-wrapper__discount" v-if="Store.filterDiscount">
                Скидка {{ Math.floor(productDetails.discountPercentage) }} %
            </div>
            <div class="dynamic-wrapper__desc">
                <div class="dynamic-wrapper__desc-title">{{ productDetails.title }}</div>
                <div class="dynamic-wrapper__desc-sub">{{ productDetails.description }}</div>

                <div class="dynamic-wrapper__desc-cost">
                    <div class="dynamic-wrapper__desc-cost-price" :class="{ active: Store.filterDiscount }">
                        {{ productDetails.price }} $
                    </div>
                    <div class="dynamic-wrapper__desc-cost-priceDiscount" :class="{ active: Store.filterDiscount }">
                        {{ Math.floor(discountedPrice) }} $
                    </div>
                    <div class="dynamic-wrapper__desc-cost-btn" @click="addProduct"
                        :class="{ active: Store.filterDiscount }">
                        Купить
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { useProduct } from '../../stores/Product.ts';
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
const Store = useProduct();
const Products = computed(() => Store.products);
const $route = useRoute();
const ProductsBasket = computed(() => Store.productsBasket as ProductDetails[]);



interface ProductDetails {
    price: number;
    discountPercentage: number;
    title: string;
    description: string;
    id: number;
    images: object;
    category: string;
    stock?: number | undefined;
    total: number;
}

const productDetails = ref<ProductDetails>({
    price: 0,
    discountPercentage: 0,
    id: 0,
    title: '',
    description: '',
    category: '',
    stock: 0,
    images: {},
    total: 0,
});

const addProduct = () => {
    if (productDetails.value && productDetails.value.stock && productDetails.value.stock > 0) {
        const updatedProductsBasket = ProductsBasket.value.map(product => {
            if (product.id === productDetails.value.id) {
                return {
                    ...product,
                    stock: (product.stock || 0) + 1,
                    total: (product.total || 0) + productDetails.value.price,
                };
            }
            return product;
        });

        const productExists = updatedProductsBasket.some(product => product.id === productDetails.value.id);

        if (!productExists) {
            updatedProductsBasket.push({
                ...productDetails.value,
                stock: 1,
                total: productDetails.value.price,
            });
        }

        Store.productsBasket = updatedProductsBasket;
        productDetails.value.stock -= 1;
    }
};

const discountedPrice = computed(() => {
    return productDetails.value.price - (productDetails.value.price * productDetails.value.discountPercentage) / 100;
});

const productDetailsValue = computed(() => {
    const productIdFromRoute = Number($route.params.productId);
    if (typeof Products.value === 'object') {
        const productValues = Object.values(Products.value) as ProductDetails[];
        const product = productValues.find(product => product.id === productIdFromRoute);
        if (product) {
            productDetails.value = {
                ...product,
                stock: product.stock || 0,
            };
            return productDetails.value;
        } else {
            return null;
        }
    }
});

watch(productDetailsValue, () => { });
</script>
  
<style scoped lang="scss">
.mySwiper {
    width: 600px;
    height: 500px;
    display: flex;
    align-items: center;
    border-radius: 10px;
}

img {
    width: 100%;
    height: 100%;
}

.swiper {
    margin: 0;
}

.swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
  
<template>
  <v-card @click="goTo">
    <v-card-title>{{ props.item.make }} {{ props.item.model }}</v-card-title>
    <v-card-text>
      <div>Год: {{ props.item.year }}</div>
      <div>Цена: {{ formatPrice(props.item.price) }} ₽</div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { navigateTo } from '#app';
import { createCarSlug, formatPrice } from '~/utils/formatters';
import type { Car } from '~/types/car';

const props = defineProps<{ item: Car }>();

const slug = computed(() => createCarSlug(props.item));

const goTo = (): void => {
  navigateTo(`/car/${slug.value}`);
};
</script>

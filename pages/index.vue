<template>
  <div v-if="pending">Загрузка...</div>
  <div v-else-if="error">
    <v-alert type="error" variant="tonal">
      <template #title> Ошибка {{ error?.code }} </template>
      {{ error?.description }}
    </v-alert>
  </div>
  <div v-else>
    <v-container>
      <ClientOnly>
        <v-row>
          <v-col
            v-for="car in filteredCars"
            :key="car.id ?? car.make + '-' + car.model + '-' + car.year"
            cols="12"
            md="6"
            lg="4"
          >
            <Car :item="car" />
          </v-col>
        </v-row>
        <v-row v-if="filteredCars.length === 0">
          <v-col cols="12">
            <v-alert type="info" variant="tonal">
              По выбранным фильтрам автомобили не найдены
            </v-alert>
          </v-col>
        </v-row>
        <template #fallback>
          <v-row>
            <v-col cols="12" class="text-center">
              <v-progress-circular indeterminate size="48" />
            </v-col>
          </v-row>
        </template>
      </ClientOnly>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { useCarsStore } from '~/store/index';
import { useCarsLoader } from '~/composables/useCarsLoader';
import { useCarsFilters } from '~/composables/useCarsFilters';
import type { FilterState } from '~/types/car';

const carsStore = useCarsStore();
const { loadCars } = useCarsLoader();
const { filterCars } = useCarsFilters();

const cars = computed(() => carsStore.cars);
const pending = computed(() => carsStore.loading);
const error = computed(() => carsStore.error);

await loadCars();
const searchValue = useState<string>('search');
const filter = useState<FilterState>('filter');

const filteredCars = computed(() => {
  if (!filter.value) return cars.value;
  return filterCars(cars.value, filter.value, searchValue.value);
});
</script>

<template>
  <v-card class="mb-4">
    <v-card-title>Фильтры</v-card-title>
    <v-card-text>
      <ClientOnly>
        <v-row>
          <v-col cols="12">
            <v-label class="text-subtitle-2 mb-2">Цена (₽)</v-label>
            <v-range-slider
              v-model="filter.price"
              :min="minPrice"
              :max="maxPrice"
              :step="100000"
              thumb-label
              thumb-size="24"
              track-color="grey-lighten-2"
              color="primary"
              @update:model-value="handleUpdateUrlParams"
            />
            <div class="d-flex justify-space-between text-caption text-grey">
              <span>{{ formatPrice(minPrice) }}</span>
              <span>{{ formatPrice(maxPrice) }}</span>
            </div>
          </v-col>

          <v-col cols="12">
            <v-label class="text-subtitle-2 mb-2">Год выпуска</v-label>
            <v-range-slider
              v-model="filter.year"
              :min="minYear"
              :max="maxYear"
              :step="1"
              thumb-label
              thumb-size="24"
              track-color="grey-lighten-2"
              color="primary"
              @update:model-value="handleUpdateUrlParams"
            />
            <div class="d-flex justify-space-between text-caption text-grey">
              <span>{{ minYear }}</span>
              <span>{{ maxYear }}</span>
            </div>
          </v-col>

          <v-col cols="12">
            <v-label class="text-subtitle-2 mb-2">Марка</v-label>
            <v-select
              v-model="filter.make"
              :items="uniqueMakes"
              multiple
              chips
              closable-chips
              variant="outlined"
              density="compact"
              placeholder="Выберите марку"
              @update:model-value="handleUpdateUrlParams"
            />
          </v-col>

          <v-col cols="12">
            <v-label class="text-subtitle-2 mb-2">Модель</v-label>
            <v-select
              v-model="filter.model"
              :items="uniqueModels"
              multiple
              chips
              closable-chips
              variant="outlined"
              density="compact"
              placeholder="Выберите модель"
              @update:model-value="handleUpdateUrlParams"
            />
          </v-col>
        </v-row>

        <v-row class="mt-2">
          <v-col cols="12 text-center">
            <v-btn color="secondary" variant="outlined" size="small" @click="resetFilters">
              Сбросить фильтры
            </v-btn>
          </v-col>
        </v-row>
        <template #fallback>
          <div class="d-flex align-center justify-center" style="height: 200px">
            <v-progress-circular indeterminate size="48" />
          </div>
        </template>
      </ClientOnly>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useCarsStore } from '~/store/index';
import { useCarsData } from '~/composables/useCarsData';
import { useQuerySync } from '~/composables/useQuerySync';
import { formatPrice } from '~/utils/formatters';
import { parseUrlParams } from '~/utils/index';
import type { FilterState } from '~/types/car';

const carsStore = useCarsStore();
const route = useRoute();
const router = useRouter();
const { getPriceRange, getYearRange, getAvailableMakes, getAvailableModels } = useCarsData();
const { updateUrlParams } = useQuerySync();

const filter = useState<FilterState>('filter', () => {
  return {
    price: [0, 0],
    year: [0, 0],
    make: [],
    model: [],
  };
});

const priceRange = computed(() => getPriceRange());
const yearRange = computed(() => getYearRange());

const minPrice = computed(() => priceRange.value.min);
const maxPrice = computed(() => priceRange.value.max);
const minYear = computed(() => yearRange.value.min);
const maxYear = computed(() => yearRange.value.max);
const uniqueMakes = computed(() => getAvailableMakes());
const uniqueModels = computed(() => getAvailableModels());

const handleUpdateUrlParams = (): void => {
  updateUrlParams(filter.value, priceRange.value, yearRange.value);
};

const resetFilters = (): void => {
  filter.value.price = [minPrice.value, maxPrice.value];
  filter.value.year = [minYear.value, maxYear.value];
  filter.value.make = [];
  filter.value.model = [];
  router.replace({ query: {} });
};

const initializeFilterValues = (): void => {
  if (carsStore.cars.length > 0) {
    if (filter.value.price[0] === 0 && filter.value.price[1] === 0) {
      filter.value.price = [priceRange.value.min, priceRange.value.max];
    }

    if (filter.value.year[0] === 0 && filter.value.year[1] === 0) {
      filter.value.year = [yearRange.value.min, yearRange.value.max];
    }

    parseUrlParams(route, filter);
  }
};

watchEffect(() => {
  if (carsStore.cars.length > 0) {
    initializeFilterValues();
  }
});
</script>

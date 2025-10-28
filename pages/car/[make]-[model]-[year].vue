<template>
  <v-container
    class="car-detail"
    :class="{
      'car-detail--loading': pending,
      'car-detail--error': error,
      'car-detail--not-found': !pending && !error && !car,
    }"
  >
    <v-icon v-if="pending" class="mdi mdi-sync mdi-spin" spin></v-icon>
    <template v-else-if="error">
      <div class="car-detail__error-box">
        <p class="car-detail__error-text">
          Произошла ошибка при выполнении запроса. Пожалуйста нажмите кнопку ниже, чтобы попробовать
          снова.
        </p>
        <v-btn color="primary" @click="refresh">Попробовать еще раз</v-btn>
      </div>
    </template>
    <template v-else-if="!car">
      <div class="car-detail__error-box">
        <p class="car-detail__error-text">Информации по данной машине не найдено</p>
        <v-btn color="primary" @click="goBack">Назад</v-btn>
      </div>
    </template>
    <template v-else>
      <v-row>
        <v-col cols="12" md="8">
          <v-card>
            <v-card-title> {{ car?.make }} {{ car?.model }} </v-card-title>
            <v-card-text>
              Год: {{ car?.year }}<br />
              Марка: {{ car?.make }}<br />
              Модель: {{ car?.model }}
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-img src="/test.webp" class="fill-height" />
        </v-col>
      </v-row>
      <v-row class="fill-height">
        <v-col cols="12" md="8">
          <v-skeleton-loader class="mx-auto border fill-height" type="image, article" />
        </v-col>
        <v-col cols="12" md="4">
          <v-skeleton-loader class="mx-auto border fill-height" type="image, article" />
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script setup lang="ts">
import type { CarApi, CarResponse } from '~/types/car';
import { useCarsStore } from '~/store';
import { buildCarProxyUrl } from '~/utils/urlHelpers';

definePageMeta({
  layout: 'car',
});

const route = useRoute();
const requestUrl = buildCarProxyUrl(
  route.params.make as string,
  route.params.model as string,
  route.params.year as string
);
const carsStore = useCarsStore();
const { fetch } = useApi();
const { data, pending, error, refresh } = fetch<CarResponse>(requestUrl, {
  key: `getTrims:${route.params.make}-${route.params.model}-${route.params.year}`,
  lazy: true,
  onError: ({ code, description }) => {
    carsStore.showError(code, description);
  },
});

const car = computed<CarApi | null>(() =>
  Array.isArray(data.value) ? data.value[0] || null : null
);

const goBack = (): void => {
  navigateTo('/');
};
onUnmounted(() => {
  carsStore.clearError();
});
</script>

<style lang="scss">
.car-detail {
  height: 100vh;
  display: flex;
  flex-direction: column;

  .v-card {
    height: 100%;

    .v-card-title {
      font-size: 35px;
    }

    .v-card-text {
      font-size: 20px;
    }
  }

  &--loading,
  &--error,
  &--not-found {
    display: flex;
    align-items: center;
    justify-content: center;

    .car-detail__error-box {
      text-align: center;

      .car-detail__error-text {
        font-size: 22px;
        color: #8e1f1f;
        text-align: center;
      }

      .v-btn {
        margin-top: 25px;
      }
    }
    .v-icon {
      font-size: 80px;
      color: #534949;
    }
  }
}
</style>

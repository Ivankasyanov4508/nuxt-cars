<template>
  <v-alert
    v-if="error"
    type="error"
    variant="tonal"
    closable
    class="error-alert"
    @click:close="handleClose"
  >
    <template #title>
      <div class="d-flex align-center">Ошибка {{ error.code }}</div>
    </template>

    <div class="error-alert__content">
      {{ error.description }}
    </div>

    <template #close>
      <v-btn
        icon="mdi-close"
        size="small"
        variant="text"
        class="error-alert__close-btn"
        @click="handleClose"
      />
    </template>
  </v-alert>
</template>

<script setup lang="ts">
import { useCarsStore } from '~/store/index';

const carsStore = useCarsStore();

const error = computed(() => carsStore.error);

const handleClose = (): void => {
  carsStore.clearError();
};
</script>

<style scoped lang="scss">
.v-alert {
  &.error-alert {
    --error-alert-text-color: white;
    position: fixed;
    top: 16px;
    right: 16px;
    z-index: 10000;
    max-width: 400px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border-radius: 8px;
    background-color: rgb(var(--v-theme-error));
    color: var(--error-alert-text-color);
    animation: slideIn 0.3s ease-out;
  }

  .error-alert__content {
    margin-top: 8px;
    font-size: 14px;
    line-height: 1.4;
    color: var(--error-alert-text-color);
  }

  .error-alert__close-btn {
    opacity: 0.7;
    transition: opacity 0.2s ease;
    color: var(--error-alert-text-color);
  }

  .error-alert__close-btn:hover {
    opacity: 1;
  }

  :deep(.v-alert__title) {
    color: var(--error-alert-text-color);
  }

  :deep(.v-alert__content) {
    color: var(--error-alert-text-color);
  }
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }

    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
}
</style>

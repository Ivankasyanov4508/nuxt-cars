<template>
  <v-text-field
    v-model.trim="searchValue"
    class="mr-4"
    label="Поиск"
    variant="outlined"
    clearable
    prepend-inner-icon="mdi-magnify"
    density="compact"
    hide-details
  />
</template>

<script setup lang="ts">
import { useDebounceFn } from '~/composables/useDebounceFn';
import { useQuerySync } from '~/composables/useQuerySync';
import { parseSearchParam } from '~/utils/urlHelpers';
import { DEBOUNCE_DELAY } from '~/constants/timeouts';

const searchValue = useState<string>('search', () => '');
const route = useRoute();
const { updateSearchUrl } = useQuerySync();

const initializeFromUrl = (): void => {
  const urlSearchParam = route.query.search;
  if (urlSearchParam) {
    searchValue.value = parseSearchParam(urlSearchParam);
  }
};

const debouncedUpdateUrl = useDebounceFn(() => {
  updateSearchUrl(searchValue.value);
}, DEBOUNCE_DELAY);

watch(searchValue, () => {
  debouncedUpdateUrl();
});

onMounted(() => {
  initializeFromUrl();
});
</script>

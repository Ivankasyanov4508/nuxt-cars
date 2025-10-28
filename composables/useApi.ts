import { useFetch } from '#app';
import type { UseFetchOptions } from 'nuxt/app';
import type { MaybeRefOrGetter } from 'vue';
import { isApiError } from '~/utils/typeGuards';
import type { ErrorInfo, FetchError } from '~/types/car';

type ApiErrorHandler = (error: ErrorInfo) => void;

const handleApiError = (error: unknown, onError?: ApiErrorHandler): void => {
  if (onError) {
    let code = 'UNKNOWN';
    let description = 'Ошибка запроса';

    if (isApiError(error)) {
      code = (error as FetchError).status?.toString() || 'UNKNOWN';
      description = (error as FetchError).data?.message || (error as Error).message || description;
    }

    onError({ code, description });
  }
  console.error('API Error:', error);
};

interface ApiFetchOptions<T> extends UseFetchOptions<T> {
  onError?: ApiErrorHandler;
}

export function useApiFetch<T = unknown>(
  request: MaybeRefOrGetter<string>,
  options?: ApiFetchOptions<T>
) {
  const { onError, ...fetchOptions } = options || {};
  const opts = { ...fetchOptions };

  if (fetchOptions?.onRequest) {
    opts.onRequest = async ctx => {
      await handleHook(fetchOptions.onRequest, ctx);
    };
  }

  opts.onRequestError = async ctx => {
    handleApiError(ctx.error, onError);
    if (fetchOptions?.onRequestError) {
      await handleHook(fetchOptions.onRequestError, ctx);
    }
  };

  opts.onResponseError = async ctx => {
    handleApiError(ctx.error, onError);
    if (fetchOptions?.onResponseError) {
      await handleHook(fetchOptions.onResponseError, ctx);
    }
  };

  return useFetch(request, opts);
}

const handleHook = async (hook: unknown, ctx: unknown): Promise<void> => {
  if (typeof hook === 'function') {
    await hook(ctx);
  } else if (Array.isArray(hook)) {
    await Promise.all(hook.map(h => handleHook(h, ctx)));
  }
};

export function useApi() {
  return {
    fetch: useApiFetch,
  };
}

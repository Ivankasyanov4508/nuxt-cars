export default defineEventHandler(async event => {
  const config = useRuntimeConfig();

  const path = event.path.replace(/^\/api\/proxy\//, '');
  const fullUrl = `/api_ninjas/${path}`;

  const method = event.method;
  const query = getQuery(event);
  const body = method !== 'GET' ? await readBody(event) : undefined;

  return $fetch(fullUrl, {
    method,
    query,
    body,
    headers: {
      'X-Api-Key': config.apiKey,
      'Content-Type': 'application/json',
    },
  });
});

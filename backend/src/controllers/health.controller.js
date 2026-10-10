export function getHealth(_request, response) {
  response.json({ data: { status: 'ok' } });
}

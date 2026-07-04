const LIST_IDS = {
  newsletter: 4,
  tickGuide: 5,
  pets: 6,
  accessories: 7,
};

export async function subscribe(email, list) {
  const listId = LIST_IDS[list];
  if (!listId) throw new Error('Unknown list: ' + list);

  const res = await fetch('/api/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, listId }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Signup failed');
  return data;
}

const URL = "https://dummyjson.com/quotes/random";

export default async (signal) => {
  const response = await fetch(URL, { signal });
  if (!response.ok) {
    throw new Error(`Failed to fetch quote: ${response.status}`);
  }
  const data = await response.json();
  return { content: data.quote, author: data.author };
};

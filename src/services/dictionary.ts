export const dintionaryService = {
  getDictionary: async (query: string) => {
    const response = await fetch(`/api/dictionary?query=${query}`, {
      method: 'GET',
    });
    return response.json();
  },
};
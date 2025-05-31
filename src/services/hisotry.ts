export const historyService = {
  getHistories: async (userId: string) => {
    const response = await fetch(`/api/history?userId=${userId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch histories');
    }

    return response.json();
  },

  createHistory: async (data: {
    srcLangCode: string;
    tarLangCode: string;
    content: string;
    userId: string;
  }) => {
    const response = await fetch('/api/history', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create history');
    }

    return response.json();
  },
};
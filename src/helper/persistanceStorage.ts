export const setItem = (key: string, data: any) => {
  try {
    console.log('Setting data to localStorage:', data);
    localStorage.setItem(key, JSON.stringify(data));
    console.log('Data successfully set to localStorage.');
  } catch (e) {
    console.error('Error in setting data to localStorage', e);
  }
};

export const getItem = (key: string) => {
  try {
    const item = localStorage.getItem(key);
    const parsedItem = item ? JSON.parse(item) : null;
    return parsedItem;
  } catch (e) {
    console.error('Error in getting data from localStorage', e);
    return null;
  }
};

export const ADD_INFO_USER = 'ADD_INFO_USER';

export const fetchAPIToken = async () => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const jsonData = await response.json();
  return jsonData;
};

export const userInfo = (payload) => ({
  type: ADD_INFO_USER,
  payload,
});

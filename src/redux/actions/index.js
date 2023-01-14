export const ADD_INFO_USER = 'ADD_INFO_USER';
export const ADD_TOTAL_SCORE = 'ADD_TOTAL_SCORE';
export const ADD_ASSERTIONS = 'ADD_ASSERTIONS';

export const fetchAPIToken = async () => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const jsonData = await response.json();
  return jsonData;
};

export const fetchAPIQuest = async () => {
  const getToken = localStorage.getItem('token');
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${getToken}`);
  const jsonData = await response.json();
  return jsonData.results;
};

export const userInfo = (payload) => ({
  type: ADD_INFO_USER,
  payload,
});

export const addTotalScore = (payload) => ({
  type: ADD_TOTAL_SCORE,
  payload,
});

export const addAssertions = (payload) => ({
  type: ADD_ASSERTIONS,
  payload,
});

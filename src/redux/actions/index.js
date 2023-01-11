const fetchAPIToken = async () => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const jsonData = await response.json();
  return jsonData;
};

export default fetchAPIToken;

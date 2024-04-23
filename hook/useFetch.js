// import { RAPID_API_KEY } from '@env';
import axios from 'axios';
import React from 'react';

const RAPID_API_KEY = '14ecdde4e9msh0865aedafea2f86p135a11jsn0d3f4d2f6523';
// const RAPID_API_KEY = '744818e344msheeb837c65ce679dp145544jsn0087e518ea4c';

function useFetch(endpoint, query) {
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const options = {
    method: 'GET',
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      'X-RapidAPI-Key': RAPID_API_KEY,
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
    },
    params: { ...query },
  };

  const fetchData = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.request(options);
      setData(response.data.data);
    } catch (err) {
      setError(err);
      alert('There is a fetch error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    error,
    isLoading,
    refetch: fetchData,
  };
}

export default useFetch;

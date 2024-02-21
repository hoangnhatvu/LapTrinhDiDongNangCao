import axios from 'axios';
import {useEffect, useState} from 'react';
import {API_URL} from "@env"

const useFetch = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    const page = 1;
    const limit = 20;
    setIsLoading(true);
    console.log(`${API_URL}products/search?page=1&limit=20`)
    
    try {
      
      const response = await axios.post(
        `${API_URL}products/search?page=1&limit=20`,
      );
      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error)
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };
  return {data, isLoading, error, refetch};
};
export default useFetch

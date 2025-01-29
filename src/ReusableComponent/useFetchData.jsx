import { useEffect } from "react";
import axios from "axios";
import { data } from "react-router";

const useFetchData = (url, setData) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [url, setData]); // Ensure the hook re-fetches if URL or setData changes
};

export default useFetchData;

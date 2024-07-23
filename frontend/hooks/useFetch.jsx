"use client";
import { NEXT_PUBLIC_BACKEND } from "@/constants/env";
import { useState, useEffect } from "react";

function useFetch(url, cofig = {}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await fetch(`${NEXT_PUBLIC_BACKEND}${url}`, cofig);
        const returnedData = await response.json();
        setData(returnedData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err?.message ?? "Error fetching data");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return [data, loading, error];
}

export default useFetch;

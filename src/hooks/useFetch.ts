import axios from "axios";
import { useState, useEffect } from "react";

interface Todos {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface response {
  todos: Todos[];
}

// Auto Refreshing hook
export const useFetch = (n: number) => {
  const [todos, setTodos] = useState<Todos[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    //keep pooling the backend every n seconds
    const value = setInterval(() => {
      axios
        .get<response>("https://sum-server.100xdevs.com/todos")
        .then((res) => {
          setTodos(res.data.todos);
          setLoading(false);
        })
        .catch(() => {
          setError(true);
          setLoading(false);
        });
    }, n * 1000);

    // fetch data once from backend
    axios
      .get<response>("https://sum-server.100xdevs.com/todos")
      .then((res) => {
        setTodos(res.data.todos);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });

    //clean up my interval if n changes
    return () => {
      clearInterval(value);
    };
  }, [n]);

  return {
    todos,
    loading,
    error,
  };
};

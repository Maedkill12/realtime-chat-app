import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { loginRoute, registerRoute } from "../utils/APIRoutes";

const useAuth = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);

  const signup = useCallback(
    async (username, email, password) => {
      setError(null);
      setIsLoading(true);
      try {
        const response = await axios.post(registerRoute, {
          username,
          email,
          password,
        });
        if (!isCancelled) {
          setIsLoading(false);
          setError(null);
          return response.data;
        }
      } catch (error) {
        if (!isCancelled) {
          const msg = error.response.data.err;
          setError(msg);
          setIsLoading(false);
          return error.response.data;
        }
      }
    },
    [isCancelled]
  );

  const login = useCallback(
    async (username, password) => {
      setError(null);
      setIsLoading(true);
      try {
        const response = await axios.post(loginRoute, {
          username,
          password,
        });
        if (!isCancelled) {
          setIsLoading(false);
          setError(null);
          return response.data;
        }
      } catch (error) {
        if (!isCancelled) {
          const msg = error.response.data.err;
          setError(msg);
          setIsLoading(false);
          return error.response.data;
        }
      }
    },
    [isCancelled]
  );

  useEffect(() => {
    setIsCancelled(false);
    return () => setIsCancelled(true);
  }, []);

  return { error, isLoading, signup, login };
};

export default useAuth;

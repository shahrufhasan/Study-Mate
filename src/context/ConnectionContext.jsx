import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

const ConnectionContext = createContext();

export const ConnectionProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchConnections = async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://study-mate-server-liard.vercel.app/my-conncetion?email=${user.email}`
      );
      const data = await res.json();
      if (data.success && Array.isArray(data.result)) {
        setConnections(data.result);
      } else {
        setConnections([]);
      }
    } catch (err) {
      console.error(err);
      setConnections([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, [user?.email]);

  return (
    <ConnectionContext.Provider
      value={{ connections, setConnections, fetchConnections, loading }}
    >
      {children}
    </ConnectionContext.Provider>
  );
};

export const useConnections = () => useContext(ConnectionContext);

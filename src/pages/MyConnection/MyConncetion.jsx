import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthContext";

const MyConncetion = () => {
  const { user } = useContext(AuthContext);
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/my-conncetion?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setConnections(data.result); // store the array of connections
        })
        .catch((err) => console.error(err));
    }
  }, [user?.email]);

  return (
    <div>
      <h2>My Connections</h2>
      {connections.length === 0 && <p>No connections found.</p>}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {connections.map((conn) => (
          <div
            key={conn._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <img
              src={conn.profileImage}
              alt={conn.name}
              style={{ width: 50, height: 50, borderRadius: "50%" }}
            />
            <div>
              <h3>{conn.name}</h3>
              <p>
                Subject: {conn.subject} | Study Mode: {conn.studyMode}
              </p>
              {conn.description && <p>{conn.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyConncetion;

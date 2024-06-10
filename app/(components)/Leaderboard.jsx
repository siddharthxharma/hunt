"use client"

import { useEffect, useState } from 'react';

export default function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/leaderboard');

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Leaderboard</h1>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {user.username}: Level {user.level}
          </li>
        ))}
      </ul>
    </div>
  );
}

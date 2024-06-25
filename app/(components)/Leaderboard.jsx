'use client';

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
    <div className='grid place-content-center'>
      <h1 className='text-center py-8'>Leaderboard</h1>
      <div className='w-screen'>
        <div className='flex justify-between w-5/12 mx-auto py-2 my-2'>
            <div>Name</div>
            <div>Level</div>
          </div>
      {users.map((user, index) => (
          <div key={index} className='flex justify-between w-5/12 mx-auto py-2 my-2'>
            <div>{user.username}</div>
            <div>{user.level}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

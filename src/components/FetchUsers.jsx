import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { deleteFetchedUser } from '../features/users/usersSlice'; // Import the action

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('https://dummyjson.com/users');
  console.log(response.data); // Check if 'users' and 'name' exist
  return response.data;
});

const FetchUsers = () => {
  const dispatch = useDispatch();
  const { fetchedUsers: users, status, error } = useSelector((state) => state.users);
  const [delayComplete, setDelayComplete] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());

    const timer = setTimeout(() => {
      setDelayComplete(true);
    }, 6000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  const isLoading = status === 'loading' || !delayComplete;

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center bg-white border border-gray-300 shadow-md rounded w-full h-full p-4">
        <img src="./images/loading.gif" alt="Loading animation" className="w-full h-full" />
        <h1 className="text-gray-700 font-medium mt-2">Loading users...</h1>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="flex flex-col justify-center items-center bg-white border border-red-300 shadow-md shadow-inside rounded w-full h-full p-4">
        <img src="./images/failed.gif" alt="Error loading" className="w-full h-full" />
        <h1 className="text-red-800 font-bold mt-2">Failed to load users.</h1>
        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center bg-white border border-gray-300 shadow-md rounded w-full h-full p-4">
        <p className="text-gray-600">No users found.</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-2 bg-white border border-gray-300 shadow-md rounded w-full h-[500px] p-4 overflow-y-auto scrollbar-hide">
      {users.map((user) => (
        <li
          key={user.id}
          className="flex items-center justify-between p-3 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition duration-200"
        >
          <div className="flex items-center gap-5">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-200 text-black font-bold">
              {(user.name.charAt(0) || '?').toUpperCase()}
            </div>
            <span className="text-black font-medium">{user.name || 'Unknown'}</span>
          </div>
          <button
            onClick={() => dispatch(deleteFetchedUser(user.id))}
            className="bg-red-400 text-white font-semibold px-3 py-1 rounded hover:bg-red-600 transition w-[10%] h-[85%]"
          >
            <img src="/images/bin.png" alt="" />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default FetchUsers;

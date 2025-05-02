import React from 'react';
import UserForm from './components/userForm';
import UserList from './components/UserList';
import FetchUsers from './components/FetchUsers';
import "./App.css";

function App() {
  return (
    <>
    <h5>Valdez, Samuel, C.</h5>
    <div className="flex justify-center items-center h-screen w-full p-4 bg-no-repeat bg-cover" style={{ backgroundImage: `url("./images/landscape.jpg")` }}>
      <div className="flex flex-row gap-8 overflow-y-auto scrollbar-hide w-full items-center">
        
        <div className="flex flex-col justify-center items-start bg-black/20 backdrop-blur-sm border border-violet/30 shadow-xl rounded-2xl p-8 w-[90vw] h-[700px] max-w-[600px]">

          <UserForm />
        </div>
        
        
        <div className="flex flex-col items-center bg-black/20 backdrop-blur-sm border border-white/30- shadow-slate-800/50 rounded-xl p-8 w-[90vw] h-[700px] max-w-[600px]">
          <h2 className="text-2xl text-black font-semibold text-slate-100 mb-4 border-b border-black pb-2 w-full text-center">
            Fetched Users
          </h2>
          <FetchUsers />
        </div>
        
        
        <div className="flex flex-col items-center bg-black/20 backdrop-blur-sm border border-white/30 shadow-slate-800/50 rounded-xl p-8 w-[90vw] h-[700px] max-w-[600px]">
          <h2 className="text-2xl text-black font-semibold text-slate-100 mb-4 border-b border-black pb-2 w-full text-center">
            Manually Added Users
          </h2>
          <UserList />
        </div>
      </div>
    </div>
    </>
  );
}

export default App;

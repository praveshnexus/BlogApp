import React from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';

function LogoutBtn() {
  const dispatch = useDispatch()
  const logoutHandler = () => {
      authService.logout().then(() => {
          dispatch(logout())
      })
  }
return (
  <button
  className='inline-bock px-6 py-2 rounded-full text-white duration-200transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 '
  onClick={logoutHandler}
  >Logout</button>
)
}

export default LogoutBtn

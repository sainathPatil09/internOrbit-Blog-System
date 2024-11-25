import React from 'react'
import { useAuth } from '../context/AuthProvider'

const MyProfile = () => {
  const{profile} = useAuth()
  return (
    <>
      <div className=' w-full flex-col text-center gap-4 flex justify-center items-center mt-32 '>
        <div 
        className='space-y-4 hover:border-2 p-4 rounded-xl transition duration-300 transform hover:border-yellow-300 hover:shadow-2xl'>
          <div>
            <img className='w-56 h-56 rounded-full' src={profile?.photo?.url} alt="" />
          </div>
          <div className='text-2xl'>
            {profile?.name}
          </div>
          <div className=' flex flex-row gap-4'>
            <div>
            <p className='text-xl text-red-500 '>{profile?.role}</p>
            <p className=''>Role</p>
            </div>
            <div>
            <p className='text-xl text-red-500 '>{profile?.email}</p>
            <p>Email</p>
            </div>
          </div>
          <div>
            <button className='bg-green-500 px-4 py-2 rounded-lg font-semibold hover:text-white'>Edit profile</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyProfile

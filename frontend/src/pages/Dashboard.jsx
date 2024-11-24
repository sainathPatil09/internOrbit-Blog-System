import React, { useState } from 'react'
import MyProfile from '../dashboard/MyProfile'
import CreateBlog from '../dashboard/CreateBlog'
import UpdateBlog from '../dashboard/UpdateBlog'
import MyBlogs from '../dashboard/MyBlogs'
import SideBar from '../dashboard/SideBar'

const Dashboard = () => {
  const [component, setComponent] = useState("My Blogs")
  return (
    <>
      <div>
        <div>
          <SideBar component={component} setComponent={setComponent} />
          <div className='md:ml-72'>

            {component === 'My Profile' ? (<MyProfile />) :
              component === 'Create Blog' ? (<CreateBlog />) :
                component === 'Update Blog' ? (<UpdateBlog />) :
                  (<MyBlogs />)}
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard

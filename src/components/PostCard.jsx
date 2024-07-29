import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {
    
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4 text-black   duration-200transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500  duration-300'>
            <div className='w-full justify-center mb-4'>
                <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
                className='rounded-xl ' />

            </div>
            <h2
            className='text-xl font-bold'
            >{title}</h2>

            <h2></h2>
        </div>
    </Link>
  )
}


export default PostCard
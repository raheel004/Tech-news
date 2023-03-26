import React, { useEffect } from 'react'
import { useGlobalContext } from './Context';
import Pagination from './Pagination';

const Stories = () => {
    const {hits, isloading, removePost} = useGlobalContext();

         if (isloading){

        return(
            <><h2>Loading....</h2></>
        );
    };
  return (
   <>
   <Pagination />
   <div className='stories-div'>
    {hits.map((curPost) => {
        const { title, author, objectID, url, num_comments } = curPost;
        return(
       
            <div className='card' key={objectID}>
                <h2>{title}</h2>
                <p>By <span>{author}</span> | <span>{num_comments}</span>comments</p>
                <div className='card-button'>
                    <a href={url} target="_blank">
                        Read More
                    </a>
                    <a href="#" onClick={ () => removePost(objectID)}>
                     Remove</a>
                </div>
            </div>
       
        )
    })}
    </div>
   </>
  )
}

export default Stories
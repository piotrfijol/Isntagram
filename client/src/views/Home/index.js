import React, { useEffect, useState } from 'react'
import Post from '../../components/Post'
import usePrivateAxios from '../../hooks/usePrivateAxios'
import { InfiniteScroll } from '../../components/InfiniteScroll';
import { LoadingDots } from '../../components/placeholders/LoadingDots'
import { useErrors } from '../../hooks/useErrors';

export default function Home() {

  const axiosPrivate = usePrivateAxios();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [seenAll, setSeenAll] = useState(false);
  const {setError} = useErrors();

  const fetchPosts = (page, signal) => {

    if(!Number.isInteger(page)) throw new TypeError("Page parameter must be a number")

    const config = signal ? {signal} : {};

    return axiosPrivate.get(`/api/posts?p=${page}`, config)
    .then((response) => {
      const {posts} = response.data;

      if(posts.length > 0) {
        setPosts((prev) => [...prev, ...posts]);
        setPage((page) => page+1);
      } else {
        setSeenAll(true);
      }
    }).catch((err) => {
      if(err.response) setError(err.response.data.msg);
    });

  };
  


  const scrollHandler = (ev) => {
    fetchPosts(page);
  };

  useEffect(() => {
    const aController = new AbortController();
    const signal = aController.signal;

    fetchPosts(page, signal);
    
    return () => {    
      aController.abort();
    }
  }, []);


  return (
      (
        <InfiniteScroll 
          itemsLength={posts.length}
          handler={scrollHandler}
          finalMessage={
              <div>
                <p style={{textAlign: 'center'}} className="neglible">You've seen it all</p>
              </div>
          }
          loader={<LoadingDots />}
          seenAll={seenAll}
        >
            {
              posts.map((post) => {
                return <Post key={post._id} post={post} />; 
              })
            }
        </InfiniteScroll>          
          
      )
  )
}

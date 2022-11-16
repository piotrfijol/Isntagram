import React, { useEffect, useState } from 'react'
import Post from '../../components/Post'
import usePrivateAxios from '../../hooks/usePrivateAxios';

export default function Home() {

  const axiosPrivate = usePrivateAxios();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const aController = new AbortController();
    const signal = aController.signal;

    axiosPrivate.get("/api/posts", {
      signal
    }).then((response) => {
      setPosts(response.data.posts);
    });

    return () => {
      aController.abort();
    }
  }, []);

  return (
    <React.Fragment>
      {
        posts.map((post) => {
          return <Post post={post} />; 
        })
      }
    </React.Fragment>
  )
}

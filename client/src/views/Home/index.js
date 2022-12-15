import React, { useEffect, useRef, useState } from 'react'
import Post from '../../components/Post'
import usePrivateAxios from '../../hooks/usePrivateAxios'
import { LoadingDots } from '../../components/placeholders/LoadingDots'

export default function Home() {

  const axiosPrivate = usePrivateAxios();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [seenAll, setSeenAll] = useState(false);

  const fetchPosts = (signal, page) => {
      
    if(!Number.isInteger(page)) throw new TypeError("Page parameter must be a number")

    return axiosPrivate.get(`/api/posts?p=${page}`, {
      signal
    })

  };
  
  const scrollHandler = (ev) => {
    let footer = document.querySelector(".lazyload-threshold").getBoundingClientRect();

    if(footer.top <= window.innerHeight) {
        if(!loading && !seenAll) {
          setLoading(true);
          axiosPrivate.get(`/api/posts?p=${page}`)
          .then((response) => {
            const {posts} = response.data;

            if(posts.length > 0) {
              setPosts((prev) => [...prev, ...posts]);
              setPage((page) => page+1);
            } else {
              setSeenAll(true);
              setLoading(false);
            }
          }).catch((err) => {
            console.error(err);
          }).finally(() => {
            setLoading(false);
          })
        }
    }
  }

  useEffect(() => {
    const aController = new AbortController();
    const signal = aController.signal;

    fetchPosts(signal, page).then((response) => {
      setPage((page) => page+1);
      setPosts((prev) =>  {
       return [...prev, ...response.data.posts]
      });
    }).catch((err) => {
      console.error(err);
    }).finally(() => {
      setLoading(false);
    });

    return () => {    
      aController.abort();
    }
  }, []);


  return (
      (
        
        <div className="lazyload__container" style={{width: '100%', overflowY: 'scroll'}} onScrollCapture={scrollHandler}>
          
          {
            posts.map((post) => {
              return <Post key={post._id} post={post} />; 
            })
          }
        
          {
            loading 
              ? <LoadingDots />
              : null
          }
          <div 
            className="lazyload-threshold"
            style={
              {
                width: "100%",
                height: "50px",
                marginTop: "70px"
              }
            }
          ></div>
          {
            seenAll ? (
              <div>
                <p style={{textAlign: 'center'}} className="neglible">You've seen it all</p>
              </div>
            ) : null
          }
        </div>
      )
  )
}

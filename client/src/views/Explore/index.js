import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import usePrivateAxios from '../../hooks/usePrivateAxios';
import './Explore.scss';

export default function Explore() {

    const [posts, setPosts] = useState([]);
    const axiosPrivate = usePrivateAxios();

    useEffect(() => {
        const controller = new AbortController();
        const {signal} = controller;

        axiosPrivate.get("/api/posts/explore", {
            signal
        }).then((response) => {
            setPosts(response.data.posts);
        });

        return () => {
            controller.abort();
        }
    }, [setPosts]);

  return (
    <div className="posts-gallery">
        {
            posts.map((post) => {
                return (
                    <Link to={`/p/${post._id}`} >
                        <div className="posts-gallery__thumbnail">
                            <img 
                                src={post.imgURL}
                            />
                        </div>
                    </Link>
                ) 
            })
        }
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { PostThumbnail } from '../../components/PostThumbnail';
import { LoadingDots } from '../../components/placeholders/LoadingDots'
import usePrivateAxios from '../../hooks/usePrivateAxios';
import './Explore.scss';

export default function Explore() {

    const [posts, setPosts] = useState([]);
    const axiosPrivate = usePrivateAxios();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();
        const {signal} = controller;

        axiosPrivate.get("/api/posts/explore", {
            signal
        }).then((response) => {
            setPosts(response.data.posts);
        }).catch((err) => {

        }).finally(() => {
            setLoading(false);
        });

        return () => {
            controller.abort();
        }
    }, [setPosts]);

  return (
    loading ? <LoadingDots />
    : (
        <div className="posts-gallery">
        {
            posts.map((post) => {
                return (
                    <Link key={post._id} to={`/p/${post._id}`} >
                        <PostThumbnail post={post} className="posts-gallery__thumbnail"/>
                    </Link>
                ) 
            })
        }
        </div>
    )
  )
}

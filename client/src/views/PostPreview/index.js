import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { LoadingDots } from '../../components/placeholders/LoadingDots';
import Post from '../../components/Post'
import usePrivateAxios from '../../hooks/usePrivateAxios';

export default function PostPreview() {

  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState(null);
  const params = useParams();
  const axiosPrivate = usePrivateAxios();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setIsLoading(true);

    axiosPrivate(`/api/post/${params.postId}`, {
      signal
    })
      .then((response) => {
        setPost(response.data);
        setIsLoading(false);
      })

      return () => {
        controller.abort();
        setIsLoading(false);
      }

  }, [setPost]);
  
  return (
      isLoading ? 
        <LoadingDots />
      : (
      <Post 
        post={post}
        variant="preview"
      />
    )
  )
}

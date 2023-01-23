import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { LoadingDots } from '../../components/placeholders/LoadingDots';
import Post from '../../components/Post'
import { useErrors } from '../../hooks/useErrors';
import usePrivateAxios from '../../hooks/usePrivateAxios';

export default function PostPreview() {

  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState(null);
  const params = useParams();
  const axiosPrivate = usePrivateAxios();
  const {setError} = useErrors();

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
      }).catch((err) => {
        setError(err.response.data.msg);
      });

      return () => {
        controller.abort();
        setIsLoading(false);
      }

  }, [setPost]);
  
  return (
      isLoading ? 
        <LoadingDots />
      : (
        <div class='content'>
          <Post 
            post={post}
            variant="preview"
          />

        </div>
    )
  )
}

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { PostThumbnail } from '../../components/PostThumbnail';
import { LoadingDots } from '../../components/placeholders/LoadingDots'
import usePrivateAxios from '../../hooks/usePrivateAxios';
import {SlMagnifier} from 'react-icons/sl';
import './Explore.scss';
import { useErrors } from '../../hooks/useErrors';

export default function Explore() {

    const [posts, setPosts] = useState([]);
    const axiosPrivate = usePrivateAxios();
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isSuggestionVisible, setIsSuggestionVisible] = useState(false);
    const {setError} = useErrors();

    useEffect(() => {
        const controller = new AbortController();
        const {signal} = controller;

        axiosPrivate.get("/api/posts/explore", {
            signal
        }).then((response) => {
            setPosts(response.data.posts);
        }).catch((err) => {
            if(err.response)
                if(err.response) setError(err.response.data.msg);
        }).finally(() => {
            setLoading(false);
        });

        return () => {
            controller.abort();
        }
    }, [setPosts]);

    const handleSearch = (ev) => {
        setSearch(ev.target.value);
        axiosPrivate.get('/api/search', {params: {'q': ev.target.value}})
            .then((response) => {
                const data = response.data[response.data.type]
                setSuggestions(data)
            }).catch((err) => {
                if(err.response) setError(err.response.data.msg);
            });
    };


    const showSuggestions = () => {
        setIsSuggestionVisible(true);
    };

    const hideSuggestions = () => {
        setIsSuggestionVisible(false);
    };

  return (
    loading ? <LoadingDots />
    : (
        <div className='content'>
            <div className="searchbar">
                <div className="searchbox">
                </div>
                
                <SlMagnifier />
                    <input type="search" onChange={handleSearch} value={search} onFocus={showSuggestions} />
                    {isSuggestionVisible 
                        ? (<div className="suggestions"  onBlur={hideSuggestions} >
                            {suggestions.map((suggestion) => {
                                let isUser = true;
                                let name = suggestion.username || suggestion.name;
                                if(search.startsWith("#")) {
                                    name = "#" + name;
                                    isUser = false;
                                }

                                return (<div className="suggestions__suggestion">
                                    <Link to={isUser ? `/profile/${name}` : `/tags/${name.slice(1)}`}>{name}</Link>
                                </div>)
                        })}
                        </div>) 
                        : null}
            </div>
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
        </div>
    )
  )
}

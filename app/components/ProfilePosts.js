import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Axios from "axios";
import LoadingDotsIcon from "./LoadingDotsIcon";
import Post from "./Post";

function ProfilePosts(props) {
    const { username } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const ourRequest = Axios.CancelToken.source();

        async function fetchPosts() {
            try {
                const response = await Axios.get(`/profile/${username}/posts`, { cancelToken: ourRequest.token });
                setPosts(response.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error.response.data);
            }
        }
        fetchPosts();
        return () => {
            ourRequest.cancel();
        };
    }, [username]);

    if (isLoading)
        return (
            <div>
                <LoadingDotsIcon />
            </div>
        );

    return (
        <div className="list-group">
            {posts.map(post => {
                return <Post noAuthor={true} post={post} key={post._id} />;
            })}
        </div>
    );
}

export default ProfilePosts;

import React, { useState, useEffect } from 'react'

const DisplayPosts = () => {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [comment, setComment] = useState([]);
    const [activeButton, setActiveButton] = useState('posts');

    const bgStyle = {
        background: 'black',
        color: 'white',
        padding: '0.5rem'

    }



    const postUrl = 'https://jsonplaceholder.typicode.com/posts';
    const usersUrl = 'https://jsonplaceholder.typicode.com/users';
    const commentsUrl = 'https://jsonplaceholder.typicode.com/comments';

    const fetchData = async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw Error('Error fetching data')
            }
            const result = response.json();
            return result;
        } catch (error) {
            console.log(error)
        }
    }


    const fetchPost = async () => {
        const data = await fetchData(postUrl)
        setPosts(data)
    }

    const fetchUsers = async () => {
        const data = await fetchData(usersUrl)
        setUsers(data)
    }
    const fetchComments = async () => {
        const data = await fetchData(commentsUrl)
        setComment(data)
    }

    useEffect(() => {

        fetchPost()
        fetchUsers()
        fetchComments()
    },[])

    const handleClick = (button) => {
        setActiveButton(button);
    }

    const renderData = () => {
        switch (activeButton) {
            case 'posts': 
            return (
                <div>
                    {posts && posts.map((post) => (
                        <div key={post.id}>
                            <h3>{post.title}</h3>
                            <p>{post.body}</p>

                        </div>
                    ))}
                </div>
            )
            case 'users':
                return (
                    <div>
                        {users && users.map((user) => (
                            <div key={user.id}>
                                <h3>{user.name}</h3>
                                <p>{user.email}</p>

                            </div>
                        ))}
                    </div>
                )
            case 'comments':
                return (
                    <div>
                        {comment && comment.map((commentItem) => (
                            <div key={commentItem.id}>
                                <h3>{commentItem.name}</h3>
                                <p>{commentItem.body}</p>

                            </div>
                        ))}
                    </div>
                );
            default:
                return null;
        }
    }
  return (
    <div>
        <div style={{display: 'flex', gap: '10'}}>
            <button style={bgStyle} onClick={() => handleClick('posts')}>Posts</button>
            <button style={bgStyle} onClick={() => handleClick('users')}>Users</button>
            <button style={bgStyle} onClick={() => handleClick('comments')}>Comments</button>

        </div>
        {renderData()}
        
    </div>
  )
}

export default DisplayPosts
import React, { useEffect, useState } from 'react'
import UserHeader from '../components/UserHeader'
import UserPost from '../components/UserPost'
import { useParams } from 'react-router-dom';
import useShowToast from '../../hooks/useShowToast';
import { Flex, Spinner } from '@chakra-ui/react';
import Post from '../components/Post';
import { useRecoilState } from 'recoil';
import postsAtom from '../../atoms/postsAtom';
import useGetUserProfile from '../../hooks/useGetUserProfile';

const UserPage = () => {
  const { user, loading } = useGetUserProfile();
  const {username} = useParams();
  const [posts,SetPosts] = useRecoilState(postsAtom);
  const[fetchingPosts,setFetchingPosts] = useState(false);
  const showToast = useShowToast();

  useEffect(() => {
    const getUserPosts = async() => {
      if(!user) return;
      setFetchingPosts(true);
      try {
        const res = await fetch(`/api/posts/user/${username}`);
        const data = await res.json();
        if(data.error){
          showToast("Error", data.error, "error");
          return;
        }
        console.log(data);
        SetPosts(data);
        
      } catch (error) {
        showToast("Error", error.message, "error");
        SetPosts([]);
      }finally{
        setFetchingPosts(false);
      }
    }
    getUserPosts();
    
  }, [username,showToast,SetPosts]);
  console.log("Posts are here and it is recoil", posts)

  if (!user && loading) {
		return (
			<Flex justifyContent={"center"}>
				<Spinner size={"xl"} />
			</Flex>
		);
	}

	if (!user && !loading) return <h1>User not found</h1>;



  return (
    <div>
      <UserHeader user ={user}/>
      {!fetchingPosts && posts.length === 0 && <h1>User has not posts.</h1>}
			{fetchingPosts && (
				<Flex justifyContent={"center"} my={12}>
					<Spinner size={"xl"} />
				</Flex>
			)}

			{posts.map((post) => (
				<Post key={post._id} post={post} postedBy={post.postedBy} />
			))}
    </div>
  )
}

export default UserPage
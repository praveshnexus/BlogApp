import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";
import authService from "../appwrite/auth";

function MyPost() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      appwriteService.getMyPosts(user.$id).then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
        setLoading(false); // Set loading to false after fetching posts
      });
    }
  }, [user]);

  if (loading) {
    return <div className="w-full py-8">Loading...</div>; // Display a loading message while fetching data
  }

  return (
    <div className="w-full py-8">
      <Container>
        {posts.length === 0 ? (
          <div className="text-center w-full py-8">No posts created yet.</div>
        ) : (
          <div className="flex flex-wrap">
            {posts.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default MyPost;

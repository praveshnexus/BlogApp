import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";
import authService from "../appwrite/auth";

function MyPost() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await authService.getCurrentUser();

        setUser(currentUser);
      } catch (error) {
        setError("Failed to fetch user");
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      appwriteService
        .getMyPosts(user.$id)
        .then((response) => {
          if (response && response.documents) {
            setPosts(response.documents);
          } else {
            setError("Failed to fetch posts");
          }
          setLoading(false); // Set loading to false after fetching posts
        })
        .catch((error) => {
          setError("Failed to fetch posts");
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) {
    return <div className="w-full py-8">Loading...</div>; // Display a loading message while fetching data
  }

  if (error) {
    return <div className="w-full py-8">{error}</div>; // Display an error message if something goes wrong
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

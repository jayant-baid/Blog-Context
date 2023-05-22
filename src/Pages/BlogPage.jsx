import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { baseUrl } from '../baseUrl';
import Header from '../components/Header';
import BlogDetails from '../components/BlogDetails';

const BlogPage = () => {

    const [blog, setBlog] = useState(null);
    const [relatedBlogs, setRelatedBlogs] = useState([]);
    const location = useLocation();
    const navigation = useNavigate();

    const { loading, setLoading } = useContext(AppContext);

    const blogId = location.pathname.split('/').at(-1);

    async function fetchRelatedBlogs() {
        setLoading(true);

        let url = `${baseUrl}/get-blog?blogId=${blogId}`;
        console.log("URL:");
        console.log(url);

        try {
            const result = await fetch(url);
            const data = await result.json();

            console.log(data);

            setBlog(data.blog);
            setRelatedBlogs(data.relatedBlogs);

        }
        catch (error) {
            console.log("Got Error in Blog Id Call in Blog Page");
            setBlog(null);
            setRelatedBlogs([]);
        }
        setLoading(false);
    }

    useEffect(() => {
        if (blogId)
            fetchRelatedBlogs();
    }, [location.pathname]);

    return (
        <div>
            <Header />
            <div className=' my-[100px]'>
                <div className="w-11/12 max-w-2xl mx-auto">
                    <button onClick={() => navigation(-1)} className="border-2 border-gray-300 py-1 px-4 rounded-md ">
                        Back
                    </button>
                </div>

                {
                    loading ? (<p className="w-11/12 max-w-2xl mx-auto font-bold text-2xl py-2">Loading</p>) : blog ? (
                        <div>
                            <BlogDetails post={blog} />
                            <h2 className="w-11/12 max-w-2xl mx-auto font-bold text-2xl py-2 underline">Related Blogs</h2>
                            {
                                relatedBlogs.map((post) => (
                                    <div>
                                        <BlogDetails key={post.id} post={post} />
                                    </div>
                                ))
                            }
                        </div>
                    ) : (
                        <div>
                            <p>No Blog Found</p>
                        </div>
                    )

                }

            </div>

        </div>
    )
}

export default BlogPage
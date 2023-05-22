import "./App.css";
import { useContext, useEffect } from "react";
import { AppContext } from "./context/AppContext";
// import Header from "./components/Header";
// import Blogs from "./components/Blogs";
// import Pagination from "./components/Pagination";
import { Route, Routes, useLocation, useSearchParams } from "react-router-dom";

import Home from "./Pages/Home";
import { TagPage } from "./Pages/TagPage";
import BlogPage from "./Pages/BlogPage";
import CategoryPage from "./Pages/CategoryPage";

export default function App() {
  const { fetchBlogPosts } = useContext(AppContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {

    // ?? synatax for defult value h agar value mili toh woh nhi toh dusri wali
    const page = searchParams.get('page') ?? 1;

    if (location.pathname.includes('tags')) {
      // Show Tag wala page

      // last / ke baad ki value le aao
      const tag = location.pathname.split('/').at(-1).replace('-', " ");
      // tag me jo - h uski jagah space chahie so replace
      fetchBlogPosts(Number(page), tag);

    }
    else if (location.pathname.includes('categories')) {
      const category = location.pathname.split('/').at(-1).replaceAll('-', " ");
      // tag me jo - h uski jagah space chahie so replace
      fetchBlogPosts(Number(page), null, category);
    }
    else {
      // normal call
      fetchBlogPosts(Number(page));
    }

  }, [location.pathname, location.search]);

  return (

    <Routes>
      <Route path="/" element={<Home />} />
      {/* Dynamic parameter- jb blog likha hoga link me and uske aage jo bhi likha hoga woh blodId bn jaega */}
      <Route path="/blog/:blogId" element={<BlogPage />} />
      <Route path="/tags/:tag" element={<TagPage />} />
      <Route path="/categories/:category" element={<CategoryPage />} />
    </Routes>

    // <div>
    //   <Header />
    //   <div className="my-[100px]">
    //     <Blogs />
    //     <Pagination />
    //   </div>
    // </div>
  );
}

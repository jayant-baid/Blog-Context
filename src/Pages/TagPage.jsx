import React from 'react'
import Header from '../components/Header'
import Pagination from '../components/Pagination'
import { useLocation, useNavigate } from 'react-router-dom'
import Blogs from '../components/Blogs'

export const TagPage = () => {

    const navigation = useNavigate();
    const location = useLocation();

    const tag = location.pathname.split('/').at(-1);

    return (
        <div>
            <Header />

            <div className="my-[100px]">

                <div className="w-11/12 max-w-2xl mx-auto">
                    <button onClick={() => navigation(-1)} className="border-2 border-gray-300 py-1 px-4 rounded-md">
                        Back
                    </button>

                    <h2 className="font-bold text-2xl pt-2 underline">Blogs Tagged <span>#{tag}</span></h2>
                </div>

                <Blogs />
                <Pagination />
            </div>
        </div>
    )
}

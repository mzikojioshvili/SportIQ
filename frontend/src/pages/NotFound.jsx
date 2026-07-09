import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {

    return (
        <div className="h-screen bg-black flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-[80px] font-black text-white leading-none tracking-tight mb-4">
                404
            </h1>
            <p className="text-lg font-bold text-white/40 tracking-[-0.01em] mb-10">
                This page was not found.
            </p>
            <Link
                to={"/"}
                className="bg-white text-black font-bold px-7 py-3 rounded-full text-sm hover:bg-white/90 transition-all duration-200 active:scale-[0.97] tracking-[-0.01em]"
            >
                Back to Home
            </Link>
        </div>
    )
}
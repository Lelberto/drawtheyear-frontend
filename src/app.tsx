import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar";

export function App() {
    return (
        <div className="bg-bgdty-dark">
            <Navbar />
            <Outlet />
        </div>
    );
}

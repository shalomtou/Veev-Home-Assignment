import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProjectList from './ProjectList';

const MyRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ProjectList />} />
                {/*TODO: Fill */}
            </Routes>
        </BrowserRouter>
    )
}

export default MyRoutes;
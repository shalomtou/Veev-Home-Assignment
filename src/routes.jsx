import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ProjectList from "./components/ProjectList";
import ProjectDetails from "./components/ProjectDetails";
import { Box } from "@mui/material";

const MyRoutes = () => {
  return (
    <BrowserRouter>
      <Box>
        <Link to={"../"} style={{ textDecoration: "none" }}>
          Back
        </Link>
      </Box>
      <Routes>
        <Route path='/' element={<ProjectList />} />
        <Route path='/projects/:id' element={<ProjectDetails />} />
        {/*TODO: Fill */}
      </Routes>
    </BrowserRouter>
  );
};

export default MyRoutes;

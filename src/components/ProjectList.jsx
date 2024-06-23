import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { projectListState } from "../state/atoms";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [statusFilter, setStatusFilter] = useState(""); // Initialize with empty string
  const setProjectList = useSetRecoilState(projectListState);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:3001/projects");
        setProjects(response.data);
        setFilteredProjects(response.data);
        setProjectList((prevProjectList) => [
          ...prevProjectList,
          ...response.data,
        ]);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [setProjectList]);

  // Handle status filter change
  const handleStatusFilterChange = (event) => {
    const selectedStatus = event.target.value;
    setStatusFilter(selectedStatus);

    if (selectedStatus === "") {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(
        (project) => project.status === selectedStatus
      );
      setFilteredProjects(filtered);
    }
  };

  return (
    <>
      <h1>Projects</h1>
      <div style={{ height: "100%", width: "100%" }}>
        {/* Status filter dropdown */}
        <FormControl style={{ marginBottom: "20px", minWidth: "10rem" }}>
          <InputLabel>Status Filter</InputLabel>
          <Select value={statusFilter} onChange={handleStatusFilterChange}>
            <MenuItem value=''>All</MenuItem>
            <MenuItem value='Planning'>Planning</MenuItem>
            <MenuItem value='In Progress'>In Progress</MenuItem>
            <MenuItem value='Completed'>Completed</MenuItem>
          </Select>
        </FormControl>

        {/* Project list table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align='center'>Project Name</TableCell>
                <TableCell align='center'>Project ID</TableCell>
                <TableCell align='center'>Start Date</TableCell>
                <TableCell align='center'>Estimated Completion Date</TableCell>
                <TableCell align='center'>Description</TableCell>
                <TableCell align='center'>Starting Budget</TableCell>
                <TableCell align='center'>Current Cost</TableCell>
                <TableCell align='center'>Current Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProjects.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  component={Link}
                  to={{
                    pathname: `/projects/${row.id}`,
                  }}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "table-row",
                  }}
                >
                  <TableCell align='center'>{row.name}</TableCell>
                  <TableCell align='center'>{row.id}</TableCell>
                  <TableCell align='center'>{row.startDate}</TableCell>
                  <TableCell align='center'>{row.completionDate}</TableCell>
                  <TableCell align='center'>{row.description}</TableCell>
                  <TableCell align='center'>{`$ ${row?.startingBudget?.toLocaleString()}`}</TableCell>
                  <TableCell align='center'>{`$ ${row?.currentCost?.toLocaleString()}`}</TableCell>
                  <TableCell align='center' style={{ fontWeight: "700" }}>{row.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default ProjectList;

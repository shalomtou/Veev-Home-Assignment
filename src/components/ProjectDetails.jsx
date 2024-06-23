import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  Button,
} from "@mui/material";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { projectListState } from "../state/atoms";

const ProjectDetails = () => {
  const { id } = useParams(); // Get project ID from URL params
  const [project, setProject] = useState(null); // State for selected project
  const [status, setStatus] = useState(""); // State for status update
  const [currentCost, setCurrentCost] = useState(0); // State for current cost
  const projects = useRecoilValue(projectListState);

  // Fetch project details based on ID
  useEffect(() => {
    if (!projects || !projects.length) return;
    const selectedProject = projects.find((proj) => proj.id === +id);
    if (selectedProject) {
      setProject(selectedProject);
      setStatus(selectedProject.status);
      setCurrentCost(selectedProject.currentCost);
    }
  }, [id, projects]);

  // Handle status update
  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;
    setStatus(newStatus);
  };

  // Handle current cost update
  const handleCostChange = async (event) => {
    const newCost = event.target.value;
    setCurrentCost(newCost);
  };

  // Save changes
  const handleSave = async () => {
    try {
      const result = await axios.put(`http://localhost:3001/projects/${id}`, {
        status,
        currentCost,
      });
      if (!result || !result.status || result.status !== 200)
        throw new Error(`Error saving project id :${id}`);
      console.log("Project updated successfully!");
      return result.data;
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>Project Details</h1>
      <div style={{ height: "100%", width: "100%" }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align='center'>Project Name</TableCell>
                <TableCell align='center'>Project ID</TableCell>
                <TableCell align='center'>Start Date</TableCell>
                <TableCell align='center'>Estimated Completion Date</TableCell>
                <TableCell align='center'>Current Status</TableCell>
                <TableCell align='center'>Description</TableCell>
                <TableCell align='center'>Starting Budget</TableCell>
                <TableCell align='center'>Current Cost</TableCell>
                <TableCell align='center'>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align='center'>{project.name}</TableCell>
                <TableCell align='center'>{project.id}</TableCell>
                <TableCell align='center'>{project.startDate}</TableCell>
                <TableCell align='center'>{project.completionDate}</TableCell>
                <TableCell align='center'>
                  <FormControl>
                    <InputLabel>Status</InputLabel>
                    <Select value={status} onChange={handleStatusChange}>
                      <MenuItem value='Planning'>Planning</MenuItem>
                      <MenuItem value='In Progress'>In Progress</MenuItem>
                      <MenuItem value='Completed'>Completed</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell align='center'>{project.description}</TableCell>
                <TableCell align='center'>{project.startingBudget}</TableCell>
                <TableCell align='center'>
                  <input
                    type='number'
                    value={currentCost}
                    onChange={handleCostChange}
                  />
                </TableCell>
                <TableCell align='center'>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default ProjectDetails;

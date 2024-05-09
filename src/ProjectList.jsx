import { React } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

// TODO: this must be moved to backend (data types are up to you)
// NOTE: This is just mock data not including all required fields
const rows = [
  { id: 1, name: "Project 1", startDate: '01-01-2024', completionDate: '01-10-2024', status: "Planning", },
  { id: 2, name: "Project 2", startDate: '01-01-2024', completionDate: '01-10-2024', status: "Planning", },
  { id: 3, name: "Project 3", startDate: '01-01-2024', completionDate: '01-10-2024', status: "Planning", },
  { id: 4, name: "Project 4", startDate: '01-01-2024', completionDate: '01-10-2024', status: "Planning", },
  { id: 5, name: "Project 5", startDate: '01-01-2024', completionDate: '01-10-2024', status: "Planning", },
  { id: 6, name: "Project 6", startDate: '01-01-2024', completionDate: '01-10-2024', status: "Planning", },
  { id: 7, name: "Project 7", startDate: '01-01-2024', completionDate: '01-10-2024', status: "Planning", },
  { id: 8, name: "Project 8", startDate: '01-01-2024', completionDate: '01-10-2024', status: "Planning", },
  { id: 9, name: "Project 9", startDate: '01-01-2024', completionDate: '01-10-2024', status: "Planning", },
];

export function ProjectList() {
  return (<>
    <h1>Projects</h1>
    <div style={{ height: '100%', width: '100%' }}>
      <TableContainer component={Paper} >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Project Name</TableCell>
              <TableCell align="center">Start Date</TableCell>
              <TableCell align="center">Estimated Completion Date</TableCell>
              <TableCell align="center">Current Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.startDate}</TableCell>
                <TableCell align="center">{row.completionDate}</TableCell>
                <TableCell align="center">{row.status}</TableCell>
                {/* TODO: Add missing fields */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  </>
  );
}
export default ProjectList;

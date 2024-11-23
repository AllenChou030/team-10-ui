// PatientsList.tsx - Axios call design

import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    Button,
    TablePagination,
    AppBar,
    Container,
    Toolbar,
    Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { usePatients } from '../../contexts/PatientsContext';
import axios from 'axios';

const PatientsList: React.FC = () => {
    const { patients, addPatient, deletePatient } = usePatients();
    const [id, setId] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState<number | "">('');
    const [gender, setGender] = useState('');
    const [occupation, setOccupation] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const navigate = useNavigate();

    const handleEditClick = (id: string) => {
        navigate(`/patient/${id}`);
    };

    const handleDeleteClick = (patientId: string) => {
        deletePatient(patientId); // Pass the patient ID
    };

    const handleAddUser = () => {
        if (id && username && password && name && email) {
            addPatient({
                id,
                username,
                password,
                name,
                email,
                age: age !== '' ? Number(age) : 0,
                gender,
                occupation,
                sleepDuration: 0,
                qualityOfSleep: 0,
                physicalActivityLevel: 0,
                stressLevel: 0,
                bmiCategory: 0,
                bloodPressure: '',
                heartRate: 0,
                dailySteps: 0,
                sleepDisorder: '',
            });
            setId('');
            setUsername('');
            setPassword('');
            setName('');
            setEmail('');
            setAge('');
            setGender('');
            setOccupation('');
        }
    };

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleTestClick = (patientId: string) => {
        const patient = patients.find((p) => p.id === patientId);
        if (!patient) {
            console.error('Patient not found');
            return;
        }
        axios.put(`http://localhost:5000/patients/${patientId}/predict`, 
            {
                age: patient.age,
                gender: patient.gender,
                sleep_duration: patient.sleepDuration,
                quality_of_sleep: patient.qualityOfSleep,
                physical_activity_level: patient.physicalActivityLevel,
                bmi: patient.bmiCategory,
                blood_pressure: patient.bloodPressure,
                heart_rate: patient.heartRate,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            })
            .then(response => {
                console.log('Test result:', response.data);
            })
            .catch(error => {
                console.error('There was an error processing the test!', error);
            });
    };

    return (
        <Paper sx={{ padding: 2, maxWidth: '800px', margin: '0 auto' }}>
            <AppBar position="static" sx={{ backgroundColor: 'lightGreen', mb: 5 }}>
                <Container maxWidth="lg">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Patient List
                        </Typography>
                    </Toolbar>
                </Container>
            </AppBar>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>User Id</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {patients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((patient) => (
                            <TableRow key={patient.id}>
                                <TableCell>{patient.id}</TableCell>
                                <TableCell>{patient.username}</TableCell>
                                <TableCell>{patient.name}</TableCell>
                                <TableCell>{patient.email}</TableCell>
                                <TableCell>
                                    <Button onClick={(e) => { e.stopPropagation(); handleEditClick(patient.id); }}>Edit</Button>
                                    <Button onClick={(e) => { e.stopPropagation(); handleDeleteClick(patient.id); }}>Delete</Button>
                                    <Button onClick={(e) => { e.stopPropagation(); handleTestClick(patient.id); }}>Test</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{ padding: '16px' }}>
                <TextField
                    label="ID"
                    variant="outlined"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    style={{ margin: '16px' }}
                />
                <TextField
                    label="Username"
                    variant="outlined"
                    value={username}
                    autoComplete=''
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ margin: '16px' }}
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ margin: '16px' }}
                />
                <TextField
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ margin: '16px' }}
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ margin: '16px' }}
                />
                <TextField
                    label="Age"
                    variant="outlined"
                    value={age}
                    onChange={(e) => setAge(e.target.value !== '' ? parseInt(e.target.value) : '')}
                    style={{ margin: '16px' }}
                />
                <TextField
                    label="Gender"
                    variant="outlined"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    style={{ margin: '16px' }}
                />
                <TextField
                    label="Occupation"
                    variant="outlined"
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                    style={{ margin: '16px' }}
                />
                <br></br>
                <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
                    <Button variant="contained" onClick={handleAddUser}>
                        Add Patient
                    </Button>
                </div>
            </div>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={patients.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default PatientsList;

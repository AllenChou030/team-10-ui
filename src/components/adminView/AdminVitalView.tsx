// src/AdminVitalView.tsx
import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    AppBar,
    Container,
    Toolbar,
    Typography,
    Button,
    TextField,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { usePatients } from '../../contexts/PatientsContext';

type PatientData = {
    label: string;
    value: string | number;
};

const AdminVitalView: React.FC = () => {
    const params = useParams<{ id: string }>();
    const userId = params.id;

    const { getPatientById, editPatient } = usePatients();
    const navigate = useNavigate();
    const [patient, setPatient] = useState(() => (userId ? getPatientById(userId) : undefined));
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editedValue, setEditedValue] = useState<string | number>(''); // Allow string or number

    useEffect(() => {
        if (userId) {
            const foundPatient = getPatientById(userId);
            setPatient(foundPatient);
        }
    }, [userId, getPatientById]);

    if (!patient) {
        return (
            <Typography variant="h6" color="error">
                Patient not found
            </Typography>
        );
    }

    const patientData: PatientData[] = [
        { label: 'ID', value: patient.id },
        { label: 'Username', value: patient.username },
        { label: 'Name', value: patient.name },
        { label: 'Email', value: patient.email },
        { label: 'Age', value: patient.age },
        { label: 'Gender', value: patient.gender },
        { label: 'Occupation', value: patient.occupation },
        { label: 'Sleep Duration', value: patient.sleepDuration },
        { label: 'Quality of Sleep', value: patient.qualityOfSleep },
        { label: 'Physical Activity Level', value: patient.physicalActivityLevel },
        { label: 'Stress Level', value: patient.stressLevel },
        { label: 'BMI Category', value: patient.bmiCategory },
        { label: 'Blood Pressure', value: patient.bloodPressure },
        { label: 'Heart Rate', value: patient.heartRate },
        { label: 'Daily Steps', value: patient.dailySteps },
        { label: 'Sleep Disorder', value: patient.sleepDisorder },
    ];

    const handleEditClick = (index: number) => {
        setEditIndex(index);
        setEditedValue(String(patientData[index].value)); // Convert value to string
    };

    const handleSaveClick = () => {
        if (editIndex !== null) {
            const updatedPatient = { ...patient };
            const updatedField = patientData[editIndex].label;

            switch (updatedField) {
                case 'Username':
                    updatedPatient.username = editedValue as string;
                    break;
                case 'Name':
                    updatedPatient.name = editedValue as string;
                    break;
                case 'Email':
                    updatedPatient.email = editedValue as string;
                    break;
                case 'Age':
                    updatedPatient.age = parseInt(editedValue as string, 10);
                    break;
                case 'Gender':
                    updatedPatient.gender = editedValue as string;
                    break;
                case 'Occupation':
                    updatedPatient.occupation = editedValue as string;
                    break;
                case 'Sleep Duration':
                    updatedPatient.sleepDuration = parseFloat(editedValue as string);
                    break;
                case 'Quality of Sleep':
                    updatedPatient.qualityOfSleep = parseInt(editedValue as string, 10);
                    break;
                case 'Physical Activity Level':
                    updatedPatient.physicalActivityLevel = parseInt(editedValue as string, 10);
                    break;
                case 'Stress Level':
                    updatedPatient.stressLevel = parseInt(editedValue as string, 10);
                    break;
                case 'BMI Category':
                    updatedPatient.bmiCategory = parseFloat(editedValue as string);
                    break;
                case 'Blood Pressure':
                    updatedPatient.bloodPressure = editedValue as string;
                    break;
                case 'Heart Rate':
                    updatedPatient.heartRate = parseInt(editedValue as string, 10);
                    break;
                case 'Daily Steps':
                    updatedPatient.dailySteps = parseInt(editedValue as string, 10);
                    break;
                case 'Sleep Disorder':
                    updatedPatient.sleepDisorder = editedValue as string;
                    break;
                default:
                    break;
            }

            editPatient(updatedPatient);
            setEditIndex(null);
            setEditedValue('');
        }
    };

    const handleReturnClick = () => {
        navigate('/admin');
    };

    return (
        <Paper sx={{ padding: 2, maxWidth: '800px', margin: '0 auto' }}>
            <AppBar position="static" sx={{ backgroundColor: 'lightGreen', mb: 5 }}>
                <Container maxWidth="lg">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Sleep Apnea App
                        </Typography>
                        <Button sx={{ backgroundColor: "#1976d2", color: "white", marginLeft: "48px" }} onClick={handleReturnClick}>
                            Return to Patients List
                        </Button>
                    </Toolbar>
                </Container>
            </AppBar>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Vital</TableCell>
                            <TableCell>Value</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {patientData.map((item, index) => (
                            <TableRow key={item.label}>
                                <TableCell>{item.label}</TableCell>
                                <TableCell>
                                    {editIndex === index ? (
                                        <TextField
                                            value={editedValue}
                                            onChange={(e) => setEditedValue(e.target.value)}
                                            type={typeof item.value === 'number' ? 'number' : 'text'}
                                        />
                                    ) : (
                                        item.value
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editIndex === index ? (
                                        <Button onClick={handleSaveClick}>Save</Button>
                                    ) : (
                                        <Button onClick={() => handleEditClick(index)}>Edit</Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default AdminVitalView;

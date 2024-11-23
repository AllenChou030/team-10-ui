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

const AdminVitalView: React.FC = () => {
    const params = useParams<{ id: string }>();
    const userId = params.id;
    
    const { getPatientById, editPatient } = usePatients();
    const navigate = useNavigate();
    const [patient, setPatient] = useState(() => (userId ? getPatientById(userId) : undefined));
    console.log(patient);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editedValue, setEditedValue] = useState<string>('');

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

    const patientData = [
        { label: 'ID', value: patient.id },
        { label: 'Username', value: patient.username },
        { label: 'Name', value: patient.name },
        { label: 'Email', value: patient.email },
        { label: 'Age', value: patient.age.toString() },
        { label: 'Gender', value: patient.gender },
        { label: 'Occupation', value: patient.occupation },
        { label: 'Sleep Duration', value: patient.sleepDuration.toString() },
        { label: 'Quality of Sleep', value: patient.qualityOfSleep.toString() },
        { label: 'Physical Activity Level', value: patient.physicalActivityLevel.toString() },
        { label: 'Stress Level', value: patient.stressLevel.toString() },
        { label: 'BMI Category', value: patient.bmiCategory },
        { label: 'Blood Pressure', value: patient.bloodPressure },
        { label: 'Heart Rate', value: patient.heartRate.toString() },
        { label: 'Daily Steps', value: patient.dailySteps.toString() },
        { label: 'Sleep Disorder', value: patient.sleepDisorder },
    ];

    const handleEditClick = (index: number) => {
        setEditIndex(index);
        setEditedValue(patientData[index].value);
    };

    const handleSaveClick = () => {
        if (editIndex !== null) {
            const updatedPatient = { ...patient };
            const updatedField = patientData[editIndex].label;

            switch (updatedField) {
                case 'Username':
                    updatedPatient.username = editedValue;
                    break;
                case 'Name':
                    updatedPatient.name = editedValue;
                    break;
                case 'Email':
                    updatedPatient.email = editedValue;
                    break;
                case 'Age':
                    updatedPatient.age = parseInt(editedValue, 10);
                    break;
                case 'Gender':
                    updatedPatient.gender = editedValue;
                    break;
                case 'Occupation':
                    updatedPatient.occupation = editedValue;
                    break;
                case 'Sleep Duration':
                    updatedPatient.sleepDuration = parseFloat(editedValue);
                    break;
                case 'Quality of Sleep':
                    updatedPatient.qualityOfSleep = parseInt(editedValue, 10);
                    break;
                case 'Physical Activity Level':
                    updatedPatient.physicalActivityLevel = parseInt(editedValue, 10);
                    break;
                case 'Stress Level':
                    updatedPatient.stressLevel = parseInt(editedValue, 10);
                    break;
                case 'BMI Category':
                    updatedPatient.bmiCategory = editedValue;
                    break;
                case 'Blood Pressure':
                    updatedPatient.bloodPressure = editedValue;
                    break;
                case 'Heart Rate':
                    updatedPatient.heartRate = parseInt(editedValue, 10);
                    break;
                case 'Daily Steps':
                    updatedPatient.dailySteps = parseInt(editedValue, 10);
                    break;
                case 'Sleep Disorder':
                    updatedPatient.sleepDisorder = editedValue;
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

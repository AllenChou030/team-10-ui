// src/PatientVitalView.tsx
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
    TablePagination, CardContent, Card, AppBar, Container, Toolbar, Typography,
} from '@mui/material';

interface UserInfo {
    vital: string;
    value: string;
}

const initialData: UserInfo[] = [
    { vital: "Age", value: '32' },
    { vital: "Gender", value: 'Male' },
    { vital: "Sleep Duration", value: '8 hours a night' },
    { vital: "Quality of Sleep", value: 'poor' },
    { vital: "Physical Activity Level", value: 'medium' },
    { vital: "BMI Category", value: '' },
    { vital: "Blood Pressure", value: '120/80' },
    { vital: "Heart Rate", value: '70' },
];

const PatientVitalView: React.FC = () => {
    const [data, setData] = useState<UserInfo[]>(initialData);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [vital, setVital] = useState('');
    const [value, setValue] = useState('');

    const [vital1, setVital1] = useState('');
    const [value1, setValue1] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleEditClick = (index: number) => {
        setEditIndex(index);
        setVital(data[index].vital);
        setValue(data[index].value);
    };

    const handleSaveClick = () => {
        if (editIndex !== null) {
            const updatedData = data.map((user, index) =>
                index === editIndex ? { ...user, vital, value } : user
            );
            setData(updatedData);
            setEditIndex(null);
            setVital('');
            setValue('');
        }
    };

    // const handleDeleteClick = (index: number) => {
    //     const updatedData = data.filter((_, i) => i !== index);
    //     setData(updatedData);
    // };

    const handleAddUser = () => {
        if (vital1 && value1) {
            const newUser = {
                //id: data.length + 1, // Simple ID generation
                vital: vital1,
                value: value1,
            };
            setData([...data, newUser]);
            setVital1('');
            setValue1('');
        }
    };

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handlePrediction = () => {
        console.log(`temp log`);
        // Add your login logic here
    };

    return (
        <Paper sx={{ padding: 2 }} style={{overflow: 'visible'}}>
            <AppBar position="relative" sx={{ backgroundColor: 'lightGreen', mb: 5 }} >
                <Container maxWidth="lg">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            Sleep Apnea App
                        </Typography>
                    </Toolbar>
                </Container>
            </AppBar>
            <Card className="patientMeta" sx={{ mb: 5 }}>
                <CardContent>
                    <div>
                        Name: John Doe
                    </div>
                    <div>
                        PID: XXX
                    </div>
                </CardContent>
            </Card>
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
                        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => (
                            <TableRow key={user.vital}>
                                <TableCell>
                                    {editIndex === index ? (
                                        <TextField
                                            value={vital}
                                            onChange={(e) => setVital(e.target.value)}
                                        />
                                    ) : (
                                        user.vital
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editIndex === index ? (
                                        <TextField
                                            value={value}
                                            onChange={(e) => setValue(e.target.value)}
                                        />
                                    ) : (
                                        user.value
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editIndex === index ? (
                                        <Button onClick={handleSaveClick}>Save</Button>
                                    ) : (
                                        <Button onClick={() => handleEditClick(index)}>Edit</Button>
                                    )}
                                    {/*<Button onClick={() => handleDeleteClick(index)}>Delete</Button>*/}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{padding: '16px'}}>
                <TextField
                    label="Vital"
                    variant="outlined"
                    value={vital1}
                    onChange={(x) => setVital1(x.target.value)}
                    style={{marginRight: '16px'}}
                />
                <TextField
                    label="Value"
                    variant="outlined"
                    value={value1}
                    onChange={(x) => setValue1(x.target.value)}
                    style={{marginRight: '16px'}}
                />
                <Button variant="contained" onClick={handleAddUser}>
                    Add Vital
                </Button>
            </div>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Button variant="contained" color="primary" onClick={handlePrediction}>
                Predict
            </Button>
        </Paper>
    );
};

export default PatientVitalView;
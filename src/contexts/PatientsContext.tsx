// src/PatientsContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface Patient {
  id: string;
  username: string;
  password: string;
  name: string;
  email: string;
  age: number;
  gender: string;
  occupation: string;
  sleepDuration: number;
  qualityOfSleep: number;
  physicalActivityLevel: number;
  stressLevel: number;
  bmiCategory: number;
  bloodPressure: string;
  heartRate: number;
  dailySteps: number;
  sleepDisorder: string;
}

interface PatientsContextProps {
  patients: Patient[];
  addPatient: (patient: Patient) => void;
  getPatientById: (id: string) => Patient | undefined;
  deletePatient: (id: string) => void;
  editPatient: (updatedPatient: Patient) => void;
}

const PatientsContext = createContext<PatientsContextProps | undefined>(undefined);

type Props = {
  children?: React.ReactNode;
};

export const PatientsProvider: React.FC<Props> = ({ children }: Props) => {
  const [patients, setPatients] = useState<Patient[]>([{
    id: '1',
    username: 'johndoe',
    password: '12345678',
    name: 'John Doe',
    email: 'john.doe@example.com',
    age: 27,
    gender: 'Male',
    occupation: 'Software Engineer',
    sleepDuration: 6.1,
    qualityOfSleep: 6,
    physicalActivityLevel: 3,
    stressLevel: 6,
    bmiCategory: 27.5,
    bloodPressure: '126/83',
    heartRate: 77,
    dailySteps: 4200,
    sleepDisorder: 'None',
  }]);
  

  const addPatient = (patient: Patient) => setPatients((prev) => [...prev, patient]);

  const getPatientById = (id: string) => patients.find((patient) => patient.id === id);

  const deletePatient = (id: string) => {
    setPatients((prev) => prev.filter((patient) => patient.id !== id));
  };

  const editPatient = (updatedPatient: Patient) => {
    setPatients((prev) =>
      prev.map((patient) =>
        patient.id === updatedPatient.id ? { ...patient, ...updatedPatient } : patient
      )
    );
  };

  return (
    <PatientsContext.Provider value={{ patients, addPatient, getPatientById, deletePatient, editPatient }}>
      {children}
    </PatientsContext.Provider>
  );
};

export const usePatients = () => {
  const context = useContext(PatientsContext);
  if (!context) throw new Error('usePatients must be used within a PatientsProvider');
  return context;
};

import useFetch, { fetchStatus } from "./useFetch";

export type Device = {
  id: number;
  deviceId: number;
  patientId_: number;
};

export type Caregiver = {
  id: number;
  email: string;
  name: string;
  phone: string;
  address: string;
  patientId_: number;
};

export type Patient = {
  id: number;
  name: string;
  age: number;
  phone: string;
  illness: string;
  address: string;
  primaryName: string;
  primaryPhone: string;
  relation: string;
  dateAdded: string;
  deviceids: Device[];
  caregivers: Caregiver[];
};

function usePatients(): {
  patientFetchStatus: fetchStatus;
  patientFetchCommit: () => Promise<{
    status: string;
    data: Patient[];
  }>;
  patientFetchData: Patient[] | undefined;
};

function usePatients(id: number): {
  patientFetchStatus: fetchStatus;
  patientFetchCommit: () => Promise<{
    status: string;
    data: Patient;
  }>;
  patientFetchData: Patient | undefined;
};

function usePatients(id?: unknown) {
  const {
    status: patientFetchStatus,
    commit: patientFetchCommit,
    data: patientFetchData,
  } = typeof id === "undefined"
    ? useFetch<Patient[]>("/patients?_embed=deviceids&_embed=caregivers")
    : useFetch<Patient>(
        `/patients/${id as number}?_embed=deviceids&_embed=caregivers`
      );

  return { patientFetchStatus, patientFetchCommit, patientFetchData };
}

export default usePatients;

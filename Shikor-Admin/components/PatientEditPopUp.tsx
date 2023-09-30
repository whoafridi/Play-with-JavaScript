import Link from "next/link";

import QRCodeImg from "../assets/images/qr-code.svg";

import usePatients from "../hooks/usePatients";
import Button from "./Button";
import { imageSizes } from "./CONSTANTS";
import ExportableImage from "./ExportableImage";

type Props = {
  show: boolean;
  onClose: () => void;
  href: string;
  patientEditId: number;
};

// const patients: Patient[] = new Array<Patient>(25)
//   .fill({
//     id: 0b1010111101,
//     dateAdded: new Date(),
//     name: "Something Khatun ",
//     deviceId: "0x8754fa46",
//   })
//   .map((patient, i) => ({
//     ...patient,
//     id: patientFetchData[0].id + i,
//     name: patientFetchData[0].name + String.fromCharCode("A".charCodeAt(0) + i),
//     dateAdded: (() => {
//       const newDate = new Date();
//       newDate.setDate(newDate.getDate() - i * 3);
//       return newDate;
//     })(),
//   }));

const PatientEdit: React.FC<Props> = ({
  show,
  onClose,
  href,
  patientEditId,
}) => {
  const { patientFetchStatus, patientFetchData } = usePatients(patientEditId);

  if (!show) return <></>;

  return (
    <>
      <div
        className="modal fade show"
        role="dialog"
        style={{ display: "block" }}
      >
        <div className="modal-dialog d-flex justify-content-center modal-dialog-centered">
          <div className="modal-content border-0 w-75 shadow-lg">
            <div className="modal-header border-bottom-0">
              <Button
                className="btn-close bg-light position-absolute top-0 end-0"
                onClick={onClose}
              />
            </div>
            <div className="modal-body pt-0">
              {patientFetchStatus === "LOADING" ? (
                <>Loading</>
              ) : (
                !patientFetchData && <>Not Found</>
              )}
              {patientFetchData && (
                <>
                  <div className="row px-3">
                    <div className="col-6">
                      <h6 className="pt-3 text-muted small">Name</h6>
                      <h6 className="opacity-75">{patientFetchData.name}</h6>
                    </div>
                    <div className="col-6 text-end">
                      <h6 className="pt-3 text-muted small">Patient ID</h6>
                      <h6 className="opacity-75">{patientFetchData.id}</h6>
                    </div>
                  </div>
                  <div className="row px-3">
                    <div className="col-6">
                      <h6 className="pt-3 text-muted small">Phone</h6>
                      <h6 className="opacity-75">{patientFetchData.phone}</h6>
                    </div>
                    <div className="col-6 text-end">
                      <h6 className="pt-3 text-muted small">Age</h6>
                      <h6 className="opacity-75">{patientFetchData.age}</h6>
                    </div>
                  </div>
                  <div className="row px-3">
                    <div className="col-12">
                      <h6 className="pt-3 text-muted small">illness</h6>
                      <h6 className="opacity-75">{patientFetchData.illness}</h6>
                    </div>
                    <div className="col-12">
                      <h6 className="pt-3 text-muted small">Address</h6>
                      <h6 className="opacity-75">{patientFetchData.address}</h6>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <ExportableImage
                      src={QRCodeImg}
                      placeholder="blur"
                      sizes={imageSizes.md_6_col}
                      alt="qr code"
                      className="img-fluid"
                    />
                  </div>
                  <p className="text-muted text-center small">
                    Device ID :{" "}
                    {patientFetchData.deviceids
                      ?.map((d) => d.deviceId)
                      .join(", ")}
                    <i className="btn p-0 fa-regular fa-copy"></i>
                  </p>
                  <div className="d-flex justify-content-center">
                    <Link href={href}>
                      <Button className="px-4">Edit details</Button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {show && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

export default PatientEdit;

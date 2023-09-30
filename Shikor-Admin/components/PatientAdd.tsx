import { useState } from "react";

import QRCodeImg from "../assets/images/qr-code.svg";
import userPlaceholderImg from "../assets/images/user-placeholder.jpg";

import Button from "./Button";
import ExportableImage from "./ExportableImage";
import { imageSizes } from "./CONSTANTS";

type Props = {
  patientID: string;
  name: string;
  deviceId: string;
};

const PatientAdd: React.FC<Props> = ({
  children,
  deviceId,
  name,
  patientID,
  ...restprops
}) => {
  const [textToCopy, setTextToCopy] = useState(deviceId);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleCopyClick = () => {
    navigator.clipboard
      ?.writeText(textToCopy)
      .then(() => {
        setCopySuccess(true);
        setShowToast(true);

        setTimeout(() => {
          setShowToast(false);
        }, 500);
      })
      .catch((error) => {
        setCopySuccess(false);
      });
  };
  return (
    <>
      <span
        className="d-flex justify-content-end"
        onClick={handleShowModal}
        {...restprops}
      >
        <ExportableImage
          src={userPlaceholderImg}
          alt="profile logo"
          className="img-fluid rounded-circle w-25 border btn p-0"
        />
      </span>
      {showModal && (
        <div
          className="modal fade show"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog d-flex justify-content-center">
            <div className="modal-content border-0 w-75 shadow-lg">
              <div className="modal-header border-bottom-0">
                <Button
                  className="btn-close bg-primary position-absolute top-0 end-0"
                  onClick={handleCloseModal}
                ></Button>
              </div>
              <div className="modal-body py-3">
                <h4 className="text-center">New patient added successfully</h4>
                <div className="row px-3">
                  <div className="col-6">
                    <h6 className="pt-3 text-muted small">Name</h6>
                    <h6 className="opacity-75">{name}</h6>
                  </div>
                  <div className="col-6 text-end">
                    <h6 className="pt-3 text-muted small">Patient ID</h6>
                    <h6 className="opacity-75">{patientID}</h6>
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
                  Device ID : {deviceId}
                  <i
                    title="Copy to clipboard"
                    className="btn p-0 fa-regular fa-copy ms-2"
                    onClick={handleCopyClick}
                  ></i>
                </p>
                {copySuccess && showToast && (
                  <p className="alert alert-success text-center border-0 shadow">
                    Copied !
                  </p>
                )}
                <div className="d-flex justify-content-center">
                  <Button className="px-4" onClick={handleCloseModal}>
                    View details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PatientAdd;

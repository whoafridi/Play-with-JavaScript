import { useEffect, useState } from "react";

import Button from "./Button";
import { useRouter } from "next/router";
import { PopUpKey, PopUpKeyValue } from "./CONSTANTS";

const PopUp: React.FC = () => {
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => router.push(router.pathname);

  useEffect(() => {
    setShowModal(router.query[PopUpKey] === PopUpKeyValue);
  }, [router]);

  return (
    <>
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
              <div className="modal-body text-center">
                <div className="d-flex justify-content-center">
                  <img
                    src="/logo.png"
                    alt="profile logo"
                    className="img-fluid rounded-circle w-25 border"
                  />
                </div>
                <h6 className="pt-3">Something Khatun</h6>
                <p className="text-muted">2356775</p>
                <h5 className="text-capitalize">
                  Requires immediate attention !
                </h5>
              </div>
              <div className="modal-footer border-top-0 justify-content-center">
                <Button className="px-4" onClick={handleCloseModal} danger>
                  Reject
                </Button>
                <Button className="px-4" onClick={handleCloseModal}>
                  Accept
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showModal && <div className="modal fade show"></div>}
    </>
  );
};

export default PopUp;

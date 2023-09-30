import Head from "next/head";
import { QrReader } from "react-qr-reader";

import Layout from "../components/_Layout";
import { useIsServer } from "../components/CONSTANTS";
import { useEffect, useState } from "react";
import PatientAdd from "../components/PatientAdd";

const CONTAINER_SIZE = 350;

const QR: React.FC = () => {
  const isServer = useIsServer();
  const [qr, setQr] = useState("");
  const [animationReverse, setAnimationReverse] = useState(false);
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  const [device, setDevice] = useState<MediaDeviceInfo>();
  const [facingMode, setFacingMode] = useState<ConstrainDOMString>("user");

  useEffect(() => {
    (async () => {
      const devices = await navigator.mediaDevices
        .enumerateDevices()
        .catch(() => []);
      setVideoDevices(devices.filter((device) => device.kind === "videoinput"));
    })();

    const interval = setInterval(
      () => setAnimationReverse((animationReverse) => !animationReverse),
      1000
    );

    return () => clearInterval(interval);
  }, []);

  const toggleCamera = () => {
    setFacingMode((facingMode) =>
      facingMode === "user" ? "environment" : "user"
    );
    setDevice(videoDevices[1]);
  };

  useEffect(() => {
    console.log(facingMode);
  }, [facingMode]);

  return (
    <>
      <Head>
        <title>QR - Shikor</title>
      </Head>
      <h5 className="text-center">Scanning</h5>
      <div className="d-flex justify-content-center my-3">
        <div
          className="border position-relative overflow-hidden"
          style={{ height: CONTAINER_SIZE, width: CONTAINER_SIZE }}
        >
          {!isServer && (
            <>
              <QrReader
                onResult={(result, error) =>
                  !error && result?.getText?.() && setQr(result.getText())
                }
                constraints={{
                  frameRate: 15,
                  aspectRatio: { exact: 1 },
                  height: CONTAINER_SIZE,
                  facingMode,
                  deviceId: device?.deviceId,
                  width: CONTAINER_SIZE,
                }}
                scanDelay={500}
              />
              <div
                className={`position-absolute start-0 end-0 bg-primary ${
                  animationReverse ? "qrSlideInDown" : "qrSlideInUp"
                }`}
                style={{ height: 5 }}
              >
                <div
                  className={`position-absolute start-0 end-0 ${
                    animationReverse ? "qrSlideInDown" : "qrSlideInUp"
                  }`}
                  style={{
                    height: 75,
                    background: animationReverse
                      ? "linear-gradient(rgba(var(--bs-primary-rgb),0), rgba(var(--bs-primary-rgb),0.75))"
                      : "linear-gradient(rgba(var(--bs-primary-rgb),0.75), rgba(var(--bs-primary-rgb),0))",
                  }}
                ></div>
              </div>
            </>
          )}
        </div>
      </div>
      {videoDevices.length > 1 && (
        <div className="d-flex justify-content-center">
          <button className="btn" onClick={toggleCamera}>
            <i className="fa fa-rotate-forward"></i>
          </button>
        </div>
      )}    
      <h5 className="text-center">{qr}</h5>
      <PatientAdd patientID="2312" name="Xyz Xyz" deviceId="34"/>
    </>
  );
};

QR.Layout = Layout;

export default QR;

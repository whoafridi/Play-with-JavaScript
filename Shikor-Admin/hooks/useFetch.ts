import { useState, useEffect } from "react";

interface CustomProps {
  ignore: boolean;
}

export type fetchStatus = "LOADING" | "IDLE" | "SUCCESS" | "ERROR";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000/api";

const useFetch = <T = any>(path: string, opts?: RequestInit & CustomProps) => {
  const [status, setStatus] = useState<fetchStatus>("IDLE");
  const [data, setData] = useState<T>();
  const ignore = opts && opts.ignore;

  const request = { ...opts, mode: "cors" };
  if (request.ignore) delete request.ignore;

  const fetchData = async () => {
    setStatus("LOADING");
    console.debug(path, opts); // TODO: remove

    try {
      const response = await fetch(baseUrl + path, request as RequestInit);
      if (response.status === 304) throw new Error("Unchanged");
      if (!response.ok) throw await response.json();

      const data = await response.json();
      setData(data);
      setStatus("SUCCESS");
      return { status: "SUCCESS", data };
    } catch (error) {
      setStatus("ERROR");
      setData(error as any);
      return { status: "ERROR", data: error };
    }
  };

  useEffect(() => {
    if (!ignore) fetchData();
  }, [path, request.body]);

  return { status, data, commit: fetchData };
};

export const customFetch = async <T = any>(
  path: string,
  opts?: RequestInit
) => {
  const request = { ...opts, mode: "cors" };

  console.debug(path, opts); // TODO: remove

  try {
    const response = await fetch(baseUrl + path, request as RequestInit);
    if (response.status === 304) throw new Error("Unchanged");
    if (!response.ok) throw await response.json();

    const data = await response.json();
    return { status: "IDLE", data } as {
      status: fetchStatus;
      data: T & { message: string };
    };
  } catch (error) {
    return { status: "ERROR", data: error } as {
      status: fetchStatus;
      data: T & { message: string };
    };
  }
};

export default useFetch;

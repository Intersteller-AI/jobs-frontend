import axios from "axios";
import { HOST } from "./server";

export const getAllJobs = async () => {
  try {
    const { data } = await axios.get(`${HOST}/api/jobs`, {
      withCredentials: true,
    });
    return data;
  } catch (ex) {
    throw new Error(ex.message);
  }
};

export const postJob = async (details) => {
  try {
    const { data } = await axios.post(
      `${HOST}/api/jobs`,
      {
        ...details,
      },
      {
        withCredentials: true,
      }
    );

    return data;
  } catch (ex) {
    throw new Error(ex.message);
  }
};

export const getJob = async (id) => {
  try {
    const { data } = await axios.get(`${HOST}/api/jobs/${id}`, {
      withCredentials: true,
    });

    return data;
  } catch (ex) {
    throw new Error(ex.message);
  }
};

export const updateJob = async (details) => {
  try {
    const { data } = await axios.put(
      `${HOST}/api/jobs`,
      {
        ...details,
      },
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (ex) {
    throw new Error(ex.message);
  }
};

export const deleteJob = async (id) => {
  try {
    const { data } = await axios.delete(`${HOST}/api/jobs/${id}`, {
      withCredentials: true,
    });

    return data;
  } catch (ex) {
    throw new Error(ex.message);
  }
};

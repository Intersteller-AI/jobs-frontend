import axios from "axios";
import { HOST } from "./server";

export const getAllApplications = async () => {
  try {
    const { data } = await axios.get(`${HOST}/api/applications`, {
      withCredentials: true,
    });
    return data;
  } catch (ex) {
    throw new Error(ex.message);
  }
};

export const getJobApplications = async (id) => {
  try {
    const { data } = await axios.get(`${HOST}/api/relation/${id}`, {
      withCredentials: true,
    });
    return data;
  } catch (ex) {
    throw new Error(ex.message);
  }
};

export const postApplications = async (details) => {
  try {
    const { data } = await axios.post(
      `${HOST}/api/applications`,
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

export const getApplication = async (id) => {
  try {
    const { data } = await axios.get(`${HOST}/api/applications/${id}`, {
      withCredentials: true,
    });

    return data;
  } catch (ex) {
    throw new Error(ex.message);
  }
};

export const updateApplication = async (details) => {
  try {
    const { data } = await axios.put(
      `${HOST}/api/applications`,
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

export const deleteApplication = async (id) => {
  try {
    const { data } = await axios.delete(`${HOST}/api/applications/${id}`, {
      withCredentials: true,
    });

    return data;
  } catch (ex) {
    throw new Error(ex.message);
  }
};

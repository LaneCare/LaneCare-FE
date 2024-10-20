"use server";

import { ReportFormType } from "@/lib/validations/validation";
import axios from "axios";

const API_URL = process.env.API_URL;

export const addReport = async (values: ReportFormType, userId: string) => {
  const formData = new FormData();
  //   formData.append("name", values.name);
  formData.append("description", values.description);
  formData.append("latitude", values.latitude.toString());
  formData.append("longitude", values.longitude.toString());
  formData.append("file", values.image);
  formData.append("userId", userId);
  formData.append("is_iot", "false");

  console.log(formData);

  try {
    const response = await axios.post(`${API_URL}/uploadData`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding report:", error);
    return null;
  }
};

export const getReport = async () => {
  try {
    const response = await axios.get(`${API_URL}/getReport`);
    return response.data;
  } catch (error) {
    console.error("Error getting report:", error);
    return null;
  }
};

"use client";

import { ReportFormType } from "@/lib/validations/validation";
import axios, { AxiosError } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const addReport = async (values: ReportFormType, userId: string) => {
  const formData = new FormData();
  //   formData.append("name", values.name);
  formData.append("description", values.description);
  formData.append("latitude", values.latitude.toString());
  formData.append("longitude", values.longitude.toString());
  formData.append("file", values.image);
  formData.append("userid", userId);
  formData.append("is_iot", "false");

  console.log(formData);

  try {
    const response = await axios.post(`${API_URL}/uploadData`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error adding report:", error.response);
    return null;
  }
};

import { ReportFormType } from "@/lib/validations/validation";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("API_URL environment variable is not set.");
}

export class ReportCommandService {
  constructor() {}

  private toFormData<T extends Record<string, any>>(data: T): FormData {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      const value = data[key];
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });
    return formData;
  }

  async updateReportStatus(
    userId: string,
    reportId: string,
    status: string
  ): Promise<void> {
    try {
      const formData = this.toFormData({
        userid: userId,
        reportid: reportId,
        status: status,
      });

      const endpoint = `${API_URL}/updateStatus`;

      const response = await axios.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status !== 200) {
        throw new Error(
          `Failed to update status: ${response.statusText} (${response.status})`
        );
      }

      console.log("Status updated successfully");
    } catch (error: any) {
      console.error("Error updating report status:", error.response || error);
      throw new Error(
        error.response?.data?.message || "Failed to update status"
      );
    }
  }

  async addReport(values: ReportFormType, userId: string) {
    const formData = new FormData();
    //   formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("latitude", values.latitude.toString());
    formData.append("longitude", values.longitude.toString());
    formData.append("file", values.image);
    formData.append("userid", userId);
    formData.append("is_iot", "false");

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
  }

  // Fetch report from external API
  // async fetchReportFromAPI(): Promise<any> {
  //   try {
  //     const response = await axios.get(`${API_URL}/getReport`);
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error fetching report from API:", error);
  //     return null;
  //   }
  // }
}

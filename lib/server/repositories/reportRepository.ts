import { createClient } from "@/lib/supabase/server";
import { ReportType } from "@/lib/types/Report";
import {
  IotDeviceType,
  ReportUserLogJoinType,
  UserReportJoinType,
} from "@/lib/types/types";
import axios from "axios";

const API_URL = process.env.API_URL;

if (!API_URL) {
  throw new Error("API_URL environment variable is not set.");
}

export class ReportRepository {
  private supabase = createClient();

  async postToUpdateStatusAPI(formData: FormData): Promise<void> {
    const endpoint = `${API_URL}/functions/v1/updateStatus`;

    const response = await axios.post(endpoint, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.status !== 200) {
      throw new Error(
        `Failed to update status: ${response.statusText} (${response.status})`
      );
    }
  }

  async getAllIotDevices(): Promise<IotDeviceType[]> {
    const { data, error } = await this.supabase.from("iot_devices").select("*");

    if (error) {
      console.error("Error fetching iot devices:", error);
      throw error;
    }

    return data as IotDeviceType[];
  }

  async getAllReports(): Promise<ReportType[]> {
    const { data, error } = await this.supabase
      .from("reports")
      .select("*")
      .order("timestamp", { ascending: false });

    if (error) {
      console.error("Error fetching reports:", error);
      throw error;
    }

    return data as ReportType[];
  }

  async getJoinedReportUser(
    reportId: string
  ): Promise<UserReportJoinType | null> {
    const { data, error } = await this.supabase
      .from("reports")
      .select(
        `
        *,
        users:userid (
          name,
          email,
          role
        )
      `
      )
      .eq("reportid", reportId)
      .single();

    if (error) {
      console.error("Error fetching joined data:", error);
      return null;
    }

    if (!data) return null;

    // Transform the data to match the JoinedReportUser interface
    const joinedData: UserReportJoinType = {
      ...data,
      userName: data.users.name,
      email: data.users.email,
      role: data.users.role,
    };

    return joinedData;
  }

  async getAllJoinedReportUser(): Promise<UserReportJoinType[]> {
    const { data, error } = await this.supabase
      .from("reports")
      .select(
        `
        *,
        users:userid (
          name,
          email,
          role
        )
      `
      )
      .order("timestamp", { ascending: false });

    if (error) {
      console.error("Error fetching joined data:", error);
      throw error;
    }

    if (!data) return [];

    // Transform the data to match the JoinedReportUser interface
    const joinedData: UserReportJoinType[] = data.map((item) => ({
      ...item,
      username: item.users.name,
      email: item.users.email,
      role: item.users.role,
    }));

    return joinedData;
  }

  async getAllJoinedReportUserLog(): Promise<ReportUserLogJoinType[]> {
    const { data, error } = await this.supabase
      .from("reports")
      .select(
        `
        *,
        users:userid (
          userid,
          name,
          email,
          role
        ),
        report_log (
          verificationid,
          comments,
          changetime,
          status
        )
      `
      )
      .order("timestamp", { ascending: false }); // Order by report timestamp

    if (error) {
      console.error("Error fetching joined data:", error);
      throw error;
    }

    if (!data) return [];

    // Transform the data to match the ReportUserLogJoinType interface
    const joinedData: ReportUserLogJoinType[] = data.map((item) => ({
      reportid: item.reportid,
      description: item.description,
      status: item.status,
      timestamp: item.timestamp,
      latitude: parseFloat(item.latitude),
      longitude: parseFloat(item.longitude),
      imageurl: item.imageurl,
      country: item.country,
      city: item.city,
      state: item.state,
      street: item.street,
      postcode: item.postcode,

      // User details
      userid: item.users.userid,
      username: item.users.name,
      email: item.users.email,
      role: item.users.role,

      // Report log details
      logs: item.report_log.map((log: any) => ({
        verificationid: log.verificationid,
        comments: log.comments,
        changetime: log.changetime,
        status: log.status,
      })),
    }));

    return joinedData;
  }

  async getJoinedReportUserLogById(
    reportId: string
  ): Promise<ReportUserLogJoinType | null> {
    const { data, error } = await this.supabase
      .from("reports")
      .select(
        `
      *,
      users:userid (
        userid,
        name,
        email,
        role
      ),
      report_log (
        verificationid,
        comments,
        changetime,
        status
      )
    `
      )
      .eq("reportid", reportId) // Filter by report ID
      .single(); // Ensure only a single result is returned

    if (error) {
      console.error("Error fetching single report with joined data:", error);
      return null;
    }

    if (!data) return null;

    // Transform the data to match the ReportUserLogJoinType interface
    const joinedData: ReportUserLogJoinType = {
      reportid: data.reportid,
      description: data.description,
      status: data.status,
      timestamp: data.timestamp,
      latitude: parseFloat(data.latitude),
      longitude: parseFloat(data.longitude),
      imageurl: data.imageurl,
      country: data.country,
      city: data.city,
      state: data.state,
      street: data.street,
      postcode: data.postcode,

      // User details
      userid: data.users.userid,
      username: data.users.name,
      email: data.users.email,
      role: data.users.role,

      // Report log details
      logs: data.report_log.map((log: any) => ({
        verificationid: log.verificationid,
        comments: log.comments,
        changetime: log.changetime,
        status: log.status,
      })),
    };

    return joinedData;
  }
}

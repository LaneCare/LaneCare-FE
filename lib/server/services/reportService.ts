import { ReportRepository } from "@/lib/server/repositories/reportRepository";
import { ReportType } from "@/lib/types/Report";
import {
  UserReportJoinType,
  ReportUserLogJoinType,
  IotDeviceType,
} from "@/lib/types/types";
import axios from "axios";

// const API_URL = process.env.API_URL;

export class ReportService {
  private reportRepository: ReportRepository;

  constructor() {
    this.reportRepository = new ReportRepository();
  }

  // Fetch all reports
  async getAllReports(): Promise<ReportType[]> {
    return this.reportRepository.getAllReports();
  }

  // Fetch all iot details
  async getAllIotDevices(): Promise<IotDeviceType[]> {
    try {
      return this.reportRepository.getAllIotDevices();
    } catch (error) {
      console.error("Error fetching Iot Device", error);
      return [];
    }
  }

  // Fetch a single report with user details
  async getJoinedReportUser(
    reportId: string
  ): Promise<UserReportJoinType | null> {
    try {
      return this.reportRepository.getJoinedReportUser(reportId);
    } catch (error) {
      console.error("Error fetching joined report and user data:", error);
      return null;
    }
  }

  // Fetch all reports with user details
  async getAllJoinedReportUser(): Promise<UserReportJoinType[]> {
    try {
      return this.reportRepository.getAllJoinedReportUser();
    } catch (error) {
      console.error("Error fetching joined reports with users:", error);
      return [];
    }
  }

  // Fetch all reports with user and report log details
  async getAllJoinedReportUserLog(): Promise<ReportUserLogJoinType[]> {
    try {
      return this.reportRepository.getAllJoinedReportUserLog();
    } catch (error) {
      console.error(
        "Error fetching joined reports with users and report logs:",
        error
      );
      return [];
    }
  }

  // Fetch report with user and report log details by id
  async getJoinedReportUserLogById(
    reportId: string
  ): Promise<ReportUserLogJoinType | null> {
    try {
      return this.reportRepository.getJoinedReportUserLogById(reportId);
    } catch (error) {
      console.error(
        "Error fetching joined reports with users and report logs:",
        error
      );
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

import { createClient } from "@/lib/supabase/server";
import { Report } from "@/lib/types/Report";

export class ReportRepository {
  private supabase = createClient();

  async getAllReports(): Promise<Report[]> {
    const { data, error } = await this.supabase
      .from("reports")
      .select("*")
      .order("timestamp", { ascending: false });

    if (error) {
      console.error("Error fetching reports:", error);
      throw error;
    }

    return data as Report[];
  }
}

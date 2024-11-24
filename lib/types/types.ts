export const enumReportStatus = [
  "Submitted",
  "On-Review",
  "Declined",
  "Verified",
  "On-Going",
  "Maintenance",
  "Finished",
];

export interface UserType {
  userid: string; // UUID
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface ReportType {
  reportid: string; // UUID
  userid: string; // Foreign key referencing UserType.userid
  latitude: string;
  longitude: string;
  description: string;
  status: string;
  timestamp: string;
  imageurl: string;
  iot_id: string | null;
  is_iot: boolean;
  country: string;
  city: string;
  county: string;
  state: string;
  street: string | null;
  postcode: string;
  village: string | null;
}

export interface UserReportJoinType {
  userid: string; // From users table
  username: string;
  email: string;
  password: string;
  role: string;
  users: UserType;
  reportid: string; // From reports table
  latitude: string;
  longitude: string;
  description: string;
  status:
    | "Submitted"
    | "On-Review"
    | "Declined"
    | "Verified"
    | "On-Going"
    | "Maintenance"
    | "Finished";
  timestamp: string;
  imageurl: string;
  iot_id: string | null;
  is_iot: boolean;
  country: string;
  city: string;
  county: string;
  state: string;
  street: string | null;
  postcode: string;
  village: string | null;
}

export interface ReportUserLogJoinType {
  reportid: string;
  description: string;
  status: string;
  timestamp: string;
  latitude: number;
  longitude: number;
  imageurl: string | null;
  country: string | null;
  city: string | null;
  state: string | null;
  street: string | null;
  postcode: string | null;

  // User details
  userid: string;
  username: string;
  email: string;
  role: string;

  // Report log details
  logs: Array<{
    verificationid: string;
    comments: string | null;
    changetime: string;
    status: string;
  }>;
}
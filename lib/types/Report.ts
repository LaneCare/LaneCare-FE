export interface ReportType {
  reportid: string;
  userid: string;
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

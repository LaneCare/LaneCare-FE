import { ReportUserLogJoinType, IotDeviceType } from "@/lib/types/types";

// Helper function to generate random dates within a range

// Random date generation function
function randomDate(start: Date, end: Date): Date {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

// Helper function to generate random coordinates within a range
const randomCoordinate = (min: number, max: number) => {
  return Number((Math.random() * (max - min) + min).toFixed(6));
};

export const mockReports: ReportUserLogJoinType[] = Array.from(
  { length: 1000 },
  (_, i) => ({
    reportid: `report-${i + 1}`,
    description: `Report description ${i + 1}`,
    status: [
      "Submitted",
      "On-Review",
      "Verified",
      "Declined",
      "On-Going Maintenance",
      "Finished",
    ][Math.floor(Math.random() * 6)],
    timestamp: randomDate(new Date(2023, 0, 1), new Date()).toISOString(),
    latitude: parseFloat((Math.random() * 180 - 90).toFixed(6)), // Convert string to number
    longitude: parseFloat((Math.random() * 360 - 180).toFixed(6)), // Convert string to number
    imageurl:
      Math.random() < 0.8 ? `https://example.com/image${i + 1}.jpg` : null, // Add possibility for null
    country: "Indonesia",
    city: [
      "Jakarta",
      "Surabaya",
      "Bandung",
      "Medan",
      "Semarang",
      "Makassar",
      "Denpasar",
      "Yogyakarta",
      "Depok",
      "Sukabumi",
    ][Math.floor(Math.random() * 10)],
    state: [
      "DKI Jakarta",
      "Jawa Timur",
      "Jawa Barat",
      "Sumatera Utara",
      "Jawa Tengah",
      "Sulawesi Selatan",
      "Bali",
      "DI Yogyakarta",
      "Sumatera Selatan",
      "Kalimantan Timur",
    ][Math.floor(Math.random() * 10)],

    street: `Street ${Math.floor(Math.random() * 1000)}`,
    postcode: `${Math.floor(10000 + Math.random() * 90000)}`, // Random 5-digit postal code

    // User details
    userid: `user-${Math.floor(Math.random() * 100) + 1}`,
    username: `User ${Math.floor(Math.random() * 100) + 1}`,
    email: `user${i + 1}@example.com`,
    role: ["Admin", "Super_Admin", "User"][Math.floor(Math.random() * 3)],

    // Report log details
    logs: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, (_, j) => ({
      verificationid: `verification-${i + 1}-${j + 1}`,
      comments: Math.random() < 0.5 ? `Comment for log ${j + 1}` : null,
      changetime: randomDate(new Date(2023, 0, 1), new Date()).toISOString(),
      status: [
        "Submitted",
        "On-Review",
        "Verified",
        "Declined",
        "On-Going Maintenance",
        "Finished",
      ][Math.floor(Math.random() * 6)],
    })),
  })
);

// Generate mock IoT device data
export const mockIotDevices: IotDeviceType[] = Array.from(
  { length: 500 },
  (_, i) => ({
    deviceid: `device-${i + 1}`,
    devicename: `${
      ["Mobil", "Motor", "Bis", "Sepeda", "Beam"][Math.floor(Math.random() * 5)]
    }-Sensor-${Math.floor(Math.random() * 100) + 1}`,
    description: `A sensor used to monitor ${
      ["Mobil", "Motor", "Bis", "Sepeda ", "Beam"][
        Math.floor(Math.random() * 5)
      ]
    }`,
    userid: `user-${Math.floor(Math.random() * 100) + 1}`,
  })
);

import * as z from "zod";

export const reportFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  description: z
    .string()
    .min(6, { message: "Description must be at least 6 characters." }),
  image: z.instanceof(File).refine((file) => file.size <= 5000000, {
    message: "Max image size is 5MB.",
  }),
  latitude: z
    .number()
    .min(-90, { message: "Invalid latitude." })
    .max(90, { message: "Invalid latitude." })
    .refine((lat) => lat !== 0, { message: "Latitude must be set." }),
  longitude: z
    .number()
    .min(-180, { message: "Invalid longitude." })
    .max(180, { message: "Invalid longitude." })
    .refine((lng) => lng !== 0, { message: "Longitude must be set." }),
});

export type ReportFormType = z.infer<typeof reportFormSchema>;

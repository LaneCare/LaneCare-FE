"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { MapPin, Upload } from "lucide-react";
import { reportFormSchema, ReportFormType } from "@/lib/validations/validation";
import { addReport } from "@/lib/server/services/report.client.service";
import MapForm from "@/components/mapform";
import { useToast } from "@/components/hooks/use-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ButtonWithLoading from "@/components/ButtonWithLoading";
import { UserSession } from "@/lib/types/auth";

interface AddNewReportFormProps {
  userSession: UserSession;
}

export default function AddNewReportForm({
  userSession,
}: AddNewReportFormProps) {
  const form = useForm<ReportFormType>({
    resolver: zodResolver(reportFormSchema),
    defaultValues: {
      name: "TODO Delete this",
      description: "",
      latitude: 0,
      longitude: 0,
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  // Watch latitude and longitude for changes
  const latitude = form.watch("latitude");
  const longitude = form.watch("longitude");

  async function onSubmit(values: ReportFormType) {
    console.log(values);

    // const valuesWithImage = {
    //   ...values,
    //   image: {
    //     name: values.image.name,
    //     size: values.image.size,
    //     type: values.image.type,
    //     lastModified: values.image.lastModified,
    //   },
    // };

    // const valuesAsJson = JSON.stringify(valuesWithImage, null, 2);

    // alert(valuesAsJson);

    setIsLoading(true);

    const response = await addReport(values, userSession.id);

    if (response) {
      toast({
        title: "Report added successfully.",
        description: "Your report has been added successfully.",
      });
      form.reset();

      const redirectRoute = userSession.role === "user" ? "/maps" : "/reports";

      router.push(redirectRoute);
    } else {
      alert("Error adding report. Please try again.");
      toast({
        description: "Report failed to add.",
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
      });
    }

    setIsLoading(false);
  }

  return (
    <div className="w-full max-w-[95rem] space-y-6 ">
      <Card className="border-2 border-dashed min-h-[72vh] ">
        <CardContent>
          <div className="xl:flex xl:space-x-6 pt-8 pb-4">
            <div className="xl:w-2/3 mb-6 xl:mb-0">
              {/* <div
                className="w-full h-64 xl:h-full bg-gray-200 dark:bg-gray-800 rounded-xl flex items-center justify-center cursor-pointer"
                onClick={handleMapClick}
              >
                <MapPin className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                <span className="ml-2 text-gray-500 dark:text-gray-400">
                  Map Container (Click to set location)
                </span>
              </div> */}

              <MapForm form={form} />

              {/* Display selected position dynamically */}
              {latitude !== 0 && longitude !== 0 && (
                <p className="text-sm text-muted-foreground dark:text-gray-400 mt-2">
                  Selected Position: {latitude.toFixed(6)},{" "}
                  {longitude.toFixed(6)}
                </p>
              )}
            </div>

            <div className="xl:w-1/3">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  {/* <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Location name" {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter a name for this location.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe this location"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Provide a brief description of the location.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field: { onChange, value, ...rest } }) => (
                      <FormItem>
                        <FormLabel>Image</FormLabel>
                        <FormControl>
                          <div className="flex items-center justify-center w-full">
                            <label
                              htmlFor="dropzone-file"
                              className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700"
                            >
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" />
                                {value ? (
                                  <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold">
                                      {value.name} (
                                      {(value.size / 1024).toFixed(2)} KB)
                                    </span>
                                  </p>
                                ) : (
                                  <>
                                    <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                                      <span className="font-semibold">
                                        Click to upload
                                      </span>{" "}
                                      or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                      PNG, JPG or GIF (MAX. 5MB)
                                    </p>
                                  </>
                                )}
                              </div>
                              <input
                                id="dropzone-file"
                                type="file"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) onChange(file);
                                }}
                                accept="image/*"
                                {...rest}
                              />
                            </label>
                          </div>
                        </FormControl>
                        <FormDescription>
                          Upload an image of the location.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-between items-center ">
                    <FormField
                      control={form.control}
                      name="latitude"
                      render={({ field }) => (
                        <FormItem>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="longitude"
                      render={({ field }) => (
                        <FormItem>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex w-full">
                    <ButtonWithLoading
                      isLoading={isLoading}
                      className="w-full"
                      type="submit"
                    >
                      Submit
                    </ButtonWithLoading>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

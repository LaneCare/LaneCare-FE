import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractFirstPathSegment(path: string) {
  // Remove leading and trailing slashes and split the path by "/"
  const segments = path.replace(/^\/|\/$/g, "").split("/");
  // Return the first segment
  return segments[0];
}

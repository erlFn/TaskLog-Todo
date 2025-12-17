import { clsx, type ClassValue } from "clsx"
import { formatDistanceToNow, parseISO } from "date-fns";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function TitleCase(val: string) {
  return val
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export function getRelativeTime(date: string) {
  return formatDistanceToNow(parseISO(date), { addSuffix: true});
}

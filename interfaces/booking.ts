// Importing CampgroundSummary as it is used in the Booking interface
import { CampgroundSummary } from "@/interfaces/campground";

// Updated User Summary Interface for the Booking
export interface UserSummary {
  _id: string;
  name: string;
  tel: string
}

// Updated Booking interface with user details included
export interface Booking {
  _id: string;
  bookingDate: string;
  checkoutDate: string;
  createdAt: string;
  user?: UserSummary; // Using UserSummary to include userId and username
  campground: CampgroundSummary; // Using CampgroundSummary instead of campgroundId
}

// Booking form data type remains the same
export interface BookingFormData {
  bookingDate: string;
  checkoutDate: string;
  createdAt?: string;
}

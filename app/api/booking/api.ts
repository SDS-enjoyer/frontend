// Types for booking data

import { Booking, BookingFormData } from "@/interfaces/booking";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_UR_CAMP}/api/v1`;

// Reuse the getToken function from campgrounds API
async function getToken(token?: string) {
  if (token) {
    return token;
  }
  const response = await fetch("/api/token");
  if (!response.ok) {
    throw new Error("Failed to fetch token");
  }
  const data = await response.json();

  console.log("data is", data);
  console.log("data.token is", data.token);
  return data.token;
}

export async function createBooking(
  campgroundId: string,
  bookingData: BookingFormData
) {
  const token = await getToken();

  try {
    const response = await fetch(
      `${API_BASE_URL}/campgrounds/${campgroundId}/bookings`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create booking");
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error creating booking: ${error.message}`);
    }
    throw new Error("An unexpected error occurred while creating the booking");
  }
}

export async function fetchBookings(campgroundId: string): Promise<Booking[]> {
  const token = await getToken();

  try {
    const response = await fetch(
      `${API_BASE_URL}/bookings?campgroundId=${campgroundId}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch bookings");
    }

    const result = await response.json();
    if (result.success) {
      return result.data;
    } else {
      throw new Error("Failed to load bookings");
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching bookings: ${error.message}`);
    }
    throw new Error("An unexpected error occurred while fetching bookings");
  }
}

export async function fetchMyBookings(): Promise<Booking[]> {
  const token = await getToken();

  try {
    const response = await fetch(`${API_BASE_URL}/bookings/my-bookings`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch my bookings");
    }

    const result = await response.json();
    if (result.success) {
      return result.data;
    } else {
      throw new Error("Failed to load my bookings");
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching my bookings: ${error.message}`);
    }
    throw new Error("An unexpected error occurred while fetching my bookings");
  }
}

export async function fetchSingleBooking(bookingId: string, token?: string) {
  if (!token) {
    token = await getToken();
  } else {
    token = await getToken(token);
  }
  const endpoint = `${API_BASE_URL}/bookings/${bookingId}`;

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch my bookings");
    }

    const result = await response.json();
    if (result.success) {
      return result.data;
    } else {
      throw new Error("Failed to load my bookings");
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching my bookings: ${error.message}`);
    }
    throw new Error("An unexpected error occurred while fetching my bookings");
  }
}

export async function deleteBookingById(bookingId: string, token?: string) {
  if (!token) {
    token = await getToken();
  } else {
    token = await getToken(token);
  }
  const endpoint = `${API_BASE_URL}/bookings/${bookingId}`;

  try {
    const response = await fetch(endpoint, {
      method: "DELETE",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });
    const result = await response.json();

    if (response.ok && result.success) {
      return { success: true, message: "booking deleted successfully!" };
    } else {
      return {
        success: false,
        message: result.error || "Error deleting booking.",
      };
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching my bookings: ${error.message}`);
    }
    throw new Error("An unexpected error occurred while fetching my bookings");
  }
}

export async function updateBookingById(
  bookingId: string,
  bookingData: BookingFormData,
  token?: string
) {
  if (!token) {
    token = await getToken();
  } else {
    token = await getToken(token);
  }
  const endpoint = `${API_BASE_URL}/bookings/${bookingId}`;

  try {
    const response = await fetch(endpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create booking");
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error creating booking: ${error.message}`);
    }
    throw new Error("An unexpected error occurred while creating the booking");
  }
}

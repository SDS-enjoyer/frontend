import { CampgroundFormData } from "@/app/campgrounds/create/page";
import { CampgroundDetails } from "@/interfaces/campground";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_UR_CAMP}/api/v1`;

async function getToken() {
  const response = await fetch("/api/token");
  if (!response.ok) {
    throw new Error("Failed to fetch token");
  }
  const data = await response.json();
  return data.token;
}

export async function fetchCampgroundData(campgroundId: string) {
  const res = await fetch(`${API_BASE_URL}/campgrounds/${campgroundId}`, {
    method: "GET",
    headers: { accept: "application/json" },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch campground data");
  }
  const data = await res.json();
  return data.data;
}

export async function createCampground(data: CampgroundFormData) {
  const formData = new FormData();
  const token = await getToken();
  console.log("token", token);

  formData.append("name", data.name);
  formData.append("address", data.address);
  formData.append("district", data.district);
  formData.append("province", data.province);
  formData.append("postalcode", data.postalcode);
  formData.append("tel", data.tel);

  if (data.image instanceof File) {
    formData.append("picture", data.image);
  }

  const response = await fetch(`${API_BASE_URL}/campgrounds`, {
    method: "POST",
    body: formData,
    headers: { accept: "application/json", Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return await response.json();
}

export async function updateCampground(
  campgroundId: string,
  data: CampgroundFormData
) {
  const formData = new FormData();
  const token = await getToken();

  // Append all the form fields
  formData.append("name", data.name);
  formData.append("address", data.address);
  formData.append("district", data.district);
  formData.append("province", data.province);
  formData.append("postalcode", data.postalcode);
  formData.append("tel", data.tel);

  // Only append image if a new one is provided
  if (data.image instanceof File) {
    formData.append("picture", data.image);
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/campgrounds/${campgroundId}`,
      {
        method: "PUT",
        body: formData,
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update campground");
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error updating campground: ${error.message}`);
    }
    throw new Error(
      "An unexpected error occurred while updating the campground"
    );
  }
}

export async function deleteCampground(campgroundId: string) {
  const token = await getToken();

  try {
    const response = await fetch(
      `${API_BASE_URL}/campgrounds/${campgroundId}`,
      {
        method: "DELETE",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete campground");
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error deleting campground: ${error.message}`);
    }
    throw new Error(
      "An unexpected error occurred while deleting the campground"
    );
  }
}

export async function fetchCampgrounds(): Promise<CampgroundDetails[]> {
  const response = await fetch(`${API_BASE_URL}/campgrounds`, {
    method: "GET",
    headers: { accept: "application/json" },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  const result = await response.json();
  if (result.success) {
    return result.data;
  } else {
    throw new Error("Failed to load campgrounds");
  }
}

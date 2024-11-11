export default async function Userme(token: string) {
  if (!token) {
    throw new Error("Authorization token missing");
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL_AUTH}/api/v1/auth/me`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error fetching user data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Internal server error: ${error}`);
  }
}

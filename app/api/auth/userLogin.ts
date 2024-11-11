import axios from "axios";

export default async function userLogIn(
  userEmail: string,
  userPassword: string
) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL_AUTH}/api/v1/auth/login`,
      {
        email: userEmail,
        password: userPassword,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

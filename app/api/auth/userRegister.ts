import axios from "axios";

export default async function userRegister(
  userName: string,
  userEmail: string,
  userTel: string,
  userPassword: string,
  userRole: string
) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL_AUTH}/api/v1/auth/register`,
      {
        name: userName,
        email: userEmail,
        tel: userTel,
        password: userPassword,
        role: userRole,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
}

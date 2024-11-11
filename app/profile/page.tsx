// app/profile/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Userme from "../api/auth/userme";
import { User } from "../campgrounds/search/page";
import Image from "next/image";

interface UserProfile {
  name: string;
  email: string;
  tel: string;
  role: string;
  createdAt: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const session = await getSession();
        const token = (session?.user as User)?.token ?? null;

        if (!token) {
          router.push("/login");
          return;
        }

        const user = await Userme(token);
        setProfile(user?.data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <Card className="animate-pulse">
            <CardHeader>
              <CardTitle className="h-8 bg-gray-200 rounded w-[200px]" />
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-6 bg-gray-200 rounded w-full" />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        <Card className="bg-white shadow-lg">
          <CardHeader className="border-b">
            <CardTitle className="text-xl sm:text-2xl lg:text-3xl flex items-center justify-between">
              <span>My Profile</span>
              {profile.role === "admin" && (
                <span className="text-sm sm:text-base text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  Admin
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 lg:p-8">
            <div className="space-y-6">
              {/* Profile Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Name */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Name</div>
                  <div className="font-medium text-gray-900">
                    {profile.name}
                  </div>
                </div>

                {/* Email */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Email</div>
                  <div className="font-medium text-gray-900 break-all">
                    {profile.email}
                  </div>
                </div>

                {/* Phone */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Phone</div>
                  <div className="font-medium text-gray-900">{profile.tel}</div>
                </div>

                {/* Role */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Role</div>
                  <div className="font-medium text-gray-900 capitalize">
                    {profile.role}
                  </div>
                </div>

                {/* Member Since */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Member Since</div>
                  <div className="font-medium text-gray-900">
                    {new Date(profile.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="mt-20 sm:mt-0 xl:mx-auto xl:max-w-7xl xl:px-8">
        <Image
          src="/img/campground-hero-2.jpg"
          className="aspect-[9/4] w-full object-cover xl:rounded-3xl"
          width={1000}
          height={1000}
          alt="Avatar"
        />
      </div>
    </div>
  );
}

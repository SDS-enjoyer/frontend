import { fetchCampgrounds } from "@/app/api/campground/api";
import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Userme from "@/app/api/auth/userme";
import SettingsDropdown from "@/components/settingdropdown";
import { Tent } from "lucide-react";
import { CampgroundDetails } from "@/interfaces/campground";

export interface User {
  token: string | null;
}

export default async function SearchPage() {
  const session = await getServerSession(authOptions);
  const token = (session?.user as User)?.token ?? null;

  let isAdmin = false;
  if (token) {
    const user = await Userme(token);
    isAdmin = user?.data?.role === "admin";
  }

  let campgrounds: CampgroundDetails[];
  let error: string | null = null;

  try {
    campgrounds = await fetchCampgrounds();
  } catch (err) {
    error = (err as Error).message;
    campgrounds = [];
  }

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-white isolate">
      <div className="relative isolate -z-10 overflow-hidden bg-gradient-to-b from-indigo-100/20 ">
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96"
        />
        <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-16">
            <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:col-span-2 xl:col-auto">
              Discover Nature&apos;s Beauty Campground
            </h1>
            <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
              <p className="text-lg leading-8 text-gray-600">
                Immerse yourself in the serene wilderness at our picturesque
                campground. Surrounded by lush forests and crystal-clear
                streams, Nature&apos;s Beauty offers the perfect escape for
                outdoor enthusiasts and families alike. Experience unforgettable
                adventures and create lasting memories in the heart of nature.
              </p>
            </div>
            <Image
              src="/img/campground-hero-4.jpg"
              className="mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
              width={1000}
              height={1000}
              alt="Avatar"
            />
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
      </div>
      <div className="mx-auto max-w-2xl px-4 py-2 sm:px-6 sm:py-4 lg:max-w-7xl lg:px-8">
        <div className="flex items-center justify-between  py-6 w-full">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Ours Campgrounds
          </h2>
          {isAdmin && (
            <div className="flex flex-row items-center justify-center gap-1 sm:gap-3 md:gap-5">
              <span className="text-xs md:text-sm lg:text-base text-blue-600 bg-blue-50 px-2 md:px-3 py-1 rounded-full transition-all">
                Admin
              </span>
              <SettingsDropdown />
            </div>
          )}
        </div>
        {campgrounds.length === 0 ? (
          <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4">
            <Tent className="h-16 w-16 text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              No Campgrounds Found
            </h2>
            <p className="text-gray-600 mb-6 max-w-md">
              It looks like there aren&apos;t any campgrounds listed yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-x-6 gap-y-10 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {campgrounds.map((campground) => (
              <Link
                href={`/campgrounds/${campground.id}`}
                key={campground.id}
                className="group"
              >
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                  <img
                    alt={`Picture of ${campground.name}`}
                    src={campground.picture}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">
                  {campground.name}
                </h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  {campground.province}
                </p>
                <p className="mt-1 text-sm text-gray-500">{campground.tel}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

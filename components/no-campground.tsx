import { Button } from "@/components/ui/button";
import { Tent, PlusCircle } from "lucide-react";
import Link from "next/link";

export default function NoCampGround() {
  return (
    <div className="h-[66vh]  flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
        <Tent className="mx-auto h-16 w-16 text-green-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          No Campgrounds Yet
        </h1>
        <p className="text-gray-600 mb-6">
          It looks like no campgrounds have been created. Why not be the first
          to add one?
        </p>
        <Link href="/campgrounds/create">
          <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out flex items-center justify-center">
            <PlusCircle className="mr-2 h-5 w-5" />
            Create a Campground
          </Button>
        </Link>
      </div>
    </div>
  );
}

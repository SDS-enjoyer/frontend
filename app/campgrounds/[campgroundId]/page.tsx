import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BookingandCheckoutForm } from "@/components/bookingform";
import { fetchCampgroundData } from "@/app/api/campground/api";
const CampgroundPage = async ({
  params,
}: {
  params: { campgroundId: string };
}) => {
  const { campgroundId } = params;

  let campgroundData;
  try {
    campgroundData = await fetchCampgroundData(campgroundId);
  } catch (error) {
    console.error(error);
    return (
      <div>Error: An error occurred while fetching the campground data.</div>
    );
  }

  if (!campgroundData) {
    return <div>No campground data found.</div>;
  }

  const features = [
    { name: "Address", description: campgroundData.address },
    { name: "District", description: campgroundData.district },
    { name: "Province", description: campgroundData.province },
    { name: "Postal Code", description: campgroundData.postalcode },
    { name: "Telephone", description: campgroundData.tel },
  ];

  return (
    <div className="bg-white">
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-16 sm:px-6 sm:py-20 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {campgroundData.name}
          </h2>
          <p className="mt-4 text-gray-500">
            Explore this beautiful campground and enjoy your stay in nature.
          </p>

          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            {features.map((feature) => (
              <div key={feature.name} className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900">{feature.name}</dt>
                <dd className="mt-2 text-sm text-gray-500">
                  {feature.description}
                </dd>
              </div>
            ))}
            <div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Open Booking</Button>
                </DialogTrigger>
                <DialogContent className=" w-full">
                  <DialogHeader>
                    <DialogTitle className=" text-start mb-2">
                      Booking Form
                    </DialogTitle>
                    <DialogDescription className=" text-start">
                      Complete your booking details below.
                    </DialogDescription>
                  </DialogHeader>
                  <BookingandCheckoutForm campgroundId={campgroundId} />
                </DialogContent>
              </Dialog>
            </div>
          </dl>
        </div>

        <div>
          <img
            alt={`Campground ${campgroundData.name}`}
            src={campgroundData.picture}
            className="rounded-lg bg-gray-100"
          />
        </div>
      </div>
    </div>
  );
};

export default CampgroundPage;

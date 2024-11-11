// server approach, we need to pass token into the api (lib equivalent)


import { fetchSingleBooking } from "@/app/api/booking/api";
import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
interface BookingInfoProps {
  params: {
    bookingId: string;
  };
}

export default async function BookingInfo({ params }: BookingInfoProps) {
  const session = await getServerSession(authOptions);
  const token = session?.user?.token
  console.log("token is", token)
  const {bookingId} = params
  console.log("bookingId =", bookingId)

  const booking = await fetchSingleBooking(bookingId, token)
  console.log("booking is", booking)


    const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className = "container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Booking Information</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
      <tbody>
           <tr>
             <td className="border px-4 py-2 font-bold">User ID</td>
             <td className="border px-4 py-2">{booking.user?._id}</td>
           </tr>
           <tr>
             <td className="border px-4 py-2 font-bold">User Name</td>
             <td className="border px-4 py-2">{booking.user?.name}</td>
           </tr>
           <tr>
             <td className="border px-4 py-2 font-bold">User Telephone</td>
             <td className="border px-4 py-2">{booking.user?.tel}</td>
           </tr>
           <tr>
             <td className="border px-4 py-2 font-bold">Booking Date</td>
             <td className="border px-4 py-2">{formatDate(booking.bookingDate)}</td>
           </tr>
           <tr>
             <td className="border px-4 py-2 font-bold">Check-Out Date</td>
             <td className="border px-4 py-2">{formatDate(booking.checkoutDate)}</td>
           </tr>
           <tr>
             <td className="border px-4 py-2 font-bold">Campground Name</td>
             <td className="border px-4 py-2">{booking.campground?.name || "N/A"}</td>
           </tr>
           <tr>
             <td className="border px-4 py-2 font-bold">Campground Address</td>
             <td className="border px-4 py-2">{booking.campground?.address || "N/A"}</td>
           </tr>
           <tr>
             <td className="border px-4 py-2 font-bold">Campground Telephone</td>
             <td className="border px-4 py-2">{booking.campground?.tel || "N/A"}</td>
           </tr>
           <tr>
             <td className="border px-4 py-2 font-bold">Created At</td>
             <td className="border px-4 py-2">{new Date(booking.createdAt).toLocaleString() || "N/A"}</td>
           </tr>
         </tbody>

      </table>
    </div>
  )
}







// client approach

// "use client";


// import { useEffect, useState } from "react";
// import { Booking } from "@/interfaces/booking";
// import { fetchSingleBooking } from "@/app/api/booking/api";

// interface BookingInfoProps {
//   params: {
//     bookingId: string;
//   };
// }

// export default function BookingInfo({ params }: BookingInfoProps){

//   const {bookingId} = params;
//   console.log(bookingId);

//   const [booking, setBooking] = useState<Booking | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   const loadBooking = async () => {
//     try {
//       const fetchedBooking = await fetchSingleBooking(bookingId);
//       setBooking(fetchedBooking);
//       setIsLoading(false);

//     } catch(error) {
//       console.log(error)
//     }
//   }

//   useEffect(() => {
//     loadBooking();
//   }, [bookingId])
//   if (isLoading) {
//     return <div>Loading booking details...</div>; // Display a loading state while fetching
//   }

//   if (!booking) {
//     return <div>No booking found.</div>;
//   }

//   const formatDate = (dateString: string) => {
//          return new Date(dateString).toLocaleDateString();
//   };
  
  
//   return (
//     <div className = "container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Booking Information</h1>
//       <table className="table-auto w-full border-collapse border border-gray-300">
//       <tbody>
//            <tr>
//              <td className="border px-4 py-2 font-bold">User ID</td>
//              <td className="border px-4 py-2">{booking.user?._id}</td>
//            </tr>
//            <tr>
//              <td className="border px-4 py-2 font-bold">User Name</td>
//              <td className="border px-4 py-2">{booking.user?.name}</td>
//            </tr>
//            <tr>
//              <td className="border px-4 py-2 font-bold">User Telephone</td>
//              <td className="border px-4 py-2">{booking.user?.tel}</td>
//            </tr>
//            <tr>
//              <td className="border px-4 py-2 font-bold">Booking Date</td>
//              <td className="border px-4 py-2">{formatDate(booking.bookingDate)}</td>
//            </tr>
//            <tr>
//              <td className="border px-4 py-2 font-bold">Check-Out Date</td>
//              <td className="border px-4 py-2">{formatDate(booking.checkoutDate)}</td>
//            </tr>
//            <tr>
//              <td className="border px-4 py-2 font-bold">Campground Name</td>
//              <td className="border px-4 py-2">{booking.campground?.name || "N/A"}</td>
//            </tr>
//            <tr>
//              <td className="border px-4 py-2 font-bold">Campground Address</td>
//              <td className="border px-4 py-2">{booking.campground?.address || "N/A"}</td>
//            </tr>
//            <tr>
//              <td className="border px-4 py-2 font-bold">Campground Telephone</td>
//              <td className="border px-4 py-2">{booking.campground?.tel || "N/A"}</td>
//            </tr>
//            <tr>
//              <td className="border px-4 py-2 font-bold">Created At</td>
//              <td className="border px-4 py-2">{new Date(booking.createdAt).toLocaleString() || "N/A"}</td>
//            </tr>
//          </tbody>

//       </table>
//     </div>
//   )
// }


// without interface

// export default function BookingInfo({
  //   params,
  // }: {
  //   params: { bookingId: string };
  // })

















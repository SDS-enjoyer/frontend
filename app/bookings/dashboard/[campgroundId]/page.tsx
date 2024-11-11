"use client";

import { useEffect, useState } from "react";
import { Edit, MoreHorizontal, Trash2, Info } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { fetchBookings } from "@/app/api/booking/api";
import { Booking } from "@/interfaces/booking";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteBookingById } from "@/app/api/booking/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BookingandCheckoutForm } from "@/components/bookingform";

export default function BookingDashboard({
  params,
}: {
  params: { campgroundId: string };
}) {
  const router = useRouter();
  const { campgroundId } = params;
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [campgroundName, setCampgroundName] = useState<string>("");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  // Load bookings function moved outside useEffect
  const loadBookings = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchBookings(campgroundId);
      console.log(data);
      setBookings(data);
      if (data.length > 0) {
        setCampgroundName(data[0].campground.name);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load bookings"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, [campgroundId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteBookingById(id);
      setBookings(bookings.filter((booking) => booking._id !== id));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete booking"
      );
    }
  };

  const handleEdit = (booking: Booking) => {
    setSelectedBooking(booking);
  };

  const handleInfo = (id: string) => {
    console.log(`Info booking with id: ${id}`);
    router.push(`/bookings/info/${id}`);
  };

  const LoadingSkeleton = () => (
    <>
      {[1, 2, 3].map((index) => (
        <TableRow key={index}>
          <TableCell>
            <Skeleton className="h-4 w-[100px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[100px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[100px]" />
          </TableCell>
          <TableCell>
            <div className="flex justify-end">
              <Skeleton className="h-8 w-8" />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-2xl font-bold">Booking Dashboard</h1>
        {campgroundName && (
          <h2 className="text-lg text-gray-600">
            Campground: {campgroundName}
          </h2>
        )}
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Booking Date</TableHead>
              <TableHead>Checkout Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <LoadingSkeleton />
            ) : bookings.length > 0 ? (
              bookings.map((booking) => (
                <TableRow key={booking._id}>
                  <TableCell>{booking.user?.name || "N/A"}</TableCell>
                  <TableCell>{formatDate(booking.bookingDate)}</TableCell>
                  <TableCell>{formatDate(booking.checkoutDate)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => handleEdit(booking)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleInfo(booking._id)}
                        >
                          <Info className="mr-2 h-4 w-4" />
                          <span>Info</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDelete(booking._id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6">
                  No bookings found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {selectedBooking && (
        <Dialog
          open={Boolean(selectedBooking)}
          onOpenChange={() => setSelectedBooking(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Booking</DialogTitle>
              <DialogDescription>
                Update booking details below and confirm changes.
              </DialogDescription>
            </DialogHeader>
            <BookingandCheckoutForm
              campgroundId={selectedBooking.campground._id}
              initialBookingDate={new Date(selectedBooking.bookingDate)}
              initialCheckoutDate={new Date(selectedBooking.checkoutDate)}
              bookingId={selectedBooking._id}
              onSuccess={() => {
                setSelectedBooking(null);
                loadBookings();
              }}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}




// "use client";

// import { useEffect, useState } from "react";
// import { Edit, MoreHorizontal, Trash2, Info } from "lucide-react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// import { Skeleton } from "@/components/ui/skeleton";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { fetchBookings } from "@/app/api/booking/api";
// import { Booking } from "@/interfaces/booking";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { deleteBookingById, updateBookingById } from "@/app/api/booking/api";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";

// export default function BookingDashboard({
//   params,
// }: {
//   params: { campgroundId: string };
// }) {
//   const router = useRouter();
//   const { campgroundId } = params;
//   const [bookings, setBookings] = useState<Booking[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [campgroundName, setCampgroundName] = useState<string>("");
//   const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
//   const [newBookingDate, setNewBookingDate] = useState("");
//   const [newCheckoutDate, setNewCheckoutDate] = useState("");

//   useEffect(() => {
//     const loadBookings = async () => {
//       try {
//         setIsLoading(true);
//         setError(null);
//         const data = await fetchBookings(campgroundId);
//         console.log(data);
//         setBookings(data);
//         if (data.length > 0) {
//           setCampgroundName(data[0].campground.name);
//         }
//       } catch (err) {
//         setError(
//           err instanceof Error ? err.message : "Failed to load bookings"
//         );
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadBookings();
//   }, [campgroundId]);

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString();
//   };

//   const handleDelete = (id: string) => {
//     setBookings(bookings.filter((booking) => booking._id !== id));
//     deleteBookingById(id)
//   };

//   const handleEdit = (booking: Booking) => {
//     setSelectedBooking(booking);
//     setNewBookingDate(booking.bookingDate);
//     setNewCheckoutDate(booking.checkoutDate);
//   };
  
//   const confirmEdit = async () => {
//     if (selectedBooking) {
//       try {
//         const bookingData = {
//           bookingDate: newBookingDate,
//           checkoutDate: newCheckoutDate,
//         };
//         await updateBookingById(selectedBooking._id, bookingData);
//         const updatedBookings = await fetchBookings(campgroundId);
//         setBookings(updatedBookings);
//         setSelectedBooking(null);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "Failed to update booking");
//       }
//     }
//   };


//   const handleInfo = (id: string) => {
//     console.log(`Info booking with id: ${id}`);
//     router.push(`/bookings/info/${id}`)
//   };

//   const LoadingSkeleton = () => (
//     <>
//       {[1, 2, 3].map((index) => (
//         <TableRow key={index}>
//           <TableCell>
//             <Skeleton className="h-4 w-[100px]" />
//           </TableCell>
//           <TableCell>
//             <Skeleton className="h-4 w-[100px]" />
//           </TableCell>
//           <TableCell>
//             <Skeleton className="h-4 w-[100px]" />
//           </TableCell>
//           <TableCell>
//             <div className="flex justify-end">
//               <Skeleton className="h-8 w-8" />
//             </div>
//           </TableCell>
//         </TableRow>
//       ))}
//     </>
//   );

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex flex-col gap-2 mb-6">
//         <h1 className="text-2xl font-bold">Booking Dashboard</h1>
//         {campgroundName && (
//           <h2 className="text-lg text-gray-600">
//             Campground: {campgroundName}
//           </h2>
//         )}
//       </div>

//       {error && (
//         <Alert variant="destructive" className="mb-4">
//           <AlertTitle>Error</AlertTitle>
//           <AlertDescription>{error}</AlertDescription>
//         </Alert>
//       )}

//       <div className="overflow-x-auto">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Username</TableHead>
//               <TableHead>Booking Date</TableHead>
//               <TableHead>Checkout Date</TableHead>
//               <TableHead className="text-right">Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {isLoading ? (
//               <LoadingSkeleton />
//             ) : bookings.length > 0 ? (
//               bookings.map((booking) => (
//                 <TableRow key={booking._id}>
//                   <TableCell>{booking.user?.name || "N/A"}</TableCell>
//                   <TableCell>{formatDate(booking.bookingDate)}</TableCell>
//                   <TableCell>{formatDate(booking.checkoutDate)}</TableCell>
//                   <TableCell className="text-right">
//                     <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <Button variant="ghost" className="h-8 w-8 p-0">
//                           <span className="sr-only">Open menu</span>
//                           <MoreHorizontal className="h-4 w-4" />
//                         </Button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent align="end">
//                         <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                         <DropdownMenuItem
//                           onClick={() => handleEdit(booking)}
//                         >
//                           <Edit className="mr-2 h-4 w-4" />
//                           <span>Edit</span>
//                         </DropdownMenuItem>
//                         <DropdownMenuSeparator />
//                         <DropdownMenuItem
//                           onClick={() => handleInfo(booking._id)}
//                         >
//                           <Info className="mr-2 h-4 w-4" />
//                           <span>Info</span>
//                         </DropdownMenuItem>
//                         <DropdownMenuSeparator />
//                         <DropdownMenuItem
//                           onClick={() => handleDelete(booking._id)}
//                         >
//                           <Trash2 className="mr-2 h-4 w-4" />
//                           <span>Delete</span>
//                         </DropdownMenuItem>
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={4} className="text-center py-6">
//                   No bookings found
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//       {selectedBooking && (
//         <Dialog open={Boolean(selectedBooking)} onOpenChange={() => setSelectedBooking(null)}>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>Edit Booking</DialogTitle>
//               <DialogDescription>Update booking details below and confirm changes.</DialogDescription>
//             </DialogHeader>
//             <div className="space-y-4">
//               <Input
//                 type="date"
//                 value={newBookingDate}
//                 onChange={(e) => setNewBookingDate(e.target.value)}
//               />
//               <Input
//                 type="date"
//                 value={newCheckoutDate}
//                 onChange={(e) => setNewCheckoutDate(e.target.value)}
//               />
//               <Button onClick={confirmEdit} className="mt-4">
//                 Confirm Edit
//               </Button>
//             </div>
//           </DialogContent>
//         </Dialog>
//       )}
//     </div>
//   );
// }

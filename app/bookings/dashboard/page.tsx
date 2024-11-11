"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import { Edit, MoreHorizontal, Trash2, Info } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { fetchMyBookings } from "@/app/api/booking/api";

import { Booking } from "@/interfaces/booking";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import Userme from "@/app/api/auth/userme";
import { deleteBookingById } from "@/app/api/booking/api";
import { BookingandCheckoutForm } from "@/components/bookingform";

interface User {
  token: string;
}

interface UserProfile {
  name: string;
  email: string;
  tel: string;
  role: string;
  createdAt: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  console.log(profile);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const loadBookings = async () => {
    try {
      const session = await getSession();
      const token = (session?.user as User)?.token ?? null;

      if (!token) {
        router.push("/login");
        return;
      }

      const data = await fetchMyBookings();
      setBookings(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load bookings"
      );
    } finally {
      setIsLoading(false);
    }
  };

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
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      }
    };

    const initializePage = async () => {
      await fetchProfile();
      await loadBookings();
    };

    initializePage();
  }, [router]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const filteredBookings = bookings.filter((booking) =>
    booking.campground.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <>
      {[1, 2, 3, 4, 5].map((index) => (
        <TableRow key={index}>
          <TableCell>
            <Skeleton className="h-4 w-[200px]" />
          </TableCell>
          <TableCell className="hidden md:table-cell">
            <Skeleton className="h-4 w-[150px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[100px]" />
          </TableCell>
          <TableCell className="hidden sm:table-cell">
            <Skeleton className="h-4 w-[100px]" />
          </TableCell>
          <TableCell className="hidden lg:table-cell">
            <Skeleton className="h-4 w-[100px]" />
          </TableCell>
          <TableCell>
            <div className="flex space-x-2">
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Booking Dashboard</h1>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search by campground name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
          disabled={isLoading}
        />
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Campground Name</TableHead>
              <TableHead className="hidden md:table-cell">Address</TableHead>
              <TableHead>Booking Date</TableHead>
              <TableHead className="hidden sm:table-cell">
                Checkout Date
              </TableHead>
              <TableHead className="hidden lg:table-cell">Contact</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <LoadingSkeleton />
            ) : filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <TableRow key={booking._id}>
                  <TableCell className="font-medium">
                    {booking.campground.name}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {booking.campground.address}
                  </TableCell>
                  <TableCell>{formatDate(booking.bookingDate)}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {formatDate(booking.checkoutDate)}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {booking.campground.tel}
                  </TableCell>
                  <TableCell>
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
                <TableCell colSpan={6} className="text-center py-6">
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


























// old version no using Campground-frontend/components/bookingform.tsx


// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { getSession } from "next-auth/react";
// import { Edit, MoreHorizontal, Trash2, Info } from "lucide-react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { fetchMyBookings, updateBookingById } from "@/app/api/booking/api";

// import { Booking } from "@/interfaces/booking";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";

// import Userme from "@/app/api/auth/userme";
// import { deleteBookingById } from "@/app/api/booking/api";




// interface User {
//   token: string;
// }

// interface UserProfile {
//   name: string;
//   email: string;
//   tel: string;
//   role: string;
//   createdAt: string;
// }

// export default function DashboardPage() {
//   const router = useRouter();
//   const [bookings, setBookings] = useState<Booking[]>([]);
//   const [profile, setProfile] = useState<UserProfile | null>(null);
//   console.log(profile);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
//   const [newBookingDate, setNewBookingDate] = useState("");
//   const [newCheckoutDate, setNewCheckoutDate] = useState("");

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const session = await getSession();
//         const token = (session?.user as User)?.token ?? null;

//         if (!token) {
//           router.push("/login");
//           return;
//         }

//         const user = await Userme(token);
//         setProfile(user?.data);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "Something went wrong");
//       }
//     };

//     const loadBookings = async () => {
//       try {
//         const session = await getSession();
//         const token = (session?.user as User)?.token ?? null;

//         if (!token) {
//           router.push("/login");
//           return;
//         }

//         const data = await fetchMyBookings();
//         setBookings(data);
//       } catch (err) {
//         setError(
//           err instanceof Error ? err.message : "Failed to load bookings"
//         );
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     // Execute both fetches
//     const initializePage = async () => {
//       await fetchProfile();
//       await loadBookings();
//     };

//     initializePage();
//   }, [router]);

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString();
//   };

//   const filteredBookings = bookings.filter((booking) =>
//     booking.campground.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

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
//         const updatedBookings = await fetchMyBookings();
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

//   // Loading skeleton component
//   const LoadingSkeleton = () => (
//     <>
//       {[1, 2, 3, 4, 5].map((index) => (
//         <TableRow key={index}>
//           <TableCell>
//             <Skeleton className="h-4 w-[200px]" />
//           </TableCell>
//           <TableCell className="hidden md:table-cell">
//             <Skeleton className="h-4 w-[150px]" />
//           </TableCell>
//           <TableCell>
//             <Skeleton className="h-4 w-[100px]" />
//           </TableCell>
//           <TableCell className="hidden sm:table-cell">
//             <Skeleton className="h-4 w-[100px]" />
//           </TableCell>
//           <TableCell className="hidden lg:table-cell">
//             <Skeleton className="h-4 w-[100px]" />
//           </TableCell>
//           <TableCell>
//             <div className="flex space-x-2">
//               <Skeleton className="h-8 w-8" />
//               <Skeleton className="h-8 w-8" />
//             </div>
//           </TableCell>
//         </TableRow>
//       ))}
//     </>
//   );

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Booking Dashboard</h1>
//       </div>

//       {error && (
//         <Alert variant="destructive" className="mb-4">
//           <AlertTitle>Error</AlertTitle>
//           <AlertDescription>{error}</AlertDescription>
//         </Alert>
//       )}

//       <div className="mb-4">
//         <Input
//           type="text"
//           placeholder="Search by campground name..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="max-w-sm"
//           disabled={isLoading}
//         />
//       </div>

//       <div className="overflow-x-auto">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead className="w-[200px]">Campground Name</TableHead>
//               <TableHead className="hidden md:table-cell">Address</TableHead>
//               <TableHead>Booking Date</TableHead>
//               <TableHead className="hidden sm:table-cell">
//                 Checkout Date
//               </TableHead>
//               <TableHead className="hidden lg:table-cell">Contact</TableHead>
//               <TableHead>Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {isLoading ? (
//               <LoadingSkeleton />
//             ) : filteredBookings.length > 0 ? (
//               filteredBookings.map((booking) => (
//                 <TableRow key={booking._id}>
//                   <TableCell className="font-medium">
//                     {booking.campground.name}
//                   </TableCell>
//                   <TableCell className="hidden md:table-cell">
//                     {booking.campground.address}
//                   </TableCell>
//                   <TableCell>{formatDate(booking.bookingDate)}</TableCell>
//                   <TableCell className="hidden sm:table-cell">
//                     {formatDate(booking.checkoutDate)}
//                   </TableCell>
//                   <TableCell className="hidden lg:table-cell">
//                     {booking.campground.tel}
//                   </TableCell>
//                   <TableCell>
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
//                 <TableCell colSpan={6} className="text-center py-6">
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
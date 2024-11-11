"use client";
import { useEffect, useState } from "react";
import { MoreHorizontal, Edit, Trash2, Calendar } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "next-auth/react";
import { deleteCampground, fetchCampgrounds } from "@/app/api/campground/api";
import { Skeleton } from "@/components/ui/skeleton"; // Import the Skeleton component
import { useRouter } from "next/navigation";
import NoCampGround from "@/components/no-campground";

// Define the type for campground
type Campground = {
  id: string;
  name: string;
  address: string;
  postalCode: string;
  province: string;
  tel: string;
};

export default function CampgroundDashboard() {
  const router = useRouter();
  const session = useSession();
  // Set the type of campgrounds to be either an array of Campground or null
  const [campgrounds, setCampgrounds] = useState<Campground[] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchCampgrounds();
      const processedCampgrounds = response.map((campground) => ({
        id: String(campground.id),
        name: campground.name,
        address: campground.address,
        postalCode: campground.postalcode,
        province: campground.province,
        tel: campground.tel,
      }));
      setCampgrounds(processedCampgrounds); // Now campgrounds is set as an array of Campground objects
    };
    fetchData();
  }, [session]);

  if (campgrounds?.length === 0 && campgrounds !== null) {
    return <NoCampGround />;
  }

  const filteredCampgrounds =
    campgrounds?.filter((campground) =>
      campground.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const handleDelete = async (id: string) => {
    try {
      await deleteCampground(id);
      setCampgrounds(campgrounds!.filter((campground) => campground.id !== id));
    } catch (error) {
      console.error("Failed to delete campground", error);
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/campgrounds/edit/${id}`);
  };
  const handleBooking = (id: string) => {
    router.push(`/bookings/dashboard/${id}`);
  };

  const renderSkeletons = () => (
    <TableRow>
      <TableCell>
        <Skeleton className="h-6 w-32" /> {/* Name */}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Skeleton className="h-6 w-48" /> {/* Address */}
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        <Skeleton className="h-6 w-20" /> {/* Province */}
      </TableCell>
      <TableCell className="hidden lg:table-cell">
        <Skeleton className="h-6 w-16" /> {/* Postal Code */}
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        <Skeleton className="h-6 w-24" /> {/* Telephone */}
      </TableCell>
      <TableCell>
        <Skeleton className="h-6 w-8" /> {/* Actions */}
      </TableCell>
    </TableRow>
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Campground Dashboard</h1>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search campgrounds by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Name</TableHead>
              <TableHead className="hidden md:table-cell">Address</TableHead>
              <TableHead className="hidden sm:table-cell">Province</TableHead>
              <TableHead className="hidden lg:table-cell">
                Postal Code
              </TableHead>
              <TableHead className="hidden sm:table-cell">Telephone</TableHead>
              <TableHead className="w-[70px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Show skeletons when data is not yet fetched */}
            {campgrounds === null
              ? Array.from({ length: 5 }).map(() => renderSkeletons()) // Show skeleton rows
              : filteredCampgrounds.map((campground) => (
                  <TableRow key={campground.id}>
                    <TableCell className="font-medium">
                      {campground.name}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {campground.address}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {campground.province}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {campground.postalCode}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {campground.tel}
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
                            onClick={() => handleEdit(campground.id)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleBooking(campground.id)}
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            <span>Booking</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDelete(campground.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

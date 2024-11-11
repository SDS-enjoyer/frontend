"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format, differenceInCalendarDays, isSameDay } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { toast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { createBooking, updateBookingById } from "@/app/api/booking/api";

interface BookingandCheckoutFormProps {
  campgroundId: string;
  initialBookingDate?: Date;
  initialCheckoutDate?: Date;
  bookingId?: string;
  onSuccess?: () => void;
}

// Update the schema to handle optional dates
const FormSchema = z
  .object({
    bookingDate: z.date({ required_error: "Booking date is required." }),
    checkoutDate: z
      .date({ required_error: "Checkout date is required." })
      .nullable(),
  })
  .refine(
    ({ bookingDate, checkoutDate }) =>
      !checkoutDate || bookingDate < checkoutDate,
    {
      message: "Checkout date must be after booking date.",
      path: ["checkoutDate"],
    }
  )
  .refine(
    ({ bookingDate, checkoutDate }) =>
      !checkoutDate || !isSameDay(bookingDate, checkoutDate),
    {
      message: "Booking and checkout dates cannot be the same.",
      path: ["checkoutDate"],
    }
  );

type FormValues = z.infer<typeof FormSchema>;

export function BookingandCheckoutForm({
  campgroundId,
  initialBookingDate,
  initialCheckoutDate,
  bookingId,
  onSuccess,
}: BookingandCheckoutFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      bookingDate: initialBookingDate || undefined,
      checkoutDate: initialCheckoutDate || null,
    },
  });

  async function onSubmit(data: FormValues) {
    if (!data.checkoutDate) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a checkout date.",
      });
      return;
    }

    setIsLoading(true);
    const nights = differenceInCalendarDays(
      data.checkoutDate,
      data.bookingDate
    );

    if (nights > 3) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "You can't book more than 3 nights.",
      });
      setIsLoading(false);
      return;
    }

    try {
      if (bookingId) {
        await updateBookingById(bookingId, {
          bookingDate: data.bookingDate.toISOString(),
          checkoutDate: data.checkoutDate.toISOString(),
        });
        toast({
          title: "Booking Updated",
          description: `Your booking has been updated.`,
        });
      } else {
        await createBooking(campgroundId, {
          bookingDate: data.bookingDate.toISOString(),
          checkoutDate: data.checkoutDate.toISOString(),
          createdAt: new Date().toISOString(),
        });
        toast({
          title: "Booking Created",
          description: `Your booking has been created for ${nights} night(s).`,
        });
      }
      if (onSuccess) {
        onSuccess();
      } else {
        router.push(`/bookings/dashboard`);
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while creating/updating the booking.",
      });
    }
    setIsLoading(false);
  }

  const handleBookingDateChange = (date: Date | undefined) => {
    if (date) {
      form.setValue("bookingDate", date);
      form.setValue("checkoutDate", null);
      form.clearErrors("checkoutDate");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="bookingDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Booking Date</FormLabel>
              <Popover modal>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Select booking date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0 z-50"
                  align="start"
                  sideOffset={5}
                >
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={handleBookingDateChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="checkoutDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Checkout Date</FormLabel>
              <Popover modal>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                      disabled={!form.getValues("bookingDate")}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Select checkout date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0 z-50"
                  align="start"
                  sideOffset={5}
                >
                  <Calendar
                    mode="single"
                    selected={field.value || undefined}
                    onSelect={(date) => field.onChange(date)}
                    disabled={(date) =>
                      date <= form.getValues("bookingDate") ||
                      !form.getValues("bookingDate")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="float-right" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {bookingId ? "Updating booking..." : "Creating booking..."}
            </>
          ) : bookingId ? (
            "Update Booking"
          ) : (
            "Create Booking"
          )}
        </Button>
      </form>
    </Form>
  );
}

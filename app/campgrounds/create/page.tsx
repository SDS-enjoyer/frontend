"use client";

import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createCampground } from "@/app/api/campground/api";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const campgroundSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  district: z.string().min(1, "District is required"),
  province: z.string().min(1, "Province is required"),
  postalcode: z.string().min(5, "Postal code must be at least 5 characters"),
  tel: z.string().min(10, "Telephone must be at least 10 digits"),
  image: z.instanceof(File).optional(),
});

export type CampgroundFormData = z.infer<typeof campgroundSchema>;

export default function CampgroundForm() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CampgroundFormData>({
    resolver: zodResolver(campgroundSchema),
  });

  const onSubmit = async (data: CampgroundFormData) => {
    setIsLoading(true);
    console.log("Form data:", data);

    try {
      const result = await createCampground(data);
      console.log("Success:", result);
      router.push("/campgrounds/search");
    } catch (error) {
      console.error("Error:", error);
    }
    setIsLoading(false);
  };

  const handleFile = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      setValue("image", file);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    handleFile(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-2xl px-4 py-2 sm:px-6 sm:py-4 lg:max-w-7xl lg:px-8"
    >
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Create a New Campground
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Fill in the details below to add a new campground to our database
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* Existing form fields ... */}
            <div className="sm:col-span-3">
              <Label htmlFor="name">Name</Label>
              <div className="mt-2">
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="Enter name"
                />
                {errors.name && (
                  <p className="text-red-600 text-sm mt-2">
                    {errors.name.message}
                  </p>
                )}
              </div>
            </div>
            <div className="sm:col-span-3">
              <Label htmlFor="tel">Telephone</Label>
              <div className="mt-2">
                <Input
                  id="tel"
                  {...register("tel")}
                  placeholder="Enter phone number"
                />
                {errors.tel && (
                  <p className="text-red-600 text-sm mt-2">
                    {errors.tel.message}
                  </p>
                )}
              </div>
            </div>

            {/* Address */}
            <div className="sm:col-span-4">
              <Label htmlFor="address">Address</Label>
              <div className="mt-2">
                <Input
                  id="address"
                  {...register("address")}
                  placeholder="Enter address"
                />
                {errors.address && (
                  <p className="text-red-600 text-sm mt-2">
                    {errors.address.message}
                  </p>
                )}
              </div>
            </div>

            {/* District */}
            <div className="col-span-full">
              <Label htmlFor="district">District</Label>
              <div className="mt-2">
                <Input
                  id="district"
                  {...register("district")}
                  placeholder="Enter district"
                />
                {errors.district && (
                  <p className="text-red-600 text-sm mt-2">
                    {errors.district.message}
                  </p>
                )}
              </div>
            </div>

            {/* Province */}
            <div className="sm:col-span-2 sm:col-start-1">
              <Label htmlFor="province">Province</Label>
              <div className="mt-2">
                <Input
                  id="province"
                  {...register("province")}
                  placeholder="Enter province"
                />
                {errors.province && (
                  <p className="text-red-600 text-sm mt-2">
                    {errors.province.message}
                  </p>
                )}
              </div>
            </div>
            {/* Postal Code */}
            <div className="sm:col-span-2">
              <Label htmlFor="postalcode">Postal Code</Label>
              <div className="mt-2">
                <Input
                  id="postalcode"
                  {...register("postalcode")}
                  placeholder="Enter postal code"
                />
                {errors.postalcode && (
                  <p className="text-red-600 text-sm mt-2">
                    {errors.postalcode.message}
                  </p>
                )}
              </div>
            </div>

            <div className="col-span-full">
              <Label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Cover photo
              </Label>
              <div
                className={`mt-2 flex justify-center rounded-lg border border-dashed px-6 py-10 cursor-pointer ${
                  isDragging
                    ? "border-forestGreen bg-indigo-50"
                    : "border-gray-900/25"
                }`}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleClick}
              >
                <Input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  {...register("image")}
                  onChange={handleFileChange}
                  ref={(e) => {
                    register("image").ref(e);
                    (fileInputRef.current as HTMLInputElement | null) = e;
                  }}
                />
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="max-w-full h-auto max-h-96 rounded-md"
                  />
                ) : (
                  <div className="text-center">
                    <div className="mx-auto h-12 w-12 text-gray-300 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-8 h-8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <span className="font-semibold text-forestGreen hover:forestGreen/80">
                        Upload a file
                      </span>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                )}
              </div>
              {errors.image && (
                <p className="text-red-600 text-sm mt-2">
                  {errors.image.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Button type="button" variant="secondary">
          Cancel
        </Button>
        <Button type="submit">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Save ...
            </>
          ) : (
            "Save"
          )}
        </Button>
      </div>
    </form>
  );
}







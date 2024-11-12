"use client";

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const navigation = [
  { name: "Search Camps", href: "/campgrounds/search" },
  // { name: "Booking", href: "/bookings/dashboard" },
  { name: "Profile", href: "/profile" },
  { name: "Chat with us", href: "/chatbot" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white shadow">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8"
      >
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <Image
              src="/img/logo/tent.png"
              className="h-11 w-auto"
              width={50}
              height={50}
              alt="Logo"
            />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 p-2.5 text-gray-700"
          >
            <Image
              src="/img/icon/threebar-icon.svg"
              className="h-6 w-6"
              width={24}
              height={24}
              alt="Open menu"
            />
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {session ? (
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Sign out
            </button>
          ) : (
            <Link
              href="/login"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </nav>

      {/* Mobile Menu Dialog */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50 bg-black/30" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full bg-white px-6 py-5 sm:max-w-sm">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <Image
                src="/img/logo/tent.png"
                className="h-11 w-auto"
                width={50}
                height={50}
                alt="Logo"
              />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 p-2.5 text-gray-700"
            >
              <Image
                src="/img/icon/xmark-icon.svg"
                className="h-6 w-6"
                width={24}
                height={24}
                alt="Close menu"
              />
            </button>
          </div>
          <div className="mt-6">
            <div className="-my-6 divide-y divide-gray-200">
              <div className="py-6 space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                {session ? (
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="block w-full px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50 text-start"
                  >
                    Sign out
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="block w-full px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50 text-start"
                  >
                    Log in
                  </Link>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}

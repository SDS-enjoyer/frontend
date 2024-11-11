import Image from "next/image";
import React from "react";
import RegisterForm from "../register/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="relative bg-white">
      <div className="lg:absolute lg:inset-0 lg:left-1/2">
        <Image
          src={"/img/campground-register-page.jpg"}
          className="h-64 w-full bg-gray-50 object-cover sm:h-80 lg:absolute lg:h-full"
          width={4000}
          height={2000}
          alt="Acet Labs"
        />
      </div>
      <div className="pb-24 pt-16 sm:pb-32 sm:pt-24 lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-2 lg:pt-32">
        <div className="px-6 lg:px-8">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Register
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Join our community to discover and book the perfect campsite for
              your next outdoor adventure.
            </p>
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CountUp from "@/components/countup";
import Link from "next/link";
export default function Home() {
  const stats = [
    { label: "Number of Bookings", value: "300" },
    { label: "Number of Campgrounds", value: "48" },
    { label: "Number of Users", value: "1000" },
  ];
  const team = [
    {
      name: "Krittapas Rungsimontuchat",
      role: "Contributor",
      imageUrl: "/img/ten.png",
    },
  ];
  return (
    <div className="bg-white">
      <Header />
      <main>
        <div className="relative isolate">
          <svg
            aria-hidden="true"
            className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
          >
            <defs>
              <pattern
                x="50%"
                y={-1}
                id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
                width={200}
                height={200}
                patternUnits="userSpaceOnUse"
              >
                <path d="M.5 200V.5H200" fill="none" />
              </pattern>
            </defs>
            <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
              <path
                d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                strokeWidth={0}
              />
            </svg>
            <rect
              fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
              width="100%"
              height="100%"
              strokeWidth={0}
            />
          </svg>
          <div
            aria-hidden="true"
            className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
          >
            <div
              style={{
                clipPath:
                  "polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)",
              }}
              className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[rgb(52,113,113)] to-[rgb(52,113,113)] opacity-30"
            />
          </div>
          <div className="overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
              <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                <div className="relative w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                    Discover Your Perfect Campsite.
                  </h1>
                  <p className="mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
                    Experience nature&apos;s beauty with our easy-to-use
                    campground booking platform. Find and reserve your ideal
                    outdoor getaway, from serene lakeside spots to breathtaking
                    mountain vistas.
                  </p>
                  <div className="mt-10 flex items-center gap-x-6">
                    <Link href="/campgrounds/search">
                      <Button className="rounded-md px-3.5 py-2.5">
                        Get started
                      </Button>
                    </Link>
                    <Link
                      href="/login"
                      className="text-sm font-semibold leading-6 text-gray-900"
                    >
                      Login <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
                <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                  <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                    <div className="relative">
                      <Image
                        src="/img/campground-hero-1.jpg"
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                        width={1000}
                        height={1000}
                        alt="Avatar"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                  </div>
                  <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                    <div className="relative">
                      <Image
                        src="/img/campground-hero-2.jpg"
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                        width={1000}
                        height={1000}
                        alt="Avatar"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                    <div className="relative">
                      <Image
                        src="/img/campground-hero-3.jpg"
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                        width={500}
                        height={500}
                        alt="Avatar"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                  </div>
                  <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                    <div className="relative">
                      <Image
                        src="/img/campground-hero-4.jpg"
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                        width={1000}
                        height={1000}
                        alt="Avatar"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                    <div className="relative">
                      <Image
                        src="/img/campground-hero-5.jpg"
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                        width={1000}
                        height={1000}
                        alt="Avatar"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="mx-auto -mt-12 max-w-7xl px-6 sm:mt-0 lg:px-8 xl:-mt-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our mission
          </h2>
          <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
            <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
              <p className="text-xl leading-8 text-gray-600">
                Our mission is to connect outdoor enthusiasts with nature by
                simplifying the campground booking process, promoting
                sustainable tourism, and fostering a community of responsible
                campers.
              </p>
              <div className="mt-10 max-w-xl text-base leading-7 text-gray-700">
                <p>
                  At NatureCamp, we strive to make the great outdoors accessible
                  to everyone. Our user-friendly platform allows campers to
                  discover, compare, and book campsites across diverse
                  locations, from national parks to private campgrounds. We aim
                  to streamline the camping experience, providing detailed
                  information, real-time availability, and secure booking
                  options.
                </p>
              </div>
            </div>
            <div className="lg:flex lg:flex-auto lg:justify-center">
              <dl className="w-64 space-y-8 xl:w-80">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex flex-col-reverse gap-y-4"
                  >
                    <dt className="text-base leading-7 text-gray-600">
                      {stat.label}
                    </dt>
                    <CountUp value={Number(stat.value)} />
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-32 sm:mt-40 xl:mx-auto xl:max-w-7xl xl:px-8">
        <Image
          src="/img/campground-hero-6.jpg"
          className="aspect-[5/2] w-full object-cover xl:rounded-3xl"
          width={3000}
          height={3000}
          alt="Avatar"
        />
      </div>
      <div className=" flex flex-col justify-center items-center mb-32">
        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-48 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our team
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We are a diverse group of outdoor enthusiasts, tech experts, and
              customer service professionals united by our passion for making
              nature accessible to all. Our team brings together years of
              experience in camping, software development, and hospitality to
              create the best possible platform for connecting campers with
              their perfect outdoor getaway.
            </p>
          </div>
          <ul
            role="list"
            className="mx-auto mt-20 flex max-w-2xl flex-wrap justify-center gap-x-8 gap-y-16"
          >
            {team.map((person) => (
              <li key={person.name} className="flex flex-col items-center">
                <Image
                  alt={`${person.name}'s profile picture`}
                  src={person.imageUrl}
                  width={96}
                  height={96}
                  className="rounded-full"
                />
                <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">
                  {person.name}
                </h3>
                <p className="text-sm leading-6 text-gray-600">{person.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
}

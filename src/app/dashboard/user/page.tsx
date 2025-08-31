import Image from "next/image";
import Link from "next/link";
import { dummyData } from '@/data/markers';
import { Mail, Calendar, ShieldCheck, ShieldAlert, Map as MapIcon, BadgeQuestionMark, MapPin } from "lucide-react";

export default function page() {
  const user = {
    name: "MANAA Mohaned",
    email: "lives@gmail.com",
    avatar: "/imgs/user.JPG",
    joinedAt: "2024-01-15T00:00:00.000Z",
    accountStatus: "Active" as const,
    verificationStatus: "Verified" as const,
  };

  const joinedFmt = new Date(user.joinedAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const isActive = user.accountStatus === "Active";
  const isVerified = user.verificationStatus === "Verified";

  const badge = (ok: boolean, okColor = "emerald") =>
    `inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${ok
      ? `bg-${okColor}-50 text-${okColor}-700 ring-${okColor}-200`
      : "bg-red-50 text-red-700 ring-red-200"
    }`;

  return (
    <main className="full flex flex-col space-y-8 -pt-4 pb-4">

      {/* Header / Identity */}
      <section className="relative overflow-hidden rounded-b-2xl border-b bg-white/60 shadow-sm min-h-max">

        <div className="h-16 w-full bg-gradient-to-b from-emerald-500 to-emerald-300" />

        <div className="-mt-12 px-6 p-6 flex flex-col gap-4 sm:flex-row sm:items-end">

          <div className="shrink-0">
            <div className="h-24 w-24 rounded-full ring-4 ring-gray-700 overflow-hidden bg-white shadow-md">
              <Image src={user.avatar} alt={user.name} width={96} height={96} className="h-full w-full object-cover" />
            </div>
          </div>

          <div className="flex-1 mt-8">
            <h1 className="text-2xl font-semibold leading-tight">{user.name}</h1>
            <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600">
              <span className="inline-flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {user.email}
              </span>
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Joined {joinedFmt}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-8">
            <span className={badge(isActive)}>
              {isActive ? <ShieldCheck className="h-3.5 w-3.5" /> : <ShieldAlert className="h-3.5 w-3.5" />}
              Account: {user.accountStatus}
            </span>
            <span className={badge(isVerified, "sky")}>
              {isVerified ? <ShieldCheck className="h-3.5 w-3.5" /> : <ShieldAlert className="h-3.5 w-3.5" />}
              Verification: {user.verificationStatus}
            </span>
          </div>

        </div>
      </section>

      {/* Details */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 px-4 flex-grow">

        {/* Left */}
        <div className="rounded-xl border bg-white/60 p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-gray-500">Profile</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Name</span>
              <span className="font-medium">{user.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Email</span>
              <span className="font-medium">{user.email}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Joined</span>
              <span className="font-medium">{joinedFmt}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Account Status</span>
              <span className={badge(isActive)}>{user.accountStatus}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Verification</span>
              <span className={badge(isVerified, "sky")}>{user.verificationStatus}</span>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="rounded-xl border bg-white/60 p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-gray-500">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Link
              href="/dashboard/map"
              className="group flex items-center gap-2 rounded-lg border p-3 transition hover:border-sky-400 hover:bg-sky-50"
            >
              <MapIcon className="h-4 w-4 text-sky-600 group-hover:scale-110 transition" />
              <span className="text-sm font-medium">Open Map</span>
            </Link>
            <Link
              href="/dashboard/verifications"
              className="group flex items-center gap-2 rounded-lg border p-3 transition hover:border-indigo-400 hover:bg-indigo-50"
            >
              <BadgeQuestionMark className="h-4 w-4 text-indigo-600 group-hover:scale-110 transition" />
              <span className="text-sm font-medium">Verifications</span>
            </Link>
            <Link
              href="/dashboard/markers"
              className="group flex items-center gap-2 rounded-lg border p-3 transition hover:border-emerald-400 hover:bg-emerald-50"
            >
              <MapPin className="h-4 w-4 text-emerald-600 group-hover:scale-110 transition" />
              <span className="text-sm font-medium">Markers</span>
            </Link>
          </div>
          <h2 className="my-4 text-sm font-semibold text-gray-500">Marked Locations</h2>
          <ul className="mt-6 space-y-2 text-sm text-gray-700 bg-gray-200 p-4 rounded-lg ">
            {dummyData.slice(0, 5).map((marker) => (
                <li key={marker.id} className="flex items-start gap-2">
                <span
                  className={`inline-block h-2 w-2 rounded-full mt-1 ${
                  marker.type === "food"
                    ? "bg-emerald-500"
                    : marker.type === "water"
                    ? "bg-cyan-500"
                    : marker.type === "danger"
                    ? "bg-red-500"
                    : marker.type === "aid"
                    ? "bg-rose-700"
                    : "bg-gray-500"
                  }`}
                />
                <div>
                  <p className="font-medium text-gray-800">{marker.description}</p>
                  <p className="text-xs text-gray-600">
                  Type: {marker.type} | Reports: {marker.reports}
                  </p>
                </div>
                </li>
            ))}
          </ul>
        </div>

      </section>
    </main>
  );
};

"use client";

import { SignOutButton } from "@clerk/nextjs";

export default function SignOutBtn() {
  return (
    <SignOutButton>
      <button className="px-4 py-1.5 rounded-lg bg-red-900/30 hover:bg-red-800/50 text-red-300 text-sm font-medium transition-colors cursor-pointer">
        Logout
      </button>
    </SignOutButton>
  );
}

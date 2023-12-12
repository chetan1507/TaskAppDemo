'use client';

import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default function Home() {
  const session = useSession();
  if (!!session && session.status === 'authenticated') {
    redirect('/home');
  }
  return (
    <main>
      <section className="bg-gray-100 text-gray-800">
        <div className="container mx-auto flex flex-col items-center px-4 py-16 text-center md:py-32 md:px-10 lg:px-32 xl:max-w-3xl">
          <h1 className="text-4xl font-bold leadi">
            Embark on the Epic Quest of <br />
            <span className="text-violet-600 text-5xl">Task Mastery</span>
          </h1>
          <p className="px-8 mt-8 mb-4 text-lg">
            Tame your to-do list dragons, conquer the procrastination monsters,
            and become the Grand Overlord of Getting Stuff Done!
          </p>
          <p className="px-8 mt-8 mb-12 text-lg">
            Because even wizards need a spell for organizing their magical
            chores!
          </p>

          <div className="flex flex-wrap justify-center">
            <Link href="/api/auth/signin">
              <button className="px-8 py-3 m-2 font-semibold rounded bg-violet-600 text-gray-50">
                Sign in / Sign up
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

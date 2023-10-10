import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Custom404: React.FC = () => {
  return (
    <div className="relative bg-sky-50">
      <Head>
        <title>404 - The page you were looking for doesn't exist.</title>
      </Head>
      <div className="flex h-screen">
        <div className="m-auto grid grid-cols-2 items-center">
          <div>
            <Link href="/">
              <Image
                src="/images/exploding-head.png"
                width="420"
                height="420"
                alt=""
              />
            </Link>
          </div>
          <div>
            <h1 className="py-4 font-mono font-bold text-4xl">404.</h1>
            <p className="pb-4 font-mono">Well that's embarrassing..</p>
            <p className="pb-20 font-mono">
              Go{" "}
              <Link
                href="/"
                className="font-medium underline decoration-wblue hover:animate-pulse"
              >
                home
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Custom404;

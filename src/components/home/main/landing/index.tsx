import React from "react";
import Image from "next/image";

export const Landing: React.FC = () => {
  return (
    <div className="px-10 py-10 bg-sky-50 sm:flex h-screen m-auto">
      <div className="grid sm:grid-cols-2 gap-4 items-center">
        <div className="top-0 justify-center mx-auto px-5">
          <h1 className="py-4 font-mono font-semi-bold text-4xl">
            Nicely done!
          </h1>
          <p className="font-mono py-2 text-xl">You either read the tutorial or deployed it :-).</p>
        </div>
        <div className="justify-center mx-auto">
          <Image
            className="rounded-lg"
            src="/images/exploding-head.png"
            width="420"
            height="420"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

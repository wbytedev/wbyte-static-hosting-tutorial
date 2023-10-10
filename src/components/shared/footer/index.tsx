import React from "react";
import Image from "next/image";

export const Footer: React.FC = () => {
  return (
    <div className="bg-slate-950 bottom-0 text-center bg-black py-10">
      <ul className="mt-20 flex justify-center list-none p-0 m-0">
        <li className="mx-3 hover">
          <a
            data-test="docs-btn-anchor"
            href="https://github.com/wu-bacca"
            target="_blank"
          >
            <Image
              data-test="icon"
              src="/icons/github-icon.svg"
              alt="linkedin"
              width="28"
              height="32"
            />
          </a>
        </li>
      </ul>
      <div className="text-white py-8 font-extralight text-xs">
        Copyright © {new Date().getFullYear()}. All rights reserved.
      </div>
    </div>
  );
};

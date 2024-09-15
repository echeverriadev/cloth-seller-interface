import { XIcon } from "@primer/octicons-react";
import React from "react";

export const Modal = ({
    children,
    close,
  }: {
    children: React.ReactNode,
    close: () => void,
  }) => {
  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10">
      <div className="max-h-full w-full max-w-xl overflow-y-auto rounded bg-white">
        <div className="w-full p-10">
        <div className="flex justify-end">
          <button className=" " onClick={close}><XIcon size={24}/></button>
        </div>
          <div className="">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

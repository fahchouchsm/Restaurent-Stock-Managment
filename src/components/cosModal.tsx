import { FC } from "react";
import { X } from "lucide-react";

interface cosModalInt {
  isOpen: boolean;
  setIsModalOpen: (e: boolean) => void;
  title: string;
  content: JSX.Element;
}

export const CosModal: FC<cosModalInt> = ({
  isOpen,
  setIsModalOpen,
  content,
  title,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="absolute top-0 right-0 z-10 items-center flex h-screen w-screen justify-center bg-white/40 backdrop-blur-2xl"
      onClick={() => {
        // setIsModalOpen(false);
      }}
    >
      <div
        className="bg-white border border-gray-200 rounded-xl shadow-2xl p-8 "
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="border-b-2 border-gray-200 pb-4 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-700">{title}</h2>
          <button className="">
            <X
              className="w-full h-8 text-gray-700 cursor-pointer"
              onClick={() => {
                setIsModalOpen(false);
              }}
            />
          </button>
        </div>
        {content}
      </div>
    </div>
  );
};

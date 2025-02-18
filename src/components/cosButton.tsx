import { FC } from "react";
import { RotatingLines } from "react-loader-spinner";

interface cosButtonInt {
  text: string;
  loading?: boolean;
  color: string;
  action: () => void;
  textColor?: string;
  typeSubmit?: boolean;
  full?: boolean;
}

export const CosButton: FC<cosButtonInt> = ({
  text,
  typeSubmit,
  action,
  full,
  color,
  textColor,
  loading,
}) => {
  return (
    <button
      onClick={action}
      className={`px-4 ${textColor ? textColor : "text-black"}
        py-2 cursor-pointer rounded-lg transition
        flex justify-center items-center gap-3
       ${color}
        hover:${
          color.slice(0, color.length - 3) +
          (Number(color[color.length - 3]) + 1) +
          color.slice(color.length - 2)
        }
        ${full ? "w-full" : ""}
      ${loading ? "opacity-80" : ""}
        `}
      type={typeSubmit ? "submit" : "button"}
      disabled={loading}
    >
      {loading ? (
        <>
          <RotatingLines width="30" strokeColor="white" />{" "}
          <div className="font-semibold">Chargement...</div>
        </>
      ) : (
        text
      )}
    </button>
  );
};

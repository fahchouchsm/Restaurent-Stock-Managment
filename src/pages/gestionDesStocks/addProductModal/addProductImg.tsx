import React, { FC, useState } from "react";

const AddProductImg: FC = () => {
  const [image, setImage] = useState<File | null>(null);

  return (
    <div className="text-center">
      <input
        type="file"
        accept="image/*"
        className="hidden"
        id="upload-button"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          if (event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
          }
        }}
      />
      <label htmlFor="upload-button" className="cursor-pointer">
        {image ? (
          <img
            src={URL.createObjectURL(image)}
            alt="Product"
            className="w-52 h-52 object-cover"
          />
        ) : (
          <div className="w-64 h-64 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-300">
            Cliquez pour télécharger l'image
          </div>
        )}
      </label>
    </div>
  );
};

export default AddProductImg;

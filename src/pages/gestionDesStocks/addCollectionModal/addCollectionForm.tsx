import React from 'react';
import { FC, ChangeEvent, useState } from 'react';
import { CosButton } from '../../../components/cosButton';
import { createCollectionData } from '../../../../interfaces/requests';

export interface AddCollectionFormInt {
  addCollectionData: createCollectionData;
  setAddCollectionData: (data: createCollectionData) => void;
}

const AddCollectionForm: FC<AddCollectionFormInt> = ({
  addCollectionData,
  setAddCollectionData,
}) => {
  const colors = ['#03a9f4', '#f44336', '#4caf50', '#ffeb3b', '#9c27b0'];
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setAddCollectionData({
      ...addCollectionData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    console.log(addCollectionData);

    // try {
    //   const result = await window.electronAPI.createCollection(
    //     addCollectionData,
    //   );
    //   // alert(result);
    //   console.log(result);
    // } catch (error) {
    //   console.error('❌ Error:', error);
    //   // alert(error);
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <>
      <form
        className="space-y-4 mt-2"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex gap-5">
          {/* Name */}
          <div>
            <label className="block text-base font-medium text-gray-800 mb-2">
              Nom de la collection :
            </label>
            <input
              type="text"
              name="name"
              value={addCollectionData.name}
              onChange={handleInputChange}
              placeholder="Entrez le nom de la collection"
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-emerald-300"
              required
              minLength={3}
            />
          </div>

          {/* Color */}
          <div>
            <label className="block text-base font-medium text-gray-800 mb-2">
              Couleur :
            </label>
            <div className="flex gap-2 h-full mt-2">
              {colors.map((color, i) => (
                <label
                  key={i}
                  className="cursor-pointer "
                >
                  <input
                    type="radio"
                    name="color"
                    hidden
                    value={color}
                    checked={addCollectionData.color === color}
                    onChange={handleInputChange}
                  />
                  <span
                    className="border-2 border-transparent rounded-full h-8 w-8 block"
                    style={{
                      backgroundColor: color,
                      border:
                        addCollectionData.color === color
                          ? '2px solid #1e2939'
                          : 'none',
                    }}
                  ></span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-base font-medium text-gray-800 mb-2">
            Description (optionnel) :
          </label>
          <textarea
            rows={5}
            name="description"
            value={addCollectionData.description}
            onChange={handleInputChange}
            placeholder="Entrez une description..."
            className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-emerald-300"
            minLength={10}
          />
        </div>

        {/* Submit Button */}
        <CosButton
          typeSubmit
          text="Ajouter la collection"
          action={handleSubmit}
          color="bg-amber-500"
          textColor="text-white"
          loading={loading}
          full
        />
      </form>
    </>
  );
};

export default AddCollectionForm;

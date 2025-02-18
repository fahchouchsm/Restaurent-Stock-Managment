import { useState } from "react";

type formData = {
  name: string;
  quantity: number;
  unit: string;
  threshold: number;
  image: string;
};

interface AddProductFormInt {
  formData: formData;
  setFormData: (e: formData) => void;
}

export const AddProductForm: React.FC<AddProductFormInt> = ({
  formData,
  setFormData,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [selCollection, setSelCollection] = useState<string>("");
  console.log(selCollection);

  return (
    <>
      <form className="space-y-4">
        <div>
          <label htmlFor="fruit">Choose a fruit:</label>
          <select
            id="fruit"
            value={selCollection || ""}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
              setSelCollection(event.target.value);
            }}
            className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-emerald-300"
          >
            <option value="">Select a fruit</option>
            <option value="apple">Apple</option>
            <option value="banana">Banana</option>
            <option value="cherry">Cherry</option>
          </select>
        </div>

        {/* Nom */}
        <div>
          <label className="block text-base font-medium text-gray-800">
            Nom :
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Entrez le nom du produit"
            className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-emerald-300"
            required
          />
        </div>

        {/* Quantité */}
        <div>
          <label className="block text-base font-medium text-gray-800">
            Quantité :
          </label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="1"
            placeholder="Entrez la quantité"
            className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-emerald-300"
            required
          />
        </div>

        {/* Unité */}
        <div>
          <label className="block text-base font-medium text-gray-800">
            Unité :
          </label>
          <input
            type="text"
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            placeholder="ex: kg, L, pièces..."
            className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-emerald-300"
            required
          />
        </div>

        {/* Seuil d'alerte */}
        <div>
          <label className="block text-base font-medium text-gray-800">
            Seuil d'alerte :
          </label>
          <input
            type="number"
            name="threshold"
            value={formData.threshold}
            onChange={handleChange}
            min="1"
            placeholder="Entrez le seuil d'alerte"
            className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-emerald-300"
            required
          />
        </div>
      </form>
    </>
  );
};

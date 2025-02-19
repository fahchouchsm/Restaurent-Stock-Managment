import React from 'react';
import { FC, useState } from 'react';
import { Header } from '../../components/header';
import { Plus } from 'lucide-react';
import { CosModal } from '../../components/cosModal';
import { AddProductForm } from './addProductModal/addProductForm';
import AddProductImg from './addProductModal/addProductImg';
import AddCollectionForm from './addCollectionModal/addCollectionForm';
import { createCollectionData } from '../../../electron/interfaces/requestsInt';
import { ShowCollections } from './showCollections/showCollections';

export const GestionDesStocks: FC = () => {
  // product adding
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [addProductData, setAddProductData] = useState({
    name: '',
    quantity: 1,
    unit: '',
    threshold: 1,
    image: '',
  });

  // collection adding
  const [isAddCollectionOpen, setIsAddCollectionOpen] = useState(false);
  const [addCollectionData, setAddCollectionData] =
    useState<createCollectionData>({
      name: '',
      description: '',
      color: '#03a9f4',
    });

  const button = (
    <button
      onClick={() => {
        setIsAddProductOpen(true);
      }}
      className="rounded-3xl bg-emerald-500 px-4 pt-2.5 pb-2 text-white transition duration-300 ease-in-out hover:cursor-pointer hover:bg-emerald-600"
    >
      Ajouter un produit
    </button>
  );
  const AddModalContent: JSX.Element = (
    <div className="flex gap-6 justify-center pt-3 items-center">
      <AddProductForm
        formData={addProductData}
        setFormData={setAddProductData}
      />
      <AddProductImg />
    </div>
  );

  const AddCollectionModalContent: JSX.Element = (
    <>
      <AddCollectionForm
        setIsAddCollectionOpen={setIsAddCollectionOpen}
        addCollectionData={addCollectionData}
        setAddCollectionData={setAddCollectionData}
      />
    </>
  );

  const [content, setContent] = useState<JSX.Element>(<ShowCollections />);

  return (
    <>
      <div className="h-screen relative">
        <button
          onClick={() => {
            setIsAddCollectionOpen(true);
          }}
          className="rounded-full right-0 bottom-0 m-5 absolute bg-amber-500 p-2 text-white transition duration-300 ease-in-out hover:cursor-pointer hover:bg-amber-600"
        >
          <Plus className="h-10 w-10" />
        </button>
        <Header
          title="Gestion Des Stocks"
          component={button}
        />
        {content}
        <CosModal
          title="Ajouter un Produit"
          content={AddModalContent}
          isOpen={isAddProductOpen}
          setIsModalOpen={setIsAddProductOpen}
        />
        <CosModal
          title="Ajouter une Collection"
          content={AddCollectionModalContent}
          isOpen={isAddCollectionOpen}
          setIsModalOpen={setIsAddCollectionOpen}
        />
      </div>
    </>
  );
};

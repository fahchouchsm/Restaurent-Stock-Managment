import { FC } from 'react';

interface headerInt {
  title: string;
  component?: JSX.Element;
}

export const Header: FC<headerInt> = ({ title, component }) => {
  return (
    <header className="flex justify-between shadow-sm p-4">
      <h1 className="text-3xl font-bold text-gray-700">{title}</h1>
      {component}
    </header>
  );
};

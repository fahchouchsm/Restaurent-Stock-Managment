import {
  Home,
  MessageSquareWarning,
  Package,
  ReceiptText,
  Salad,
} from 'lucide-react';

interface pageUi {
  name: string;
  url: string;
  icon: JSX.Element;
}

// Accueil
// Gestion des stocks
// Repas
// Transactions
// Alertes

export const pages: pageUi[] = [
  {
    name: 'Accueil',
    url: '/dashboard',
    icon: <Home />,
  },
  {
    name: 'Gestion des stocks',
    url: '/stock',
    icon: <Package />,
  },
  {
    name: 'Repas',
    url: '/meals',
    icon: <Salad />,
  },
  {
    name: 'Transactions',
    url: '/transactions',
    icon: <ReceiptText />,
  },
  {
    name: 'Alertes',
    url: '/alerts',
    icon: <MessageSquareWarning />,
  },
];

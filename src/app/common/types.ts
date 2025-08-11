type Product = {
  id: number;
  name: string;
  category: string;
  country: string;
  description?: string;
  status: 'active' | 'pending' | 'inactive';
};
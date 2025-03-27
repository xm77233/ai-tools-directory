export type PricingType = 'free' | 'freemium' | 'paid';

export interface Tool {
  id: number;
  name: string;
  description: string;
  category: string;
  image: string;
  url: string;
  pricing: PricingType;
  tags: string[];
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon?: any;
  count?: number;
} 
type Province = {
  _count: any;
  id: string;
  name: string;
  enabled: boolean;
  city: City[];
};
type City = {
  _count: any;
  id: string;
  name: string;
  enabled: boolean;
  provinceId: string;
};
type Category = {
  id: string;
  name: string;
  enabled: boolean;
};

type User = {
  id: string;
  name: string;
  email: string;
  emailVerified: string;
  image: string;
  password: string;
  accounts: Account[];
  sessions: Session[];
  role: Role;
  phone1: string;
  phone2: string;
  phone3: string;
  address: string;
  picture: string;
  products: Product[];
  cartId: string;
  status: string;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
  cityLimits: string;
  numberOfAllowedCities: number;
  numberOfAllowedAds: number;
  expirtyDate: Date;
  createdAt: Date;
  updatedAt: Date;
};

type AdminUser = User & {
  _count: {
    accounts: number;
    sessions: number;
    products: number;
  };
};

type Product = {
  id: string;
  userId: string;
  categoryId: string;
  weight: number;
  weightUnit: string;
  enabled: boolean;
  images: Array;
  title: string;
  image_cover_id: string;
  description: string;
  likes: number;
  price: number;
  priceUnit: string;
  receiveOffers: boolean;
  views: number;
  rating: ProductRating[];
  Category: {
    enabled: boolean;
    id: string;
    name: string;
  };
  productCity: ProductCity[];
  createdAt: string;
  updatedAt: null;
  _count: product_count;
  User: User;
};
type product_count = {
  productCity: number;
  images: number;
  rating: number;
  ProductLikes: number;
  Order: number;
};
type Order = {
  createdAt: string;
  id: string;
  note: string;
  orderAction: string;
  productId: string;
  product: Product;
  userId: string;
  user: User;
  weight: number;
  weightUnit: string;
  sellerComments: string;
};
type Session = {
  id: string;
};
type Account = {
  id: string;
};

type FileImageUpload = {
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
};

type FileObjectToUpload = {
  file_name: string;
  status: string;
  file: File;
};
// type ProductCity = {
//   City: City;
//   cityId: string;
//   productId: string;
//   provinceId: string;
// };

type ProductCity = {
  // City: City;
  cityId: string;
  productId: string;
  provinceId: string;
};
type ImageProduct = {
  id: string;
  productId: string;
  url: string;
  user_id: string;
  public_id: string;
};
type ProductRating = {
  id: string;
  message: string;
  productId: string;
  stars: number;
  userId: string;
};

export interface FormData {
  username: string;
  email: string;
  password: string;
  phone: string;
}
export interface FormDataServices {
  [x: string]: any;
  date: string;
  selectedTimeStart: string;
}

export interface FormDataLogin {
  email: string;
  password: string;
}

export interface Errors {
  [key: string]: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  phone: string;
  services: Service[];
}

export interface Service {
  id: number;
  image: string;
  name: string;
  price: string;
  icon: string;
  path: string;
}

export interface CustomerListProps {
  _id: number;
  username: string;
  email: string;
  phone: string;
  date: string;
  selectedService: string;
  selectedTimeStart: string;
}

export type UpdatedInfo = {
  name: boolean;
  phone: boolean;
  email: boolean;
};

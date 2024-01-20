export interface FormData {
  username: string;
  email: string;
  password: string;
  phone: string;
}
export interface FormDateServices {
  [x: string]: any;
  create_time: string;
  selectedTimeStart: string;
}

export interface FormDataLogin {
  username: string;
  password: string;
}

export interface Errors {
  [key: string]: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  phone: string;
  services: Service[];
}
export interface UserNotService {
  id: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  accessToken: string;
  token: string;
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
  id: number;
  username: string;
  email: string;
  phone: string;
  createTime: string;
  selectedService: string;
  selectedTimeStart: string;
}

export type UpdatedInfo = {
  name: boolean;
  phone: boolean;
  email: boolean;
};

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  password: string;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}

export type UserTablelist ={
  id: number;
  name: string;
  email: string;
  createdAt: string; 
  updatedAt: string;
  company_address: string;
  company_email: string;
  company_name: string;
  company_office_hours: string; 
  company_phone: string;
  department: string;
  hireDate: string; 
  overtimeHours: number;
  phone: string;
  position: string;
  role: "admin" | "user" | "manager" | string;
  status: "pending" | "active" | "inactive" | string;
  userStatus: "active" | "inactive" | string;
  weeklyHours: number;
}

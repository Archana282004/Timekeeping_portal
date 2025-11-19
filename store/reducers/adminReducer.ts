import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Company {
  name: string;
  address: string;
  phone: string;
  email: string;
  officeHours: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  hireDate: string;
  status: "active" | "inactive" | "pending";
  userStatus: "active" | "inactive";
  weeklyHours: number;
  overtimeHours: number;
  company: Company;
  password?: string;
}

interface DailyEntry {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  breakMinutes: number;
  hours: number;
  notes: string;
  timecardId: number;
  createdAt: string;
  updatedAt: string;
}

interface Timecard {
  id: number;
  userId: number;
  weekEnding: string;
  totalHours: number;
  regularHours: number;
  overtime: number;
  status: string;
  submittedAt: string;
  issues: any[];
  createdAt: string;
  updatedAt: string;
  user: User;
  dailyEntries: DailyEntry[];
}

export interface DashboardStats {
  totalEmployees: number;
  pendingTimecards: number;
  complianceIssues: number;
  approvedThisWeek: number;
}

interface AdminEmployeeCards {
  totalEmployeesActive: number;
  notactive: number;
  departments: number;
  avgWeeklyHoursPerEmployee: number;
  totalOvertimeThisWeek: number;
}

interface DepartmentHours {
  department: string;
  hours: number;
  color: string;
}

interface WeeklyHours {
  week: string;
  regular: number;
  overtime: number;
  weekEnding: string;
}

interface AdminState {
  userlist: User[];
  timeCardList: Timecard[];
  adminDashboardStats: DashboardStats[];
  adminEmployeecardsData: AdminEmployeeCards[];
  departmentHoursData: DepartmentHours[];
  weeklyHoursData: WeeklyHours[];
  statscard: boolean;
  recenttimecards: boolean;
  user: boolean;
  weekhour: boolean;
  departmenthour: boolean;
  adminemployee: boolean;
}

const initialState: AdminState = {
  userlist: [],
  timeCardList: [],
  adminDashboardStats: [],
  adminEmployeecardsData: [],
  departmentHoursData: [],
  weeklyHoursData: [],
  statscard: true,
  recenttimecards: true,
  user: true,
  weekhour: true,
  departmenthour: true,
  adminemployee: true,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    UserList: (state, action: PayloadAction<User[]>) => {
      state.userlist = action.payload;
    },
    addUserLocal: (state, action: PayloadAction<User>) => {
      state.userlist.push(action.payload);
    },
    editUserLocal: (state, action: PayloadAction<User>) => {
      const idx = state.userlist.findIndex(u => u.id === action.payload.id);
      if (idx !== -1) state.userlist[idx] = action.payload;
    },
    TimeCardList: (state, action: PayloadAction<Timecard[]>) => {
      state.timeCardList = action.payload;
    },
    AdminDashboardStats: (state, action: PayloadAction<DashboardStats[]>) => {
      state.adminDashboardStats = action.payload;
    },
    AdminEmployeeCardsData: (state, action: PayloadAction<AdminEmployeeCards[]>) => {
      state.adminEmployeecardsData = action.payload;
    },
    DepartmentHoursData: (state, action: PayloadAction<DepartmentHours[]>) => {
      state.departmentHoursData = action.payload;
    },
    WeeklyHours: (state, action: PayloadAction<WeeklyHours[]>) => {
      state.weeklyHoursData = action.payload;
    },
    Statscardfetching: (state, action: PayloadAction<boolean>) => {
      state.statscard = action.payload;
    },
    RecentCards: (state, action: PayloadAction<boolean>) => {
      state.recenttimecards = action.payload;
    },
    Dashboarduser: (state, action: PayloadAction<boolean>) => {
      state.user = action.payload;
    },
    Weekhourchart: (state, action: PayloadAction<boolean>) => {
      state.weekhour = action.payload;
    },
    departmenthourchart: (state, action: PayloadAction<boolean>) => {
      state.departmenthour = action.payload;
    },
    AdminEmployee: (state, action: PayloadAction<boolean>) => {
      state.adminemployee = action.payload;
    }
  },
});

export const {
  UserList,
  addUserLocal,
  editUserLocal,
  TimeCardList,
  AdminDashboardStats,
  AdminEmployeeCardsData,
  DepartmentHoursData,
  WeeklyHours,
  Statscardfetching,
  RecentCards,
  Dashboarduser,
  Weekhourchart,
  departmenthourchart,
  AdminEmployee
} = adminSlice.actions;

export default adminSlice.reducer;

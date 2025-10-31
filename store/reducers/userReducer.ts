import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  createdAt: string;
  updatedAt: string;
  dailyEntries: DailyEntry[];
}

interface TodayStatus {
  date: string;
  startTime: string;
  endTime: string;
  breakMinutes: number;
  notes: string;
}

interface WeekHistory {
  totalTimecards: number;
  totalHours: number;
  overtimeHours: number;
  approvalRate: number;
}

interface TodayStatusCard {
  clockedIn: boolean;
  startTime: string;
  breaksTaken: number;
  hoursWorked: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  status: string;
}

interface EmployeeState {
  userlist: User[];
  weekTimecards: Timecard[];
  todayStatus: TodayStatus[];
  historyPage: WeekHistory[];
  statusCard: TodayStatusCard[];
  status:boolean;
  weekcard:boolean;
  historycards:boolean;
}

const initialState: EmployeeState = {
  userlist: [],
  weekTimecards: [],
  todayStatus: [],
  historyPage: [],
  statusCard: [],
  status:true,
  weekcard: true,
  historycards:true
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    UserList: (state, action: PayloadAction<User[]>) => {
      state.userlist = action.payload;
    },
    WeekTimecards: (state, action: PayloadAction<Timecard[]>) => {
      state.weekTimecards = action.payload;
    },
    TodayStatus: (state, action: PayloadAction<TodayStatus[]>) => {
      state.todayStatus = action.payload;
    },
    HistoryPage: (state, action: PayloadAction<WeekHistory[]>) => {
      state.historyPage = action.payload;
    },
    TodaystatusCard: (state, action: PayloadAction<TodayStatusCard[]>) => {
      state.statusCard = action.payload;
    },
    StatusToday:(state, action: PayloadAction<boolean>) => {
      state.status = action.payload;
    },
    Weekactivity:(state, action: PayloadAction<boolean>) => {
      state.weekcard = action.payload;
    },
    Historycard:(state, action: PayloadAction<boolean>) => {
      state.historycards = action.payload;
    }
  },
});

export const {UserList, WeekTimecards, TodayStatus, HistoryPage, TodaystatusCard, StatusToday, Weekactivity , Historycard} = userSlice.actions;

export default userSlice.reducer;

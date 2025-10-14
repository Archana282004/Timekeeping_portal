type uploadedByType = {
  id?: string;
  first_name: string;
  last_name: string;
  email?: string;
};

export interface Transfer {
  timeTaken?: string;
  fileSize?: string;
  project_id: string;
  site_id: string;
  subject_id: string;
  upload_id: string;
  uploadedBy: uploadedByType;
  id?: string | number;
  status: string;
  attachments?: any[];
}

export type UploadProgress = {
  progress: number;
  transferRate: string;
  totalRemaining: string;
  totalSize: string;
  data: {
    id: number;
    upload_id: string;
    project_id: string;
    site_id: string;
    subject_id: string;
    visit_type: string;
    exam: string;
    status: string;
    uploaded_by: number;
    created_at: string; // ISO timestamp
    updated_at: string; // ISO timestamp
  };
  files: {
    name: string;
    progress: number;
    transferRate: string;
    remaining: string;
    size: string;
    status: string;
  }[];
};
export interface TransferState {
  allTransfer: UploadProgress[];
  transferList: Transfer[];
  transferCount: {
    totalTransfers: null | number;
    successfulTransfers: number;
    ongoingTransfers: number;
    failedTransfers: number;
  };
  totalPages: number;
  currentPage: number;
  totalCount: number;
  progress?: number;
  id?: string | number;
  isDeIndentifeid?: boolean;
}

export interface paramsType {
  limit: number;
  page: number;
  search?: string;
  type?: string;
}

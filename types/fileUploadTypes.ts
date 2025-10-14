export interface UploadedPart {
  ETag: string;
  PartNumber: number;
}

export interface UploadedPartsState {
  UploadedPart: UploadedPart[];
  projectIdOptions: ProjectIdOptionsType[];
  siteIdOptions: SiteIdOptionType[];
  subjectIdOptions: SubjectIdOptionType[];
  selectedFiles: any
  formData: {}
}

export interface ProjectIdOptionPayloadType {
  projects: ProjectIdOptionsType[];
}

export interface ProjectIdOptionsType {
  account_name: string;
  active_status: string;
  created_at: string;
  deletedAt: null | string;
  id: number;
  is_locked: boolean;
  name: string;
  project_id: string;
  regulated_project: boolean;
  totalProjectSites: number;
  totalProjectSubjects: number;
  updated_at?: string;
}

export interface SiteIdOptionPayloadType {
  sites: SiteIdOptionType[];
}
export interface SiteIdOptionType {
  active_status: string;
  bucket_created: boolean;
  created_at: string;
  deletedAt: null | string;
  id: number;
  name: string;
  project: ProjectIdOptionsType;
  siteID: string;
  sitePI: null | string;
  totalSubjects: number;
  updated_at: string;
}

export interface SubjectIdOptionPayloadType {
  subjects: SubjectIdOptionType[];
}

export interface SubjectGroupType {
  active_status: string;
  created_at: string;
  id: number;
  name: string;
  updated_at: string;
}
export interface SubjectIndexLocationType {
  active_status: string;
  category: string;
  created_at: string;
  id: number;
  name: string;
  updated_at: string;
}

export interface SubjectIdOptionType {
  active_status: string;
  created_at: string;
  deletedAt: null | string;
  group: SubjectGroupType;
  id: number;
  index_locations: SubjectIndexLocationType[];
  lastVisit: null | string;
  site: SiteIdOptionType;
  subjectID: null | string;
  totalVisitCount: number;
  updated_at: string;
}

export interface DefaultFormDataType {
  uploadId: string;
  projectId: string | undefined;
  projectName: string;
  siteId: string | undefined;
  subjectId: string | number | undefined;
  visitType: string;
  id: number | null;
}

export interface TransferProgressType {
  created_at: string;
  exam: string;
  id: number;
  project_id: string;
  site_id: string;
  status: string;
  subject_id: string;
  updated_at: string;
  upload_id: string;
  uploaded_by: number;
  visit_type: string;
}

export interface SelectedFileDataType {
  base64: string;
  file: File;
  trimmedCanvas: HTMLCanvasElement;
  photoPathKey?: string;
}

export interface DicomProgressListType extends SelectedFileDataType {
  uploading?: boolean;
}

export interface Analysis {
  id: string;
  logId: string;
  serviceName: string;
  rootCause: string;
  suggestedFix: string;
  createdAt: string;
}

export interface NewLog {
  serviceName: string;
  severity: "INFO" | "WARN" | "ERROR" | "CRITICAL";
  message: string;
  stackTrace?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

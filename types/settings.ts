export interface Settings {
  _id?: string;
  key: string;
  value: any;
  description?: string;
  updatedBy: string;
  updatedAt?: string;
}

export interface MaintenanceSettings {
  enabled: boolean;
  title: string;
  message: string;
  estimatedEnd?: string;
}

export interface NotificationSettings {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "error";
  isActive: boolean;
  createdAt: string;
  createdBy: string;
  expiresAt?: string;
}

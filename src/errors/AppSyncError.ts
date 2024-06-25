export type AppSyncErrorDetails = {
  errorType: string;
  message: string;
};

export type AppSyncError = {
  data: any[];
  errors: AppSyncErrorDetails[];
};

export const isAppSyncError = (error: unknown): error is AppSyncError => {
  return (
    typeof error === "object" && !!error && "data" in error && "errors" in error
  );
};

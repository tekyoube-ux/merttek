export type AppCategory = "windows" | "chrome" | "tools" | "other";
export type AppPlatform = "Windows" | "macOS" | "Linux" | "Web" | "Chrome" | "Extension" | "Cross-platform";
export type AppStatus = "stable" | "beta" | "alpha" | "deprecated";

export type AppInfo = {
  id: string;
  slug: string;
  name: string;
  category: AppCategory;
  platform: AppPlatform;
  status: AppStatus;
  version: string;
  description: string;
  longDescription?: string;
  icon: string;
  screenshots: string[];
  features: string[];
  requirements: string[];
  downloadUrl: string;
  releaseDate: string;
  updatedAt: string;
};

export type ExtensionInfo = {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription?: string;
  version: string;
  browser: string[];
  category?: string;
  status: AppStatus;
  icon: string;
  screenshots: string[];
  installUrl: string;
  releaseDate: string;
  updatedAt: string;
};

export type CategoryLabel = {
  value: AppCategory;
  label: string;
};

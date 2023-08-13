export const cleanPath = (path: string) =>
  path !== "/" ? path.split("?")[0].split("#")[0].replace(/\/+$/, "") : path;

export const isActive = (path: string, currentPath: string) =>
  currentPath !== "/" ? path.startsWith(currentPath) : path === currentPath;

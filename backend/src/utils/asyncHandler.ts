export const asyncHandler = <T extends (...args: any[]) => Promise<any>>(fn: T) =>
  (req: Parameters<T>[0], res: Parameters<T>[1], next: (...args: any[]) => void) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
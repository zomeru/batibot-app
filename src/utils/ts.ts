export type OmitType<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

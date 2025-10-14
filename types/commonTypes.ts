export type AnyType<T> = T | undefined | null | void | [];

export interface Point {
    x: number;
    y: number;
}
  
export interface Line {
    start: Point;
    end: Point;
}
import { readFileSync } from "fs";

type Args = ["1abc2", "pqr3stu8vwx", "a1b2c3d4e5f", "treb7uchet"];

const input = readFileSync("./src/day1/day1-input.txt", "utf-8").split(
  "\n",
) as string[];
// type Args = [...input];

type Day1Part1Solution = SolveDay1Part1<Args>;

type SolveDay1Part1<A extends any[]> = Sum<{
  [K in keyof A]: ToNumber<`${FirstNumber<A[K]>}${FirstNumber<Reverse<A[K]>>}`>;
}>;

type Sum<A extends number[], Acc extends number = 0> = A extends [
  infer F extends number,
  ...infer Rest,
]
  ? Rest extends number[]
    ? Sum<Rest, Add<Acc, F>>
    : Add<Acc, F>
  : Acc;

type Length<T extends any[]> = T extends { length: infer L extends number }
  ? L
  : never;

type OfLength<L extends number, T extends any[] = []> = T extends { length: L }
  ? T
  : OfLength<L, [...T, any]>;

type Add<A extends number, B extends number> = Length<
  [...OfLength<A>, ...OfLength<B>]
>;

type ToNumber<S extends string> = S extends `${infer N extends number}`
  ? N
  : never;

type Reverse<T extends string> = T extends `${infer F}${infer Rest}`
  ? `${Reverse<Rest>}${F}`
  : T;

type FirstNumber<T extends string> =
  T extends `${infer F extends number}${infer _}`
    ? F
    : T extends `${infer _}${infer R}`
    ? FirstNumber<R>
    : never;

import clone from "clone";
import { deasyncObj } from "../src";

const inputObj = { a: 1, b: 2, c: [], d: { e: { f: { g: 3, h: [4], i: [{ j: 5 }, 6, { k: { l: [{ m: 9 }] } }] } } } };
test("plain object remains unchanged", async function () {
  const obj = clone(inputObj);
  await deasyncObj(obj);
  expect(obj).toEqual(inputObj);
})

test("object with promise values gets resolved values instead", async function () {
  const obj = clone(inputObj);
  obj.a = Promise.resolve(obj.a) as any;
  obj.d.e.f.g = Promise.resolve(obj.d.e.f.g) as any;
  obj.d.e.f.i[1] = Promise.resolve(obj.d.e.f.i[1]) as any;
  (obj.d.e.f.i[0] as { j: number }).j = Promise.resolve((obj.d.e.f.i[0] as { j: number }).j) as any;
  await deasyncObj(obj);
  expect(obj).toEqual(inputObj);
})

test("object with rejected promise should throw error", async function () {
  const obj = clone(inputObj);
  obj.a = Promise.reject("an error") as any;
  obj.d.e.f.g = Promise.resolve(obj.d.e.f.g) as any;
  obj.d.e.f.i[1] = Promise.resolve(obj.d.e.f.i[1]) as any;
  (obj.d.e.f.i[0] as { j: number }).j = Promise.resolve((obj.d.e.f.i[0] as { j: number }).j) as any;
  await expect(deasyncObj(obj)).rejects.toEqual("an error");
})

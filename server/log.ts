import { DEV } from "./constants";

export default function log(...args: any[]) {
  if (DEV) {
    console.log(...args);
  }
}

// Assuming SplitText is a class with certain properties and methods
declare class SplitText {
  constructor(target: string | HTMLElement, options?: SplitTextOptions);
  words: HTMLElement[];
  lines: HTMLElement[];
  revert(): void;
  // Add more methods and properties as necessary
}

interface SplitTextOptions {
  type?: string; // e.g., 'words', 'lines'
  linesClass?: string; // Custom class for lines
  // Add more options based on what SplitText can take
}

declare module "gsap/SplitText" {
  export { SplitText };
  export default SplitText;
}

declare module "gsap/dist/SplitText" {
  export * from "gsap/SplitText";
  export { SplitText as default } from "gsap/SplitText";
}

declare module "gsap/src/SplitText" {
  export * from "gsap/SplitText";
  export { SplitText as default } from "gsap/SplitText";
}

declare module "gsap/all" {
  export * from "gsap/SplitText";
}

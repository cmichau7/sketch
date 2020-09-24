declare module "tailwindcss" {
  export type Colors = {
    [key in number | string]: Colors | string;
  };

  type IndexableObject = {
    [key in number | string]: IndexableObject | string;
  };

  export interface Theme {
    screens: IndexableObject;
    colors: Colors;
    spacing: IndexableObject;
    backgroundColor: IndexableObject;
    backgroundOpacity: IndexableObject;
    backgroundPosition: IndexableObject;
    backgroundSize: IndexableObject;
    borderColor: IndexableObject;
    borderOpacity: IndexableObject;
    borderRadius: IndexableObject;
    borderWidth: IndexableObject;
    boxShadow: IndexableObject;
    container: IndexableObject;
    cursor: IndexableObject;
    divideColor: IndexableObject;
    flex: IndexableObject;
    flexGrow: IndexableObject;
    flexShrink: IndexableObject;
    fontFamily: IndexableObject;
    fontSize: IndexableObject;
    fontWeight: IndexableObject;
    height: IndexableObject;
    inset: IndexableObject;
    letterSpacing: IndexableObject;
    lineHeight: IndexableObject;
    minWidth: IndexableObject;
    objectPosition: IndexableObject;
    opacity: IndexableObject;
    order: IndexableObject;
    padding: IndexableObject;
    placeholderColor: IndexableObject;
    placeholderOpacity: IndexableObject;
    space: IndexableObject;
    stroke: IndexableObject;
    strokeWidth: IndexableObject;
    textColor: IndexableObject;
    textOpacity: IndexableObject;
    zIndex: IndexableObject;
    gap: IndexableObject;
    gridTemplateColumns: IndexableObject;
    gridColumn: IndexableObject;
    gridColumnStart: IndexableObject;
    gridColumnEnd: IndexableObject;
    gridTemplateRows: IndexableObject;
    gridRow: IndexableObject;
    gridRowStart: IndexableObject;
    gridRowEnd: IndexableObject;
    transformOrigin: IndexableObject;
    scale: IndexableObject;
    rotate: IndexableObject;
    translate: IndexableObject;
    skew: IndexableObject;
    transitionProperty: IndexableObject;
    transitionTimingFunction: IndexableObject;
    transitionDuration: IndexableObject;
    transitionDelay: IndexableObject;
  }

  export type Variants = {
    [key in keyof Theme]: string[];
  };

  export interface Config {
    purge: [];
    target: string;
    prefix: string;
    important: boolean;
    separator: string;
    theme: Theme;
    variants: Variants;
    corePlugins: {};
    plugins: [];
  }
}

declare module "tailwindcss/resolveConfig" {
  import { Config } from "tailwindcss";

  export default function (config: Config): Config;
}

declare module "tailwind.config" {
  import { Config } from "tailwindcss";

  const config: Config;
  export default config;
}

declare module "windicss/colors" {
  interface ColorScale {
    [key: string | number]: string;
  }

  interface WindiColors {
    [key: string]: string | ColorScale;
  }

  const colors: WindiColors;
  export default colors;
}

declare module "windicss/helpers" {
  export function defineConfig(config: object): object;
}

import { useColorMode, useTheme } from "@xstyled/emotion";
import { isDefined, isNil } from "Utility";
import { Option, Some, None } from "Utility/option";
import { ColorKey, ColorMode, parseThemeColor } from "./tokens";

/**
 * Obtains the resolved color corresponding to the key for the current color mode (i.e.
 * light/dark), which can then be transformed by `ColorKey` (alias of `tinycolor`).
 *
 * **Note**: if you only need the CSS term, you can just use the `color` function to
 * resolve the CSS custom variable expression from a color key, which is significantly
 * more performant than this hook (as it doesn't require any JavaScript).
 * @param key - Color theme key
 */
export function useThemeColor(key: ColorKey): [string, ColorMode] {
  const theme = useTheme();
  const colorMode = useColorMode()[0] as ColorMode;
  const { colors } = theme;
  if (isNil(colors)) return ["#000000", colorMode];

  let colorOption: Option<string> = None;
  const { modes } = colors;
  if (isDefined(modes) && colorMode in modes) {
    const mode = modes[colorMode as keyof typeof modes];
    if (key in mode) {
      colorOption = Some(mode[key as keyof typeof mode]);
    }
  }

  if (colorOption.isEmpty()) {
    colorOption = parseThemeColor(colors[key]);
  }

  return [colorOption.getOrElse("#000000"), colorMode];
}

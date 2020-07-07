import React from "react";
import { styled } from "linaria/react";
import { darken, lighten } from "polished";

import {
  shadow,
  color,
  gap,
  mode,
  ColorMode,
  dynamicColor,
  down,
} from "@design/theme";
import { tableSidePadding } from "@docs/layout";

const tablePadding = gap.pico;
const Styled = {
  TableOuter: styled.div`
    border: 1px solid ${color("contrastBorder")};
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    box-shadow: ${shadow("z1")};
    margin-top: 0;
    margin-bottom: calc(1.5 * ${gap.flow});
    overflow-y: hidden !important;
  `,
  TableInner: styled.table`
    border-collapse: collapse;
    color: ${color("text")};

    ${mode(ColorMode.Dark)} {
      --row-odd-bg: ${lighten(0.02, dynamicColor("bg+10", ColorMode.Dark))};
      --row-even-bg: ${lighten(0.04, dynamicColor("bg+10", ColorMode.Dark))};
      --row-header-bg: ${lighten(0.02, dynamicColor("bg", ColorMode.Dark))};
      --row-border: ${dynamicColor("bg", ColorMode.Dark)};
    }
    ${mode(ColorMode.Light)} {
      --row-odd-bg: ${darken(0.01, dynamicColor("bg", ColorMode.Light))};
      --row-even-bg: ${darken(0.045, dynamicColor("bg", ColorMode.Light))};
      --row-header-bg: ${darken(0.02, dynamicColor("bg-10", ColorMode.Light))};
      --row-border: transparent;
    }

    tr:last-child td:first-child {
      border-bottom-left-radius: 8px;
    }

    tr:last-child td:last-child {
      border-bottom-right-radius: 8px;
    }

    th {
      color: ${color("textFade")};
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    td,
    th {
      font-size: 0.9rem;
      min-width: 6rem;
      padding: ${tablePadding};
      text-align: left;
      border-top: 1px solid var(--row-border);

      &:first-child {
        padding-left: ${tableSidePadding};
      }

      &:last-child {
        padding-right: ${tableSidePadding};
      }
    }

    td:not(:first-child),
    th:not(:first-child) {
      min-width: 8rem;
    }

    ${down("md")} {
      td:not(:first-child),
      th:not(:first-child) {
        min-width: 10rem;
      }
    }

    tr:nth-child(2n) {
      background-color: var(--row-even-bg);
    }

    tr:nth-child(2n + 1) {
      background-color: var(--row-odd-bg);
    }

    thead {
      tr {
        background-color: var(--row-header-bg) !important;
      }
    }
  `,
};

export type TableProps = React.TableHTMLAttributes<HTMLTableElement>;

/**
 * Formatted table component.
 * Use the same children as a normal `<table />` element.
 */
const Table: React.FC<TableProps> = ({
  className,
  style,
  children,
  ...rest
}) => (
  <Styled.TableOuter>
    <Styled.TableInner {...rest}>{children}</Styled.TableInner>
  </Styled.TableOuter>
);

export default Table;

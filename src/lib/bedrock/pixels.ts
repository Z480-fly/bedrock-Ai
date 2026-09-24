/** Tiny nearest-neighbour PNG from a hex grid. Browser-only. */

export function pixelsToPngDataUrl(pixels: string[][], scale = 1): string {
  const h = pixels.length;
  const w = pixels[0]?.length ?? 0;
  const canvas = document.createElement("canvas");
  canvas.width = w * scale;
  canvas.height = h * scale;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  ctx.imageSmoothingEnabled = false;
  for (let y = 0; y < h; y++) {
    const row = pixels[y] ?? [];
    for (let x = 0; x < w; x++) {
      const color = row[x];
      if (!color || color === "transparent") continue;
      ctx.fillStyle = color;
      ctx.fillRect(x * scale, y * scale, scale, scale);
    }
  }
  return canvas.toDataURL("image/png");
}

export function dataUrlToBase64(dataUrl: string): string {
  const comma = dataUrl.indexOf(",");
  return comma >= 0 ? dataUrl.slice(comma + 1) : dataUrl;
}

export function makePackIcon(seed: string): string {
  const moss = ["#6e8f52", "#9bbf7a", "#c5d9a8", "#4f6a38", "#1c211c"];
  const n = hash(seed);
  const size = 16;
  const grid: string[][] = [];
  for (let y = 0; y < size; y++) {
    const row: string[] = [];
    for (let x = 0; x < size; x++) {
      const edge = x === 0 || y === 0 || x === size - 1 || y === size - 1;
      if (edge) {
        row.push("#0b0d0b");
        continue;
      }
      const v = (hash(`${n}-${x}-${y}`) + x * 3 + y * 5) % moss.length;
      row.push(moss[v] ?? "#9bbf7a");
    }
    grid.push(row);
  }
  const mid = 6;
  for (let y = mid; y < mid + 4; y++) {
    for (let x = mid; x < mid + 4; x++) {
      const cell = grid[y];
      if (cell) cell[x] = "#e6ebe3";
    }
  }
  return pixelsToPngDataUrl(grid, 16);
}

function hash(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export const SWORD_PIXELS: string[][] = [
  ["transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#d7e4c5", "#9bbf7a", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent"],
  ["transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#d7e4c5", "#e6ebe3", "#6e8f52", "#4f6a38", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent"],
  ["transparent", "transparent", "transparent", "transparent", "transparent", "#d7e4c5", "#e6ebe3", "#9bbf7a", "#6e8f52", "#4f6a38", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent"],
  ["transparent", "transparent", "transparent", "transparent", "#c5d9a8", "#e6ebe3", "#9bbf7a", "#6e8f52", "#4f6a38", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent"],
  ["transparent", "transparent", "transparent", "#c5d9a8", "#e6ebe3", "#9bbf7a", "#6e8f52", "#4f6a38", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent"],
  ["transparent", "transparent", "#c5d9a8", "#e6ebe3", "#9bbf7a", "#6e8f52", "#4f6a38", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent"],
  ["transparent", "#8a6a48", "#e6ebe3", "#9bbf7a", "#6e8f52", "#4f6a38", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent"],
  ["#8a6a48", "#c4a07a", "#8a6a48", "#6e8f52", "#4f6a38", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent"],
  ["transparent", "#8a6a48", "#c4a07a", "#8a6a48", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent"],
  ["transparent", "transparent", "#8a6a48", "#5c4630", "#8a6a48", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent"],
  ["transparent", "transparent", "transparent", "#8a6a48", "#5c4630", "#8a6a48", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent"],
  ["transparent", "transparent", "transparent", "transparent", "#8a6a48", "#5c4630", "#8a6a48", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent"],
  ["transparent", "transparent", "transparent", "transparent", "transparent", "#8a6a48", "#5c4630", "#3d2e20", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent"],
  ["transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#5c4630", "#3d2e20", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent"],
  ["transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#3d2e20", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent"],
  ["transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent"],
];

export const FOOD_PIXELS: string[][] = fillPattern([
  "#3d2e20",
  "#8a6a48",
  "#c45c4c",
  "#e6ebe3",
  "#9bbf7a",
  "#6e8f52",
]);

export const BLOCK_PIXELS: string[][] = (() => {
  const a = ["#4f6a38", "#6e8f52", "#9bbf7a", "#3d522c"];
  const grid: string[][] = [];
  for (let y = 0; y < 16; y++) {
    const row: string[] = [];
    for (let x = 0; x < 16; x++) {
      row.push(a[(x + y * 3 + (x >> 2) + (y >> 1)) % a.length] ?? "#6e8f52");
    }
    grid.push(row);
  }
  return grid;
})();

export const MOB_PIXELS: string[][] = (() => {
  const grid: string[][] = Array.from({ length: 16 }, () =>
    Array.from({ length: 16 }, () => "#6e8f52"),
  );
  for (let y = 0; y < 16; y++) {
    for (let x = 0; x < 16; x++) {
      const row = grid[y];
      if (!row) continue;
      if (x === 0 || y === 0 || x === 15 || y === 15) row[x] = "#4f6a38";
      if ((x === 5 || x === 10) && y === 6) row[x] = "#0b0d0b";
      if (y === 10 && x >= 6 && x <= 9) row[x] = "#3d2e20";
      if ((x + y) % 7 === 0) row[x] = "#9bbf7a";
    }
  }
  return grid;
})();

function fillPattern(palette: string[]): string[][] {
  const grid: string[][] = [];
  for (let y = 0; y < 16; y++) {
    const row: string[] = [];
    for (let x = 0; x < 16; x++) {
      const ring = Math.min(x, y, 15 - x, 15 - y);
      if (ring === 0) row.push(palette[0] ?? "#3d2e20");
      else if (ring === 1) row.push(palette[1] ?? "#8a6a48");
      else if (x >= 5 && x <= 10 && y >= 5 && y <= 10) row.push(palette[2] ?? "#c45c4c");
      else row.push(palette[(x + y) % 2 === 0 ? 4 : 5] ?? "#9bbf7a");
    }
    grid.push(row);
  }
  return grid;
}

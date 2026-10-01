export interface QrModule { x: number; y: number; }

const SIZE = 21;

function rng(seed: number) {
  return () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
}

// QR décoratif (non scannable) : 3 repères + modules pseudo-aléatoires stables
export function buildQrModules(): QrModule[] {
  const rand = rng(2027);
  const modules: QrModule[] = [];
  const reserved = (x: number, y: number) =>
    (x < 8 && y < 8) || (x >= SIZE - 8 && y < 8) || (x < 8 && y >= SIZE - 8);

  const finder = (ox: number, oy: number) => {
    for (let dy = 0; dy < 7; dy++) {
      for (let dx = 0; dx < 7; dx++) {
        const ring = dx === 0 || dx === 6 || dy === 0 || dy === 6;
        const core = dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4;
        if (ring || core) modules.push({ x: ox + dx, y: oy + dy });
      }
    }
  };
  finder(0, 0);
  finder(SIZE - 7, 0);
  finder(0, SIZE - 7);

  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      if (!reserved(x, y) && rand() > 0.52) modules.push({ x, y });
    }
  }
  return modules;
}
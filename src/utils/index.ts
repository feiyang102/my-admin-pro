export function pagerUtil(index: number = 1, size: number = 10): any {
  const beginIndex = (index - 1) * size;
  const endIndex = index * size;
  return { beginIndex, endIndex };
}

export function add(a: number, b: number): number {
  return a + b;
}

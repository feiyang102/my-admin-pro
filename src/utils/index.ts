export function pagerUtil(index: number, size: number): any {
  const beginIndex = (index - 1) * size;
  const endIndex = index * size;
  return { beginIndex, endIndex };
}

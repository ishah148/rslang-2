export function shuffleArr<T>(arr: T[]) {
  return [...arr].sort((el) => Math.random() - 0.5)
}

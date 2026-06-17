/** Mô phỏng độ trễ mạng ngắn cho mock mode */
export function mockDelay<T>(value: T, ms = 80): Promise<T> {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(value), ms)
  })
}

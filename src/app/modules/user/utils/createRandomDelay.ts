export function createRandomDelay (start: number, end: number): number {
    return Math.round(Math.random() * (end - start) + start);
}
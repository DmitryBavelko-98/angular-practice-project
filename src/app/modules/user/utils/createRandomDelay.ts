export function createRandomDelay (): number {
    return Math.round(Math.random() * (6000 - 1000) + 1000);
}
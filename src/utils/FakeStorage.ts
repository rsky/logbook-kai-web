export class FakeStorage implements Storage {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [name: string]: any
    length = 0

    clear (): void {
        // not implemented
    }

    getItem (key: string): string | null {
        return this[key]
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    key (index: number): string | null {
        // not implemented
        return null
    }

    removeItem (key: string): void {
        delete this[key]
    }

    setItem (key: string, value: string): void {
        this[key] = value
    }
}

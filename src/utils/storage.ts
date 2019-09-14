import { FakeStorage } from "./FakeStorage"

let storage: Storage
if (window.localStorage) {
    storage = window.localStorage
} else {
    storage = new FakeStorage()
}

export const getStorage = (): Storage => storage

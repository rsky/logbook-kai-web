import { handleActions } from "redux-actions"

import { Deck } from "../../models/Deck"
import { Materials } from "../../models/Material"
import { getStorage } from "../../utils/storage"

import { ACTION_RECEIVE_DECK_PORT, ACTION_RECEIVE_MATERIAL, PayloadType } from "./actions"

const PORT_DECKS_KEY = "logbook.port.decks"
const PORT_MATERIALS_KEY = "logbook.port.materials"

export type PortState = {
    materials: Materials;
    decks: Deck[];
}

/* eslint-disable @typescript-eslint/no-explicit-any */

const buildDecks = (decs: any): Deck[] => decs.map((deck: any) => new Deck(deck))

const save = (key: string, value: any): void => getStorage().setItem(key, JSON.stringify(value))

/* eslint-enable */

const getInitialState = (): PortState => {
    const state = {} as PortState
    const storage = getStorage()

    const decks = storage.getItem(PORT_DECKS_KEY)
    if (decks) {
        state.decks = buildDecks(JSON.parse(decks))
    } else {
        state.decks = []
    }

    const mateial = storage.getItem(PORT_MATERIALS_KEY)
    if (mateial) {
        state.materials = new Materials(JSON.parse(mateial))
    } else {
        state.materials = new Materials([])
    }

    return state
}

export const portReducer = handleActions<PortState, PayloadType>({
    [ACTION_RECEIVE_DECK_PORT]: (state, action) => {
        const decks = buildDecks(action.payload.data)
        save(PORT_DECKS_KEY, decks.map(deck => deck.getRawData()))
        return { ...state, decks }
    },
    [ACTION_RECEIVE_MATERIAL]: (state, action) => {
        const materials = new Materials(action.payload.data)
        save(PORT_MATERIALS_KEY, materials.getRawData())
        return { ...state, materials }
    },
}, getInitialState())

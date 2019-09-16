import { handleActions } from "redux-actions"

import { Deck } from "../../models/Deck"
import { Material } from "../../models/Material"
import { getStorage } from "../../utils/storage"

import { ACTION_RECEIVE_DECK_PORT, ACTION_RECEIVE_MATERIAL, PayloadType } from "./actions"

const PORT_DECKS_KEY = "logbook.port.decks"
const PORT_MATERIAL_KEY = "logbook.port.material"

export type PortState = {
    material: Material;
    decks: Deck[];
}

/* eslint-disable @typescript-eslint/no-explicit-any */

const buildDecks = (data: any): Deck[] => data.map((data: any) => new Deck(data))

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

    const mateial = storage.getItem(PORT_MATERIAL_KEY)
    if (mateial) {
        state.material = new Material(JSON.parse(mateial))
    } else {
        state.material = new Material([])
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
        const material = new Material(action.payload.data)
        save(PORT_MATERIAL_KEY, material.getRawData())
        return { ...state, material }
    },
}, getInitialState())

import { handleActions } from "redux-actions"

import { Deck } from "../../models/Deck"
import { Material } from "../../models/Material"

import {
    ACTION_RECEIVE_DECK_PORT,
    ACTION_RECEIVE_MATERIAL,
    PayloadType,
} from "./actions"

export type PortState = {
    material: Material;
    decks: Array<Deck>;
}

const getInitialState = (): PortState => ({
    material: new Material([]),
    decks: [],
})

export const portReducer = handleActions<PortState, PayloadType>({
    [ACTION_RECEIVE_DECK_PORT]: (state, action) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const decks = action.payload.data.map((data: any) => new Deck(data))
        return { ...state, decks }
    },
    [ACTION_RECEIVE_MATERIAL]: (state, action) => {
        const material = new Material(action.payload.data)
        return { ...state, material }
    },
}, getInitialState())

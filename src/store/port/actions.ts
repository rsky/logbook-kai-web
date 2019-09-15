import { createAction } from "redux-actions"

const ACTION_RECEIVE_MATERIAL = "PORT_RECEIVE_MATERIAL"
const ACTION_RECEIVE_DECK_PORT = "PORT_RECEIVE_DECK_PORT"

/* eslint-disable @typescript-eslint/no-explicit-any */

const receiveMaterial = createAction(ACTION_RECEIVE_MATERIAL, (data: any) => ({ data }))
const receiveDeckPort = createAction(ACTION_RECEIVE_DECK_PORT, (data: any) => ({ data }))

type PayloadType = {
    data: any;
}

/* eslint-enable */

export {
    ACTION_RECEIVE_DECK_PORT,
    ACTION_RECEIVE_MATERIAL,
    PayloadType,
    receiveDeckPort,
    receiveMaterial,
}

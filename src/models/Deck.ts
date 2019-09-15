import { Data } from "./KCSAPIData"
import { KCSModel } from "./KCSModel"

export class Deck extends KCSModel {
    id: number;
    name: string;
    ships: Array<number>;
    missions: Array<number>;

    constructor (data: Data) {
        super(data)
        this.id = data.api_id
        this.name = data.api_name
        this.ships = data.api_ship
        this.missions = data.api_mission
    }
}

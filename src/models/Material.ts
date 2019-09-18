import { IdAndValue } from "./KCSAPIStruct"
import { KCSModel } from "./KCSModel"

export enum MaterialID {
    FUEL = 1,
    AMMUNITION = 2,
    STEEL = 3,
    BAUXITE = 4,
    BURNER = 5,
    BUCKET = 6,
    NAIL = 7,
    SCREW = 8,
}

export class Material {
    readonly id: MaterialID;
    readonly amount: number;

    constructor (id: MaterialID, amount: number) {
        this.id = id
        this.amount = amount
    }
}

export class Materials extends KCSModel {
    // 燃料
    readonly fuel: Material;
    // 弾薬
    readonly ammunition: Material;
    // 鋼材
    readonly steel: Material;
    // ボーキサイト
    readonly bauxite: Material;
    // 高速建造剤
    readonly burner: Material;
    // 高速修復材
    readonly bucket: Material;
    // 開発資材
    readonly nail: Material;
    // 改修資材
    readonly screw: Material;

    constructor (data: IdAndValue[]) {
        super(data)
        const lookup = (id: MaterialID): Material => {
            const entry = data.find(entry => entry.api_id === id)
            const amount = entry ? entry.api_value : 0
            return new Material(id, amount)
        }
        this.fuel = lookup(MaterialID.FUEL)
        this.ammunition = lookup(MaterialID.AMMUNITION)
        this.steel = lookup(MaterialID.STEEL)
        this.bauxite = lookup(MaterialID.BAUXITE)
        this.burner = lookup(MaterialID.BURNER)
        this.bucket = lookup(MaterialID.BUCKET)
        this.nail = lookup(MaterialID.NAIL)
        this.screw = lookup(MaterialID.SCREW)
    }
}

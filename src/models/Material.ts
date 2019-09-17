import { IdAndValue } from "./KCSAPIStruct"
import { KCSModel } from "./KCSModel"

enum MaterialID {
    FUEL = 1,
    AMMUNITION = 2,
    STEEL = 3,
    BAUXITE = 4,
    BURNER = 5,
    BUCKET = 6,
    NAIL = 7,
    SCREW = 8,
}

export class Material extends KCSModel {
    // 燃料
    readonly fuel: number;
    // 弾薬
    readonly ammunition: number;
    // 鋼材
    readonly steel: number;
    // ボーキサイト
    readonly bauxite: number;
    // 高速建造剤
    readonly burner: number;
    // 高速修復材
    readonly bucket: number;
    // 開発資材
    readonly nail: number;
    // 改修資材
    readonly screw: number;

    constructor (data: IdAndValue[]) {
        super(data)
        const lookup = (id: number): number => {
            const entry = data.find(entry => entry.api_id === id)
            return entry ? entry.api_value : 0
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

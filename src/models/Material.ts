import { IdAndValue } from "./KCSAPIData"
import { KCSModel } from "./KCSModel"

export class Material extends KCSModel {
    // 燃料
    fuel = 0
    // 弾薬
    ammunition = 0
    // 鋼材
    steel = 0
    // ボーキサイト
    bauxite = 0
    // 高速建造剤
    burner = 0
    // 高速修復材
    bucket = 0
    // 開発資材
    nail = 0
    // 改修資材
    screw = 0

    constructor (data: Array<IdAndValue>) {
        super(data)
        for (const entry of data) {
            const value = entry.api_value
            switch (entry.api_id) {
            case 1: this.fuel = value; break
            case 2: this.ammunition = value; break
            case 3: this.steel = value; break
            case 4: this.bauxite = value; break
            case 5: this.burner = value; break
            case 6: this.bucket = value; break
            case 7: this.nail = value; break
            case 8: this.screw = value; break
            }
        }
    }
}

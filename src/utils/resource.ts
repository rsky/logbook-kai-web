import { MaterialID } from "../models/Material"
import { resolveResource } from "./webapp"

const materialIdIconIdMap = {
    [MaterialID.FUEL]: "31",
    [MaterialID.AMMUNITION]: "32",
    [MaterialID.STEEL]: "33",
    [MaterialID.BAUXITE]: "34",
    [MaterialID.BURNER]: "2",
    [MaterialID.BUCKET]: "1",
    [MaterialID.NAIL]: "3",
    [MaterialID.SCREW]: "4",
}

export const getMaterialIconURI = (id: MaterialID): string =>
    resolveResource(`common/common_itemicons/common_itemicons_id_${materialIdIconIdMap[id]}.png`)

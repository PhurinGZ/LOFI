import { MODE_SONG } from "../constants/actionTypes"; 

export const songMode = (value) =>async (dispath) =>{
    dispath({type:MODE_SONG, payload: value})
    return value
}

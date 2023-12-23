import {MODE_SONG} from "../constants/actionTypes"

const initialState = {
    modeSong: {},
    error: null,
  };


const songModeReducers = (state = initialState, action) =>{
    switch (action.type) {
        case MODE_SONG:
            return {
                ...state,
                modeSong: action.payload,
                error:null
            }
    }
}

export default songModeReducers
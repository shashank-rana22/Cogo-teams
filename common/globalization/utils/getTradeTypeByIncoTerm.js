import GLOBAL_CONSTANTS from "../constants/globals"

const getTradeTypeByIncoTerm = (incoTerm)=>{
    return GLOBAL_CONSTANTS.options.inco_term?.[incoTerm]?.trade_type || ''
}

export default getTradeTypeByIncoTerm
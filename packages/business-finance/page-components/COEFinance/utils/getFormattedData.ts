const getFormattedData = (data) => {
    const {sell_quotation={},buy_quotation={}}=data ||{};
    const sellSevices=sell_quotation.serviceCharges?.map((item)=>(item.serviceType||'Platform Fees'))||[]
    const buySevices=buy_quotation.serviceCharges?.map((item)=>(item.serviceType ||'Platform Fees'))||[]
    const commonServices = sellSevices.filter(value => buySevices?.includes(value));
    const commonBuyData=buy_quotation.serviceCharges?.filter((item)=>(commonServices?.includes(item?.serviceType)))||[]
    const remainingBuyData=buy_quotation.serviceCharges?.filter((item)=>(!commonServices?.includes(item?.serviceType)))||[]
    const commonSellData=sell_quotation.serviceCharges?.filter((item)=>(commonServices?.includes(item?.serviceType)))||[]
    const remainingSellData=sell_quotation.serviceCharges?.filter((item)=>(!commonServices?.includes(item?.serviceType)))||[]
    return {formattedBuyData:[...commonBuyData,...remainingBuyData],sellQuotationData:[...commonSellData,...remainingSellData]}||[]
}

export default getFormattedData
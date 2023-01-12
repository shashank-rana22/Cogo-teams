const getFormattedData = (data) => {
    const {sell_quotation={},buy_quotation={}}=data ||{};
    const buyQuotationData=buy_quotation.serviceCharges?.map((item)=>{
        return {...item,serviceType:item.serviceType||'Platform Fees'}
    })
    const sellSevices=sell_quotation.serviceCharges?.map((item)=>(item.serviceType||'Platform Fees'))||[]
    const buySevices=buy_quotation.serviceCharges?.map((item)=>(item.serviceType ||'Platform Fees'))||[]
    const commonServices = sellSevices.filter(value => buySevices?.includes(value));
    const commonBuyData=buy_quotation.serviceCharges?.filter((item)=>(commonServices?.includes(item?.serviceType)))||[]
    const remainingBuyData=buy_quotation.serviceCharges?.filter((item)=>(!commonServices?.includes(item?.serviceType)))||[]
    const remainingSellData=sell_quotation.serviceCharges?.filter((item)=>(!commonServices?.includes(item?.serviceType)))||[]
    const formattedSellData=[...commonBuyData,...remainingBuyData]?.map((items)=>{
        const serviceType=items.serviceType;
        const filterData=buyQuotationData?.filter((item)=>(item.serviceType==serviceType))||[];
        return filterData[0];
    })
    return {formattedBuyData:[...commonBuyData,...remainingBuyData],sellQuotationData:[...formattedSellData,...remainingSellData]}||[]
}
export default getFormattedData
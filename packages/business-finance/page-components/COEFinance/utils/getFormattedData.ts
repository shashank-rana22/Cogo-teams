const getFormattedData = (data) => {
    const {sell_quotation={},buy_quotation={}}=data ||{};
    const allservicesFeedata=sell_quotation.serviceCharges?.filter((item)=>(item.serviceType))||[]
    const platformFeedata=sell_quotation.serviceCharges?.filter((item)=>(!item.serviceType))||[]

    const buyQuotationData=buy_quotation.serviceCharges?.map((item)=>{
        return {...item,serviceType:item.serviceType||'Platform Fees'}
    })
    const formattedBuyData=[...allservicesFeedata,...platformFeedata]?.map((items)=>{
        const serviceType=items.serviceType;
        const filterData=buyQuotationData?.filter((item)=>(item.serviceType==serviceType))||[];
        return filterData[0];
    })
    return {formattedBuyData,sellQuotationData:[...allservicesFeedata,...platformFeedata]}
}

export default getFormattedData
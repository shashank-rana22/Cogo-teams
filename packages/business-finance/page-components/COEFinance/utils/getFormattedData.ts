import React, { useState } from 'react'

const getFormattedData = (data) => {
    const {sell_quotation={},buy_quotation={}}=data ||{};
    const allservicesFeedata=sell_quotation.service_charges.filter((item)=>(item.service_type))
    const platformFeedata=sell_quotation.service_charges.filter((item)=>(!item.service_type))

    const buyQuotationData=buy_quotation.service_charges.map((item)=>{
        return {...item,service_type:item.service_type||'Platform Fees'}
    })
    const formattedBuyData=[...allservicesFeedata,...platformFeedata]?.map((items)=>{
        const serviceType=items.service_type;
        const filterData=buyQuotationData.filter((item)=>(item.service_type==serviceType))||[];
        return filterData[0];
    })
    return {formattedBuyData,sellQuotationData:[...allservicesFeedata,...platformFeedata]}
}

export default getFormattedData
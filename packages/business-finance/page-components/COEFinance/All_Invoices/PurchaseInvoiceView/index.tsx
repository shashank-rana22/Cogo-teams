import React, { useState } from 'react';
import {useRouter} from '@cogoport/next';
import {Button} from '@cogoport/components'
import List from '../../../commons/List/index';
import useGetBill from '../../hook/useGetBill';
import useGetPurchaseViewList from '../../hook/usePurchaseViewList';
import TagsData from './tags'
import FiledPair from './FiledPair/index'
import RenderStatus from './RenderStatus/index';
import RenderRemarks  from './RenderRemarks';

function PurchaseInvoice() {
const router = useRouter();

const {data,config} = useGetPurchaseViewList();
   
const handleChange =(itemData:any)=>{
  router.push(`/business-finance/coe-finance/${router.query.active_tab}/view-invoices?billId=${itemData?.billId}&&billNumber=${itemData?.billNumber}&&orgId=${itemData?.organizationId}`);

}


const functions={
  renderViewMore : (itemData:any)=>(
    <Button size="sm" themeType="secondary" onClick={()=>{handleChange(itemData)}}>View Invoice</Button>
  ),
  renderFieldPair: (itemData:any, field:any) => (
    <FiledPair item={itemData} field={field} />
  ),
  renderStatus: (itemData:any,field:any) => (
     <RenderStatus item={itemData} field={field} />
   ),
   renderRemarks: (itemData:any,field:any)=>(
     <RenderRemarks itemData={itemData} field={field}/>
   )
};
    
  return (
    <div>
        <List config={config}  itemData={data?.list} functions={functions} /> 
    </div>
  )
}

export default PurchaseInvoice;






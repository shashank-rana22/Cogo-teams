import React from 'react'
import {Button} from '@cogoport/components'
import List from '../../../commons/List/index';
import useGetBill from '../../hook/useGetBill';
import useGetPurchaseViewList from '../../hook/usePurchaseViewList';
import TagsData from './tags'
import FiledPair from './FiledPair/index'
import RenderStatus from './RenderStatus/index';
import RenderRemarks  from './RenderRemarks';






function PurchaseInvoice() {

const {data,loading,config}=useGetPurchaseViewList();

const {listApi} = useGetBill({ billId: data?.billId, orgId: data?.organizationId });

console.log(listApi,"listApi");

   
const functions={
  renderViewMore : ()=>(
    <Button size="sm" themeType='secondary'>View more</Button>
  ),
  renderFieldPair: (itemData, field) => (
    <FiledPair item={itemData} field={field} />
  ),
  renderStatus: (itemData:any,field:any) => (
     <RenderStatus item={itemData} field={field} />
   ),
   renderRemarks: (itemData,field)=>(
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






import React from 'react';
import {useRouter} from '@cogoport/next';
import {Button} from '@cogoport/components'
import List from '../../../commons/List/index';
import useGetPurchaseViewList from '../../hook/usePurchaseViewList';
import TagsData from './tags'
import FiledPair from './FiledPair/index'
import RenderStatus from './RenderStatus/index';
import RenderRemarks  from './RenderRemarks';

function PurchaseInvoice() {
const {data,loading,config}=useGetPurchaseViewList();
const {push, query} = useRouter();

const functions={
  renderViewMore : ()=>(
    <Button size="sm" themeType="secondary" onClick={() => push(`/business-finance/coe-finance/${query.active_tab}/view-invoices`)}>View Invoices</Button>
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






import React, { useState } from 'react';
import {useRouter} from '@cogoport/next';
import {Button} from '@cogoport/components'
import List from '../../../commons/List/index';
import useGetPurchaseViewList from '../../hook/usePurchaseViewList';
import ShowRemarkData from './ShowRemark/index'
import RenderCustomer from './RenderCustomer/index'
import FormatedDate from './FormatedDate/index';
import FiledPair from './FiledPair/index'
import RenderStatus from './RenderStatus/index';
import RenderRemarks  from './RenderRemarks';

function PurchaseInvoice() {
const router = useRouter();

  const {data,loading,config,handlePageChange,page}=useGetPurchaseViewList();

  const handleChange =(itemData:any)=>{
    router.push(`/business-finance/coe-finance/${router.query.active_tab}/view-invoices?billId=${itemData?.billId}&billNumber=${itemData?.billNumber}&orgId=${itemData?.organizationId}`);
  
  }

    const functions = {
      renderViewMore : (itemData:any)=>(
        <Button size="sm" themeType="secondary" onClick={()=>{handleChange(itemData)}}>View Invoice</Button>
      ),
        renderRemark:(itemData:any,field:any)=>(
          <ShowRemarkData itemData={itemData} field={field}/>
        ),
        renderStatus: (itemData:any,field:any) => (
          <RenderStatus item={itemData} field={field} />
      ),
      renderCustomer: (itemData:any, field:any) => (
        <RenderCustomer item={itemData} field={field} />
      ),
      rendeFormate: (itemData:any, field:any) => (
        <FormatedDate item={itemData} field={field} />
      ),
      renderFieldPair: (itemData:any, field:any) => (
        <FiledPair item={itemData} field={field} />
      ),
      renderRemarks: (itemData:any,field:any)=>(
        <RenderRemarks itemData={itemData} field={field}/>
      )
    };


  return (
    <div>
        <List config={config}  itemData={data} functions={functions} 
        loading={loading} page={page} handlePageChange={handlePageChange}/>
    </div>
  )
}

export default PurchaseInvoice;






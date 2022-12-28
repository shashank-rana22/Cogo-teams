import React, { useState } from 'react';
import {useRouter} from '@cogoport/next';
import {Button} from '@cogoport/components'
import List from '../../../commons/List/index';
import useGetBill from '../../hook/useGetBill';
import useGetPurchaseViewList from '../../hook/usePurchaseViewList';
import TagsData from './tags'
import RenderRemarks  from './RenderRemarks';
import ShowRemarkData from './RenderData/ShowRemark/index'
import RenderStatus from './RenderData/RenderStatus/index'
import FieldPair from './RenderData/FiledPair/index';
import RenderCustomer from './RenderData/RenderCustomer/index'
import FormatedDate from './RenderData/FormatedDate/index';




function PurchaseInvoice() {
const router = useRouter();

   
const handleChange =(itemData:any)=>{
  router.push(`/business-finance/coe-finance/${router.query.active_tab}/view-invoices?billId=${itemData?.billId}&billNumber=${itemData?.billNumber}&orgId=${itemData?.organizationId}`);

}

  const {data,loading,config,handlePageChange,page}=useGetPurchaseViewList();

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
      renderFieldPair: (itemData:any, field:any) => (
        <FieldPair itemData={itemData} field={field} />
      ),
      renderCustomer: (itemData:any, field:any) => (
        <RenderCustomer item={itemData} field={field} />
      ),
      rendeFormate: (itemData:any, field:any) => (
        <FormatedDate item={itemData} field={field} />
      ),
    };


  return (
    <div>
        <List 
        config={config}  
        itemData={data} 
        functions={functions} 
        loading={loading} 
        page={page} 
        handlePageChange={handlePageChange}/>
    </div>
  )
}

export default PurchaseInvoice;






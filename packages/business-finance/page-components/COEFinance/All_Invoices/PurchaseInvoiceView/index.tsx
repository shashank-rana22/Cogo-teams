import React from 'react'
import List from '../../../commons/List/index';
import useGetPurchaseViewList from '../../hook/usePurchaseViewList';
import ShowRemarkData from './RenderData/ShowRemark/index'
import RenderStatus from './RenderData/RenderStatus/index'
import FieldPair from './RenderData/FiledPair/index';
import RenderCustomer from './RenderData/RenderCustomer/index'
import FormatedDate from './RenderData/FormatedDate/index';




function PurchaseInvoice() {

  const {data,loading,config,handlePageChange,page}=useGetPurchaseViewList();

    const functions = {
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






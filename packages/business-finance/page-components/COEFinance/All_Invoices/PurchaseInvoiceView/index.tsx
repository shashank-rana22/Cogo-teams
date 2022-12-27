import React from 'react'
import List from '../../../commons/List/index';
import useGetPurchaseViewList from '../../hook/usePurchaseViewList';
import ShowRemarkData from './ShowRemark/index'
import RenderStatus from './RenderStatus/index'
import FieldPair from './FiledPair/index';
import RenderCustomer from './RenderCustomer/index'
import FormatedDate from './FormatedDate/index';




function PurchaseInvoice() {

  const {data,loading,config}=useGetPurchaseViewList();

    const functions = {
        renderRemark:(itemData:any,field:any)=>(
          <ShowRemarkData itemData={itemData} field={field}/>
        ),
        renderStatus: (itemData:any,field:any) => (
          <RenderStatus item={itemData} field={field} />
      ),
      renderFieldPair: (itemData:any, field:any) => (
        <FieldPair item={itemData} field={field} />
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
        <List config={config}  itemData={data} functions={functions} loading={loading}/>
    </div>
  )
}

export default PurchaseInvoice;






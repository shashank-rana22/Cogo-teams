import React from 'react'
import List from '../../../commons/List/index';
import useGetBill from '../../hook/useGetBill';
import useGetPurchaseViewList from '../../hook/usePurchaseViewList';
import TagsData from './tags'






function PurchaseInvoice() {

const {data,loading,config}=useGetPurchaseViewList();

const {listApi} = useGetBill({ billId: data?.billId, orgId: data?.organizationId });

console.log(listApi,"listApi");

   
    
  return (
    <div>
        <List config={config}  itemData={data?.list}  />
    </div>
  )
}

export default PurchaseInvoice;






import React from 'react'
import List from '../../../commons/List/index';
import useGetPurchaseViewList from '../../hook/usePurchaseViewList';
import TagsData from './tags'






function PurchaseInvoice() {

const {data,loading,config}=useGetPurchaseViewList();



   
    
  return (
    <div>
        <List config={config}  itemData={data?.list}  />
    </div>
  )
}

export default PurchaseInvoice;






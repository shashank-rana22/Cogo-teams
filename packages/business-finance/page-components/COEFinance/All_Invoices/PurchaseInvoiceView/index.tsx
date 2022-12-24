import React from 'react'
import List from '../../../commons/List/index';
import useGetPurchaseViewList from '../../hook/usePurchaseViewList';
import TagsData from './tags'
import FiledPair from './FiledPair/index'
import RenderStatus from './RenderStatus/index';






function PurchaseInvoice() {

const {data,loading,config}=useGetPurchaseViewList();
const functions={
  renderViewMore : ()=>{
   return <button>Render view more</button>
  },
  renderFieldPair: (itemData, field) => (
    <FiledPair item={itemData} field={field} />
  ),
      renderStatus: (itemData:any,field:any) => (
          <RenderStatus item={itemData} field={field} />
        )
};
    
  return (
    <div>
        <List config={config}  itemData={data?.list} functions={functions} />
    </div>
  )
}

export default PurchaseInvoice;






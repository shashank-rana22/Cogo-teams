import React from 'react'
import {useRouter} from '@cogoport/next';
import {Button} from '@cogoport/components'
import List from '../../../commons/List/index';
import useGetPurchaseViewList from '../../hook/usePurchaseViewList';
import RenderRemarks  from './RenderData/RenderRemarks/index';
import RenderStatus from './RenderData/RenderStatus/index'
import FieldPair from './RenderData/FiledPair/index';
import RenderCustomer from './RenderData/RenderCustomer/index'
import FormatedDate from './RenderData/FormatedDate/index';
import SegmentedFilters from './SegmentedFilters/index'
import {FunctionObjects, GenericObject} from '../../../commons/Interfaces/index'
import {fieldProps,fieldItemProps} from './interfaces/index'




function PurchaseInvoice() {
const router = useRouter();

  const {data,
      loading,
      config,
      handlePageChange,
      page,
      setSearchValue,	
		  searchValue,
      currentTab,
     setCurrentTab,
    }=useGetPurchaseViewList();

  const handleChange =(itemData:any)=>{
    router.push(`/business-finance/coe-finance/${router.query.active_tab}/view-invoices?billId=${itemData?.billId}&billNumber=${itemData?.billNumber}&orgId=${itemData?.organizationId}`);
  
  }

      

    const functions:FunctionObjects = {
        renderStatus: (itemData:GenericObject) => (
          <RenderStatus item={itemData}/>
      ),
      renderFieldPair: (itemData:GenericObject, field:fieldProps) => (
        <FieldPair itemData={itemData} field={field} />
      ),
      renderCustomer: (itemData:GenericObject, field:fieldProps) => (
        <RenderCustomer itemData={itemData} field={field} />
      ),
      rendeFormate: (itemData:GenericObject, field:fieldProps) => (
        <FormatedDate item={itemData} field={field} />
      ),
      renderRemarks: (itemData:any,field:any)=>(
        <RenderRemarks itemData={itemData} field={field}/>
      ),
      renderViewMore : (itemData:any)=>(
        <Button size="sm" themeType="secondary" onClick={()=>{handleChange(itemData)}}>View Invoice</Button>
      ),
    };

    
   
    
  return (
    <div>
    <SegmentedFilters
        setSearchValue={setSearchValue}
        searchValue={searchValue}
         currentTab={currentTab}
         setCurrentTab={setCurrentTab}
      />
     <List
       config={config}  
       itemData={data}
       functions={functions}
       loading={loading}
       page={page}
       handlePageChange={handlePageChange}
     />
 </div>
  )
}

export default PurchaseInvoice;






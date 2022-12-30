import React from 'react'
import List from '../../../commons/List/index';
import useGetPurchaseViewList from '../../hook/usePurchaseViewList';
import RenderStatus from './RenderData/RenderStatus/index'
import FieldPair from './RenderData/FiledPair/index';
import RenderCustomer from './RenderData/RenderCustomer/index'
import FormatedDate from './RenderData/FormatedDate/index';
import SegmentedFilters from './SegmentedFilters/index'
import {FunctionObjects, GenericObject} from '../../../commons/Interfaces/index'
import {fieldProps,fieldItemProps} from './interfaces/index'




function PurchaseInvoice() {

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






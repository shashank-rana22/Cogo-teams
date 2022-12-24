import React  from "react";
import List from '../../../../../commons/List/index';
import config from '../../../../configurations/SHIPMENT_DOCUMENTS_CONFIG';

const Documents =({data={}})=>{
    const functions={};
    return(
        <div>
                   <List config={config || {}}  itemData={data?.list} functions={functions} />

        </div>
    )
}
export default Documents
import React from 'react';
import { Tooltip } from '@cogoport/components';
import { IcMInvoices } from '@cogoport/icons-react';


const RenderRemarks=({itemData,field})=>{
    return <div>
        <Tooltip placement="top" content="Remarks here ...">
        <IcMInvoices width="20px" height="20px" color='#F68B21'/>
        </Tooltip>
        </div>
}

export default RenderRemarks;
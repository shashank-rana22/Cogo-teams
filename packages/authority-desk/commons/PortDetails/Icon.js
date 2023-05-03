import {  IcCFfcl , IcAOceanLcl, IcCFclLocals } from '@cogoport/icons-react';

 const Icons = ({service_type = ''}) => { 

    switch (service_type) {
        case 'fcl_freight_service': 
       return <IcCFfcl /> 
        case 'lcl_freight_service': 
        return <IcAOceanLcl/> 
        case 'fcl_freight_local_service': 
        return <IcCFclLocals/> 
        default: return null;
    }
} 

export default Icons;
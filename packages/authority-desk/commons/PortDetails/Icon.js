import {  IcCFfcl , IcAOceanLcl, IcCFclLocals } from '@cogoport/icons-react';

 const Icons = ({service_type = ''}) => {  

    console.log({service_type})

    switch (service_type) {
        case 'fcl_freight_service': 
       return (  
       <>  
       <IcCFfcl />  
       <span>FCL</span>
       </> 
       )
        case 'lcl_freight_service': 
        return (  
            <>  
            <IcAOceanLcl />  
            <span>LCL</span>
            </> 
            )
        case 'fcl_freight_local_service': 
        return (  
            <>  
            <IcCFclLocals />  
            <span>FCL Locals</span>
            </> 
            )
        default: return null;
    }
} 

export default Icons;
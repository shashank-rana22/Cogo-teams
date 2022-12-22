import { IcCFclLocals, IcAOceanLcl, IcAOceanFcl, IcCFclCustoms, IcCLclCustoms} from '@cogoport/icons-react';

export const getServiceInfo = (service) => {

    console.log(service,'serviceee');
   let serviceIcon = null;

   if (service === 'fcl_freight') serviceIcon = <IcAOceanFcl width={26} height={26} />;
   if (service === 'lcl_freight') serviceIcon = <IcAOceanLcl width={26} height={26} />;
   if (service === 'fcl_customs') serviceIcon = <IcCFclCustoms width={26} height={26}/>;
   if (service === 'lcl_customs') serviceIcon = <IcCLclCustoms width={26} height={26} />
   if (service === 'fcl_freight_local_service')
       serviceIcon = <IcCFclLocals width={26} height={26} />;

   return { serviceIcon };
};
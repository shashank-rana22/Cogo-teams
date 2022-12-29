import React from 'react';
import { IcCFclLocals, IcMFtrailorFull, IcMFcfs,
	IcMFcl,
	IcMAirport,
	IcMFairport,
	IcMFlcl,
	IcMFfcl,
	IcMLcl,
	IcMFair,
	IcMFhaulage,
	IcMFftl,
	IcMLtl
} from '@cogoport/icons-react';



 const GetServiceInfo = (service:any='') => {
	let ServiceIcon:any = null;

	if (service === 'fcl_freight'){
		return <IcMFcl/>;
	}
	if (service === 'lcl_freight') return <IcMFlcl/>;
	if (service === 'air_freight') return <IcMAirport/>;
	if (service === 'domestic_air_freight')
		return <IcMFairport/>;

	if (service === 'fcl_customs') return <IcMFfcl/>;
	if (service === 'fcl_cfs')
		return <IcMFcfs/> ;
		
	if (service === 'lcl_customs') return <IcMLcl/> ;
	if (service === 'air_customs') return <IcMFair/>;

	if (service === 'haulage_freight') return <IcMFhaulage/>  ;

	if (service === 'trailer_freight')
		return  <IcMFtrailorFull/>;
	if (service === 'ftl_freight') return <IcMFftl/>  ;
	if (service === 'ltl_freight') return <IcMLtl/>  ;
	if (service === 'fcl_freight_local_service')
		return <IcCFclLocals/> ;

	return <div>icon</div>;
};
export default GetServiceInfo;
import React from 'react';
import { IcCFclLocals, IcMFtrailorFull, IcMFcfs,
	IcMFship,
	IcMAirport,
	IcMFhaulage,
	IcMFftl,
} from '@cogoport/icons-react';



 const GetServiceInfo = (service:any='') => {
	let ServiceIcon:any = null;

	if (service === 'fcl_freight'){
		return <IcMFship/>;
	}
	if (service === 'lcl_freight') return <IcMFship/>;
	if (service === 'air_freight') return <IcMAirport/>;
	if (service === 'domestic_air_freight')
		return <IcMAirport/>;

	if (service === 'fcl_customs') return <IcMFship/>;
	if (service === 'fcl_cfs')
		return <IcMFship/> ;
		
	if (service === 'lcl_customs') return <IcMFship/> ;
	if (service === 'air_customs') return <IcMAirport/>;

	if (service === 'haulage_freight') return <IcMFhaulage/>  ;

	if (service === 'trailer_freight')
		return  <IcMFhaulage/>;
	if (service === 'ftl_freight') return <IcMFftl/>  ;
	if (service === 'ltl_freight') return <IcMFftl/>  ;
	if (service === 'fcl_freight_local_service')
		return <IcCFclLocals/> ;

	return <div>-</div>;
};
export default GetServiceInfo;
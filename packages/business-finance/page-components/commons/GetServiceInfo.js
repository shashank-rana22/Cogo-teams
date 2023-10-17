import {
	IcCFclLocals,
	IcMFship,
	IcMAirport,
	IcMFhaulage,
	IcMFftl,
	IcCFhaulage,
} from '@cogoport/icons-react';
import React from 'react';

function GetServiceInfo(service) {
	if (service === 'fcl_freight') {
		return <IcMFship color="#5936F0" height={20} width={20} />;
	}
	if (service === 'lcl_freight') return <IcMFship color="#5936F0" height={20} width={20} />;
	if (service === 'air_freight') return <IcMAirport color="#5936F0" height={20} width={20} />;
	if (service === 'domestic_air_freight') return <IcMAirport color="#5936F0" height={20} width={20} />;

	if (service === 'fcl_customs') return <IcMFship color="#5936F0" height={20} width={20} />;
	if (service === 'fcl_cfs') return <IcMFship color="#5936F0" height={20} width={20} />;

	if (service === 'lcl_customs') return <IcMFship color="#5936F0" height={20} width={20} />;
	if (service === 'air_customs') return <IcMAirport color="#5936F0" height={20} width={20} />;

	if (service === 'haulage_freight') return <IcMFhaulage color="#5936F0" height={20} width={20} />;

	if (service === 'trailer_freight') return <IcMFhaulage color="#5936F0" height={20} width={20} />;
	if (service === 'ftl_freight') return <IcMFftl color="#5936F0" height={20} width={20} />;
	if (service === 'ltl_freight') return <IcMFftl color="#5936F0" height={20} width={20} />;
	if (service === 'fcl_freight_local_service') return <IcCFclLocals color="#5936F0" height={20} width={20} />;
	if (service === 'rail_domestic_freight') return <IcCFhaulage color="#5936F0" height={20} width={20} />;

	return <div>-</div>;
}
export default GetServiceInfo;
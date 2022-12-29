import {
	IcCFclLocals, IcAOceanLcl, IcAOceanFcl,
} from '@cogoport/icons-react';

export const getServiceInfo = (service) => {
	let serviceIcon = null;
	let serviceText = '';
	if (service === 'fcl_freight') {
		serviceIcon = <IcAOceanFcl width={32} height={32} />;
		serviceText = 'FCL';
	}
	if (service === 'lcl_freight') {
		serviceIcon = <IcAOceanLcl width={32} height={32} />;
		serviceText = 'LCL';
	}

	if (service === 'fcl_freight_local_service') { serviceIcon = <IcCFclLocals width={30} height={30} />; }

	return { serviceIcon, serviceText };
};

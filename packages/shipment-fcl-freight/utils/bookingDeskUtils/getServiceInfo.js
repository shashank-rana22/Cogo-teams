import {
	IcAOceanFcl,
} from '@cogoport/icons-react';

export const getServiceInfo = (service) => {
	let serviceIcon = null;
	let serviceText = '';
	if (service === 'fcl_freight') {
		serviceIcon = <IcAOceanFcl width={32} height={32} />;
		serviceText = 'FCL';
	}

	return { serviceIcon, serviceText };
};

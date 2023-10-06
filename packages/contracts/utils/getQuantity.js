import { startCase } from '@cogoport/utils';

const SERVICE_MAPPING = {
	fcl_freight       : { label: 'containers_count', unit: 'Ctr' },
	lcl_freight       : { label: 'volume', unit: 'CBM' },
	air_freight       : { label: 'weight', unit: 'Kg' },
	fcl_freight_local : { label: 'containers_count', unit: 'Ctr' },
	lcl_freight_local : { label: 'volume', unit: 'CBM' },
};

const ZERO = 0;

const getQuantity = ({ portPairdata, service }) => {
	let contentToShow = Number(ZERO);
	(portPairdata || []).forEach((item) => {
		contentToShow += Number(item?.[SERVICE_MAPPING?.[service]?.label]) || ZERO;
	});
	const unit = startCase([SERVICE_MAPPING[service]?.unit]);

	return { contentToShow, unit };
};

export default getQuantity;

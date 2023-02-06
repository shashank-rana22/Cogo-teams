import { startCase } from '@cogoport/utils';

const mapping = {
	fcl_freight : 'containers_count',
	lcl_freight : 'volume',
	air_freight : 'weight',
};
const unitMapping = {
	fcl_freight : 'Ctr',
	lcl_freight : 'CBM',
	air_freight : 'Kg',
};

const getQuantity = ({ portPairdata, service }) => {
	let contentToShow = Number(0);
	(portPairdata || []).forEach((item) => { contentToShow += Number(item?.[mapping?.[service]]) || 0; });
	const unit = startCase([unitMapping[service]]);

	return { contentToShow, unit };
};

export default getQuantity;

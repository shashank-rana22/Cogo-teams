import { isEmpty } from '@cogoport/utils';

const getCreateUpdateCommodityPayload = ({ values = {}, item = {}, status = 'active' }) => {
	let commodities = {};
	(values?.commodities || []).forEach((childValue) => {
		commodities = {
			...commodities,
			[childValue.container_type]: childValue.commodity || undefined,
		};
	});

	const payload = {
		id   : item?.id || undefined,
		name : values?.name,
		status,
		...(!isEmpty(commodities) ? { commodities } : {}),
	};
	return payload;
};

export default getCreateUpdateCommodityPayload;

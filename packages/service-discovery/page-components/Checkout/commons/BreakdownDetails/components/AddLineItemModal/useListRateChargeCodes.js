import { useRequest } from '@cogoport/request';

const useListRateChargeCodes = ({ service_type }) => {
	const [{ data = {} }] = useRequest({
		url    : 'list_rate_charge_codes',
		method : 'GET',
		params : {
			service_name: `${service_type}_charges`,
		},
	}, { manual: false });

	const CHARGE_CODE_DATA = {};

	const { list = [] } = data;

	list.forEach((entity) => {
		CHARGE_CODE_DATA[entity?.name] = entity;
	});

	return { CHARGE_CODE_DATA };
};

export default useListRateChargeCodes;

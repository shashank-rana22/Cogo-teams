import { useRequest } from '@cogoport/request';

import formatDaysPayload from '../utils/format-days-payload';

const useUpdateDestinationDemurrageDays = ({
	service_rates = {},
	refetchSearch = () => {},
	spot_search_id,
}) => {
	const [{ loading }, trigger] = useRequest(
		{
			method     : 'post',
			url        : '/create_spot_search_service',
			sourcePath : 'sales_dashboard',
		},
		{
			manual: true,
		},
	);

	const fclLocalsTradeTypes = [];

	Object.keys(service_rates || {}).forEach((key) => {
		if (service_rates?.[key]?.service_type === 'fcl_freight_local') {
			if (!fclLocalsTradeTypes.includes(service_rates?.[key]?.trade_type)) {
				fclLocalsTradeTypes.push(service_rates?.[key]?.trade_type);
			}
		}
	});

	const onSubmit = async (values) => {
		try {
			const payload = {
				id                  : spot_search_id,
				service             : 'subsidiary',
				subsidiary_services : formatDaysPayload({ service_rates, values }),
			};

			await trigger({
				data: payload,
			});
			refetchSearch({ sreenObj: { screen: 'listRateCard' } });
		} catch (error) {
			console.log('lol');
		}
	};

	return {
		loading,
		onSubmit,
	};
};

export default useUpdateDestinationDemurrageDays;

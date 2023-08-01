import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import formatDaysPayload from '../utils/format-days-payload';

const useUpdateDestinationDemurrageDays = ({
	services = {},
	refetch = () => {},
	setShow = () => {},
	spot_search_id = '',
}) => {
	const { general: { query = {} } } = useSelector((state) => state);

	const [{ loading }, trigger] = useRequest({
		method : 'POST',
		url    : '/add_spot_search_service',
	}, { manual: true });

	const fclLocalsTradeTypes = [];

	Object.keys(services || {}).forEach((key) => {
		if (services?.[key]?.service_type === 'fcl_freight_local') {
			if (!fclLocalsTradeTypes.includes(services?.[key]?.trade_type)) {
				fclLocalsTradeTypes.push(services?.[key]?.trade_type);
			}
		}
	});

	const onSubmit = async (values) => {
		try {
			const payload = {
				spot_search_id                 : query?.spot_search_id || spot_search_id,
				service                        : 'subsidiary',
				subsidiary_services_attributes : formatDaysPayload({ services, values }),
			};

			await trigger({ data: payload });
			setShow(false);
			refetch();
			return true;
		} catch (error) {
			if (error.response?.data) {
				Toast.error(getApiErrorString(error.response?.data));
			}
			return false;
		}
	};

	return {
		loading,
		onSubmit,
	};
};

export default useUpdateDestinationDemurrageDays;

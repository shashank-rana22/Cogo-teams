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
	defaultValues = {},
}) => {
	const { general: { query = {} } } = useSelector((state) => state);

	const [{ loading }, trigger] = useRequest({
		method : 'POST',
		url    : '/add_spot_search_service',
	}, { manual: true });

	const FCL_LOCALS_TRADE_TYPES = [];

	Object.keys(services || {}).forEach((key) => {
		if (services?.[key]?.service_type === 'fcl_freight_local') {
			if (!FCL_LOCALS_TRADE_TYPES.includes(services?.[key]?.trade_type)) {
				FCL_LOCALS_TRADE_TYPES.push(services?.[key]?.trade_type);
			}
		}
	});

	const onSubmit = async (formValues = {}) => {
		const changedValues = Object.keys(formValues).reduce((acc, key) => {
			if (Number(formValues[key]) !== Number(defaultValues[key])) {
				return ({ ...acc, [key]: formValues[key] });
			}
			return acc;
		}, {});

		try {
			const payload = {
				spot_search_id                 : query?.spot_search_id || spot_search_id,
				service                        : 'subsidiary',
				subsidiary_services_attributes : formatDaysPayload({ services, values: changedValues }),
			};

			await trigger({ data: payload });

			Toast.success('Days updated successfully!');
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

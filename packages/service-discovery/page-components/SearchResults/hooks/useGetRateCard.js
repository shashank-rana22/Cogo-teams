import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

const useGetRateCard = () => {
	const { general: { query = {} } } = useSelector((state) => state);
	const [headerProps, setHeaderProps] = useState({});
	const [screen, setScreen] = useState('rate_card');
	const { rate_card_id = '' } = query;

	const [{ loading, data }, trigger] = useRequest({
		method : 'GET',
		url    : '/get_spot_search_rate_card',
		params : { rate_card_id, service_type: 'fcl_freight' },
	}, { manual: false });

	const getRateDetails = () => {
		try {
			trigger({
				params: { rate_card_id, service_type: 'fcl_freight' },
			});
		} catch (error) {
			if (error?.response?.data) {
				Toast.error(getApiErrorString(error.response?.data));
			}
		}
	};

	return {
		loading,
		data,
		refetch: getRateDetails,
		headerProps,
		setHeaderProps,
		screen,
		setScreen,
	};
};
export default useGetRateCard;

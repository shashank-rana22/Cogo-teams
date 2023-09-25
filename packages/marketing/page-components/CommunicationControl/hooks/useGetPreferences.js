import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

import toastApiError from '../utils/toastApiError';

const useGetPreferences = ({ companyId, userId }) => {
	const [data, setData] = useState({});

	const [{ loading }, trigger] = useRequest({
		url    : '/get_user_alert_preference',
		method : 'GET',
		params : {
			organization_id : companyId,
			user_id         : userId,
		},
	}, { manual: true });

	const getPreferences = useCallback(async () => {
		try {
			const res = await trigger();
			setData(res?.data);
		} catch (error) {
			toastApiError(error);
		}
	}, [trigger]);

	useEffect(() => {
		if (userId) {
			getPreferences();
		}
	}, [userId, getPreferences]);

	// useEffect(() => {
	// 	const { preferences } = data || {};
	// 	const {
	// 		offers_discounts,
	// 		subscriber_special,
	// 		new_product_service_launches_and_updates,
	// 		product_service_explainers,
	// 		general_news,
	// 		newsletter,
	// 	} = preferences || {};

	// 	const handleStatus = (val) => val === 'active';

	// 	setFormData((prev) => ({
	// 		...prev,
	// 		offers_discounts                         : handleStatus(offers_discounts),
	// 		subscriber_special                       : handleStatus(subscriber_special),
	// 		new_product_service_launches_and_updates : handleStatus(
	// 			new_product_service_launches_and_updates,
	// 		),
	// 		product_service_explainers : handleStatus(product_service_explainers),
	// 		newsletter                 : handleStatus(newsletter),
	// 		general_news               : handleStatus(general_news),
	// 	}));
	// }, [data]);

	return {
		preferences: data?.preferences || {},
		loading,
		getPreferences,
	};
};

export default useGetPreferences;

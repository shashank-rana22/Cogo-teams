import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useState, useCallback } from 'react';

const useListRfqs = ({ filterStore, id = '' }) => {
	const {
		endDate, highProfitability,
		lowProfitability, organizationSize, search, serviceType, startDate, status, sortBy, activeTab,

	} = filterStore || {};
	const [page, setPage] = useState(1);
	console.log('active', activeTab);

	const [{ loading, data }, trigger] = useRequest({
		url    : 'list_rfqs',
		method : 'GET',
		params : {
			port_pair_data_required         : 'true',
			rate_card_user_details_required : 'true',
			filters                         : {
				state                   : activeTab === 'approval' ? 'requested_for_approval' : undefined,
				q                       : search,
				created_at_greater_than : startDate,
				created_at_less_than    : endDate,
				high_profitability      : highProfitability,
				low_profitability       : lowProfitability,
				sub_type                : organizationSize,
				service_type            : serviceType,
				status                  : activeTab === 'all' ? 'live' : undefined,
				low_to_high             : sortBy === 'profitability_low',
				id,
			},
			page,
		},
	}, { manual: false });

	const getRfqsForApproval = useCallback(async () => {
		try {
			await trigger();
		} catch (error) {
			if (error?.response) {
				Toast.error(getApiErrorString(error?.response?.data));
			}
		}
	}, [trigger]);

	return {
		getRfqsForApproval,
		data,
		loading,
		setPage,
		page,
	};
};

export default useListRfqs;

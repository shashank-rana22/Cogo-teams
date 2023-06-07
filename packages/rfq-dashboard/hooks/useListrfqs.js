import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useState, useCallback } from 'react';

const useListRfqs = ({ filterStore = {}, id = '' }) => {
	const {
		endDate, highProfitability,
		lowProfitability, organizationSize, search, serviceType, startDate, sortBy, activeTab,

	} = filterStore || {};

	const [page, setPage] = useState(1);

	const sort_by = (['oldest', 'newest'].includes(sortBy)) ? 'created_at' : undefined;
	let sort_type;
	let promised_consolidated_profitability;

	if (sort_by) {
		sort_type = sort_by === 'oldest' ? 'asc' : 'desc';
	} else {
		promised_consolidated_profitability = sortBy === 'profitability_low' ? 'asc' : 'desc';
	}

	const [{ loading, data }, trigger] = useRequest({
		url    : 'list_rfqs',
		method : 'GET',
		params : {
			port_pair_data_required            : 'true',
			requested_by_user_details_required : 'true',
			sort_by,
			sort_type,
			filters                            : {
				state                   : activeTab === 'approval' ? 'requested_for_approval' : undefined,
				q                       : search,
				created_at_greater_than : startDate,
				created_at_less_than    : endDate,
				high_profitability      : highProfitability,
				low_profitability       : lowProfitability,
				sub_type                : organizationSize,
				service_type            : serviceType,
				status                  : 'live',
				id                      : id || undefined,
				promised_consolidated_profitability,
			},
			page,
		},
	}, { manual: false });

	const getRfqsForApproval = useCallback(() => {
		try {
			trigger();
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

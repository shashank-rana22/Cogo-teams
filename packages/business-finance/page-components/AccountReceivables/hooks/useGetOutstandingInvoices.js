import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState, useCallback } from 'react';

const { zeroth_index } = GLOBAL_CONSTANTS || {};
const useGetOutstandingInvoices = (filter, kamOwnerId, toggleValue, entityCode = '') => {
	const {
		profile: { authorizationparameters },
	} = useSelector((state) => state);

	const [filters, setFilters] = useState({
		page_number : 1,
		page_size   : 6,
	});

	const [{ data, loading }, trigger] = useRequest({
		url    : '/get_outstanding_data_bifurcation',
		method : 'GET',
	}, { manual: true });

	const {
		dateRangePickerValue,
		bifurcation_type,
		view_type,
		...rest
	} = filter;
	const getOutstandingInvoices = useCallback(
		async () => {
			await trigger({
				params: {
					start_date  : dateRangePickerValue?.startDate || undefined,
					end_date    : dateRangePickerValue?.endDate || undefined,
					entity_code : entityCode ? [entityCode] : ['301', '101'],
					kam_owner_id:
                        kamOwnerId && kamOwnerId[zeroth_index] !== 'all' ? kamOwnerId : undefined,
					bifurcation_type : toggleValue ? 'dso' : bifurcation_type,
					view_type        : toggleValue ? undefined : view_type,
					...rest,
					...filters,
				},
			});
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[
			kamOwnerId,
			toggleValue,
			filters,
			bifurcation_type,
			dateRangePickerValue?.endDate,
			dateRangePickerValue?.startDate,
			entityCode,
			trigger,
			view_type,
		],
	);

	useEffect(() => {
		getOutstandingInvoices();
	}, [filter, authorizationparameters, kamOwnerId, toggleValue, getOutstandingInvoices, filters]);

	return {
		loading,
		data,
		filters,
		setFilters,
		getOutstandingInvoices,
	};
};

export default useGetOutstandingInvoices;

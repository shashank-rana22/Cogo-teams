import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

import { DATE_FILTER_MAPPING } from '../configurations/time-filter-mapping';

const getDateString = (date) => formatDate({
	date,
	dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
	formatType : 'date',
}) || '';

const getParams = ({ value }) => ({
	data_required : false,
	filters       : {
		is_converted_to_booking        : true,
		quotation_sent_at_greater_than : getDateString(DATE_FILTER_MAPPING[value](new Date())),
	},
});

function useListAgentCheckout({ value, showDetails = false }) {
	const [{ loading, data }, trigger] = useRequest(
		{
			url    : '/list_checkouts',
			method : 'get',
		},
		{ manual: true, autoCancel: false },
	);

	const getAgentShipmentsCount = useCallback(() => {
		if (!showDetails) return;

		try {
			trigger({
				params: getParams({ value }),
			});
		} catch (error) {
			console.error(error, 'error');
		}
	}, [trigger, value, showDetails]);

	useEffect(() => {
		getAgentShipmentsCount();
	}, [getAgentShipmentsCount]);

	return {
		shiplentLoading : loading,
		shipmentData    : data,
	};
}
export default useListAgentCheckout;

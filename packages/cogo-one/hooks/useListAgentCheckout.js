import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequest } from '@cogoport/request';
import { startOfDay, startOfMonth, startOfWeek } from '@cogoport/utils';
import { useCallback, useEffect } from 'react';

const getDateString = (date) => formatDate({
	date,
	dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
	formatType : 'date',
}) || '';

const DATE_UTILS_MAPPING = {
	day   : startOfDay,
	week  : startOfWeek,
	month : startOfMonth,
};

const getParams = ({ value, agentId }) => ({
	// data_required : false,
	agent_id : agentId,
	filters  : {
		is_converted_to_booking        : true,
		quotation_sent_at_greater_than : getDateString(DATE_UTILS_MAPPING[value](new Date())),
	},
});

function useListAgentCheckout({ agentId = '', value, showDetails = false }) {
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
				params: getParams({ value, agentId }),
			});
		} catch (error) {
			console.error(error, 'error');
		}
	}, [trigger, value, agentId, showDetails]);

	useEffect(() => {
		getAgentShipmentsCount();
	}, [getAgentShipmentsCount]);

	return {
		loading,
		data,
	};
}
export default useListAgentCheckout;

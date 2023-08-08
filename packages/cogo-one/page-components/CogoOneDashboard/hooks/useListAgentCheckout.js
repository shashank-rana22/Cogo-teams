import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

import { DATE_FILTER_MAPPING } from '../constants';

const getDateString = (date) => formatDate({
	date,
	dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
	formatType : 'date',
}) || '';

const getParams = ({ timeline, agentId }) => ({
	data_required                  : false,
	sales_dashboard_stats_required : true,
	pagination_data_required       : false,
	filters                        : {
		sales_agent_id                 : agentId,
		quotation_sent_at_greater_than : getDateString(DATE_FILTER_MAPPING[timeline](new Date())),
	},
});

function useListAgentCheckout({ timeline = '', agentId = '' }) {
	const [{ loading, data }, trigger] = useRequest(
		{
			url    : '/list_checkouts',
			method : 'get',
		},
		{ manual: true, autoCancel: false },
	);

	const getAgentShipmentsCount = useCallback(() => {
		try {
			trigger({
				params: getParams({ timeline, agentId }),
			});
		} catch (error) {
			console.error(error, 'error');
		}
	}, [trigger, timeline, agentId]);

	useEffect(() => {
		getAgentShipmentsCount();
	}, [getAgentShipmentsCount]);

	return {
		shiplentLoading : loading,
		shipmentData    : data,
	};
}
export default useListAgentCheckout;

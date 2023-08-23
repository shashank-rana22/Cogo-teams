import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useCallback } from 'react';

import { DATE_FILTER_MAPPING } from '../configurations/time-filter-mapping';

const commonPayload = {
	supply_stats_required     : false,
	sales_stats_required      : false,
	show_agent_activity_graph : false,
	filters                   : {},
};

const viewTypePayloads = {
	default: {
		sales_stats_required: true,
	},
	supply: {
		supply_stats_required: true,
	},
	supply_admin: {
		supply_stats_required: true,
	},
	sales: {
		sales_stats_required: true,
	},
	support: {
		sales_stats_required: true,
	},
	cp_support: {
		sales_stats_required: true,
	},
	support_admin             : {},
	cogoone_admin             : {},
	shipment_specialist       : {},
	shipment_specialist_admin : {},
};

const getAdditionalPayloadForViewType = (viewType) => ({
	...commonPayload,
	...viewTypePayloads[viewType] || {},
});

const getDateString = ({ date }) => formatDate({
	date,
	dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
	formatType : 'date',
}) || '';

const getParams = ({ timePeriodValue, viewType }) => {
	const baseParams = {
		duration_type : timePeriodValue,
		start_date    : getDateString({ date: DATE_FILTER_MAPPING[timePeriodValue]?.(new Date()) }),
		end_date      : getDateString({ date: new Date() }),
	};

	const additionalPayload = getAdditionalPayloadForViewType(viewType);

	return {
		...baseParams,
		...additionalPayload,
	};
};

function useGetCogoOneAgentStats({ isPunchPresent = false, timePeriodValue = '', viewType = '' }) {
	const { userId } = useSelector(({ profile }) => ({
		userId: profile?.user?.id,
	}));

	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_omnichannel_agent_stats',
		method : 'get',
	}, { manual: true });

	const getCogoOneDashboard = useCallback(() => {
		try {
			trigger({
				params: getParams({ timePeriodValue, userId, viewType }),
			});
		} catch (error) {
			console.error(error, 'err');
		}
	}, [trigger, timePeriodValue, userId, viewType]);

	useEffect(() => {
		if (isPunchPresent) {
			getCogoOneDashboard();
		}
	}, [getCogoOneDashboard, isPunchPresent]);

	return {
		agentStatsLoading : loading,
		getCogoOneDashboard,
		agentStatsData    : data,
	};
}
export default useGetCogoOneAgentStats;

import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useAllocationRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

const INITAIL_SET_DURATION = 60;

const useGetEngagementScoringGraphStats = (props) => {
	const { scoreTrendIds = {} } = props;

	const {
		service_id = '',
		service_type = '',
		service_user_id = '',
	} = scoreTrendIds;

	const [duration, setDuration] = useState(INITAIL_SET_DURATION);
	const [dateRange, setDateRange] = useState({});
	const [params, setParams] = useState({});

	const [{ data }] = useAllocationRequest({
		url     : '/engagement_scoring_score_graph',
		method  : 'GET',
		authkey : 'get_allocation_engagement_scoring_score_graph',
		params,
	}, { manual: false });

	useEffect(() => {
		if (duration !== 'custom') {
			setDateRange({
				startDate : new Date(Date.now() - (duration * GLOBAL_CONSTANTS.milliseconds_in_one_day)),
				endDate   : new Date(),
			});
		}
	}, [duration]);

	useEffect(() => {
		if (!(isEmpty(scoreTrendIds)) && !(isEmpty(dateRange))) {
			setParams((pv) => ({
				...pv,
				service_id,
				service_user_id,
				service_type,
				from_date : dateRange.startDate || new Date(),
				to_date   : dateRange.endDate || new Date(),
			}));
		}
	}, [scoreTrendIds, service_id, service_type, service_user_id, dateRange]);

	return {
		data,
		duration,
		setDuration,
		dateRange,
		setDateRange,
	};
};

export default useGetEngagementScoringGraphStats;

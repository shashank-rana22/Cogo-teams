import { useRequest } from '@cogoport/request';
import { addDays, isEmpty, startOfDay } from '@cogoport/utils';
import { useCallback, useEffect, useState } from 'react';

import getDateTime from '../utils/getDateTime';

const getParams = ({ widgetBlocks, filterParams, selectedFilter, page, trend }) => {
	const {
		date_range = {},
		partner_id = '',
		role_id = [],
		reporting_manager_id = '',
		office_location_id = '',
		agent_id = '',
	} = filterParams || {};

	const currentDayEnd = new Date((new Date()).setHours(23, 59, 59, 999));

	let blocks;

	if (!isEmpty(widgetBlocks)) {
		if (typeof widgetBlocks === 'string') {
			blocks = [widgetBlocks];
		} else {
			blocks = widgetBlocks;
		}
	}

	let extraFilters = {};

	if (selectedFilter) {
		extraFilters = getDateTime({ selectedFilter });
	}

	const endDate = (addDays(date_range?.endDate, 1) > new Date())
		? currentDayEnd : addDays(date_range?.endDate, 1);

	return 	{
		blocks,
		start_date          : extraFilters?.startDate || startOfDay(date_range?.startDate || new Date()),
		end_date            : extraFilters?.endDate || endDate || currentDayEnd,
		trend_data_required : (trend === 'previous'),
		filters             : {
			range                : extraFilters?.range || undefined,
			page                 : page || undefined,
			page_limit           : page ? 5 : undefined,
			partner_id           : partner_id || undefined,
			role_id              : isEmpty(role_id) ? undefined : role_id,
			office_location_id   : office_location_id || undefined,
			reporting_manager_id : reporting_manager_id || undefined,
			agent_id             : agent_id || undefined,
		},
	};
};

const useSmeDashboardStats = ({
	widgetBlocks = null,
	filterParams = {},
	selectedFilter = '',
	page = '',
	trendRequired = false,
}) => {
	const [currentTrend, setCurrentTrend] = useState('');

	const [dashboardData, setDashboardData] = useState({});

	const [, trigger] = useRequest({
		url    : '/get_omnichannel_sme_dashboard',
		method : 'get',
	}, {
		manual     : true,
		autoCancel : false,
	});

	const getSmeDashboardStats = useCallback(
		async ({ trend }) => {
			try {
				if (trend !== 'previous') {
					setDashboardData((prev) => ({ ...prev, loading: true }));
				}

				const res =	await trigger({
					params: getParams({ widgetBlocks, filterParams, selectedFilter, page, trend }),
				});

				setDashboardData(
					(prev) => {
						const updatedData = Object.entries(res?.data).reduce(
							(acc, [key, value]) => {
								if (trend === 'no_trend') {
									return { ...acc, [key]: value };
								}

								return {
									...acc,
									[key]: {
										...prev?.[key],
										[`${trend}_data`]: value,
									},
								};
							},
							{},
						);

						return { ...prev, loading: false, ...updatedData };
					},
				);

				if (trend === 'current') {
					setCurrentTrend('previous');
				}
			} catch (error) {
				setDashboardData((prev) => ({ ...prev, loading: false }));
				console.error('err', error);
			}
		},
		[filterParams, page, selectedFilter, trigger, widgetBlocks],
	);

	useEffect(() => {
		if (!currentTrend) {
			return;
		}
		getSmeDashboardStats({ trend: currentTrend });
	}, [currentTrend, getSmeDashboardStats]);

	useEffect(
		() => {
			let trend = currentTrend;

			if (!trend) {
				trend = trendRequired ? 'current' : 'no_trend';
			}

			setCurrentTrend(trend);
		},
		[currentTrend, trendRequired],
	);

	return {
		dashboardLoading: dashboardData?.loading,
		getSmeDashboardStats,
		dashboardData,
	};
};

export default useSmeDashboardStats;

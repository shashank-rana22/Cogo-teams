import { useRequest } from '@cogoport/request';
import { isEmpty, startOfDay } from '@cogoport/utils';
import { useCallback, useEffect, useState } from 'react';

const getParams = ({ widgetBlocks, filterParams, selectedFilter, page, trend }) => {
	const {
		date_range = {},
		partner_id = '',
		role_id = [],
	} = filterParams || {};

	let blocks;

	if (!isEmpty(widgetBlocks)) {
		if (typeof widgetBlocks === 'string') {
			blocks = [widgetBlocks];
		} else {
			blocks = widgetBlocks;
		}
	}

	return 	{
		blocks,
		start_date          : startOfDay(date_range?.startDate || new Date()),
		end_date            : date_range?.endDate || new Date(),
		trend_data_required : (trend === 'previous'),
		filters             : {
			range      : selectedFilter || undefined,
			page       : page || undefined,
			page_limit : page ? 5 : undefined,
			partner_id : partner_id || undefined,
			role_id    : isEmpty(role_id) ? undefined : role_id,
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

import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState, useCallback } from 'react';

const INITIAL_ARRAY = [];

const useGetMonthlyRevenue = ({
	apiKey,
	isDataSelected,
	inViewport,
	revenueFilter,
	headerFilters,
}) => {
	const [filters, setFilters] = useState({
		page: 1,
	});

	const { entity_code = INITIAL_ARRAY } = headerFilters;

	const scope = useSelector(({ general }) => general.scope);

	const [{ loading, data, error }, trigger] = useRequest(
		{
			url    : `/list_monthly_${apiKey}`,
			method : 'GET',
			scope,
		},
		{ manual: true },
	);

	const getMonthlyRevenue = useCallback(async (page) => {
		try {
			if (apiKey) {
				await trigger({
					params: {
						page         : page || filters.page,
						visualize_by : revenueFilter,
						entity_code  : entity_code?.length > 0 ? entity_code : undefined,
					},
				});
			}
		} catch (err) {
			console.log(err, 'err');
		}
	}, [apiKey, revenueFilter, entity_code, filters.page, trigger]);

	useEffect(() => {
		if (!isDataSelected && inViewport) getMonthlyRevenue();
	}, [getMonthlyRevenue, inViewport, isDataSelected]);

	return {
		loading,
		data,
		filters,
		error,
		setFilters,
	};
};

export default useGetMonthlyRevenue;

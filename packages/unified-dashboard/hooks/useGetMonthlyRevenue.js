import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState, useCallback } from 'react';

const useGetMonthlyRevenue = ({
	apiKey,
	isDataSelected,
	inViewport,
	byEtd,
	headerFilters,
}) => {
	const [filters, setFilters] = useState({
		page: 1,
	});

	const { entity_code = [] } = headerFilters;

	const scope = useSelector(({ general }) => general.scope);

	const [{ loading, data, error }, trigger] = useRequest(
		{
			url    : `/list_monthly_${apiKey}`,
			method : 'GET',
			scope,
		},
		{ manual: false },
	);

	const getMonthlyRevenue = useCallback(async (page) => {
		try {
			await trigger({
				params: {
					page        : page || filters.page,
					by_etd      : byEtd,
					entity_code : entity_code.length > 0 ? entity_code : undefined,
				},
			});
		} catch (err) {
			console.log(err, 'err');
		}
	}, [byEtd, entity_code, filters.page, trigger]);

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

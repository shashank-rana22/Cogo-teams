import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState } from 'react';

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

	const [{ loading, data, error }, trigger] = useRequest({
		url    : `/list_monthly_${apiKey}`,
		method : 'GET',
		scope,
	}, { manual: false });

	const getMonthlyRevenue = async (page) => {
		await trigger({
			params: {
				page        : page || filters.page,
				by_etd      : byEtd,
				entity_code : entity_code.length > 0 ? entity_code : undefined,
			},
		});
	};

	useEffect(() => {
		if (!isDataSelected && inViewport) getMonthlyRevenue();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filters, inViewport, JSON.stringify(entity_code)]);

	return {
		loading,
		data,
		filters,
		error,
		setFilters,
	};
};

export default useGetMonthlyRevenue;

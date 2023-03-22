import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState, useCallback } from 'react';

const useGetOrganizationCohort = ({
	isComponentInViewport,
	revenueFilter,
	headerFilters,
}) => {
	const [page, setPage] = useState(1);

	const { entity_code = [] } = headerFilters;

	const scope = useSelector(({ general }) => general.scope);

	const [{ loading, data, error }, trigger] = useRequest({
		url    : 'get_organization_cohort',
		method : 'GET',
		scope,
	}, { manual: true });

	const getOrganizationCohort = useCallback(async () => {
		try {
			await trigger({
				params: {
					page,
					page_size    : 5,
					visualize_by : revenueFilter,
					entity_code  : entity_code.length > 0 ? entity_code : undefined,
				},
			});
		} catch (err) {
			console.log(err, 'err');
		}
	}, [page, revenueFilter, entity_code, trigger]);

	useEffect(() => {
		if (isComponentInViewport) {
			getOrganizationCohort();
		}
	}, [isComponentInViewport, getOrganizationCohort]);

	return {
		loading,
		error,
		data,
		setPage,
	};
};

export default useGetOrganizationCohort;

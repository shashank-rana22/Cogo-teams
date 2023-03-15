import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState } from 'react';

const useGetOrganizationCohort = ({
	isComponentInViewport,
	byEtd,
	headerFilters,
}) => {
	const [page, setPage] = useState(1);

	const { entity_code = [] } = headerFilters;

	const scope = useSelector(({ general }) => general.scope);

	const [{ loading, data, error }, trigger] = useRequest({
		url    : 'get_organization_cohort',
		method : 'GET',
		scope,
	}, { manual: false });

	const getOrganizationCohort = async () => {
		await trigger({
			params: {
				page,
				page_size   : 5,
				by_etd      : byEtd,
				entity_code : entity_code.length > 0 ? entity_code : undefined,
			},
		});
	};

	useEffect(() => {
		if (isComponentInViewport) {
			getOrganizationCohort();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, isComponentInViewport, byEtd, JSON.stringify(entity_code)]);

	return {
		loading,
		error,
		data,
		setPage,
	};
};

export default useGetOrganizationCohort;

import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback, useEffect, useState } from 'react';

const API_NAME = {
	fcl_freight : 'list_fcl_freight_rate_coverages',
	air_freight : 'list_air_freight_rate_coverages',
};

const DEFAULT_PAGE = 1;

const useGetListCoverage = (filter) => {
	const { user_data } = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));
	const { user: { id: user_id = '' } = {} } = user_data;

	const [source, setSource] = useState('critical_ports');

	const [page, setPage] = useState(DEFAULT_PAGE);

	const endPoint = API_NAME[filter?.service || 'fcl_freight'];
	const [{ loading, data }, trigger] = useRequest({
		url    : endPoint,
		method : 'GET',
	}, { manual: true });

	const getListCoverage = useCallback(async () => {
		const { releventToMeValue, ...restFilters } = filter;

		const FINAL_FILTERS = {};

		Object.keys(restFilters).forEach((ele) => {
			if (restFilters[ele]) { FINAL_FILTERS[ele] = restFilters[ele]; }
		});

		try {
			await trigger({
				params: {
					filters : { ...FINAL_FILTERS, source },
					page,
					user_id : filter?.releventToMeValue ? user_id : undefined,
				},
			});
		} catch (err) {
			// console.log(err);
		}
	}, [trigger, user_id, filter, source, page]);

	useEffect(() => {
		getListCoverage();
	}, [getListCoverage, filter]);

	return {
		loading,
		data,
		getListCoverage,
		source,
		setSource,
		page,
		setPage,
	};
};

export default useGetListCoverage;

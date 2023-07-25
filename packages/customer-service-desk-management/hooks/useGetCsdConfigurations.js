import { Toast } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

const useGetCsdConfigurations = ({ source = '' }) => {
	const router = useRouter();
	const configId = router?.query?.id;

	const [params, setParams] = useState({});

	const [page, setPage] = useState(1);

	const [{ loading, data }, trigger] = useAllocationRequest({
		url     : 'csd_configurations',
		method  : 'GET',
		authkey : 'get_allocation_csd_configurations',
		params,
	}, { manual: true });

	const fetchList = useCallback(() => {
		try {
			trigger({
				...(source === 'capacity_page' ? {
					filters: {
						id: configId,
					},
				} : {
					params: {
						...params,
						page,
						filters: {
							id: configId,
						},
					},
				}),

			});
		} catch (error) {
			Toast.error(error?.message || 'Something went wrong');
		}
	}, [trigger, source, params, page, configId]);

	useEffect(() => {
		fetchList();
	}, [params, fetchList]);

	const { list = [], ...pageData } = data || {};

	return {
		fetchList,
		loading,
		list,
		pageData,
		page,
		setPage,
	};
};

export default useGetCsdConfigurations;

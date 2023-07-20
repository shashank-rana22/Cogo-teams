/* eslint-disable react-hooks/exhaustive-deps */
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useGetOrganizationService = ({ id, setStatus }) => {
	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_organization_services',
	}, { manual: true });

	const getOrganizationService = async () => {
		try {
			await trigger({
				params: {
					filters: {
						service_expertise_required: true,
						id,
					},
					page: 1,
				},
			});
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		if (id) { getOrganizationService(); }
	}, []);

	useEffect(() => {
		if (data) { setStatus(data?.list[GLOBAL_CONSTANTS.zeroth_index]?.stage_of_approval); }
	}, [data]);
	return {
		data       : data?.list[GLOBAL_CONSTANTS.zeroth_index],
		loading,
		totalCount : data?.total_count,
		getOrganizationService,
	};
};
export default useGetOrganizationService;

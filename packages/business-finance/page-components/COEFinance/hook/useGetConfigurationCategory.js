import { useTicketsRequest } from '@cogoport/request';
import { useEffect } from 'react';

import toastApiError from '../../commons/toastApiError.ts';

const useGetConfigurationCategory = () => {
	const [{ data, loading }, trigger] = useTicketsRequest({
		url     : '/configuration_categories',
		method  : 'post',
		authkey : 'get_tickets_configuration_categories',
	}, { manual: true });

	useEffect(() => {
		const getConfigurationCategory = async () => {
			try {
				trigger({
					params: {
						filters: {
							raise_by_desk: 'auditor',
						},
					},
				});
			} catch (err) {
				toastApiError(err);
			}
		};

		getConfigurationCategory();
	}, [trigger]);

	return {
		data,
		loading,
	};
};

export default useGetConfigurationCategory;

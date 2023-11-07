import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

const useListPartners = ({ nextViewType = '' }) => {
	const [{ loading: partnersLoading, data }, trigger] = useRequest({
		url    : '/list_partners',
		method : 'get',
	}, { manual: true });

	const getPartners = useCallback(
		async () => {
			try {
				if (nextViewType !== 'partners') {
					return;
				}

				await trigger({
					params: {
						filters: {
							entity_types : ['cogoport'],
							status       : 'active',
						},
						page_limit          : 1000,
						roles_data_required : false,
						page                : 1,
					},

				});
			} catch (error) {
				console.error(error);
			}
		},
		[nextViewType, trigger],
	);

	useEffect(() => {
		getPartners();
	}, [getPartners]);

	const { list: partnersList = [] } = partnersLoading ? {} : (data || {});

	return {
		partnersLoading,
		getPartners,
		partnersList,
	};
};

export default useListPartners;

import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

const useListConsolidatedShipments = (serialIds:Array<string>) => {
	const [pageFilters, setPageFilters] = useState({ page: 1 });
	const [{ data, loading }, trigger] = useRequest(
		{
			url    : 'list_shipments',
			method : 'get',
		},
	);

	useEffect(() => {
		const getData = async () => {
			try {
				await trigger({
					params: {
						filters: {
							serial_id: serialIds,
						},
						page_limit: 4,
						...pageFilters,
					},
				});
			} catch (error) {
				console.log('error->', error);
			}
		};
		getData();
	}, [serialIds, trigger, pageFilters]);

	return {
		data,
		loading,
		pageFilters,
		setPageFilters,
	};
};

export default useListConsolidatedShipments;

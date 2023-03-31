import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

interface FilterInterface {
	filters?:{
		month?:string
		query?:string
		entity?:string
	}
}

const useList = ({ filters }:FilterInterface) => {
	const [monthName, year] = (filters?.month.match(/(\w+)\s+(\d{4})/) || []).slice(1);

	const monthData = new Date(`${monthName} 1, ${year}`).getMonth() + 1;

	const numericDate = `${year}-${monthData.toString().padStart(2, '0')}-01`;

	const [
		{ data, loading:ListDataLoading },
		listTrigger,
	] = useRequestBf(
		{
			url     : '/pnl/statement/list',
			method  : 'get',
			authKey : 'get_pnl_statement_list',
		},
		{ manual: true },
	);

	const refetch = useCallback(async () => {
		const entityMapping = {
			101 : '6fd98605-9d5d-479d-9fac-cf905d292b88',
			201 : 'c7e1390d-ec41-477f-964b-55423ee84700',
			301 : 'ee09645b-5f34-4d2e-8ec7-6ac83a7946e1',
			401 : '04bd1037-c110-4aad-8ecc-fc43e9d4069d',
			501 : 'b67d40b1-616c-4471-b77b-de52b4c9f2ff',
		};
		try {
			await listTrigger({
				params: {
					q            : filters?.query || undefined,
					period       : year ? numericDate : undefined,
					cogoEntityId : entityMapping[filters?.entity] || undefined,
					pageIndex    : 1,
					pageSize     : 10,

				},
			});
		} catch (error) {
			Toast.error(error?.response?.data?.message);
		}
	}, [filters?.entity, filters?.query, listTrigger, numericDate, year]);

	return {
		refetch,
		ListData: data?.list,
		ListDataLoading,
	};
};
export default useList;

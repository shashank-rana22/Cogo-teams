import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

import { entityMappingData } from '../P&L/PLStatement/constant';

interface FilterInterface {
	filters?:{
		month?:string
		query?:string
		entity?:string
	}
}

const useList = ({ filters }:FilterInterface) => {
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
		try {
			await listTrigger({
				params: {
					q            : filters?.query || undefined,
					period       : filters?.month || undefined,
					cogoEntityId : entityMappingData[filters?.entity] || undefined,
					pageIndex    : 1,
					pageSize     : 10,

				},
			});
		} catch (error) {
			if (error?.response?.data?.message) {
				Toast.error(error?.response?.data?.message);
			}
		}
	}, [filters?.entity, filters?.month, filters?.query, listTrigger]);

	return {
		refetch,
		ListData: data?.list,
		ListDataLoading,
	};
};
export default useList;

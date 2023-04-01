import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

import { entityMapping } from '../P&L/PLStatement/constant';

const useReportFile = ({ query }) => {
	const { month = '', entity = '' } = query || {};

	const [monthName, year] = (month.match(/(\w+)\s+(\d{4})/) || []).slice(1);

	const monthData = new Date(`${monthName} 1, ${year}`).getMonth() + 1;

	const numericDate = `${year}-${monthData.toString().padStart(2, '0')}-01`;

	const [
		{ data:sourceFileData, loading:sourceFileLoading },
		sourceFileTrigger,
	] = useRequestBf(
		{
			url     : '/pnl/statement/segments',
			method  : 'get',
			authKey : 'get_pnl_statement_segments',
		},
		{ manual: true },
	);

	const refetch = useCallback(async () => {
		try {
			await sourceFileTrigger({
				params: {
					cogoEntityId : entityMapping[entity],
					period       : numericDate,
				},
			});
		} catch (error) {
			Toast.error(error?.response?.data?.message);
		}
	}, [entity, numericDate, sourceFileTrigger]);
	return {
		sourceFileData,
		sourceFileLoading,
		refetch,
	};
};
export default useReportFile;

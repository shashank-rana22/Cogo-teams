import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

import { entityMappingData } from '../P&L/PLStatement/constant';

const useReportFile = ({ query }) => {
	const { month = '', entity = '' } = query || {};

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
					cogoEntityId : entityMappingData[entity],
					period       : month,
				},
			});
		} catch (error) {
			Toast.error(error?.response?.data?.message);
		}
	}, [entity, month, sourceFileTrigger]);
	return {
		sourceFileData,
		sourceFileLoading,
		refetch,
	};
};
export default useReportFile;

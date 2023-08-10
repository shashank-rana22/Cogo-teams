import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

const useReportFile = ({ query }) => {
	const { month = '', entity = '' } = query || {};

	const entityDetails = GLOBAL_CONSTANTS.cogoport_entities[entity] || {};

	const { id: entityId } = entityDetails;

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
					cogoEntityId : entityId,
					period       : month,
				},
			});
		} catch (error) {
			Toast.error(error?.response?.data?.message);
		}
	}, [entityId, month, sourceFileTrigger]);
	return {
		sourceFileData,
		sourceFileLoading,
		refetch,
	};
};
export default useReportFile;
